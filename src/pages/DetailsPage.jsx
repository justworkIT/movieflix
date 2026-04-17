import Loader from '../components/ui/Loader'
import ErrorMessage from '../components/ui/ErrorMessage'
import MediaRow from '../components/Rows/MediaRow'
import { POSTER_BASE_URL, BACKDROP_BASE_URL } from '../services/tmdb'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  getDetails,
  getVideos,
  getRecommendations,
} from '../services/tmdb'

export default function DetailsPage() {
  const { mediaType, id } = useParams()

  const [details, setDetails] = useState(null)
  const [trailer, setTrailer] = useState(null)
  const [recommendations, setRecommendations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadDetails() {
      try {
        const [detailData, videoData, recData] = await Promise.all([
          getDetails(mediaType, id),
          getVideos(mediaType, id),
          getRecommendations(mediaType, id),
        ])

        setDetails(detailData)
        setRecommendations(recData)

        const officialTrailer = videoData.find(
          (video) => video.site === 'YouTube' && video.type === 'Trailer'
        )

        setTrailer(officialTrailer || null)
      } catch (err) {
        console.error(err)
        setError('Failed to load details')
      } finally {
        setLoading(false)
      }
    }

    setLoading(true)
    setError('')
    loadDetails()
  }, [mediaType, id])

  if (loading) {
    return <Loader />
  }

  if (error || !details) {
    return <ErrorMessage message={error} />
  }

  return (
    <div className="min-h-screen bg-[#141414] text-white">
      <section
        className="relative min-h-[70vh] bg-cover bg-center"
        style={{
          backgroundImage: details.backdrop_path
            ? `url(${BACKDROP_BASE_URL}${details.backdrop_path})`
            : 'none',
        }}
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#141414] via-black/70 to-black/40" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#141414] via-black/50 to-transparent" />

        <div className="relative z-10 px-6 py-8 md:px-12">
          <Link
            to="/"
            className="mb-8 inline-block text-sm text-zinc-300 hover:text-white"
          >
            ← Back to Home
          </Link>

          {trailer ? (
            <div className="grid gap-8 md:grid-cols-[1.3fr_1.7fr]">
              <div className="flex flex-col gap-6 md:flex-row">
                {details.poster_path && (
                  <img
                    src={`${POSTER_BASE_URL}${details.poster_path}`}
                    alt={details.title || details.name}
                    className="w-[220px] h-[300px] rounded shadow-xl"
                  />
                )}

                <div className="max-w-2xl">
                  <h1 className="mb-4 text-4xl font-bold md:text-6xl">
                    {details.title || details.name}
                  </h1>

                  <div className="mb-4 flex flex-wrap gap-4 text-sm text-zinc-300">
                    <span>{details.release_date || details.first_air_date}</span>

                    {details.vote_average ? (
                      <span>Rating: {details.vote_average.toFixed(1)}</span>
                    ) : null}

                    {details.runtime ? <span>{details.runtime} min</span> : null}
                  </div>

                  <p className="mb-6 max-w-2xl text-zinc-200">
                    {details.overview || 'No overview available.'}
                  </p>

                  {details.genres?.length ? (
                    <div className="flex flex-wrap gap-2">
                      {details.genres.map((genre) => (
                        <span
                          key={genre.id}
                          className="rounded bg-white/10 px-3 py-1 text-sm text-zinc-200"
                        >
                          {genre.name}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="overflow-hidden rounded-lg shadow-xl">
                <div className="aspect-video">
                  <iframe
                    className="h-full w-full"
                    src={`https://www.youtube.com/embed/${trailer.key}`}
                    title="Trailer"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-12 flex flex-col gap-8 md:flex-row md:items-end">
              {details.poster_path && (
                <img
                  src={`${POSTER_BASE_URL}${details.poster_path}`}
                  alt={details.title || details.name}
                  className="w-[220px] rounded shadow-xl"
                />
              )}

              <div className="max-w-3xl">
                <h1 className="mb-4 text-4xl font-bold md:text-6xl">
                  {details.title || details.name}
                </h1>

                <div className="mb-4 flex flex-wrap gap-4 text-sm text-zinc-300">
                  <span>{details.release_date || details.first_air_date}</span>

                  {details.vote_average ? (
                    <span>Rating: {details.vote_average.toFixed(1)}</span>
                  ) : null}

                  {details.runtime ? <span>{details.runtime} min</span> : null}
                </div>

                <p className="mb-6 max-w-2xl text-zinc-200">
                  {details.overview || 'No overview available.'}
                </p>

                {details.genres?.length ? (
                  <div className="flex flex-wrap gap-2">
                    {details.genres.map((genre) => (
                      <span
                        key={genre.id}
                        className="rounded bg-white/10 px-3 py-1 text-sm text-zinc-200"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="px-6 py-10 md:px-12">
        <h2 className="mb-4 text-2xl font-bold">More Like This</h2>

        <MediaRow
          title=""
          items={recommendations}
          mediaType={mediaType}
        />
      </section>
    </div>
  )
}