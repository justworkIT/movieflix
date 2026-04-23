import { Link } from 'react-router-dom'
import { POSTER_BASE_URL } from '../../services/tmdb'
import { getDetailsPath } from '../../utils/slugify'

export default function FilmographySection({ credits }) {
  if (!credits.length) return null

  const sortedCredits = credits
    .filter((item) => item.media_type === 'movie' || item.media_type === 'tv')
    .sort((a, b) => {
      const dateA = a.release_date || a.first_air_date || ''
      const dateB = b.release_date || b.first_air_date || ''
      return dateB.localeCompare(dateA)
    })

  return (
    <section className="mt-12">
      <h2 className="mb-6 text-2xl font-bold">Filmography</h2>

      <div className="flex flex-wrap gap-5">
        {sortedCredits.map((item) => {
          const title = item.title || item.name || 'Untitled'
          const date = item.release_date || item.first_air_date || ''
          const year = date ? date.slice(0, 4) : 'N/A'

          return (
            <Link
              key={`${item.media_type}-${item.id}-${item.credit_id}`}
              to={getDetailsPath(item, item.media_type)}
              className="w-[160px] flex-shrink-0 overflow-hidden rounded-lg bg-white/5 transition hover:scale-105 hover:bg-white/10"
            >
              <div className="h-[240px] w-[160px] bg-zinc-800">
                {item.poster_path ? (
                  <img
                    src={`${POSTER_BASE_URL}${item.poster_path}`}
                    alt={title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center px-3 text-center text-sm text-zinc-400">
                    No image
                  </div>
                )}
              </div>

              <div className="p-3">
                <h3 className="line-clamp-2 text-sm font-semibold text-white">
                  {title}
                </h3>
                <p className="mt-1 text-xs text-zinc-400">{year}</p>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}