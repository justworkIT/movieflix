import { Helmet } from 'react-helmet-async'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import MediaCard from '../components/Media/MediaCard'

import {
  getTrendingMovies,
  getTrendingTVShows,
  getPopularMovies,
  getPopularTVShows,
  getNowPlayingMovies,
  getNetflixOriginalMovies,
  getDisneyPlusMovies,
  gethbomaxMovies,
} from '../services/tmdb'

const BROWSE_CONFIG = {
  'trending-movies': {
    title: 'Top Movies of the Week',
    mediaType: 'movie',
    fetcher: getTrendingMovies,
  },
  'trending-tv': {
    title: 'Top TV Shows of the Week',
    mediaType: 'tv',
    fetcher: getTrendingTVShows,
  },
  'in-cinema': {
    title: 'In Cinema',
    mediaType: 'movie',
    fetcher: getNowPlayingMovies,
  },
  'netflix-originals': {
    title: 'Netflix Originals',
    mediaType: 'movie',
    fetcher: getNetflixOriginalMovies,
  },
  'disney-plus': {
    title: 'Disney Plus Movies',
    mediaType: 'movie',
    fetcher: getDisneyPlusMovies,
  },
  'hbo-max': {
    title: 'HBO Max Movies',
    mediaType: 'movie',
    fetcher: gethbomaxMovies,
  },
  'popular-movies': {
    title: 'Popular Movies',
    mediaType: 'movie',
    fetcher: getPopularMovies,
  },
  'popular-tv': {
    title: 'Popular TV Shows',
    mediaType: 'tv',
    fetcher: getPopularTVShows,
  },
}

export default function BrowsePage() {
  const { category } = useParams()
  const config = BROWSE_CONFIG[category]

  const [items, setItems] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)

  useEffect(() => {
    async function loadInitial() {
      try {
        setLoading(true)

        const data = await config.fetcher(1)

        setItems(
          data.map((item) => ({
            ...item,
            media_type: item.media_type || config.mediaType,
          }))
        )
        setPage(1)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    if (config) loadInitial()
  }, [category, config])

  async function loadMore() {
    try {
      setLoadingMore(true)

      const nextPage = page + 1
      const data = await config.fetcher(nextPage)

      setItems((prev) => [
        ...prev,
        ...data.map((item) => ({
          ...item,
          media_type: item.media_type || config.mediaType,
        })),
      ])

      setPage(nextPage)
    } catch (error) {
      console.error(error)
    } finally {
      setLoadingMore(false)
    }
  }

  if (!config) {
    return (
      <main className="min-h-screen bg-[#0A0C12] px-6 pt-28 text-white md:px-12">
        Category not found.
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#0A0C12] px-6 pt-28 pb-12 text-white md:px-12">
      <Helmet>
        <title>{config.title} | MovieFlix</title>
      </Helmet>

      <h1 className="mb-8 text-3xl font-bold md:text-5xl">{config.title}</h1>

      {loading ? (
        <p className="text-sm text-zinc-400">Loading...</p>
      ) : (
        <>
          <div className="flex flex-wrap gap-3 sm:gap-4">
            {items.map((item) => (
              <MediaCard
                key={`${item.media_type}-${item.id}`}
                item={item}
                mediaType={item.media_type}
              />
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={loadMore}
              disabled={loadingMore}
              className="rounded bg-red-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loadingMore ? 'Loading...' : 'Load More'}
            </button>
          </div>
        </>
      )}
    </main>
  )
}