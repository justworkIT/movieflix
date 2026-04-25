import { Helmet } from 'react-helmet-async'
import { useEffect, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import {
  POSTER_BASE_URL,
  MOVIE_GENRES,
  TV_GENRES,
  searchMovies,
  searchTV,
  searchPeople,
  discoverByYear,
  discoverByGenre,
} from '../services/tmdb'
import RegionBadge from '../components/ui/RegionBadge'
import MediaCard from '../components/Media/MediaCard'

function splitResultsByMediaType(results = []) {
  const movies = results.filter(
    (item) => item.media_type === 'movie' || (!item.media_type && item.title)
  )
  const tvShows = results.filter(
    (item) => item.media_type === 'tv' || (!item.media_type && item.name)
  )

  return { movies, tvShows }
}

function getYearFromSlug(slug = '') {
  return slug.match(/\d{4}/)?.[0] || ''
}

export default function SearchPage() {
  const [searchParams] = useSearchParams()
  const { slug, genreId } = useParams()

  const queryYear = searchParams.get('year')
  const queryGenre = searchParams.get('genre')

  const routeYear = slug?.includes('movies-and-tv-shows')
    ? getYearFromSlug(slug)
    : ''

  const year = queryYear || routeYear
  const genre = queryGenre || genreId || ''
  const genreName = genre
    ? MOVIE_GENRES[genre] || TV_GENRES[genre] || 'Genre'
    : ''

  const pageTitle = year
    ? `${year} Movies & TV Shows`
    : genre
      ? `${genreName} Results`
      : 'Search'

  const [query, setQuery] = useState('')

  const [movieResults, setMovieResults] = useState([])
  const [tvResults, setTvResults] = useState([])
  const [castResults, setCastResults] = useState([])

  const [moviePage, setMoviePage] = useState(1)
  const [tvPage, setTvPage] = useState(1)
  const [castPage, setCastPage] = useState(1)

  const [hasMoreMovies, setHasMoreMovies] = useState(false)
  const [hasMoreTV, setHasMoreTV] = useState(false)
  const [hasMoreCast, setHasMoreCast] = useState(false)

  const [loading, setLoading] = useState(false)
  const [loadingMoreType, setLoadingMoreType] = useState('')

  const hasResults =
    movieResults.length > 0 || tvResults.length > 0 || castResults.length > 0

  const hasSearched = query.trim() || year || genre

  useEffect(() => {
    if (year || genre) setQuery('')
  }, [year, genre])

  useEffect(() => {
    setMoviePage(1)
    setTvPage(1)
    setCastPage(1)
    setHasMoreMovies(false)
    setHasMoreTV(false)
    setHasMoreCast(false)
  }, [query, year, genre])

  useEffect(() => {
    if (query.trim()) return

    async function loadFilteredResults() {
      try {
        setLoading(true)
        setMovieResults([])
        setTvResults([])
        setCastResults([])

        if (year) {
          const data = await discoverByYear(year, 1)

          const { movies, tvShows } = splitResultsByMediaType(data)

          setMovieResults(movies)
          setTvResults(tvShows)
          setCastResults([])

          setHasMoreMovies(movies.length > 0)
          setHasMoreTV(tvShows.length > 0)
          setHasMoreCast(false)

          return
        }

if (genre) {
  const [movies, tvShows] = await Promise.all([
    discoverByGenre('movie', genre, 1),
    discoverByGenre('tv', genre, 1),
  ])

  setMovieResults(movies)
  setTvResults(tvShows)
  setCastResults([])

  setHasMoreMovies(movies.length > 0)
  setHasMoreTV(tvShows.length > 0)
  setHasMoreCast(false)

  return
}

        setMovieResults([])
        setTvResults([])
        setCastResults([])
      } catch (error) {
        console.error(error)
        setMovieResults([])
        setTvResults([])
        setCastResults([])
      } finally {
        setLoading(false)
      }
    }

    loadFilteredResults()
  }, [year, genre, query])

  useEffect(() => {
    if (!query.trim()) return

    const timer = setTimeout(async () => {
      try {
        setLoading(true)

        const [movies, tvShows, people] = await Promise.all([
          searchMovies(query, 1),
          searchTV(query, 1),
          searchPeople(query, 1),
        ])

        setMovieResults(movies)
        setTvResults(tvShows)
        setCastResults(people)

        setHasMoreMovies(movies.length > 0)
        setHasMoreTV(tvShows.length > 0)
        setHasMoreCast(people.length > 0)
      } catch (error) {
        console.error(error)
        setMovieResults([])
        setTvResults([])
        setCastResults([])
      } finally {
        setLoading(false)
      }
    }, 400)

    return () => clearTimeout(timer)
  }, [query])

  async function loadMoreMovies() {
    try {
      setLoadingMoreType('movie')

      const nextPage = moviePage + 1

      const data = query.trim()
        ? await searchMovies(query, nextPage)
        : year
          ? splitResultsByMediaType(await discoverByYear(year, nextPage)).movies
          : genre
            ? await discoverByGenre('movie', genre, nextPage)
            : []

      setMovieResults((prev) => [...prev, ...data])
      setMoviePage(nextPage)
      setHasMoreMovies(data.length > 0)
    } catch (error) {
      console.error(error)
    } finally {
      setLoadingMoreType('')
    }
  }

  async function loadMoreTV() {
    try {
      setLoadingMoreType('tv')

      const nextPage = tvPage + 1

      const data = query.trim()
        ? await searchTV(query, nextPage)
        : year
          ? splitResultsByMediaType(await discoverByYear(year, nextPage)).tvShows
          : genre
            ? await discoverByGenre('tv', genre, nextPage)
            : []

      setTvResults((prev) => [...prev, ...data])
      setTvPage(nextPage)
      setHasMoreTV(data.length > 0)
    } catch (error) {
      console.error(error)
    } finally {
      setLoadingMoreType('')
    }
  }

  async function loadMoreCast() {
    try {
      setLoadingMoreType('cast')

      const nextPage = castPage + 1
      const data = query.trim() ? await searchPeople(query, nextPage) : []

      setCastResults((prev) => [...prev, ...data])
      setCastPage(nextPage)
      setHasMoreCast(data.length > 0)
    } catch (error) {
      console.error(error)
    } finally {
      setLoadingMoreType('')
    }
  }

  return (
    <main className="min-h-screen bg-[#141414] px-6 pt-28 pb-12 text-white md:px-12">
      <Helmet>
        <title>{pageTitle} | MovieFlix</title>
        <meta
          name="description"
          content="Search movies, TV shows, and cast members on MovieFlix."
        />
      </Helmet>

      <h1 className="mb-6 text-3xl font-bold md:text-5xl">{pageTitle}</h1>

      <input
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search movies, TV shows, or cast..."
        autoFocus
        className="mb-8 w-full rounded-md border border-white/10 bg-white/10 px-4 py-3 text-white outline-none placeholder:text-zinc-400 focus:border-red-600"
      />

      {loading && !hasResults ? (
        <p className="text-sm text-zinc-400">Searching...</p>
      ) : null}

      {!loading && hasSearched && !hasResults ? (
        <p className="text-sm text-zinc-400">No results found.</p>
      ) : null}

      <SearchResultSection
        title="Movies"
        items={movieResults}
        mediaType="movie"
        hasMore={hasMoreMovies}
        onLoadMore={loadMoreMovies}
        loadingMore={loadingMoreType === 'movie'}
      />

      <SearchResultSection
        title="TV Shows"
        items={tvResults}
        mediaType="tv"
        hasMore={hasMoreTV}
        onLoadMore={loadMoreTV}
        loadingMore={loadingMoreType === 'tv'}
      />

      <SearchResultSection
        title="Cast"
        items={castResults}
        mediaType="person"
        hasMore={hasMoreCast}
        onLoadMore={loadMoreCast}
        loadingMore={loadingMoreType === 'cast'}
      />
    </main>
  )
}

function SearchResultSection({
  title,
  items,
  mediaType,
  hasMore,
  onLoadMore,
  loadingMore,
}) {
  if (!items.length) return null

  const visibleItems = items.filter((item) =>
    mediaType === 'person' ? item.profile_path : item.poster_path
  )

  if (!visibleItems.length) return null

  return (
    <section className="mb-10">
      <h2 className="mb-0 text-2xl font-bold">
        {title}
      </h2>
      <div className="h-px flex-1 bg-gradient-to-r from-white/80 to-30" />
      <div className="mt-2 flex flex-wrap gap-2">
        {visibleItems.map((item) => (
          <MediaCard
            key={item.id}
            item={item}
            mediaType={item.media_type || mediaType}
          />
        ))}
      </div>

      {hasMore ? (
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={onLoadMore}
            disabled={loadingMore}
            className="rounded bg-red-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loadingMore
              ? 'Loading...'
              : `Load More`}
          </button>
        </div>
      ) : null}
    </section>
  )
}

