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
import { getCastPath, getYearPath, getGenrePath, slugify } from '../utils/slugify'

export default function DetailsPage() {
  const { mediaType, id, slug } = useParams()
  const navigate = useNavigate()

  const [details, setDetails] = useState(null)
  const [trailer, setTrailer] = useState(null)
  const [recommendations, setRecommendations] = useState([])
  const [cast, setCast] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showFullOverview, setShowFullOverview] = useState(false)
  const mediaTitle = details?.title || details?.name || 'Details'
  const releaseYear = (details?.release_date || details?.first_air_date || '').slice(0, 4)

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
        var correctSlug = ''
        if (mediaType === 'movie'){
            correctSlug = slugify(detailData.titleWithYear)
        }
        else
        {
            correctSlug = slugify(detailData.name + '-' + releaseYear)
        }
          


        if (correctSlug && slug !== correctSlug) {
          navigate(`/watch/${correctSlug}/${mediaType}/${id}/`, { replace: true })
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
    setShowFullOverview(false)
    loadDetails()
  }, [mediaType, id, slug, navigate])

  const topTwoCast = cast
    .slice(0, 2)
    .filter((person) => person.id && person.name)

  const seoTitle = useMemo(() => {
    const parts = []
    const titleWithYear = releaseYear ? `${mediaTitle} (${releaseYear})` : mediaTitle

    parts.push(titleWithYear)

    if (topTwoCast[0]) parts.push(topTwoCast[0].name)
    if (topTwoCast[1]) parts.push(topTwoCast[1].name)

    parts.push('MovieFlix')

    return parts.join(' | ')
  }, [mediaTitle, releaseYear, topTwoCast])

  const seoDescription = details?.overview || `Watch ${mediaTitle} on MovieFlix.`
  const overviewText = details?.overview || 'No overview available.'

  if (loading) return <Loader />

  if (error || !details) {
    return <ErrorMessage message={error || 'Failed to load details'} />
  }

  return (
    <div className="min-h-screen bg-[#0A0C12] text-white">
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
      </Helmet>

      <section
        className="relative top-10 isolate min-h-[36vh] overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: details.backdrop_path
            ? `url(${BACKDROP_BASE_URL}${details.backdrop_path})`
            : 'none',
        }}
      >
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t from-[#0A0C12] via-black/75 to-black/40" />
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-[#0A0C12] via-black/55 to-transparent" />

        <div className="relative z-10 px-6 py-8 md:px-12 md:py-12">
          <div className="flex flex-col gap-8 md:flex-row md:items-start">
            {details.poster_path && (
              <img
                src={`${POSTER_BASE_URL}${details.poster_path}`}
                alt={mediaTitle}
                className="w-[160px] flex-none rounded-xl shadow-xl sm:w-[190px] md:w-[220px]"
              />
            )}

            <div className="min-w-0 max-w-3xl flex-1">
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

              <CastNames cast={topTwoCast} />

              <ExpandableOverview
                text={overviewText}
                expanded={showFullOverview}
                onToggle={() => setShowFullOverview((current) => !current)}
              />

              <DetailPills
                releaseYear={releaseYear}
                genres={details.genres}
                mediaType={mediaType}
              />
            </div>
          </div>
        </div>
      </section>

      {trailer ? (
        <section className="px-6 py-8 md:px-12">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Official Trailer</h2>
          </div>

          <div className="overflow-hidden rounded-2xl bg-black shadow-2xl">
            <div className="relative aspect-video w-full">
              <iframe
                className="absolute inset-0 h-full w-full"
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title={`${mediaTitle} Trailer`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </section>
      ) : null}

        <CastSection cast={cast} />

      <section className="px-6 pb-10 pt-2 md:px-12">
        <h2 className="text-2xl font-bold">More Like This</h2>
        <MediaRow title="" items={recommendations} mediaType={mediaType} />
      </section>
    </div>
  )
}


function ExpandableOverview({ text, expanded, onToggle }) {
  const OVERVIEW_LIMIT = 320
  const shouldTruncate = text.length > OVERVIEW_LIMIT
  const displayText = shouldTruncate && !expanded
    ? `${text.slice(0, OVERVIEW_LIMIT).trim()}...`
    : text

  return (
    <div className="mb-6 max-w-2xl break-words">
      <p className="text-zinc-200 leading-relaxed break-words">{displayText}</p>

      {shouldTruncate ? (
        <button
          type="button"
          onClick={onToggle}
          className="mt-2 text-sm font-semibold text-red-500 transition hover:text-red-400"
        >
          {expanded ? 'Show less' : 'Show more'}
        </button>
      ) : null}
    </div>
  )
}

function CastNames({ cast }) {
  if (!cast.length) return null

  return (
    <p className="mb-4 text-sm text-zinc-300">
      Starring:{' '}
      {cast.map((person, index) => (
        <span key={person.id}>
          <Link
            to={getCastPath(person)}
            className="text-zinc-200 transition hover:text-white hover:underline"
          >
            {person.name}
          </Link>
          {index < cast.length - 1 ? ', ' : ''}
        </span>
      ))}
    </p>
  )
}

function DetailPills({ releaseYear, genres }) {
  if (!releaseYear && !genres?.length) return null

  return (
    <div className="flex flex-wrap gap-2">
      {releaseYear ? (
        <Link
          to={getYearPath(releaseYear)}
          className="rounded bg-white/10 px-3 py-1 text-sm text-zinc-200 transition hover:bg-white/20 hover:text-white"
        >
          {releaseYear}
        </Link>
      ) : null}

      {genres?.map((genre) => (
        <Link
          key={genre.id}
          to={getGenrePath(genre.id, genre.name)}
          className="rounded bg-white/10 px-3 py-1 text-sm text-zinc-200 transition hover:bg-white/20 hover:text-white"
        >
          {genre.name}
        </Link>
      ))}
    </div>
  )
}