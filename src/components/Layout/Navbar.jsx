import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { MOVIE_GENRES, TV_GENRES } from '../../services/tmdb'
import { getGenrePath, getYearPath } from '../../utils/slugify'

const YEARS = Array.from({ length: 30 }, (_, index) => String(new Date().getFullYear() - index))

function getUnifiedGenres() {
  const mergedGenres = {
    ...MOVIE_GENRES,
    ...TV_GENRES,
  }

  return Object.entries(mergedGenres).sort((a, b) =>
    a[1].localeCompare(b[1])
  )
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const unifiedGenres = getUnifiedGenres()

  const baseLink = 'transition hover:text-gray-300'
  const activeLink = 'text-white font-semibold'
  const inactiveLink = 'text-zinc-300'

  function navClass({ isActive }) {
    return `${baseLink} ${isActive ? activeLink : inactiveLink}`
  }

  function closeMenu() {
    setIsMenuOpen(false)
  }

  return (
    <>
      <nav className="fixed left-0 top-0 z-50 w-full bg-black/80 backdrop-blur-sm">
        <div className="flex items-center px-4 py-3 sm:px-6 sm:py-4">
          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            className="mr-4 text-zinc-200 transition hover:text-white"
            aria-label="Open browse menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <div className="flex min-w-0 items-center">
            <NavLink to="/" className="whitespace-nowrap">
              <img
                src="/movieflix-navbar-logo.svg"
                alt="MovieFlix"
                className="h-8 w-auto"
              />
            </NavLink>

            <div className="ml-4 flex gap-3 overflow-hidden whitespace-nowrap text-xs sm:ml-8 sm:gap-6 sm:text-sm">
              <NavLink to="/" end className={navClass}>
                Home
              </NavLink>

              <NavLink to="/movies" className={navClass}>
                Movies
              </NavLink>

              <NavLink to="/tv" className={navClass}>
                TV Shows
              </NavLink>

              <NavLink
                to="/search"
                className={({ isActive }) =>
                  `flex items-center ${navClass({ isActive })}`
                }
                aria-label="Search"
                title="Search"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <circle cx="11" cy="11" r="7" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </NavLink>
            </div>
          </div>
        </div>
      </nav>

      {isMenuOpen ? (
        <div className="fixed inset-0 z-[60]">
          <button
            type="button"
            className="absolute inset-0 bg-black/70"
            onClick={closeMenu}
            aria-label="Close browse menu"
          />

          <aside className="relative flex h-full w-fit min-w-[260px] max-w-[calc(100vw-2rem)] flex-col bg-[#141414] px-5 py-5 text-white shadow-2xl sm:min-w-[280px] sm:px-6">
            <div className="mb-5 flex shrink-0 items-center justify-between border-b border-white/10 pb-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-red-500">
                  Browse
                </p>
                <h2 className="mt-1 text-2xl font-bold">Filter Movies</h2>
              </div>

              <button
                type="button"
                onClick={closeMenu}
                className="rounded-full bg-white/10 px-3 py-1 text-sm transition hover:bg-white/20"
                aria-label="Close browse menu"
              >
                ✕
              </button>
            </div>

            <div className="flex min-h-0 flex-1 flex-col gap-5 overflow-hidden">
              <MenuSection title="Year">
                <div className="grid grid-cols-3 gap-2">
                  {YEARS.map((year) => (
                    <Link
                      key={year}
                      to={getYearPath(`${year}`)}
                      onClick={closeMenu}
                      className="rounded-lg bg-white/5 px-3 py-2 text-center text-sm text-zinc-300 transition hover:bg-red-600 hover:text-white"
                    >
                      {year}
                    </Link>
                  ))}
                </div>
              </MenuSection>

              <MenuSection title="Genre">
                <div className="grid grid-cols-1 gap-2">
                  {unifiedGenres.map(([id, name]) => (
                    <Link
                      key={`${id}-${name}`}
                      to={getGenrePath(`${id}`,`${name}`)}
                      onClick={closeMenu}
                      className="whitespace-nowrap rounded-lg bg-white/5 px-3 py-2 text-sm text-zinc-300 transition hover:bg-red-600 hover:text-white"
                    >
                      {name}
                    </Link>
                  ))}
                </div>
              </MenuSection>
            </div>
          </aside>
        </div>
      ) : null}
    </>
  )
}

function MenuSection({ title, children }) {
  return (
    <section className="flex min-h-0 flex-1 flex-col rounded-2xl border border-white/10 bg-black/20 p-4">
      <div className="mb-3 flex shrink-0 items-center gap-4">
        <h3 className="shrink-0 text-lg font-bold">{title}</h3>
        <div className="h-px flex-1 bg-gradient-to-r from-white/30 to-transparent" />
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto pr-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {children}
      </div>
    </section>
  )
}
