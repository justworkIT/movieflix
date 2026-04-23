import { useState } from 'react'
import CastCard from './CastCard'

export default function CastSection({ cast }) {
  const [showAllCast, setShowAllCast] = useState(false)

  if (!cast.length) return null

  const visibleCast = cast.length > 5 ? cast.slice(0, 5) : cast.slice(0, 6)
  const remainingCast = cast.length > 5 ? cast.slice(5) : []

  return (
    <section className="px-6 py-10 md:px-12">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="text-2xl font-bold">Cast</h2>

        {remainingCast.length > 0 && showAllCast ? (
          <button
            type="button"
            onClick={() => setShowAllCast(false)}
            className="text-sm text-zinc-300 transition hover:text-white"
          >
            Show less
          </button>
        ) : null}
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2">
        {visibleCast.map((person) => (
          <CastCard
            key={person.cast_id || person.credit_id || person.id}
            person={person}
          />
        ))}

        {remainingCast.length > 0 ? (
          <button
            type="button"
            onClick={() => setShowAllCast((prev) => !prev)}
            className="h-[205px] w-[180px] flex-shrink-0 rounded-xl border border-dashed border-white/20 bg-transparent px-4 text-lg font-semibold text-zinc-300 transition hover:border-white/40 hover:text-white"
          >
            More
          </button>
        ) : null}
      </div>

      {showAllCast && remainingCast.length > 0 ? (
        <div className="mt-6 flex gap-4 overflow-x-auto pb-2">
          {remainingCast.map((person) => (
            <CastCard
              key={person.cast_id || person.credit_id || person.id}
              person={person}
            />
          ))}
        </div>
      ) : null}
    </section>
  )
}