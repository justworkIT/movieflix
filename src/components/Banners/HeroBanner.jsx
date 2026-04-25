import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getMediaMeta } from "../../utils/MediaMeta"
import { getDetailsPath } from "../../utils/slugify"
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original"

function HeroBanner({ items = [] }) {
  const navigate = useNavigate()
  const [currentIndex, setCurrentIndex] = useState(0)

  const heroItems = useMemo(() => {
    return items
      .filter((item) => item?.backdrop_path)
      .slice(0, 10)
  }, [items])

  useEffect(() => {
    if (heroItems.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroItems.length)
    }, 7000)

    return () => clearInterval(interval)
  }, [heroItems.length])

  if (heroItems.length === 0) return null

  const safeIndex = currentIndex % heroItems.length
  const currentItem = heroItems[safeIndex]

  const title = currentItem.title || currentItem.name
  const overview = currentItem.overview
  const genre = getMediaMeta(currentItem)
  const mediaType =
    currentItem.media_type || (currentItem.title ? "movie" : "tv")

  const releaseDate =
    currentItem.release_date || currentItem.first_air_date

  const year = releaseDate ? releaseDate.slice(0, 4) : "N/A"

  const rating = currentItem.vote_average
    ? currentItem.vote_average.toFixed(1)
    : "N/A"

  const slug = getDetailsPath(currentItem)

  const goToDetails = () => {
    navigate(slug)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % heroItems.length)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? heroItems.length - 1 : prev - 1
    )
  }

  return (
    <section className="relative h-[50vh] min-h-[380px] w-full overflow-hidden bg-[#141414] text-white">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700"
        style={{
          backgroundImage: `url(${IMAGE_BASE_URL}${currentItem.backdrop_path})`,
        }}
      />
            {/* Indicators */}
      {heroItems.length > 1 && (
        <div className="relative top-18 left-6 z-20 flex gap-2 md:left-12 lg:left-20">
          {heroItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => setCurrentIndex(index)}
              className={`h-1.5 rounded-full transition-all ${
                index === safeIndex
                  ? "w-8 bg-red-600"
                  : "w-4 bg-white/40"
              }`}
            />
          ))}
        </div>
      )}


      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-black/30" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-center px-6 md:px-12 lg:px-20">
        <div className="max-w-xl pt-0">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-red-500">
            Trending Now
          </p>

          <h1 className="mb-4 text-4xl font-black leading-tight md:text-3xl lg:text-4xl">
            {title}
          </h1>

          <div className="mb-5 flex flex-wrap items-center gap-3 text-sm text-gray-200">
            <span>{year}</span>
            <span>•</span>
            <span>{mediaType === "movie" ? "Movie" : "TV Show"}</span>
            <span>•</span>
            <span>{genre}</span>
          
            <span className="rounded bg-red-600 px-2 py-0.5">
              ★ {rating}
            </span>
          </div>

          <p className="mb-2 line-clamp-3 max-w-lg text-sm leading-relaxed text-gray-200 md:text-base">
            {overview}
          </p>

          <div className="flex gap-3">
            <button
              onClick={goToDetails}
              className="rounded-4xl bg-red-800 px-5 py-3 text-sm font-bold text-white hover:bg-red-700"
            >
              ▶ Play
            </button>

            {/* <button
              onClick={goToDetails}
              className="rounded-4xl bg-gray-500/70 px-6 py-3 text-sm font-bold text-white hover:bg-gray-500"
            >

              More Info
            </button> */}
          </div>
        </div>
      </div>

      {/* Arrows */}
      {heroItems.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 rounded-full bg-black/40 text-2xl md:block"
          >
            ‹
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 rounded-full bg-black/40 text-2xl md:block"
          >
            ›
          </button>
        </>
      )}
    </section>
  )
}

export default HeroBanner