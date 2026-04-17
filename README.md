# YouTube Playlist Analyzer

YouTube Playlist Analyzer is a Next.js app for inspecting public playlists, signed-in Liked Videos, and Google Takeout playlist exports. It focuses on fast local filtering, rich statistics, and a settings-driven interface that users can tailor to their workflow.

## ✨ Features

### 📊 Playlist Analysis

- Analyze any public YouTube playlist from a URL.
- View playlist title, channel details, thumbnail, total videos, and total duration.
- Slice the displayed playlist with a draggable range control and Start/End inputs.
- Use the full playlist length as the range boundary instead of a fixed cap.
- Filter locally without refetching every time the range changes.
- Keep the browser URL in sync with the current range without causing a reload.

### 📈 Statistics and Metrics

- See aggregate views, likes, comments, and duration summaries.
- Inspect per-video details with hoverable values and clean cards.
- Sort by position, views, likes, duration, comments, or publish date.
- Reverse sort order with one click.
- Review watch-time estimates at multiple playback speeds.

### 🎛️ Custom Controls

- Toggle thumbnails on or off.
- Change how many recent playlists appear on the home page.
- Show or hide home page sections such as Recent Playlists, Need Help, and the footer.
- Adjust cache expiration from the settings page.
- Control navbar visibility and style from the settings page.
- Keep navigation choices persistent in local storage.

### 🧭 Navigation

- Choose between different navbar layouts, including icon, text, and compact display modes.
- Show or hide individual navbar items.
- Automatically hide the More menu when there are no extra links to show.
- Keep the settings popover aware of the current page.
- Open the homepage settings button directly from the navbar.

### 💾 Saved Data

- Save playlists locally for quick access later.
- Automatically track recent playlists.
- Store user preferences in browser local storage.
- Keep playlist analysis responsive by separating full data from displayed data.

### 🔐 Authentication

- Sign in with Google to access your Liked Videos playlist.
- Sign out from the same navbar flow.
- Use secure session handling through NextAuth.
- Only require authentication when it is actually needed.

### 📦 Google Takeout

- Upload playlist CSV files exported from Google Takeout.
- Analyze Watch Later and private playlist exports locally.
- Reuse the same statistics and sorting tools on uploaded data.

### 🎨 Interface

- Use a dark, responsive layout that works on desktop and mobile.
- Keep cards, controls, and menus consistent across the app.
- Use modern shadcn/ui components for dialogs, switches, dropdowns, sliders, and tooltips.
- Improve navigation and analysis flows with polished but restrained motion.

## 🛠️ Tech Stack

- [Next.js 15](https://nextjs.org/) with the App Router and TypeScript
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [shadcn/ui](https://ui.shadcn.com/) for the component system
- [Lucide React](https://lucide.dev/) for icons
- [NextAuth v5](https://next-auth.js.org/) for Google authentication
- [YouTube Data API v3](https://developers.google.com/youtube/v3) for playlist data
- [wsrv.nl](https://wsrv.nl/) for thumbnail optimization
- [Vercel](https://vercel.com) for deployment

## 🚀 Local Development

### Prerequisites

- Node.js 18 or newer
- A YouTube Data API key
- Google OAuth credentials if you want to use the Liked Videos flow

### Setup

Clone the repository:

```bash
git clone https://github.com/NamanS4ini/YTPlaylistAnalyzer
cd ytpla-Site
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the project root:

```env
API_KEY=your_youtube_api_key
WEBSITE_LINK=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_oauth_client_id
GOOGLE_SECRET=your_google_oauth_secret
AUTH_SECRET=your_nextauth_secret
```

Run the app locally:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## 📖 How It Works

### Public Playlists

1. Paste a YouTube playlist URL.
2. Load the playlist and review the summary.
3. Narrow the visible range using the slider or the Start and End fields.
4. Sort the videos as needed.
5. Review the playlist cards, statistics, and playback estimates.
6. Save the playlist if you want quick access later.

### Liked Videos

1. Open the sign-in flow from the navbar or the sign-in page.
2. Complete Google authentication.
3. Load your Liked Videos playlist.
4. Use the same filtering, sorting, and statistics tools.

### Google Takeout Uploads

1. Export your data from [Google Takeout](https://takeout.google.com).
2. Select the YouTube and YouTube Music playlists export.
3. Download and extract the archive.
4. Open the upload page and provide the CSV file.
5. Analyze the uploaded playlist with the same tools used for public playlists.

## 🔒 Privacy & Security

The app is designed to keep user data local whenever possible.

- Bookmarks, preferences, and cache settings are stored in the browser.
- No application database is used for playlist data.
- API calls are limited to the data needed for analysis.
- Authentication is handled through NextAuth sessions.
- The app follows Google API user data policy expectations.

For more details, see the [Privacy Policy](/privacy).

## 🤝 Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Make your changes with proper TypeScript types.
4. Test locally.
5. Open a pull request.

### Development Guidelines

- Match the existing code style and component structure.
- Prefer small, focused changes.
- Verify responsive behavior on mobile and desktop.
- Test authentication and settings flows after changes.

### Reporting Issues

If you find a bug or want to suggest an improvement, open an issue on GitHub.

## 📜 License

This project is open source and available under the MIT License.

## 🌐 Live Demo

Visit the live application at [ytpla.in](https://ytpla.in).

## 📧 Contact

Use the [feedback page](https://ytpla.in/feedback) or open an issue on GitHub for questions or feedback.
