import { Helmet } from 'react-helmet-async'
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

const heroItems = [...trendingMovies, ...trendingTVShows].slice(0, 10)

const movieRows = [
  {
    title: 'In Cinema',
    items: nowplayingMovies,
    mediaType: 'movie',
    seeMorePath: '/browse/in-cinema',
  },
  {
    title: 'Netflix Originals',
    items: netflixOriginalMovies,
    mediaType: 'movie',
    seeMorePath: '/browse/netflix-originals',
  },
  {
    title: 'Disney Plus Movies',
    items: disneyplusMovies,
    mediaType: 'movie',
    seeMorePath: '/browse/disney-plus',
  },
  {
    title: 'HBO Max Movies',
    items: hbomaxMovies,
    mediaType: 'movie',
    seeMorePath: '/browse/hbo-max',
  },
  {
    title: 'Popular Movies',
    items: popularMovies,
    mediaType: 'movie',
    seeMorePath: '/browse/popular-movies',
  },
]

const tvRows = [
  {
    title: 'Popular TV Shows',
    items: popularTVShows,
    mediaType: 'tv',
    seeMorePath: '/browse/popular-tv',
  },
]

  return (
    
    <div className="min-h-screen bg-[#0A0C12] text-white">
      <Helmet>
        <title>MovieFlix - Home</title>
        <meta
          name="description"
          content="Browse trending movies and TV shows on MovieFlix."
        />
      </Helmet>
      <Navbar />
      
<HeroBanner items={heroItems} />

      <main className="relative z-10 -mt-8 space-y-10 px-4 pb-12 md:px-8 lg:px-12">
        {loading && <Loader text="Loading content..." />}
        {error && <ErrorMessage message={error} />}

<Top20Row
  title="Top 20 Movies and TV Shows of the Week"
  items={trendingMovies}
  mediaType="movie"
  seeMorePath="/browse/trending-movies"
/>

        <section className="space-y-8">
          <h3 className="text-4xl font-bold relative top-5 text-red-600 mb-5">Movies</h3>
          <SectionBlock rows={movieRows} />
        </section>

        <section className="space-y-8">
          <h3 className="text-4xl font-bold text-red-600 mb-0">TV Shows</h3>
<Top20Row
  title="Top 20 TV Shows of the Week"
  items={trendingTVShows}
  mediaType="tv"
  seeMorePath="/browse/trending-tv"
/>
          <SectionBlock rows={tvRows} />
        </section>
      </main>
    </div>
  )
}