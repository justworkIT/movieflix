import { Link } from 'react-router-dom'
import { POSTER_BASE_URL } from '../../services/tmdb'

export default function Top10Row({ title, items = [], mediaType = 'movie' }) {
  const filteredItems = items.filter((item) => item?.poster_path).slice(0, 10)

  if (!filteredItems.length) return null

  return (
    <section className="mb-8">
      <h2 className="mb-3 px-6 text-xl font-bold text-white">{title}</h2>

      <div
        className="flex overflow-x-auto gap-4 px-6 py-2 scrollbar-hide snap-x snap-mandatory"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {filteredItems.map((item, index) => (
          <Link
            key={item.id}
            to={`/${mediaType}/${item.id}`}
            className="group flex-none snap-start w-[240px] sm:w-[270px] md:w-[300px]"
          >
            <div className="flex items-end">
              <span className="mr-[-8px] text-[90px] font-black leading-none text-zinc-200 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] sm:text-[110px] md:text-[130px]">
                {index + 1}
              </span>

              <div className="relative w-[140px] sm:w-[160px] md:w-[180px] transition-transform duration-300 group-hover:scale-105">
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
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}