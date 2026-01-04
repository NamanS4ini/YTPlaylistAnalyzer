# YouTube Playlist Analyzer

A powerful web application to analyze YouTube playlists with detailed statistics, sorting capabilities, and playback speed calculations. Get comprehensive insights into any public YouTube playlist, analyze your Liked Videos, or upload your Watch Later playlist from Google Takeout.

## ✨ Features

### 📊 Playlist Analysis

- **Total Duration Calculation** - See the complete playlist length with accurate duration
- **Video Count** - Track the total number of videos in the playlist
- **Range Selection** - Analyze specific portions of playlists (up to 5000 videos) by setting start and end video positions
- **Playlist Information** - View playlist title, channel details, and thumbnail
- **Liked Videos Support** - Sign in with Google to analyze your Liked Videos playlist
- **Google Takeout Upload** - Upload Watch Later and private playlists from Google Takeout CSV files

### 📈 Statistics and Metrics

- **Aggregate Stats** - Total likes, views, comments across all videos with gradient cards
- **Engagement Metrics** - Combined view and like counts with visual indicators
- **Per-Video Details** - Individual statistics for each video with hover tooltips showing exact values
- **Average Calculations** - Average duration per video
- **Playback Speed Analysis** - Watch time at 1.25x, 1.5x, 1.75x, 2x, and custom speeds

### 🔄 Sorting Options

Sort playlist videos by multiple criteria:

- **Position** - Original playlist order
- **Views** - Most to least viewed
- **Likes** - Most to least liked
- **Duration** - Longest to shortest
- **Comments** - Most to least commented
- **Publish Date** - Newest or oldest first
- **Reverse Order** - Toggle ascending/descending with one click

### 🎨 Modern UI/UX

- **Dark Theme** - Sleek dark mode optimized for extended viewing
- **Responsive Design** - Fully mobile-friendly interface with adaptive layouts
- **Thumbnail Toggle** - Show or hide video thumbnails to reduce data usage
- **Modern Video Cards** - Redesigned cards with gradient backgrounds and hover effects
- **Interactive Tooltips** - Hover over stats to see exact values (using shadcn tooltips)
- **Smooth Animations** - Polished transitions and micro-interactions
- **Equal Height Cards** - Consistent card heights for better visual alignment

### 💾 User Data Management

- **Bookmark System** - Save favorite playlists locally for quick access
- **Recent Playlists** - Automatically tracks your last 10 analyzed playlists
- **Local Storage** - All data stored locally on your device for privacy
- **CSV Upload** - Analyze playlists from Google Takeout (Watch Later, private playlists)

### 🔐 Authentication

- **Google OAuth** - Secure sign-in to access your Liked Videos
- **Token Management** - Access tokens handled securely with NextAuth
- **Optional Authentication** - Only required for Liked Videos playlist

## 🛠️ Tech Stack

- **Framework** - [Next.js 15](https://nextjs.org/) with App Router and TypeScript
- **Styling** - [Tailwind CSS](https://tailwindcss.com/) with custom gradients
- **UI Components** - [shadcn/ui](https://ui.shadcn.com/) (Card, Button, Input, Label, Switch, Toggle, Tooltip)
- **Icons** - [Lucide React](https://lucide.dev/)
- **Authentication** - [NextAuth v5](https://next-auth.js.org/) with Google Provider
- **API** - [YouTube Data API v3](https://developers.google.com/youtube/v3)
- **Image Optimization** - [wsrv.nl](https://wsrv.nl/) for thumbnail optimization
- **Hosting** - [Vercel](https://vercel.com)

## 🚀 Local Development

### Prerequisites

- Node.js (v18 or higher)
- YouTube Data API Key
- Google OAuth Credentials (for Liked Videos feature)

### Installation

Clone the repository:

```bash
git clone https://github.com/NamanS4ini/YTPlaylistAnalyzer
cd ytpla-Site
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the root directory:

```env
API_KEY=your_youtube_api_key
WEBSITE_LINK=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_oauth_client_id
GOOGLE_SECRET=your_google_oauth_secret
AUTH_SECRET=your_nextauth_secret
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

## 📖 How It Works

### Analyzing Public Playlists

1. Paste a YouTube playlist URL
2. Optionally set a video range (1-5000)
3. Click "Analyze Playlist"
4. View comprehensive statistics with modern gradient cards
5. Sort videos by various criteria with one-click reverse
6. Hover over stats to see exact values in tooltips
7. Calculate watch time at different speeds
8. Bookmark for quick access later

### Analyzing Liked Videos

1. Click "Sign In with Google" on the `/signin` page
2. Grant YouTube read-only permissions
3. Access your Liked Videos playlist automatically
4. All analysis features available

### Uploading Google Takeout

1. Export your data from [Google Takeout](https://takeout.google.com)
2. Select only "YouTube and YouTube Music" → "playlists"
3. Download and extract the ZIP file
4. Go to `/upload` page
5. Upload the CSV file for your playlist (e.g., "watch-later.csv")
6. Analyze with full statistics and sorting

## 🔒 Privacy & Security

This application prioritizes user privacy and complies with Google API policies:

- **Local Storage** - Bookmarks, preferences, and uploaded files stored only in browser
- **No Database** - No server-side data persistence
- **Minimal Data Collection** - Only necessary API calls to YouTube
- **Secure Authentication** - OAuth tokens handled by NextAuth with secure sessions
- **Google API Compliance** - Adheres to [Google API Services User Data Policy](https://developers.google.com/terms/api-services-user-data-policy)
- **Transparent Data Usage** - See [Privacy Policy](/privacy) for details

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Make your changes with proper TypeScript types
4. Test your changes locally
5. Commit your changes (`git commit -am 'Add new feature'`)
6. Push to the branch (`git push origin feature/improvement`)
7. Open a Pull Request

### Development Guidelines

- Follow the existing code style and component structure
- Use TypeScript with strict type checking
- Test authentication flows with Google OAuth
- Ensure responsive design on mobile devices
- Add proper error handling and user feedback

### Reporting Issues

Found a bug or have a suggestion? [Open an issue](https://github.com/NamanS4ini/YTPlaylistAnalyzer/issues) on GitHub.

## 📜 License

This project is open source and available under the MIT License.

## 🌐 Live Demo

Visit the live application: [ytpla.in](https://ytpla.in)

## 📧 Contact

For questions or feedback, use the [feedback page](https://ytpla.in/feedback) or open an issue on GitHub.
