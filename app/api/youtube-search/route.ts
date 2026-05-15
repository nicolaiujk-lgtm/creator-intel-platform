import { NextResponse } from "next/server";

type YouTubeSearchItem = {
  id?: {
    channelId?: string;
  };
};

type YouTubeChannelItem = {
  id: string;
  snippet?: {
    title?: string;
    description?: string;
    thumbnails?: {
      default?: { url?: string };
      medium?: { url?: string };
      high?: { url?: string };
    };
  };
  statistics?: {
    subscriberCount?: string;
    viewCount?: string;
    videoCount?: string;
    hiddenSubscriberCount?: boolean;
  };
};

function formatNumber(value?: string) {
  if (!value) return "未公开";
  const number = Number(value);
  if (!Number.isFinite(number)) return "未公开";

  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1
  }).format(number);
}

function getAverageViews(viewCount?: string, videoCount?: string) {
  const views = Number(viewCount ?? 0);
  const videos = Number(videoCount ?? 0);
  if (!Number.isFinite(views) || !Number.isFinite(videos) || videos <= 0) return "暂未提供";

  return formatNumber(String(Math.round(views / videos)));
}

export async function GET(request: Request) {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.trim();

  if (!apiKey) {
    return NextResponse.json(
      { error: "Missing YOUTUBE_API_KEY environment variable." },
      { status: 500 }
    );
  }

  if (!query) {
    return NextResponse.json({ creators: [] });
  }

  try {
    const searchUrl = new URL("https://www.googleapis.com/youtube/v3/search");
    searchUrl.searchParams.set("part", "snippet");
    searchUrl.searchParams.set("type", "channel");
    searchUrl.searchParams.set("maxResults", "10");
    searchUrl.searchParams.set("q", query);
    searchUrl.searchParams.set("key", apiKey);

    const searchResponse = await fetch(searchUrl, {
      next: { revalidate: 300 }
    });

    if (!searchResponse.ok) {
      const errorText = await searchResponse.text();
      return NextResponse.json(
        { error: "YouTube channel search failed.", details: errorText },
        { status: searchResponse.status }
      );
    }

    const searchData = (await searchResponse.json()) as { items?: YouTubeSearchItem[] };
    const channelIds = Array.from(
      new Set(searchData.items?.map((item) => item.id?.channelId).filter(Boolean) as string[])
    );

    if (channelIds.length === 0) {
      return NextResponse.json({ creators: [] });
    }

    const channelsUrl = new URL("https://www.googleapis.com/youtube/v3/channels");
    channelsUrl.searchParams.set("part", "snippet,statistics");
    channelsUrl.searchParams.set("id", channelIds.join(","));
    channelsUrl.searchParams.set("key", apiKey);

    const channelsResponse = await fetch(channelsUrl, {
      next: { revalidate: 300 }
    });

    if (!channelsResponse.ok) {
      const errorText = await channelsResponse.text();
      return NextResponse.json(
        { error: "YouTube channel details lookup failed.", details: errorText },
        { status: channelsResponse.status }
      );
    }

    const channelsData = (await channelsResponse.json()) as { items?: YouTubeChannelItem[] };
    const creators = (channelsData.items ?? []).map((channel) => {
      const subscriberCount = channel.statistics?.hiddenSubscriberCount
        ? "未公开"
        : formatNumber(channel.statistics?.subscriberCount);

      return {
        channelTitle: channel.snippet?.title ?? "未命名频道",
        channelId: channel.id,
        profileImage:
          channel.snippet?.thumbnails?.high?.url ??
          channel.snippet?.thumbnails?.medium?.url ??
          channel.snippet?.thumbnails?.default?.url ??
          "",
        subscriberCount,
        description: channel.snippet?.description ?? "",
        channelUrl: `https://www.youtube.com/channel/${channel.id}`,
        averageViews: getAverageViews(channel.statistics?.viewCount, channel.statistics?.videoCount)
      };
    });

    return NextResponse.json({ creators });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Unexpected YouTube API error.",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
