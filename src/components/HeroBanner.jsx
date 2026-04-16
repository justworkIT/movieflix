const BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/original'

export default function HeroBanner({ item }) {
  if (!item || !item.backdrop_path) {
    return (
      <section className="flex h-[70vh] items-end bg-zinc-900 px-6 pb-16 pt-24">
        <div className="max-w-2xl">
          <h2 className="mb-4 text-4xl font-bold md:text-6xl">
            Loading featured title...
          </h2>
        </div>
      </section>
    )
  }

  return (
    <section
      className="relative flex h-[70vh] items-end px-6 pb-16 pt-24"
      style={{
        backgroundImage: `url(${BACKDROP_BASE_URL}${item.backdrop_path})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-black/40 to-black/30" />

      <div className="relative z-10 max-w-2xl">
        <h2 className="mb-4 text-4xl font-bold md:text-6xl">
          {item.title || item.name}
        </h2>

        <p className="mb-6 line-clamp-3 text-zinc-200">
          {item.overview}
        </p>

        <div className="flex gap-3">
          <button className="rounded bg-white px-6 py-2 font-semibold text-black">
            Play
          </button>
          <button className="rounded bg-white/20 px-6 py-2 font-semibold text-white">
            More Info
          </button>
        </div>
      </div>
    </section>
  )
}