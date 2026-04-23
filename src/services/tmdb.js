const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'
export const BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/original'
export const POSTER_BASE_URL = 'https://image.tmdb.org/t/p/w500'

export const genreMap = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Sci-Fi",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
}
export const regionMap = {
  ar: 'SA',
  bg: 'BG',
  bn: 'BD',
  cs: 'CZ',
  da: 'DK',
  de: 'DE',
  el: 'GR',
  fa: 'IR',
  fi: 'FI',
  fr: 'FR',
  he: 'IL',
  hi: 'IN',
  hu: 'HU',
  id: 'ID',
  it: 'IT',
  ja: 'JP',
  ko: 'KR',
  ml: 'IN',
  ms: 'MY',
  nl: 'NL',
  no: 'NO',
  pl: 'PL',
  ro: 'RO',
  ru: 'RU',
  sv: 'SE',
  ta: 'IN',
  te: 'IN',
  th: 'TH',
  tl: 'PH',
  tr: 'TR',
  uk: 'UA',
  ur: 'PK',
  vi: 'VN',
  zh: 'CN',
  km: 'KH',
}

export function getRegion(item) {
  const lang = item?.original_language

  if (!lang) return ''
  if (lang === 'en' || lang === 'es' || lang === 'pt') return ''

  return regionMap[lang] || lang.toUpperCase()
}
export function getYear(item) {
  const date = item.release_date || item.first_air_date
  return date ? date.split("-")[0] : "—"
}

export function getGenres(item) {
  if (!item.genre_ids) return []

  return item.genre_ids
    .map((id) => genreMap[id])
    .filter(Boolean)
    .slice(0, 2)
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
//  const data = await fetchFromTMDB('/trending/movie/day')
  const data = await fetchFromTMDB('/discover/movie?sort_by=popularity.desc&watch_region=PH&with_watch_providers=8')
  return data.results || []
}

export async function getPopularMovies() {
  const data = await fetchFromTMDB('/discover/movie?sort_by=popularity.desc')
  return data.results || []
}

export async function getTrendingTVShows() {
  const data = await fetchFromTMDB('/trending/tv/day')
  return data.results || []
}

export async function getPopularTVShows() {
  const data = await fetchFromTMDB('/discover/tv?sort_by=popularity.desc')
  return data.results || []
}
export async function getNowPlayingMovies(region = 'PH') {
  const data = await fetchFromTMDB(
    `/movie/now_playing?region=${region}&page=1`
  )
  return data.results || []
}
export async function getNetflixOriginalMovies() {
  const data = await fetchFromTMDB(
    '/discover/movie?sort_by=primary_release_date.desc&with_watch_providers=8&watch_region=PH'
  )
  return data.results || []
}

export async function getDisneyPlusMovies() {
  const data = await fetchFromTMDB(
    '/discover/movie?sort_by=primary_release_date.desc&with_watch_providers=337&watch_region=PH'
  )
  return data.results || []
}
export async function gethbomaxMovies() {
  const data = await fetchFromTMDB(
    '/discover/movie?with_watch_providers=1899&watch_region=PH&sort_by=primary_release_date.desc'
  )
  return data.results || []
}
export async function getRecommendations(mediaType, id) {
  const data = await fetchFromTMDB(
    `/${mediaType}/${id}/recommendations?language=en-US`
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

export async function getCredits(mediaType, id) {
  const response = await fetch(
    `${BASE_URL}/${mediaType}/${id}/credits?api_key=${API_KEY}`
  )

  if (!response.ok) {
    throw new Error('Failed to load credits')
  }

  const data = await response.json()
  return data.cast || []
}
export async function getPersonDetails(personId) {
  const response = await fetch(
    `${BASE_URL}/person/${personId}?api_key=${API_KEY}&language=en-US`
  )

  if (!response.ok) {
    throw new Error('Failed to fetch person details')
  }

  return response.json()
}

export async function getPersonCredits(personId) {
  const response = await fetch(
    `${BASE_URL}/person/${personId}/combined_credits?api_key=${API_KEY}&language=en-US`
  )

  if (!response.ok) {
    throw new Error('Failed to fetch person credits')
  }

  const data = await response.json()
  return data.cast || []
}