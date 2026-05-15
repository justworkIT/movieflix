import { Link } from 'react-router-dom'
import { POSTER_BASE_URL } from '../../services/tmdb'
import { getDetailsPath, getCastPath } from '../../utils/slugify'
import { getMediaMeta } from '../../utils/mediaMeta'
import RegionBadge from '../ui/RegionBadge'

export default function MediaCard({ item, mediaType, rank }) {
  const imagePath = item.poster_path || item.profile_path
  const isPerson = mediaType === "person"

  const link = isPerson
    ? getCastPath(item)
    : getDetailsPath(item, mediaType)

  return (
    <Link
      to={link}
      className="group/card flex-none w-[125px] snap-start sm:w-[145px] md:w-[165px] lg:w-[180px]"
    >
      <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-[#141823] shadow-md transition duration-300 group-hover/card:shadow-xl">
        <div className="relative overflow-hidden rounded-t-2xl">
          <RegionBadge item={item} />

          <img
            src={`${POSTER_BASE_URL}${imagePath}`}
            alt={item.title || item.name}
            className="aspect-[3/4] w-full object-cover transition duration-300 group-hover/card:scale-125"
            draggable="false"
          />

          {rank ? (
            <span className="top10-number absolute right-0 top-0 z-20 text-[48px] font-black leading-none sm:text-[60px] md:text-[70px]">
              {rank}
            </span>
          ) : null}
        </div>

        <div className="p-2">
          <p className="truncate text-sm font-semibold text-white">
            {item.title || item.name}
          </p>

          <p className="mt-1 line-clamp-1 text-[11px] text-zinc-400">
            {isPerson
              ? item.known_for_department || "Person"
              : getMediaMeta(item)}
          </p>
        </div>
      </div>
    </Link>
  )
}