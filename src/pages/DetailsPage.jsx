import { Helmet } from 'react-helmet-async'
import Loader from '../components/ui/Loader'
import ErrorMessage from '../components/ui/ErrorMessage'
import MediaRow from '../components/Rows/MediaRow'
import CastSection from '../components/Details/CastSection'
import { POSTER_BASE_URL, BACKDROP_BASE_URL } from '../services/tmdb'
import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  getDetails,
  getVideos,
  getRecommendations,
  getCredits,
} from '../services/tmdb'
import { slugify } from '../utils/slugify'

export default function DetailsPage() {
  const { mediaType, id, slug } = useParams()
  const navigate = useNavigate()

  const [details, setDetails] = useState(null)
  const [trailer, setTrailer] = useState(null)
  const [recommendations, setRecommendations] = useState([])
  const [cast, setCast] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadDetails() {
      try {
        const [detailData, videoData, recData, castData] = await Promise.all([
          getDetails(mediaType, id),
          getVideos(mediaType, id),
          getRecommendations(mediaType, id),
          getCredits(mediaType, id),
        ])

        setDetails(detailData)
        setRecommendations(recData)
        setCast(castData)

        const officialTrailer = videoData.find(
          (video) => video.site === 'YouTube' && video.type === 'Trailer'
        )

        setTrailer(officialTrailer || null)

        const correctSlug = slugify(detailData.title || detailData.name || '')

        if (correctSlug && slug !== correctSlug) {
          navigate(`/${mediaType}/${id}/${correctSlug}`, { replace: true })
        }
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
  }, [mediaType, id, slug, navigate])

  const mediaTitle = details?.title || details?.name || 'Details'
  const releaseYear = (details?.release_date || details?.first_air_date || '').slice(0, 4)

  const topTwoCast = cast
    .slice(0, 2)
    .map((person) => person.name)
    .filter(Boolean)

  const seoTitle = useMemo(() => {
    const parts = []
    const titleWithYear = releaseYear ? `${mediaTitle} (${releaseYear})` : mediaTitle

    parts.push(titleWithYear)

    if (topTwoCast[0]) parts.push(topTwoCast[0])
    if (topTwoCast[1]) parts.push(topTwoCast[1])

    parts.push('MovieFlix')

    return parts.join(' | ')
  }, [mediaTitle, releaseYear, topTwoCast])

  const seoDescription = details?.overview || `Watch ${mediaTitle} on MovieFlix.`

  if (loading) return <Loader />

  if (error || !details) {
    return <ErrorMessage message={error || 'Failed to load details'} />
  }

  return (
    <div className="min-h-screen bg-[#141414] text-white">
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
      </Helmet>

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
                    alt={mediaTitle}
                    className="h-[300px] w-[220px] rounded shadow-xl"
                  />
                )}

                <div className="max-w-2xl">
                  <h1 className="mb-4 text-4xl font-bold md:text-6xl">
                    {mediaTitle}
                  </h1>

                  <div className="mb-4 flex flex-wrap gap-4 text-sm text-zinc-300">
                    <span>{details.release_date || details.first_air_date}</span>

                    {details.vote_average ? (
                      <span>Rating: {details.vote_average.toFixed(1)}</span>
                    ) : null}

                    {details.runtime ? <span>{details.runtime} min</span> : null}
                  </div>

                  {topTwoCast.length > 0 ? (
                    <p className="mb-4 text-sm text-zinc-300">
                      Starring: {topTwoCast.join(', ')}
                    </p>
                  ) : null}

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
                  alt={mediaTitle}
                  className="w-[220px] rounded shadow-xl"
                />
              )}

              <div className="max-w-3xl">
                <h1 className="mb-4 text-4xl font-bold md:text-6xl">
                  {mediaTitle}
                </h1>

                <div className="mb-4 flex flex-wrap gap-4 text-sm text-zinc-300">
                  <span>{details.release_date || details.first_air_date}</span>

                  {details.vote_average ? (
                    <span>Rating: {details.vote_average.toFixed(1)}</span>
                  ) : null}

                  {details.runtime ? <span>{details.runtime} min</span> : null}
                </div>

                {topTwoCast.length > 0 ? (
                  <p className="mb-4 text-sm text-zinc-300">
                    Starring: {topTwoCast.join(', ')}
                  </p>
                ) : null}

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

      <CastSection cast={cast} />

      <section className="px-6 py-10 md:px-12">
        <h2 className="mb-4 text-2xl font-bold">More Like This</h2>
        <MediaRow title="" items={recommendations} mediaType={mediaType} />
      </section>
    </div>
  )
}