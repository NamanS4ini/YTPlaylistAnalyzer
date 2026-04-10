"use server";

const errorMessages = {
  400: "Bad Request - Please verify the playlist ID and range parameters.",
  403: "Forbidden - API quota might be exhausted.",
  404: "Not Found - The playlist might be private or deleted.",
  500: "Internal Server Error - Please try again later.",
};

function getApiKeys() {
  return (process.env.API_KEY || "")
    .split(",")
    .map((key) => key.trim())
    .filter(Boolean);
}

function shouldTryNextApiKey(status) {
  return status === 400 || status === 401 || status === 403 || status === 429;
}

// Helper function to parse ISO 8601 duration format
function convertToSeconds(duration) {
  if (!duration) return null;

  const match = duration.match(
    /P(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?)?/
  );

  if (!match) return null;

  const days = parseInt(match[1] || 0);
  const hours = parseInt(match[2] || 0);
  const minutes = parseInt(match[3] || 0);
  const seconds = parseInt(match[4] || 0);

  return days * 86400 + hours * 3600 + minutes * 60 + seconds;
}

// Helper function to validate origin
function validateOrigin(request) {
  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");

  // Parse WEBSITE_LINK as comma-separated array of allowed domains
  const allowedOrigins = process.env.WEBSITE_LINK
    ? process.env.WEBSITE_LINK.split(",").map((domain) => domain.trim())
    : [];

  // Check if null origin with valid referer from any allowed domain
  const isValidReferer = allowedOrigins.some((domain) =>
    referer?.startsWith(domain)
  );

  if (origin === null && isValidReferer) {
    return true;
  }

  if (allowedOrigins.includes(origin)) {
    return true;
  }

  return false;
}

export async function GET(request) {
  // Validate origin
  if (!validateOrigin(request)) {
    return Response.json(
      {
        status: 403,
        message: errorMessages[403] || "Forbidden",
      },
      { status: 403 }
    );
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const start = parseInt(searchParams.get("start")) || 1;
  const end = parseInt(searchParams.get("end"));
  const apiKeys = getApiKeys();

  if (!apiKeys.length) {
    return Response.json(
      {
        status: 500,
        message: "API key not configured",
      },
      { status: 500 }
    );
  }

  let currentApiKey = apiKeys[0];

  const fetchWithApiKeyFallback = async (buildUrl) => {
    const orderedKeys = [
      currentApiKey,
      ...apiKeys.filter((key) => key !== currentApiKey),
    ];

    let lastResponse = null;

    for (const key of orderedKeys) {
      const response = await fetch(buildUrl(key));
      if (response.ok) {
        currentApiKey = key;
        return response;
      }

      lastResponse = response;

      if (!shouldTryNextApiKey(response.status)) {
        return response;
      }
    }

    return lastResponse;
  };

  // Fetch initial playlist items
  const res = await fetchWithApiKeyFallback(
    (key) =>
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${id}&maxResults=50&key=${key}`
  );

  if (!res.ok) {
    return Response.json(
      {
        status: res.status,
        message: errorMessages[res.status] || "Unexpected error",
      },
      { status: res.status }
    );
  }

  // Fetch all playlist items (handle pagination)
  const playlistData = await res.json();
  let nextPageToken = playlistData.nextPageToken;

  while (nextPageToken) {
    const res2 = await fetchWithApiKeyFallback(
      (key) =>
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${id}&maxResults=50&pageToken=${nextPageToken}&key=${key}`
    );

    if (!res2.ok) {
      break;
    }

    const playlistData2 = await res2.json();
    const pageItems = Array.isArray(playlistData2.items)
      ? playlistData2.items
      : [];
    playlistData.items.push(...pageItems);
    nextPageToken = playlistData2.nextPageToken || null;
  }

  // Extract and format basic video data
  const items = playlistData.items.map((item) => {
    return {
      id: item.snippet?.resourceId?.videoId || null,
      title: item.snippet?.title || "No Title",
      thumbnail:
        item.snippet?.thumbnails?.standard?.url ||
        item.snippet?.thumbnails?.high?.url ||
        item.snippet?.thumbnails?.medium?.url ||
        item.snippet?.thumbnails?.default?.url ||
        null,
      channelTitle: item.snippet?.videoOwnerChannelTitle || "Unknown Channel",
      channelId: item.snippet?.videoOwnerChannelId || null,
      publishedAt: item.snippet?.publishedAt || null,
      position: item.snippet?.position ?? null,
      duration: null,
      likes: null,
      views: null,
      comments: null,
    };
  });

  // Prepare video IDs in batches of 50
  const videoIds = items.map((item) => item.id).filter(Boolean);
  const batchSize = 50;
  const batches = [];

  for (let i = 0; i < videoIds.length; i += batchSize) {
    batches.push(videoIds.slice(i, i + batchSize).join(","));
  }

  // Fetch video details (duration and statistics) in parallel
  const details = await Promise.all(
    batches.map(async (ids) => {
      const [contentRes, statsRes] = await Promise.all([
        fetchWithApiKeyFallback(
          (key) =>
            `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,snippet&id=${ids}&key=${key}`
        ),
        fetchWithApiKeyFallback(
          (key) =>
            `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${ids}&key=${key}`
        ),
      ]);

      const contentData = await contentRes.json();
      const statsData = await statsRes.json();

      const contentItems = Array.isArray(contentData?.items)
        ? contentData.items
        : [];
      const statsItems = Array.isArray(statsData?.items) ? statsData.items : [];

      return contentItems.map((item) => {
        const statsItem = statsItems.find((s) => s.id === item.id);
        const duration = item.contentDetails?.duration || null;
        const seconds = convertToSeconds(duration);

        return {
          id: item.id,
          publishedAt: item.snippet?.publishedAt || null,
          duration: seconds,
          likes: statsItem?.statistics?.likeCount || null,
          views: statsItem?.statistics?.viewCount || null,
          comments: statsItem?.statistics?.commentCount || null,
        };
      });
    })
  );

  // Flatten the array of arrays
  const flattenedDetails = details.flat();

  // Merge video details with basic data
  let updatedItems = items.map((item) => {
    const detailItem = flattenedDetails.find((d) => d.id === item.id);
    if (detailItem) {
      return {
        ...item,
        publishedAt: detailItem.publishedAt,
        duration: detailItem.duration,
        likes: parseInt(detailItem.likes) || null,
        views: parseInt(detailItem.views) || null,
        comments: parseInt(detailItem.comments) || null,
      };
    }
    return item;
  });

  // Filter out videos without duration and apply range
  updatedItems = updatedItems.filter((item) => item.duration !== null);

  if (end) {
    updatedItems = updatedItems.filter(
      (item, index) => index >= start - 1 && index <= end - 1
    );
  } else if (start > 1) {
    updatedItems = updatedItems.filter((item, index) => index >= start - 1);
  }

  // Fetch playlist details
  const playlistRes = await fetchWithApiKeyFallback(
    (key) =>
      `https://www.googleapis.com/youtube/v3/playlists?key=${key}&id=${id}&part=snippet&fields=items(id,snippet(title,channelId,channelTitle,thumbnails))`
  );

  let playlistDetails = null;
  if (playlistRes.ok) {
    const playlistInfo = await playlistRes.json();
    const playlistItem = playlistInfo.items?.[0];

    if (playlistItem) {
      playlistDetails = {
        id: playlistItem.id,
        title: playlistItem.snippet?.title || "Unknown Playlist",
        channelId: playlistItem.snippet?.channelId || null,
        channelTitle: playlistItem.snippet?.channelTitle || "Unknown Channel",
        thumbnail:
          playlistItem.snippet?.thumbnails?.maxres?.url ||
          playlistItem.snippet?.thumbnails?.high?.url ||
          playlistItem.snippet?.thumbnails?.medium?.url ||
          playlistItem.snippet?.thumbnails?.default?.url ||
          null,
      };
    }
  }

  const origin = request.headers.get("origin");

  return Response.json(
    {
      playlistData: playlistDetails,
      videoData: updatedItems,
    },
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": origin || "*",
      },
    }
  );
}
