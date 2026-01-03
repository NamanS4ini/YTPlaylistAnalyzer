import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

const errorMessages: Record<number, string> = {
  400: "Bad Request - Please verify the playlist type and range parameters.",
  401: "Unauthorized - Please sign in to access this playlist.",
  403: "Forbidden - API quota might be exhausted or you don't have access to this playlist.",
  404: "Not Found - The playlist might be empty or doesn't exist.",
  500: "Internal Server Error - Please try again later.",
};

// Helper function to parse ISO 8601 duration format
function convertToSeconds(duration: string | null): number | null {
  if (!duration) return null;

  const match = duration.match(
    /P(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?)?/
  );

  if (!match) return null;

  const days = parseInt(match[1] || "0");
  const hours = parseInt(match[2] || "0");
  const minutes = parseInt(match[3] || "0");
  const seconds = parseInt(match[4] || "0");

  return days * 86400 + hours * 3600 + minutes * 60 + seconds;
}

// Helper function to get playlist ID based on type
function getPlaylistId(type: string): string {
  switch (type) {
    case "WL": // Watch Later
      return "WL";
    case "LL": // Liked Videos
      return "LL";
    default:
      return type; // Return as-is for other special playlists
  }
}

export async function GET(request: NextRequest) {
  try {
    // Get authenticated session
    const session = await auth();
    console.log(session?.accessToken);
    if (!session?.accessToken) {
      return NextResponse.json(
        {
          status: 401,
          message: errorMessages[401],
        },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type") || "WL"; // Default to Watch Later
    const start = parseInt(searchParams.get("start") || "1");
    const end = parseInt(searchParams.get("end") || "5000");

    const playlistId = getPlaylistId(type);
    const accessToken = session.accessToken;

    // Fetch initial playlist items using user's access token
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=50`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      return NextResponse.json(
        {
          status: res.status,
          message:
            error.error?.message ||
            errorMessages[res.status] ||
            "Unexpected error",
        },
        { status: res.status }
      );
    }

    // Fetch all playlist items (handle pagination)
    const playlistData = await res.json();
    let nextPageToken = playlistData.nextPageToken;

    while (nextPageToken) {
      const res2 = await fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=50&pageToken=${nextPageToken}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const playlistData2 = await res2.json();
      playlistData.items.push(...playlistData2.items);
      nextPageToken = playlistData2.nextPageToken || null;
    }

    // Extract and format basic video data
    const items = playlistData.items.map((item: any) => {
      return {
        id: item.snippet?.resourceId?.videoId || null,
        title: item.snippet?.title || "No Title",
        thumbnail:
          item.snippet?.thumbnails?.standard?.url ||
          item.snippet?.thumbnails?.high?.url ||
          item.snippet?.thumbnails?.medium?.url ||
          item.snippet?.thumbnails?.default?.url ||
          null,
        channelTitle:
          item.snippet?.videoOwnerChannelTitle ||
          item.snippet?.channelTitle ||
          "Unknown Channel",
        channelId:
          item.snippet?.videoOwnerChannelId || item.snippet?.channelId || null,
        publishedAt: item.snippet?.publishedAt || null,
        position: item.snippet?.position ?? null,
        duration: null,
        likes: null,
        views: null,
        comments: null,
      };
    });

    // Prepare video IDs in batches of 50
    const videoIds = items.map((item: any) => item.id).filter(Boolean);
    const batchSize = 50;
    const batches: string[] = [];

    for (let i = 0; i < videoIds.length; i += batchSize) {
      batches.push(videoIds.slice(i, i + batchSize).join(","));
    }

    // Use API key for video details (doesn't require authentication)
    const apiKey = process.env.API_KEY;

    // Fetch video details (duration and statistics) in parallel
    const details = await Promise.all(
      batches.map(async (ids) => {
        const [contentRes, statsRes] = await Promise.all([
          fetch(
            `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${ids}&key=${apiKey}`
          ),
          fetch(
            `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${ids}&key=${apiKey}`
          ),
        ]);

        const contentData = await contentRes.json();
        const statsData = await statsRes.json();

        return contentData.items.map((item: any) => {
          const statsItem = statsData.items.find((s: any) => s.id === item.id);
          const duration = item.contentDetails?.duration || null;
          const seconds = convertToSeconds(duration);

          return {
            id: item.id,
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
    let updatedItems = items.map((item: any) => {
      const detailItem = flattenedDetails.find((d: any) => d.id === item.id);
      if (detailItem) {
        return {
          ...item,
          duration: detailItem.duration,
          likes: parseInt(detailItem.likes) || null,
          views: parseInt(detailItem.views) || null,
          comments: parseInt(detailItem.comments) || null,
        };
      }
      return item;
    });

    // Filter out videos without duration and apply range
    updatedItems = updatedItems.filter((item: any) => item.duration !== null);

    if (end) {
      updatedItems = updatedItems.filter(
        (item: any, index: number) => index >= start - 1 && index <= end - 1
      );
    } else if (start > 1) {
      updatedItems = updatedItems.filter(
        (item: any, index: number) => index >= start - 1
      );
    }

    // Create playlist details for special playlists
    const playlistDetails = {
      id: playlistId,
      title:
        type === "WL"
          ? "Watch Later"
          : type === "LL"
            ? "Liked Videos"
            : "My Playlist",
      channelId: session.user?.email || null,
      channelTitle: session.user?.name || "My Channel",
      thumbnail: session.user?.image || null,
    };

    return NextResponse.json(
      {
        playlistData: playlistDetails,
        videoData: updatedItems,
      },
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching special playlist:", error);
    return NextResponse.json(
      {
        status: 500,
        message: errorMessages[500],
      },
      { status: 500 }
    );
  }
}
