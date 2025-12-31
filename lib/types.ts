type VideoData = {
  id: string;
  title: string;
  thumbnail?: string;
  channelTitle?: string;
  channelId?: string;
  duration: string | null;
  publishedAt: string;
  position: number;
  views: number | null;
  likes: number | null;
  comments: number | null;
};

type PlaylistCard = {
  id: string;
  title: string;
  thumbnail: string;
  channelTitle: string;
  channelId: string;
  totalDuration?: string;
};

type PlayListData = {
  id: string;
  title: string;
  channelId: string;
  channelTitle: string;
  thumbnail: string;
};

type Playlist = {
  id: string;
  title: string;
  channelTitle: string;
  thumbnail: string;
  channelId: string;
};

export type { VideoData, PlayListData, PlaylistCard, Playlist };
