import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import HeroBanner from '../components/HeroBanner'
import SectionBlock from '../components/SectionBlock'
import Top10Row from '../components/Top10Row'
import {
  getNetflixOriginalMovies,
  getTrendingMovies,
  getTrendingTVShows,
} from '../services/tmdb'

export default function HomePage() {
  const [trendingMovies, setTrendingMovies] = useState([])
  const [netflixOriginalMovies, setNetflixOriginalMovies] = useState([])
  const [trendingTVShows, setTrendingTVShows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadData() {
      try {
        const [movies, originals, tvShows] = await Promise.all([
          getTrendingMovies(),
          getNetflixOriginalMovies(),
          getTrendingTVShows(),
        ])

        setTrendingMovies(movies)
        setNetflixOriginalMovies(originals)
        setTrendingTVShows(tvShows)
      } catch (error) {
        console.error(error)
        setError('Failed to load content')
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const featuredMovie = trendingMovies[0]

  const movieRows = [
    { title: 'Netflix Originals', items: netflixOriginalMovies, mediaType: 'movie' },
    { title: 'Trending Movies', items: trendingMovies, mediaType: 'movie' },
  ]

  const tvRows = [
    { title: 'Trending TV Shows', items: trendingTVShows, mediaType: 'tv' },
  ]

  return (
    <div className="min-h-screen bg-[#141414] text-white">
      <Navbar />
      <HeroBanner item={featuredMovie} />

      <main className="relative z-10 -mt-16 space-y-10 px-4 pb-12 md:px-8 lg:px-12">
        {loading && <p className="text-sm text-zinc-400">Loading content...</p>}
        {error && <p className="text-sm text-red-500">{error}</p>}

        <section className="space-y-8">
          <h3 className="text-4xl font-bold relative top-5 text-red-600">Movies</h3>
          <Top10Row
            title="Netflix Top 10"
            items={trendingMovies}
            mediaType="movie"
          />
          <SectionBlock rows={movieRows} />
        </section>

        <section className="space-y-8">
          <h3 className="text-4xl font-bold text-red-600">TV Shows</h3>
          <Top10Row
            title="Netflix Top 10"
            items={trendingTVShows}
            mediaType="tv"
          />
          <SectionBlock rows={tvRows} />
        </section>
      </main>
    </div>
  )
}