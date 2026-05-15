# MovieFlix

MovieFlix is a Netflix-inspired movie and TV discovery application built for my web developer portfolio. It uses React, Vite, Tailwind CSS, React Router, and the TMDB API to deliver a responsive streaming-style experience with dynamic movie, TV, cast, trailer, and recommendation data.

## Highlights

- Hero-style dark theme inspired by modern streaming platforms
- Horizontal movie and TV rows for quick browsing
- Smooth hover animations and interactive media cards
- Trailer playback using YouTube embeds from TMDB video data
- Movie and TV detail pages with metadata, cast, ratings, and release info
- Recommendations system for related movies and shows
- Search and discovery pages for movies, TV shows, and people
- Dynamic routing with readable slug-based URLs
- Responsive layout for desktop, tablet, and mobile

## Page Features

### Home Page

- Hero banner featuring highlighted content
- Trending movies and TV shows
- Popular movie and TV sections
- Provider-inspired rows such as Netflix, Disney Plus, and HBO Max
- Horizontal scrolling rows with reusable media cards

### Movie & TV Details

- Backdrop, poster, title, overview, rating, runtime, genres, and release date
- Trailer playback when official video data is available
- Cast section with actor profile links
- "More Like This" recommendations powered by TMDB
- SEO metadata with `react-helmet-async`

### Search & Browse

- Search for movies, TV shows, and cast members
- Browse content by category, genre, year, and region
- Load-more support for larger result sets
- Dynamic route handling for category and discovery pages

### Person Pages

- Actor profile details, biography, birthday, birthplace, and known-for info
- Filmography section
- Cast member news powered by a Netlify serverless function and GNews API

## API Endpoints Used

MovieFlix uses TMDB endpoints for:

- `/trending/movie/week`
- `/trending/tv/week`
- `/movie/popular`
- `/tv/popular`
- `/movie/now_playing`
- `/discover/movie`
- `/discover/tv`
- `/{mediaType}/{id}`
- `/{mediaType}/{id}/videos`
- `/{mediaType}/{id}/credits`
- `/{mediaType}/{id}/recommendations`
- `/person/{id}`
- `/person/{id}/combined_credits`
- `/search/multi`

The app also uses a Netlify serverless function:

- `netlify/functions/person-news.js` - fetches person news from GNews

## UI / Design System

- Netflix-inspired dark interface
- Red accent color for key actions and active states
- Tailwind CSS utility-first styling
- Responsive spacing, image sizing, and layout behavior
- Reusable card, row, banner, details, and layout components
- Hover states, transitions, and visual feedback for interactive elements

## Responsiveness

MovieFlix is designed to work across:

- Desktop
- Tablet
- Mobile

Responsive behavior includes adaptive grids, scrollable content rows, mobile-friendly navigation, fluid images, and adjusted spacing for smaller screens.

## Reusable Components

- `HeroBanner` - featured hero content
- `MediaRow` and `Top20Row` - horizontal browsing rows
- `MediaCard` - movie and TV card display
- `SectionBlock` - grouped content sections
- `CastSection` and `CastCard` - cast display
- `FilmographySection` - actor credits
- `PersonNewsSection` - cast member news
- `Navbar` and `Footer` - shared layout
- `Loader`, `ErrorMessage`, and `RegionBadge` - UI helpers

## Performance Considerations

- Reusable components reduce duplicated UI logic
- API calls are organized through service modules
- Images use TMDB image sizes appropriate for cards and detail pages
- Route-based pages avoid loading unrelated views
- Load-more behavior prevents rendering too many results at once
- Vite provides fast local development and optimized production builds

## Tech Stack

- React 19
- Vite 4
- Tailwind CSS 4
- React Router DOM 7
- react-helmet-async
- Netlify Functions
- TMDB API
- GNews API

## Environment Variables

Create a `.env` file in the project root:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key_here
GNEWS_API_KEY=your_gnews_api_key_here
```

Do not commit real API keys.

## Getting Started

```bash
npm install
npm run dev
```

Open the local URL shown in the terminal.

## Build

```bash
npm run build
npm run preview
```

## Main Routes

- `/` - Home
- `/search` - Search and discovery
- `/watch/movies` - Popular movies
- `/watch/tv` - Popular TV shows
- `/browse/:category` - Browse category pages
- `/watch/:slug/:mediaType/:id` - Movie or TV details
- `/watch/:slug/:id` - Person profile

## Current Project Status

- Fully functional locally
- Stable UI
- Dynamic routing working
- Recommendations system complete
- Trailer system integrated
- Git setup in progress
- Search and advanced discovery improving
- Continue Watching feature planned
- Authentication planned

## Upcoming Features

- Search improvements
- Watchlist system
- User authentication
- Firebase integration
- Video player UI
- Infinite scrolling
- Skeleton loaders
- Better animations
- Genre pages
- Region filtering
- Trending by country
- Dark/light theme support

## Contributing

Contributions, ideas, and suggestions are welcome.

1. Fork the repository
2. Create a new branch
3. Commit your changes
4. Open a pull request

## License

This project is for educational and portfolio purposes.

TMDB API is used for movie metadata and media assets.

## Author

Allen Uy  
GitHub: [@JustWorkIT](https://github.com/JustWorkIT)
