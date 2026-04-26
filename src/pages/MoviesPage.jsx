import { Helmet } from 'react-helmet-async'
import { useEffect, useState } from 'react'
import Loader from '../components/ui/Loader'
import ErrorMessage from '../components/ui/ErrorMessage'
import { getPopularMovies } from '../services/tmdb'
import MediaCard from '../components/Media/MediaCard'

export default function MoviesPage() {
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadMovies() {
      try {
        const data = await getPopularMovies(1)

        setMovies(
          data.map((item) => ({
            ...item,
            media_type: 'movie',
          }))
        )
      } catch (err) {
        console.error(err)
        setError('Failed to load movies')
      } finally {
        setLoading(false)
      }
    }

    loadMovies()
  }, [])

  async function loadMoreMovies() {
    try {
      setLoadingMore(true)

      const nextPage = page + 1
      const data = await getPopularMovies(nextPage)

      setMovies((prev) => [
        ...prev,
        ...data.map((item) => ({
          ...item,
          media_type: 'movie',
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
        <title>Popular Movies | MovieFlix</title>
        <meta
          name="description"
          content="Browse popular movies on MovieFlix."
        />
      </Helmet>

      <h1 className="mb-8 text-4xl font-bold md:text-6xl">
        Popular Movies
      </h1>

      <section>
        <div className="flex flex-wrap gap-3">
          {movies.map((movie) => {
            return (
            <MediaCard key={movie.id}
            item={movie}
            mediaType={movie.media_type}
            />
            )
          })}
        </div>

        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={loadMoreMovies}
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