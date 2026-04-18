export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-sm">
      <div className="flex items-center px-4 sm:px-6 py-3 sm:py-4">

        {/* LEFT GROUP */}
        <div className="flex items-center min-w-0">

          {/* Logo */}
          <div className="text-red-600 text-lg sm:text-2xl md:text-3xl font-extrabold tracking-wide whitespace-nowrap">
            MovieFlix
          </div>

          {/* Nav Links */}
          <div className="ml-4 sm:ml-8 flex gap-3 sm:gap-6 text-xs sm:text-sm text-white whitespace-nowrap overflow-hidden">
            <a className="hover:text-gray-300 transition">Home</a>
            <a className="hover:text-gray-300 transition">Movies</a>
            <a className="hover:text-gray-300 transition">TV Shows</a>
            <a className="hidden sm:block hover:text-gray-300 transition">My List</a>
            <a className="hover:text-gray-300 transition">Search</a>            
          </div>

        </div>

      </div>
    </nav>
  )
}