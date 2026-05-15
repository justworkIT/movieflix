import { Link } from 'react-router-dom'
import { POSTER_BASE_URL } from '../../services/tmdb'
import { slugify } from '../../utils/slugify'

export default function CastCard({ person }) {
  const personSlug = slugify(person.name || 'person')

  return (
    <Link
      to={`/watch/${personSlug}-movies-and-tv-shows/${person.id}`}
      className="group/card flex-none w-[105px] snap-start sm:w-[125px] md:w-[150px] lg:w-[170px] xl:w-[180px]"
    >
      <div className="relative overflow-hidden rounded-xl border border-white/5 bg-[#141823] shadow-md transition duration-300 group-hover/card:shadow-xl sm:rounded-2xl">
        <div className="relative overflow-hidden rounded-t-xl sm:rounded-t-2xl">
          {person.profile_path ? (
            <img
              src={`${POSTER_BASE_URL}${person.profile_path}`}
              alt={person.name}
              className="h-[135px] w-full object-cover transition duration-300 group-hover/card:scale-110 sm:h-[160px] md:h-[190px] lg:h-[215px] xl:h-[225px]"
              draggable="false"
            />
          ) : (
            <div className="flex h-[135px] w-full items-center justify-center border-b border-zinc-800 px-2 text-center text-[10px] text-zinc-400 sm:h-[160px] sm:text-xs md:h-[190px] lg:h-[215px] xl:h-[225px]">
              No image available
            </div>
          )}
        </div>

        <div className="p-2 sm:p-3">
          <p className="truncate text-xs font-semibold text-white sm:text-sm">
            {person.name}
          </p>
          <p className="mt-1 line-clamp-1 text-[10px] text-zinc-400 sm:text-[11px] md:text-xs">
            {person.character || 'Cast'}
          </p>
        </div>
      </div>
    </Link>
  )
}
