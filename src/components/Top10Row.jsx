import { useEffect, useRef, useState } from 'react'

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'

export default function Top10Row({ title, items = [], mediaType = 'movie' }) {
  const rowRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const filteredItems = items.filter((item) => item.poster_path).slice(0, 10)

  const updateScrollState = () => {
    const el = rowRef.current
    if (!el) return

    const maxScrollLeft = el.scrollWidth - el.clientWidth
    setCanScrollLeft(el.scrollLeft > 5)
    setCanScrollRight(el.scrollLeft < maxScrollLeft - 5)
  }

  const scroll = (direction) => {
    const el = rowRef.current
    if (!el) return

    const card = el.querySelector('[data-card]')
    const cardWidth = card ? card.clientWidth : 220
    const gap = 20
    const visibleCards = Math.floor(el.clientWidth / (cardWidth + gap))
    const scrollAmount = Math.max(1, visibleCards - 1) * (cardWidth + gap)

    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    const el = rowRef.current
    if (!el) return

    updateScrollState()

    el.addEventListener('scroll', updateScrollState)
    window.addEventListener('resize', updateScrollState)

    return () => {
      el.removeEventListener('scroll', updateScrollState)
      window.removeEventListener('resize', updateScrollState)
    }
  }, [items])

  if (!filteredItems.length) {
    return null
  }

  return (
    <div>
      <h4 className="mb-3 text-2xl font-bold">{title}</h4>

      <div className="group/row relative">
        {canScrollLeft && (
          <>
            <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-[#141414] to-transparent opacity-0 transition duration-300 group-hover/row:opacity-100" />
            <button
              onClick={() => scroll('left')}
              className="absolute left-2 top-1/2 z-20 -translate-y-1/2 opacity-0 transition duration-300 group-hover/row:opacity-100"
              aria-label={`Scroll ${title} left`}
            >
              <span className="block text-3xl text-white transition hover:scale-125">
                ‹
              </span>
            </button>
          </>
        )}

        {canScrollRight && (
          <>
            <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-[#141414] to-transparent opacity-0 transition duration-300 group-hover/row:opacity-100" />
            <button
              onClick={() => scroll('right')}
              className="absolute right-2 top-1/2 z-20 -translate-y-1/2 opacity-0 transition duration-300 group-hover/row:opacity-100"
              aria-label={`Scroll ${title} right`}
            >
              <span className="block text-3xl text-white transition hover:scale-125">
                ›
              </span>
            </button>
          </>
        )}

        <div
          ref={rowRef}
          className="flex gap-8 overflow-hidden scroll-smooth py-4 pr-6"
        >
          {filteredItems.map((item, index) => (
  <div
    key={item.id}
    data-card
    className="group/card relative flex-shrink-0 cursor-pointer"
  >
    {/* BIG BACKGROUND NUMBER */}
    <span className="pointer-events-none z-20 absolute left-42 top-3/4 z-0 -translate-y-1/2 text-[10rem] font-black  text-black leading-none opacity-70 [-webkit-text-stroke:2px_rgba(255,255,255,0.5)] drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]">
      {index + 1}
    </span>

    {/* POSTER */}
    <div className="relative z-0 ml-10 w-[180px]">
      <div className="relative overflow-hidden rounded">
        <img
          src={`${IMAGE_BASE_URL}${item.poster_path}`}
          alt={item.title || item.name}
          className="h-[300px] w-[180px] object-cover transition-transform duration-300 group-hover/card:scale-115"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      </div>

      {/* TITLE */}
      <div className="pointer-events-none absolute bottom-0 left-0 p-3">
        <p className="line-clamp-2 text-sm font-semibold text-white">
          {mediaType === 'movie' ? item.title : item.name}
        </p>
      </div>
    </div>
  </div>
))}
        </div>
      </div>
    </div>
  )
}