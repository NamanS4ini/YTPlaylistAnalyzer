# YouTube Playlist Analyzer

A powerful web application to analyze YouTube playlists with detailed statistics, sorting capabilities, and playback speed calculations. Get comprehensive insights into any public YouTube playlist before you start watching.

## Features

### Playlist Analysis

- **Total Duration Calculation** - See the complete playlist length with accurate duration
- **Video Count** - Track the total number of videos in the playlist
- **Range Selection** - Analyze specific portions of playlists by setting start and end video positions
- **Playlist Information** - View playlist title, channel details, and thumbnail

### Statistics and Metrics

- **Aggregate Stats** - Total likes, views, comments across all videos
- **Average Metrics** - Calculate average duration, likes, views, and comments per video
- **Per-Video Details** - Individual statistics for each video including duration, likes, views, and comments

### Sorting Options

Sort playlist videos by multiple criteria:

- Duration (longest to shortest)
- Views (most to least)
- Likes (most to least)
- Comments (most to least)
- Publish Date (newest or oldest)
- Title (alphabetical)
- Original Position

### Playback Speed Calculator

Calculate watch time at different speeds:

- Normal speed (1x)
- 1.25x speed
- 1.5x speed
- 2x speed
- Custom speed options

### User Interface

- **Dark Mode** - Modern dark theme optimized for viewing
- **Responsive Design** - Fully mobile-friendly interface
- **Thumbnail Toggle** - Show or hide video thumbnails to reduce data usage
- **Bookmark System** - Save playlists locally for quick access later
- **Privacy-Focused** - All bookmarks and settings stored locally on your device

## Tech Stack

- **Framework** - [Next.js](https://nextjs.org/) with TypeScript
- **Styling** - [Tailwind CSS](https://tailwindcss.com/)
- **UI Components** - [shadcn/ui](https://ui.shadcn.com/)
- **Icons** - [Lucide React](https://lucide.dev/)
- **API** - [YouTube Data API v3](https://developers.google.com/youtube/v3)
- **Hosting** - [Vercel](https://vercel.com)

## Local Development

### Prerequisites

- Node.js (v18 or higher)
- YouTube Data API Key

### Installation

Clone the repository:

```bash
git clone https://github.com/NamanS4ini/YTPlaylistLength
cd YTPlaylistLength
```

Install dependencies:

```bash
npm install
```

Create a `.env.local` file in the root directory:

```env
API_KEY=your_youtube_api_key
WEBSITE_LINK=http://localhost:3000
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## How It Works

1. Paste a YouTube playlist URL
2. Optionally set a video range (start and end positions)
3. Click "Analyze Playlist"
4. View comprehensive statistics and metrics
5. Sort videos by your preferred criteria
6. Calculate watch time at different speeds
7. Bookmark for quick access later

## API Routes

- `/api/details` - Fetches detailed playlist and video information
- `/api/extention` - Lightweight endpoint for browser extension support

## Privacy

This application prioritizes user privacy:

- No user accounts or authentication required
- No data sent to external servers (except YouTube API)
- Bookmarks and preferences stored locally in browser
- No tracking or analytics

## Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Make your changes
4. Commit your changes (`git commit -am 'Add new feature'`)
5. Push to the branch (`git push origin feature/improvement`)
6. Open a Pull Request

### Reporting Issues

Found a bug or have a suggestion? [Open an issue](https://github.com/NamanS4ini/YTPlaylistLength/issues) on GitHub.

## Live Demo

Visit the live application: [ytpla.in](https://ytpla.in)
