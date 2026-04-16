export default function Navbar() {
  return (
    <header className="fixed top-0 z-50 w-full bg-gradient-to-b from-black/80 to-transparent">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <h1 className="text-2xl font-bold tracking-wide text-red-600">
          MOVIEFLIX
        </h1>

        <nav className="hidden gap-6 text-sm text-zinc-200 md:flex">
          <a href="#" className="transition hover:text-white">
            Home
          </a>
          <a href="#" className="transition hover:text-white">
            Movies
          </a>
          <a href="#" className="transition hover:text-white">
            TV Shows
          </a>
          <a href="#" className="transition hover:text-white">
            My List
          </a>
        </nav>
      </div>
    </header>
  )
}