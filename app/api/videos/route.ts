import { NextRequest, NextResponse } from "next/server";

// Helper function to parse ISO 8601 duration format
function convertToSeconds(duration: string): number | null {
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

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const ids = searchParams.get("ids");

  if (!ids) {
    return NextResponse.json({ error: "Missing video IDs" }, { status: 400 });
  }

  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "API key not configured" },
      { status: 500 }
    );
  }

  try {
    // Fetch video details in a single request
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${ids}&key=${apiKey}`
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch video details" },
        { status: res.status }
      );
    }

    const data = await res.json();

    // Format the response
    const items = data.items.map(
      (item: {
        id: string;
        snippet?: {
          title?: string;
          thumbnails?: {
            medium?: { url: string };
            default?: { url: string };
          };
          channelTitle?: string;
          channelId?: string;
        };
        contentDetails?: { duration?: string };
        statistics?: {
          likeCount?: string;
          viewCount?: string;
          commentCount?: string;
        };
      }) => ({
        id: item.id,
        title: item.snippet?.title || "No Title",
        thumbnail:
          item.snippet?.thumbnails?.medium?.url ||
          item.snippet?.thumbnails?.default?.url ||
          null,
        channelTitle: item.snippet?.channelTitle || "Unknown Channel",
        channelId: item.snippet?.channelId || null,
        duration: convertToSeconds(item.contentDetails?.duration || ""),
        likes: item.statistics?.likeCount
          ? parseInt(item.statistics.likeCount)
          : null,
        views: item.statistics?.viewCount
          ? parseInt(item.statistics.viewCount)
          : null,
        comments: item.statistics?.commentCount
          ? parseInt(item.statistics.commentCount)
          : null,
      })
    );

    return NextResponse.json({ items });
  } catch (error) {
    console.error("Error fetching video details:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
