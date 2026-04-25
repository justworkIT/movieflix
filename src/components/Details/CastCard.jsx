import { Link } from 'react-router-dom'
import { POSTER_BASE_URL } from '../../services/tmdb'
import { slugify } from '../../utils/slugify'
import MediaCard from '../Media/MediaCard'

export default function CastCard({ person }) {
  const personSlug = slugify(person.name || 'person')

  return (
    <Link
      to={`/watch/${personSlug}-movies-and-tv-shows/${person.id}`}
      className="group/card flex-none w-[180px] snap-start sm:w-[160px] md:w-[180px]"
    >
      <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-[#141823] shadow-md transition duration-300 group-hover/card:shadow-xl">
      <div className="relative overflow-hidden rounded-t-2xl">
        {person.profile_path ? (
          <img
            src={`${POSTER_BASE_URL}${person.profile_path}`}
            alt={person.name}
            className="h-[200px] w-full object-fill transition duration-300 group-hover/card:scale-125 sm:h-[170px] md:h-[200px]"
            draggable="false"
          />
        ) : (
<div className="flex h-[200px] w-full items-center justify-center border-b border-zinc-800">
  No image available
</div>
        )}
      </div>
      

      <div className="p-2">
          <p className="truncate text-sm font-semibold text-white">
          {person.name}
        </p>
        <p className="mt-1 line-clamp-1 text-[11px] text-zinc-400">
          {person.character || 'Cast'}
        </p>
      </div>
      </div>
    </Link>
  )
}