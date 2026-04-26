import { Helmet } from 'react-helmet-async'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import RegionBadge from '../components/ui/RegionBadge'

import {
  POSTER_BASE_URL,
  getTrendingMovies,
  getTrendingTVShows,
  getPopularMovies,
  getPopularTVShows,
  getNowPlayingMovies,
  getNetflixOriginalMovies,
  getDisneyPlusMovies,
  gethbomaxMovies,
} from '../services/tmdb'
import { getDetailsPath } from '../utils/slugify'
import { getMediaMeta } from '../utils/mediaMeta'

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
          <div className="flex flex-wrap gap-3">
            {items.map((item) => {
              const title = item.title || item.name || 'Untitled'
              const imagePath = item.poster_path

              return (
                <Link
                  key={`${item.media_type}-${item.id}`}
                  to={getDetailsPath(item, item.media_type)}
                  className="group/card relative w-[150px] flex-shrink-0 cursor-pointer overflow-hidden rounded-md bg-zinc-900 shadow-lg transition duration-300 hover:z-10 hover:scale-105 hover:shadow-2xl sm:w-[160px] md:w-[170px]"
                >
                    <RegionBadge item={item} />
                  <div className="aspect-[2/3] w-full overflow-hidden rounded-md bg-zinc-800">
                    {imagePath ? (
                      <img
                        src={`${POSTER_BASE_URL}${imagePath}`}
                        alt={title}
                        className="h-full w-full object-cover transition duration-300 group-hover/card:scale-110"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center px-3 text-center text-sm text-zinc-400">
                        No image
                      </div>
                    )}
                  </div>

                  <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent p-3">
                    <p className="line-clamp-2 text-sm font-semibold text-white">
                      {title}
                    </p>
                    <p className="mt-1 text-[11px] text-zinc-300">
                      {getMediaMeta(item)}
                    </p>
                  </div>
                </Link>
              )
            })}
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