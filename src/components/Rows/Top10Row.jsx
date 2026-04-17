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
      <div className="mb-3 flex items-center justify-between px-6">
        <h2 className="text-xl font-bold text-white">{title}</h2>
      </div>

      <div className="group relative">
        <button
          type="button"
          onClick={() => scrollRow('left')}
          className="absolute left-2 top-1/2 z-20 hidden -translate-y-1/2 rounded-full bg-black/70 px-3 py-2 text-2xl text-white transition hover:bg-black/90 md:block"
          aria-label={`Scroll ${title} left`}
        >
          ‹
        </button>

        <div
          ref={rowRef}
          className="flex gap-4 overflow-x-auto px-6 py-2 scrollbar-hide snap-x snap-mandatory"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {filteredItems.map((item, index) => (
            <Link
              key={item.id}
              to={`/${mediaType}/${item.id}`}
              className="group/card flex-none snap-start w-[240px] sm:w-[270px] md:w-[300px]"
            >
              <div className="flex items-end">
                <span className="mr-[-8px] text-[90px] font-black leading-none text-zinc-200 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] sm:text-[110px] md:text-[130px]">
                  {index + 1}
                </span>

                <div className="relative w-[140px] overflow-hidden rounded-md sm:w-[160px] md:w-[180px]">
                  <img
                    src={`${POSTER_BASE_URL}${item.poster_path}`}
                    alt={item.title || item.name}
                    className="h-[210px] w-full object-cover transition duration-300 group-hover/card:scale-105 sm:h-[240px] md:h-[270px]"
                    draggable="false"
                  />

                  <div className="absolute inset-x-0 bottom-0 rounded-b-md bg-gradient-to-t from-black/90 to-transparent p-2">
                    <p className="line-clamp-2 text-sm font-semibold text-white">
                      {item.title || item.name}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <button
          type="button"
          onClick={() => scrollRow('right')}
          className="absolute right-2 top-1/2 z-20 hidden -translate-y-1/2 rounded-full bg-black/70 px-3 py-2 text-2xl text-white transition hover:bg-black/90 md:block"
          aria-label={`Scroll ${title} right`}
        >
          ›
        </button>
      </div>
    </section>
  )
}