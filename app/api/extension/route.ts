const errorMessages: Record<number, string> = {
  400: "Bad Request - Please verify the playlist ID and range parameters.",
  403: "Forbidden - API quota might be exhausted.",
  404: "Not Found - The playlist might be private or deleted.",
  500: "Internal Server Error - Please try again later.",
};

function getApiKeys(): string[] {
  return (process.env.API_KEY || "")
    .split(",")
    .map((key) => key.trim())
    .filter(Boolean);
}

function shouldTryNextApiKey(status: number): boolean {
  return status === 400 || status === 401 || status === 403 || status === 429;
}

function validateOrigin(req: Request) {
  const origin = req.headers.get("origin");
  const referer = req.headers.get("referer");

  // Allowed domains from env (comma separated)
  const allowedOrigins = (process.env.WEBSITE_LINK ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  // Quick allow for extension contexts or content scripts
  if (origin === null) return true; // content script fetch sometimes shows origin null
  if (origin.startsWith("chrome-extension://")) return true;
  if (origin.startsWith("moz-extension://")) return true;

  // Allow requests originating from youtube pages (content-script executed in page context)
  if (origin.includes("youtube.com")) return true;

  // Allow any env-listed origin (prod sites + localhost entries)
  if (allowedOrigins.some((o) => origin.startsWith(o))) return true;

  // Fallback: referer may contain a trusted host (some browsers set referer only)
  if (referer && allowedOrigins.some((o) => referer.startsWith(o))) return true;

  return false;
}

function corsHeaders(origin: string | null) {
  return {
    "Access-Control-Allow-Origin": origin ?? "*",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
}

export async function GET(req: Request) {
  if (!validateOrigin(req)) {
    return Response.json({ message: "Forbidden" }, { status: 403 });
  }
  const origin = req.headers.get("origin");
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
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

  const fetchWithApiKeyFallback = async (buildUrl: (key: string) => string) => {
    const orderedKeys = [
      currentApiKey,
      ...apiKeys.filter((key) => key !== currentApiKey),
    ];

    let lastResponse: Response | null = null;

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

    return lastResponse as Response;
  };
  // fetching the playlist data from youtube api
  const res = await fetchWithApiKeyFallback(
    (key) =>
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${id}&maxResults=50&key=${key}`
  );
  //   if the playlist data is not found then return the error message
  if (!res.ok) {
    return Response.json(
      {
        status: res.status,
        message: errorMessages[res.status] || "Unexpected error",
      },
      { status: res.status }
    );
  }
  //   if the playlist data is found then see if there is a next page token and fetch the next page data (yt by default returns 50 items)
  //   if there is a next page token then fetch the next page data and push it to the playlist data
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

  // Extract video IDs
  interface PlaylistItem {
    snippet: {
      resourceId: {
        videoId: string;
      };
    };
  }

  const videoIds = playlistData.items
    .map((item: PlaylistItem) => item.snippet.resourceId.videoId)
    .filter(Boolean);

  // Fetch video durations in batches (max 50 per request)
  let totalSeconds = 0;
  const batchSize = 50;

  for (let i = 0; i < videoIds.length; i += batchSize) {
    const batch = videoIds.slice(i, i + batchSize);
    const videoRes = await fetchWithApiKeyFallback(
      (key) =>
        `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${batch.join(
          ","
        )}&key=${key}`
    );

    if (videoRes.ok) {
      interface VideoItem {
        contentDetails: {
          duration: string;
        };
      }

      const videoData = await videoRes.json();
      videoData.items.forEach((video: VideoItem) => {
        const duration = video.contentDetails.duration;
        totalSeconds += parseDuration(duration);
      });
    }
  }

  // Format duration
  const totalDuration = formatDuration(totalSeconds);

  // Fetch playlist details for title
  const playlistRes = await fetchWithApiKeyFallback(
    (key) =>
      `https://www.googleapis.com/youtube/v3/playlists?part=snippet&id=${id}&key=${key}`
  );

  let playlistTitle = "Unknown Playlist";
  if (playlistRes.ok) {
    const playlistInfo = await playlistRes.json();
    playlistTitle = playlistInfo.items[0]?.snippet?.title || "Unknown Playlist";
  }

  return Response.json(
    {
      id: id,
      title: playlistTitle,
      totalDuration: totalDuration,
      videoCount: videoIds.length,
      url: `https://ytpla.in/${id}`,
    },
    {
      status: 200,
      headers: corsHeaders(origin),
    }
  );
}

// Helper function to parse ISO 8601 duration format
function parseDuration(duration: string): number {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;

  const hours = parseInt(match[1] || "0");
  const minutes = parseInt(match[2] || "0");
  const seconds = parseInt(match[3] || "0");

  return hours * 3600 + minutes * 60 + seconds;
}

// Helper function to format seconds into readable duration
function formatDuration(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const parts = [];
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (seconds > 0 && hours === 0) parts.push(`${seconds}s`);

  return parts.join(" ") || "0s";
}
