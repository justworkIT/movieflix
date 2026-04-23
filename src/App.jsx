import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import DetailsPage from './pages/DetailsPage'
import PersonPage from './pages/PersonPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/:mediaType/:id/:slug" element={<DetailsPage />} />
      <Route path="/person/:id/:slug" element={<PersonPage />} />
    </Routes>
  )
}