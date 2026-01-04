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
  thumbnail: string | null;
  channelTitle: string;
  channelId: string | null;
  totalDuration?: string;
};

type PlayListData = {
  id: string;
  title: string;
  channelId: string | null;
  channelTitle: string;
  thumbnail: string | null;
  totalVideos?: number;
  totalDuration?: number;
};

type Playlist = {
  id: string;
  title: string;
  channelTitle: string;
  thumbnail: string;
  channelId: string;
};

type AnnouncementType = {
  id: number;
  message: string;
  enabled: boolean;
};

type UploadedPlaylistData = {
  id: string;
  title: string;
  thumbnail: string | null;
  channelTitle: string;
  channelId: string | null;
  totalVideos: number;
  totalDuration: number;
};

type UploadedVideoData = {
  id: string;
  title: string;
  thumbnail: string;
  channelTitle: string;
  channelId: string | null;
  publishedAt: string;
  position: number;
  duration: number | null;
  likes: number | null;
  views: number | null;
  comments: number | null;
};

export type {
  VideoData,
  PlayListData,
  PlaylistCard,
  Playlist,
  AnnouncementType,
  UploadedPlaylistData,
  UploadedVideoData,
};
