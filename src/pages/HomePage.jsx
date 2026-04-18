import { useEffect, useState } from 'react'
import Navbar from '../components/Layout/Navbar'
import HeroBanner from '../components/Banners/HeroBanner'
import SectionBlock from '../components/Rows/SectionBlock'
import Top20Row from '../components/Rows/Top20Row'
import Loader from '../components/ui/Loader'
import ErrorMessage from '../components/ui/ErrorMessage'
import {
  getNetflixOriginalMovies,
  getDisneyPlusMovies,
  gethbomaxMovies,
  getNowPlayingMovies,
  getPopularMovies,
  getTrendingMovies,
  getTrendingTVShows,
  getPopularTVShows,
} from '../services/tmdb'

export default function HomePage() {
  const [trendingMovies, setTrendingMovies] = useState([])
  const [popularMovies, setPopularMovies] = useState([])
  const [nowplayingMovies, setnowplayingMovies] = useState([])
  const [netflixOriginalMovies, setNetflixOriginalMovies] = useState([])
  const [disneyplusMovies, setdisneyplusMovies] = useState([])  
  const [hbomaxMovies, sethbomaxMovies] = useState([])  
  const [trendingTVShows, setTrendingTVShows] = useState([])
  const [popularTVShows, setPopularTVShows] = useState([])  
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadData() {
      try {
        const [top20movies, popularmovies, nowplaying, originals, disneyplus, hbomax, top20tvShows, populartvshows] = await Promise.all([
          getTrendingMovies(),
          getPopularMovies(),          
          getNowPlayingMovies(),          
          getNetflixOriginalMovies(),
          getDisneyPlusMovies(),
          gethbomaxMovies(),
          getTrendingTVShows(),
          getPopularTVShows(),
        ])

        setTrendingMovies(top20movies)
        setPopularMovies(popularmovies)
        setnowplayingMovies(nowplaying)
        setNetflixOriginalMovies(originals)
        setdisneyplusMovies(disneyplus)
        sethbomaxMovies(hbomax)
        setTrendingTVShows(top20tvShows)
        setPopularTVShows(populartvshows)
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
    { title: 'In Cinema', items: nowplayingMovies, mediaType: 'movie' },
    { title: 'Netflix Originals', items: netflixOriginalMovies, mediaType: 'movie' },
    { title: 'Disney Plus Movies', items: disneyplusMovies, mediaType: 'movie' },
    { title: 'HBO Max Movies', items: hbomaxMovies, mediaType: 'movie' },
    { title: 'Popular Movies', items: popularMovies, mediaType: 'movie' },
  ]

  const tvRows = [
    { title: 'Popular TV Shows', items: popularTVShows, mediaType: 'tv' },
  ]

  return (
    <div className="min-h-screen bg-[#141414] text-white">
      <Navbar />
      <HeroBanner item={featuredMovie} />

      <main className="relative z-10 -mt-16 space-y-10 px-4 pb-12 md:px-8 lg:px-12">
        {loading && <Loader text="Loading content..." />}
        {error && <ErrorMessage message={error} />}

        <section className="space-y-8">
          <h3 className="text-4xl font-bold relative top-5 text-red-600">Movies</h3>
          <Top20Row
            title="Top 20 Movies of the Week"
            items={trendingMovies}
            mediaType="movie"
          />
          <SectionBlock rows={movieRows} />
        </section>

        <section className="space-y-8">
          <h3 className="text-4xl font-bold text-red-600">TV Shows</h3>
          <Top20Row
            title="Top 20 TV Shows of the Week"
            items={trendingTVShows}
            mediaType="tv"
          />
          <SectionBlock rows={tvRows} />
        </section>
      </main>
    </div>
  )
}