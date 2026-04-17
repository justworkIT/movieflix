import { Link } from 'react-router-dom'
import { POSTER_BASE_URL } from '../../services/tmdb'

export default function MediaRow({ title, items = [], mediaType = 'movie' }) {
  const filteredItems = items.filter((item) => item?.poster_path)

  if (!filteredItems.length) return null

  return (
    <section className="mb-8">
      <h2 className="mb-3 px-6 text-xl font-bold text-white">{title}</h2>

      <div
        className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide px-6 py-2 snap-x snap-mandatory"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {filteredItems.map((item) => (
          <Link
            key={item.id}
            to={`/${mediaType}/${item.id}`}
            className="group relative flex-none w-[140px] sm:w-[160px] md:w-[180px] snap-start transition-transform duration-300 hover:scale-105"
          >
            <img
              src={`${POSTER_BASE_URL}${item.poster_path}`}
              alt={item.title || item.name}
              className="h-[210px] w-full rounded-md object-cover sm:h-[240px] md:h-[270px]"
            />

            <div className="absolute inset-x-0 bottom-0 rounded-b-md bg-gradient-to-t from-black/90 to-transparent p-2">
              <p className="line-clamp-2 text-sm font-semibold text-white">
                {item.title || item.name}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}