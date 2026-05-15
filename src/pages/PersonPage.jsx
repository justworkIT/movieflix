import { Helmet } from 'react-helmet-async'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Loader from '../components/ui/Loader'
import ErrorMessage from '../components/ui/ErrorMessage'
import FilmographySection from '../components/Details/FilmographySection'
import { POSTER_BASE_URL } from '../services/tmdb'
import PersonNewsSection from '../components/Details/PersonNewsSection'
import {
  getPersonDetails,
  getPersonCredits,
} from '../services/tmdb'
import { slugify } from '../utils/slugify'

export default function PersonPage() {
  const { id, slug } = useParams()
  const navigate = useNavigate()

  const [person, setPerson] = useState(null)
  const [credits, setCredits] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showFullBio, setShowFullBio] = useState(false)

  const personName =
    person?.name || 'Cast Member'

  useEffect(() => {
    async function loadPerson() {
      try {
        const [personData, creditsData] =
          await Promise.all([
            getPersonDetails(id),
            getPersonCredits(id),
          ])

        setPerson(personData)
        setCredits(creditsData)

        const correctSlug = slugify(
          personData.name || ''
        )

        if (
          correctSlug &&
          slug !== correctSlug
        ) {
          navigate(
            `/watch/${correctSlug}-movies-and-tv-shows/${id}`,
            { replace: true }
          )
        }
      } catch (err) {
        console.error(err)
        setError(
          'Failed to load cast details'
        )
      } finally {
        setLoading(false)
      }
    }

    setLoading(true)
    setError('')
    loadPerson()
  }, [id, slug, navigate])

  useEffect(() => {
    document.title = `${personName} | MovieFlix`
  }, [personName])

  if (loading) return <Loader />

  if (error || !person) {
    return (
      <ErrorMessage
        message={
          error ||
          'Failed to load cast details'
        }
      />
    )
  }

  const knownFor =
    person.known_for_department ||
    'Acting'

  const birthday =
    person.birthday || 'Unknown'

  const birthplace =
    person.place_of_birth ||
    'Unknown'

  const bio =
    person.biography ||
    'No biography available.'

  const BIO_LIMIT = 450
  const hasLongBio = bio.length > BIO_LIMIT
  const displayedBio =
    hasLongBio && !showFullBio
      ? `${bio.slice(0, BIO_LIMIT).trim()}...`
      : bio

  return (
    <main className="min-h-screen bg-[#0A0C12] text-white">
      <Helmet>
        <title>
          {personName} | MovieFlix
        </title>

        <meta
          name="description"
          content={`Learn more about ${personName}, including biography, birthday, birthplace, and filmography.`}
        />
      </Helmet>
      <section className="relative min-h-[36vh] top-15 bg-cover bg-center">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#141414] via-black/70 to-black/40" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#141414] via-black/50 to-transparent" />

        <div className="relative z-10 px-6 py-4 md:px-12">
          <div className="flex flex-col gap-8 md:flex-row md:items-start">
          {person.profile_path ? (
            <img
              src={`${POSTER_BASE_URL}${person.profile_path}`}
              alt={personName}
              className="w-[220px] rounded shadow-xl"
            />
          ) : (
            <div className="flex h-[390px] w-[260px] items-center justify-center rounded-xl bg-zinc-800 text-zinc-400">
              No image available
            </div>
          )}
        
            <div className="min-w-0 max-w-3xl flex-1">
              <h1 className="mb-4 text-4xl font-bold md:text-6xl">
            {personName}
          </h1>

               <div className="mb-4 flex flex-wrap gap-4 text-sm text-zinc-300">
            <span>{knownFor}</span>
            <span>
              Born: {birthday}
            </span>
            <span>{birthplace}</span>
          </div>

          <h2 className="mb-3 text-2xl font-bold">
            Biography
          </h2>

          <p className="leading-relaxed text-zinc-200">
            {displayedBio}
          </p>

          {hasLongBio ? (
            <button
              type="button"
              onClick={() => setShowFullBio((current) => !current)}
              className="mt-3 text-sm font-semibold text-red-500 transition hover:text-red-400"
            >
              {showFullBio ? 'Show less' : 'Show more'}
            </button>
          ) : null}
        </div>
        </div>
        </div>
      </section>

<section className="mt-12 grid gap-10 lg:grid-cols-[1fr_2fr]">
  <PersonNewsSection personName={personName} />
  <FilmographySection credits={credits} />
</section>
    </main>
  )
}