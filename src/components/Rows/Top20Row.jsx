import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { POSTER_BASE_URL } from '../../services/tmdb'
import { getDetailsPath } from '../../utils/slugify'
import { getMediaMeta } from '../../utils/mediaMeta'
import RegionBadge from '../ui/RegionBadge'
export default function Top20Row({ title, items = [], mediaType = 'movie' }) {
  const rowRef = useRef(null)

  const filteredItems = items.filter((item) => item?.poster_path).slice(0, 20)

  if (!filteredItems.length) return null

  const scrollRow = (direction) => {
    if (!rowRef.current) return

    const container = rowRef.current
    const amount = container.clientWidth * 0.9
    const left = direction === 'left' ? -amount : amount

    try {
      container.scrollBy({
        left,
        behavior: 'smooth',
      })
    } catch {
      container.scrollLeft += left
    }
  }

  return (
    <section className="mb-2">
      <div className="mb-0 px-0">
        <h2 className="text-xl font-bold text-white">{title}</h2>
      </div>
<div className="h-px flex-1 bg-gradient-to-r from-white/80 to-30" />
      <div className="relative mt-2">
        <button
          type="button"
          onClick={() => scrollRow('left')}
          className="absolute left-0 top-0 z-20 hidden h-[260px] w-[40px] items-center justify-center rounded-none bg-black/45 text-3xl text-white transition hover:bg-black/70 md:flex sm:h-[230px] md:h-[260px]"
          aria-label={`Scroll ${title} left`}
        >
          ‹
        </button>

        <div
          ref={rowRef}
          className="flex gap-2 overflow-x-auto px-6 scrollbar-hide snap-x snap-mandatory"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
{filteredItems.map((item, index) => (
  <Link
    key={item.id}
    to={getDetailsPath(item, mediaType)}
    className="group/card flex-none snap-start w-[180px]"
  >
    
    <div className="overflow-hidden rounded-2xl border border-white/5 bg-[#141823] shadow-md transition duration-300 group-hover/card:shadow-xl">
    
    <div className="relative overflow-hidden rounded-t-2xl">
      <span className="top10-number absolute right-0 top-0 z-20 text-[48px] font-black leading-none">
  {index + 1}
</span>
      <RegionBadge item={item} />
      <img
        src={`${POSTER_BASE_URL}${item.poster_path}`}
        alt={item.title || item.name}
        className="h-[200px] w-full object-fill transition duration-300 group-hover/card:scale-125 sm:h-[170px] md:h-[200px]"
        draggable="false"
      />
    </div>

      {/* Gradient + Title */}
                <div className="p-2">
                  <p className="truncate text-sm font-semibold text-white">
                    {item.title || item.name}
                  </p>
                  <p className="mt-1 text-[11px] text-zinc-400 line-clamp-1">{getMediaMeta(item)}</p>
                </div>
    </div>
  </Link>
))}
        </div>

        <button
          type="button"
          onClick={() => scrollRow('right')}
          className="absolute right-0 top-0 z-20 hidden h-[260px] w-[40px] items-center justify-center rounded-none bg-black/45 text-3xl text-white transition hover:bg-black/70 md:flex sm:h-[230px] md:h-[260px]"
          aria-label={`Scroll ${title} right`}
        >
          ›
        </button>
      </div>
    </section>
  )
}