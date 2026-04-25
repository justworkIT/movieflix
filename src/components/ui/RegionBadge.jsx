import { getRegion } from '../../services/tmdb'

export default function RegionBadge({ item }) {
  const region = getRegion(item)

  if (!region) return null

  return (
    <div className="absolute left-2 top-2 z-10 rounded bg-red-600 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-lg">
      {region}
    </div>
  )
}