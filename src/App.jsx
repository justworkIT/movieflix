import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Layout/Navbar'
import HomePage from './pages/HomePage'
import DetailsPage from './pages/DetailsPage'
import PersonPage from './pages/PersonPage'
import SearchPage from './pages/SearchPage'
import BrowsePage from './pages/BrowsePage'
import MoviesPage from './pages/MoviesPage'
import TVShowsPage from './pages/TVShowsPage'

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />




        <Route path="/search" element={<SearchPage />} />
<Route path="/watch/:slug/genre/:genreId" element={<SearchPage />} />
<Route path="/watch/:slug" element={<SearchPage />} /> 
        <Route path="/watch/:slug/:id/" element={<PersonPage />} />
        <Route path="/browse/:category" element={<BrowsePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/tv" element={<TVShowsPage />} />

        <Route path="/watch/:slug/:mediaType/:id" element={<DetailsPage />} />
  
      </Routes>
    </>
  )
}