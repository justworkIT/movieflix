import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { POSTER_BASE_URL } from '../../services/tmdb'
import RegionBadge from '../ui/RegionBadge'
import MediaCard from '../Media/MediaCard'

export default function MediaRow({ title, items, mediaType, seeMorePath }) {
  const rowRef = useRef(null)

  const filteredItems = items.filter((item) => item?.poster_path)
  if (!filteredItems.length) return null

  const scrollRow = (direction) => {
    if (!rowRef.current) return
    const container = rowRef.current
    const amount = container.clientWidth * 0.9
    const left = direction === 'left' ? -amount : amount
    try {
      container.scrollBy({ left, behavior: 'smooth' })
    } catch {
      container.scrollLeft += left
    }
  }

  return (
    <section className="mb-8">
      <div className="mb-1 flex items-center justify-between gap-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        {seeMorePath ? (
          <Link to={seeMorePath} className="text-sm font-semibold text-zinc-300 transition hover:text-white">
            See More
          </Link>
        ) : null}
      </div>
      <div className="h-px flex-1 bg-gradient-to-r from-white/80 to-30" />

      <div className="relative mt-2">
        <button type="button" onClick={() => scrollRow('left')} className="absolute left-0 top-0 z-20 hidden h-[280px] w-[40px] items-center justify-center bg-black/45 text-3xl text-white transition hover:bg-black/70 md:flex sm:h-[230px] md:h-[260px]" aria-label={`Scroll ${title} left`}>
          ‹
        </button>

        <div ref={rowRef} className="flex gap-2 overflow-x-auto px-6 scrollbar-hide snap-x snap-mandatory" style={{ WebkitOverflowScrolling: 'touch' }}>
          {filteredItems.map((item) => (
  <MediaCard key={item.id} item={item} mediaType={mediaType} />
))}
        </div>

        <button type="button" onClick={() => scrollRow('right')} className="absolute right-0 top-0 z-20 hidden h-[260px] w-[40px] items-center justify-center bg-black/45 text-3xl text-white transition hover:bg-black/70 md:flex sm:h-[230px] md:h-[260px]" aria-label={`Scroll ${title} right`}>
          ›
        </button>
      </div>
    </section>
  )
}
