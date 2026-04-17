import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { POSTER_BASE_URL } from '../../services/tmdb'

export default function Top10Row({ title, items = [], mediaType = 'movie' }) {
  const rowRef = useRef(null)

  const filteredItems = items.filter((item) => item?.poster_path).slice(0, 10)

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
    <section className="mb-8">
      <div className="mb-3 px-6">
        <h2 className="text-xl font-bold text-white">{title}</h2>
      </div>

      <div className="relative">
        <button
          type="button"
          onClick={() => scrollRow('left')}
          className="absolute left-0 top-2 z-20 hidden h-[210px] w-[46px] items-center justify-center rounded-none bg-black/45 text-3xl text-white transition hover:bg-black/70 md:flex md:h-[240px] md:w-[53px] lg:h-[270px] lg:w-[60px]"
          aria-label={`Scroll ${title} left`}
        >
          ‹
        </button>

        <div
          ref={rowRef}
          className="flex gap-2 overflow-x-auto px-6 py-2 scrollbar-hide snap-x snap-mandatory"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
{filteredItems.map((item, index) => (
  <Link
    key={item.id}
    to={`/${mediaType}/${item.id}`}
    className="group/card flex-none snap-start w-[140px] sm:w-[160px] md:w-[180px]"
  >
    <div className="relative overflow-hidden rounded-md">
      <img
        src={`${POSTER_BASE_URL}${item.poster_path}`}
        alt={item.title || item.name}
        className="h-[210px] w-full object-cover transition duration-300 group-hover/card:scale-105 sm:h-[240px] md:h-[270px]"
        draggable="false"
      />

      {/* 🔥 TOP RIGHT NUMBER */}
      <span className="top10-number absolute right-0 bottom-52 z-20 text-[48px] font-black leading-none drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] sm:text-[60px] md:text-[70px]">
        {index + 1}
      </span>

      {/* Gradient + Title */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-2">
        <p className="line-clamp-2 text-sm font-semibold text-white">
          {item.title || item.name}
        </p>
      </div>
    </div>
  </Link>
))}
        </div>

        <button
          type="button"
          onClick={() => scrollRow('right')}
          className="absolute right-0 top-2 z-20 hidden h-[210px] w-[46px] items-center justify-center rounded-none bg-black/45 text-3xl text-white transition hover:bg-black/70 md:flex md:h-[240px] md:w-[53px] lg:h-[270px] lg:w-[60px]"
          aria-label={`Scroll ${title} right`}
        >
          ›
        </button>
      </div>
    </section>
  )
}