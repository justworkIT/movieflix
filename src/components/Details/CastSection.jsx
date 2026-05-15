import { useState } from 'react'
import CastCard from './CastCard'

export default function CastSection({ cast = [] }) {
  const [showAllCast, setShowAllCast] = useState(false)

  if (!cast.length) return null

  const hasMoreCast = cast.length > 5
  const visibleCast = showAllCast || !hasMoreCast ? cast : cast.slice(0, 5)

  return (
    <section className="px-6 sm:px-6 md:px-12">
      <div className="mb-2 flex items-center gap-3">
        <h2 className="shrink-0 text-xl font-bold text-white sm:text-2xl">
          Cast
        </h2>
        <div className="h-px flex-1 bg-gradient-to-r from-white/80 to-transparent" />
      </div>

      <div className="flex flex-wrap gap-2 pb-2 sm:gap-3">
        {visibleCast.map((person) => (
          <CastCard
            key={person.cast_id || person.credit_id || person.id}
            person={person}
          />
        ))}

        {hasMoreCast ? (
          <button
            type="button"
            onClick={() => setShowAllCast((prev) => !prev)}
            className="flex h-[185px] w-[105px] flex-none items-center justify-center rounded-xl border border-dashed border-white/20 bg-white/[0.03] px-3 text-sm font-semibold text-zinc-300 transition hover:border-white/40 hover:bg-white/[0.06] hover:text-white sm:h-[215px] sm:w-[125px] sm:rounded-2xl md:h-[252px] md:w-[150px] lg:h-[277px] lg:w-[170px] xl:h-[287px] xl:w-[180px]"
          >
            {showAllCast ? 'Show less' : 'More'}
          </button>
        ) : null}
      </div>
    </section>
  )
}
