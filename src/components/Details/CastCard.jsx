import { Link } from 'react-router-dom'
import { POSTER_BASE_URL } from '../../services/tmdb'
import { slugify } from '../../utils/slugify'

export default function CastCard({ person }) {
  const personSlug = slugify(person.name || 'person')

  return (
    <Link
      to={`/person/${person.id}/${personSlug}`}
      className="h-[205px] w-[180px] flex-shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white/5 transition hover:scale-[1.02] hover:border-white/20 hover:bg-white/10"
    >
      <div className="h-[150px] w-full bg-zinc-800">
        {person.profile_path ? (
          <img
            src={`${POSTER_BASE_URL}${person.profile_path}`}
            alt={person.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center px-4 text-center text-sm text-zinc-400">
            No image available
          </div>
        )}
      </div>

      <div className="flex h-[55px] flex-col justify-between p-1">
        <h3 className="line-clamp-2 text-base font-semibold text-white">
          {person.name}
        </h3>
        <p className="line-clamp-2 text-sm text-zinc-400">
          {person.character || 'Cast'}
        </p>
      </div>
    </Link>
  )
}