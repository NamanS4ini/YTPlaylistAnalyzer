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

function buildCorsHeaders(request) {
  const origin = request.headers.get("origin");
  return {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": origin || "*",
  };
}

function createFetchWithApiKeyFallback(apiKeys) {
  let currentApiKey = apiKeys[0];

  return async function fetchWithApiKeyFallback(buildUrl) {
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

function mapPlaylistItems(items) {
  const safeItems = Array.isArray(items) ? items : [];

  return safeItems.map((item) => ({
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
  }));
}

async function fetchPlaylistMetadata(id, fetchWithApiKeyFallback) {
  const playlistRes = await fetchWithApiKeyFallback(
    (key) =>
      `https://www.googleapis.com/youtube/v3/playlists?key=${key}&id=${id}&part=snippet,contentDetails&fields=items(id,snippet(title,channelId,channelTitle,thumbnails),contentDetails(itemCount))`
  );

  if (!playlistRes.ok) {
    return {
      ok: false,
      status: playlistRes.status,
      payload: null,
    };
  }

  const playlistInfo = await playlistRes.json();
  const playlistItem = playlistInfo.items?.[0];

  if (!playlistItem) {
    return {
      ok: false,
      status: 404,
      payload: null,
    };
  }

  return {
    ok: true,
    status: 200,
    payload: {
      playlistData: {
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
        totalVideos: Number(playlistItem.contentDetails?.itemCount || 0),
      },
    },
  };
}

async function fetchDetailsForIds(videoIds, fetchWithApiKeyFallback) {
  if (!videoIds.length) {
    return [];
  }

  const ids = videoIds.join(",");
  
  try {
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

    if (!contentRes.ok) {
      console.warn(`Content details fetch failed: ${contentRes.status}`);
      return [];
    }

    const contentData = await contentRes.json();
    const statsData = statsRes.ok ? await statsRes.json() : {};

    const contentItems = Array.isArray(contentData?.items)
      ? contentData.items
      : [];
    const statsItems = Array.isArray(statsData?.items) ? statsData.items : [];
    const statsMap = new Map(statsItems.map((item) => [item.id, item]));

    return contentItems.map((item) => {
      const statsItem = statsMap.get(item.id);
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
  } catch (error) {
    console.error("Error fetching video details:", error);
    return [];
  }
}

function mergeItemsWithDetails(items, details) {
  const detailMap = new Map(details.map((item) => [item.id, item]));

  return items
    .map((item) => {
      const detail = detailMap.get(item.id);

      if (!detail) {
        return item;
      }

      return {
        ...item,
        publishedAt: detail.publishedAt,
        duration: detail.duration,
        likes: parseInt(detail.likes) || null,
        views: parseInt(detail.views) || null,
        comments: parseInt(detail.comments) || null,
      };
    });
}

async function fetchPlaylistBatch({ id, pageToken, fetchWithApiKeyFallback }) {
  const playlistItemsRes = await fetchWithApiKeyFallback(
    (key) =>
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${id}&maxResults=50${
        pageToken ? `&pageToken=${encodeURIComponent(pageToken)}` : ""
      }&key=${key}`
  );

  if (!playlistItemsRes.ok) {
    return {
      ok: false,
      status: playlistItemsRes.status,
      payload: null,
    };
  }

  const playlistItemsData = await playlistItemsRes.json();
  const basicItems = mapPlaylistItems(playlistItemsData.items);
  const videoIds = basicItems.map((item) => item.id).filter(Boolean);
  const details = await fetchDetailsForIds(videoIds, fetchWithApiKeyFallback);
  const videoData = mergeItemsWithDetails(basicItems, details);

  return {
    ok: true,
    status: 200,
    payload: {
      videoData,
      nextPageToken: playlistItemsData.nextPageToken || null,
      rawBatchSize: basicItems.length,
    },
  };
}

async function fetchAllVideos(id, fetchWithApiKeyFallback) {
  const allVideos = [];
  let nextPageToken = null;

  do {
    const batchResult = await fetchPlaylistBatch({
      id,
      pageToken: nextPageToken,
      fetchWithApiKeyFallback,
    });

    if (!batchResult.ok) {
      return batchResult;
    }

    allVideos.push(...batchResult.payload.videoData);
    nextPageToken = batchResult.payload.nextPageToken;
  } while (nextPageToken);

  return {
    ok: true,
    status: 200,
    payload: allVideos,
  };
}

export async function GET(request) {
  try {
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
    const mode = searchParams.get("mode") || "full";
    const pageToken = searchParams.get("pageToken") || "";
    const start = parseInt(searchParams.get("start")) || 1;
    const end = parseInt(searchParams.get("end"));
    const apiKeys = getApiKeys();

    if (!id) {
      return Response.json(
        {
          status: 400,
          message: errorMessages[400] || "Missing playlist id",
        },
        {
          status: 400,
          headers: buildCorsHeaders(request),
        }
      );
    }

    if (!apiKeys.length) {
      return Response.json(
        {
          status: 500,
          message: "API key not configured",
        },
        {
          status: 500,
          headers: buildCorsHeaders(request),
        }
      );
    }

    const fetchWithApiKeyFallback = createFetchWithApiKeyFallback(apiKeys);

    if (mode === "playlist") {
      const metadataResult = await fetchPlaylistMetadata(
        id,
        fetchWithApiKeyFallback
      );

      if (!metadataResult.ok) {
        return Response.json(
          {
            status: metadataResult.status,
            message:
              errorMessages[metadataResult.status] ||
              "Unable to load playlist metadata.",
          },
          {
            status: metadataResult.status,
            headers: buildCorsHeaders(request),
          }
        );
      }

      return Response.json(metadataResult.payload, {
        status: 200,
        headers: buildCorsHeaders(request),
      });
    }

    if (mode === "batch") {
      const batchResult = await fetchPlaylistBatch({
        id,
        pageToken,
        fetchWithApiKeyFallback,
      });

      if (!batchResult.ok) {
        return Response.json(
          {
            status: batchResult.status,
            message: errorMessages[batchResult.status] || "Unexpected error",
          },
          {
            status: batchResult.status,
            headers: buildCorsHeaders(request),
          }
        );
      }

      return Response.json(batchResult.payload, {
        status: 200,
        headers: buildCorsHeaders(request),
      });
    }

    const metadataResult = await fetchPlaylistMetadata(
      id,
      fetchWithApiKeyFallback
    );
    if (!metadataResult.ok) {
      return Response.json(
        {
          status: metadataResult.status,
          message:
            errorMessages[metadataResult.status] ||
            "Unable to load playlist metadata.",
        },
        {
          status: metadataResult.status,
          headers: buildCorsHeaders(request),
        }
      );
    }

    const allVideosResult = await fetchAllVideos(id, fetchWithApiKeyFallback);
    if (!allVideosResult.ok) {
      return Response.json(
        {
          status: allVideosResult.status,
          message: errorMessages[allVideosResult.status] || "Unexpected error",
        },
        {
          status: allVideosResult.status,
          headers: buildCorsHeaders(request),
        }
      );
    }

    let updatedItems = allVideosResult.payload;
    if (end) {
      updatedItems = updatedItems.filter(
        (_item, index) => index >= start - 1 && index <= end - 1
      );
    } else if (start > 1) {
      updatedItems = updatedItems.filter((_item, index) => index >= start - 1);
    }

    return Response.json(
      {
        playlistData: metadataResult.payload.playlistData,
        videoData: updatedItems,
      },
      {
        status: 200,
        headers: buildCorsHeaders(request),
      }
    );
  } catch (error) {
    console.error("Unexpected error in details API:", error);
    return Response.json(
      {
        status: 500,
        message: "Internal server error. Please try again later.",
      },
      {
        status: 500,
        headers: buildCorsHeaders(new Request(request, { method: "GET" })),
      }
    );
  }
}