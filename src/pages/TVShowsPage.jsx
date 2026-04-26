import { Helmet } from 'react-helmet-async'
import { useEffect, useState } from 'react'
import Loader from '../components/ui/Loader'
import ErrorMessage from '../components/ui/ErrorMessage'
import { getPopularTVShows } from '../services/tmdb'
import MediaCard from '../components/Media/MediaCard'
export default function TVShowsPage() {
  const [shows, setShows] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadShows() {
      try {
        const data = await getPopularTVShows(1)

        setShows(
          data.map((item) => ({
            ...item,
            media_type: 'tv',
          }))
        )
      } catch (err) {
        console.error(err)
        setError('Failed to load TV shows')
      } finally {
        setLoading(false)
      }
    }

    loadShows()
  }, [])

  async function loadMoreShows() {
    try {
      setLoadingMore(true)

      const nextPage = page + 1
      const data = await getPopularTVShows(nextPage)

      setShows((prev) => [
        ...prev,
        ...data.map((item) => ({
          ...item,
          media_type: 'tv',
        })),
      ])

      setPage(nextPage)
    } catch (err) {
      console.error(err)
    } finally {
      setLoadingMore(false)
    }
  }

  if (loading) return <Loader />
  if (error) return <ErrorMessage message={error} />

  return (
    <main className="min-h-screen bg-[#0A0C12] px-6 pt-28 pb-12 text-white md:px-12">
      <Helmet>
        <title>Popular TV Shows | MovieFlix</title>
        <meta
          name="description"
          content="Browse popular TV shows on MovieFlix."
        />
      </Helmet>

      <h1 className="mb-8 text-4xl font-bold md:text-6xl">
        Popular TV Shows
      </h1>

      <section>
        <div className="flex flex-wrap gap-3">
          {shows.map((show) => {
            return (
              <MediaCard key={show.id}
              item={show}
              mediaType={show.media_type}
              />
            )
          })}
        </div>

        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={loadMoreShows}
            disabled={loadingMore}
            className="rounded bg-red-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loadingMore ? 'Loading...' : 'Load More'}
          </button>
        </div>
      </section>
    </main>
  )
}