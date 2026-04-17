const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'
export const BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/original'
export const POSTER_BASE_URL = 'https://image.tmdb.org/t/p/w500'
export async function getRecommendations(mediaType, id) {
  const data = await fetchFromTMDB(
    `/${mediaType}/${id}/recommendations?language=en-US`
  )
  return data.results || []
}

async function fetchFromTMDB(endpoint) {
  const separator = endpoint.includes('?') ? '&' : '?'
  const response = await fetch(`${BASE_URL}${endpoint}${separator}api_key=${API_KEY}`)

  if (!response.ok) {
    throw new Error(`TMDB request failed: ${response.status}`)
  }

  return response.json()
}

export async function getTrendingMovies() {
  const data = await fetchFromTMDB('/trending/movie/week?language=en-US')
  return data.results || []
}

export async function getTrendingTVShows() {
  const data = await fetchFromTMDB('/trending/tv/week?language=en-US')
  return data.results || []
}

export async function getNetflixOriginalMovies() {
  const data = await fetchFromTMDB(
    '/discover/movie?language=en-US&sort_by=popularity.desc&with_watch_providers=8&watch_region=US'
  )
  return data.results || []
}

export async function getDetails(mediaType, id) {
  return fetchFromTMDB(`/${mediaType}/${id}?language=en-US`)
}

export async function getVideos(mediaType, id) {
  const data = await fetchFromTMDB(`/${mediaType}/${id}/videos?language=en-US`)
  return data.results || []
}