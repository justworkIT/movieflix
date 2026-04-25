const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'

export const BACKDROP_BASE_URL =
  'https://image.tmdb.org/t/p/original'

export const POSTER_BASE_URL =
  'https://image.tmdb.org/t/p/w500'

export const MOVIE_GENRES = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Science Fiction',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western',
}

export const TV_GENRES = {
  10759: 'Action & Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  10762: 'Kids',
  9648: 'Mystery',
  10763: 'News',
  10764: 'Reality',
  10765: 'Sci-Fi & Fantasy',
  10766: 'Soap',
  10767: 'Talk',
  10768: 'War & Politics',
  37: 'Western',
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
  if (
    lang === 'en' ||
    lang === 'es' ||
    lang === 'pt'
  )
    return ''

  return (
    regionMap[lang] ||
    lang.toUpperCase()
  )
}

export function getYear(item) {
  const date =
    item.release_date ||
    item.first_air_date

  return date
    ? date.split('-')[0]
    : '—'
}

async function fetchFromTMDB(endpoint) {
  const separator =
    endpoint.includes('?') ? '&' : '?'

  const response = await fetch(
    `${BASE_URL}${endpoint}${separator}api_key=${API_KEY}`
  )

  if (!response.ok) {
    throw new Error(
      `TMDB request failed: ${response.status}`
    )
  }

  return response.json()
}

/* HOME PAGE ROWS */

export async function getTrendingMovies(
  page = 1
) {
  const data =
    await fetchFromTMDB(
    `/trending/all/day?page=${page}`
    )

  return data.results || []
}

export async function getPopularMovies(
  page = 1
) {
  const data =
    await fetchFromTMDB(
      `/discover/movie?sort_by=popularity.desc&primary_release_date.gte=2025-01-01&page=${page}`
    )

  return data.results || []
}

export async function getTrendingTVShows(
  page = 1
) {
  const data =
    await fetchFromTMDB(
      `/trending/tv/day?page=${page}`
    )

  return data.results || []
}

export async function getPopularTVShows(
  page = 1
) {
  const data =
    await fetchFromTMDB(
      `/discover/tv?sort_by=popularity.desc&first_air_date.gte=2025-01-01&page=${page}`
    )

  return data.results || []
}

export async function getNowPlayingMovies(
  region = 'PH',
  page = 1
) {
  const data =
    await fetchFromTMDB(
      `/movie/now_playing?region=${region}&page=${page}`
    )

  return data.results || []
}

export async function getNetflixOriginalMovies(
  page = 1
) {
  const data =
    await fetchFromTMDB(
      `/discover/movie?sort_by=primary_release_date.desc&with_watch_providers=8&watch_region=PH&page=${page}`
    )

  return data.results || []
}

export async function getDisneyPlusMovies(
  page = 1
) {
  const data =
    await fetchFromTMDB(
      `/discover/movie?sort_by=primary_release_date.desc&with_watch_providers=337&watch_region=PH&page=${page}`
    )

  return data.results || []
}

export async function gethbomaxMovies(
  page = 1
) {
  const data =
    await fetchFromTMDB(
      `/discover/movie?with_watch_providers=1899&watch_region=PH&sort_by=primary_release_date.desc&page=${page}`
    )

  return data.results || []
}

/* DETAILS */

export async function getRecommendations(
  mediaType,
  id,
  page = 1
) {
  const data =
    await fetchFromTMDB(
      `/${mediaType}/${id}/recommendations?language=en-US&page=${page}`
    )

  return data.results || []
}

export async function getDetails(
  mediaType,
  id
) {
  return fetchFromTMDB(
    `/${mediaType}/${id}?language=en-US`
  )
}

export async function getVideos(
  mediaType,
  id
) {
  const data =
    await fetchFromTMDB(
      `/${mediaType}/${id}/videos?language=en-US`
    )

  return data.results || []
}

export async function getCredits(
  mediaType,
  id
) {
  const data =
    await fetchFromTMDB(
      `/${mediaType}/${id}/credits`
    )

  return data.cast || []
}

/* PERSON */

export async function getPersonDetails(
  personId
) {
  return fetchFromTMDB(
    `/person/${personId}?language=en-US`
  )
}

export async function getPersonCredits(
  personId
) {
  const data =
    await fetchFromTMDB(
      `/person/${personId}/combined_credits?language=en-US`
    )

  return data.cast || []
}

/* SEARCH */

export async function searchMovies(
  query,
  page = 1
) {
  if (!query.trim()) return []

  const data =
    await fetchFromTMDB(
      `/search/movie?language=en-US&query=${encodeURIComponent(
        query
      )}&page=${page}&include_adult=false`
    )

  return (data.results || []).map(
    (item) => ({
      ...item,
      media_type: 'movie',
    })
  )
}

export async function searchTV(
  query,
  page = 1
) {
  if (!query.trim()) return []

  const data =
    await fetchFromTMDB(
      `/search/tv?language=en-US&query=${encodeURIComponent(
        query
      )}&page=${page}&include_adult=false`
    )

  return (data.results || []).map(
    (item) => ({
      ...item,
      media_type: 'tv',
    })
  )
}

export async function searchPeople(
  query,
  page = 1
) {
  if (!query.trim()) return []

  const data =
    await fetchFromTMDB(
      `/search/person?language=en-US&query=${encodeURIComponent(
        query
      )}&page=${page}&include_adult=false`
    )

  return (data.results || []).map(
    (item) => ({
      ...item,
      media_type: 'person',
    })
  )
}

export async function discoverByYear(
  year,
  page = 1
) {
  const [movies, tvShows] =
    await Promise.all([
      fetchFromTMDB(
        `/discover/movie?language=en-US&sort_by=popularity.desc&primary_release_year=${year}&page=${page}`
      ),
      fetchFromTMDB(
        `/discover/tv?language=en-US&sort_by=popularity.desc&first_air_date_year=${year}&page=${page}`
      ),
    ])

  const movieData = (
    movies.results || []
  ).map((item) => ({
    ...item,
    media_type: 'movie',
  }))

  const tvData = (
    tvShows.results || []
  ).map((item) => ({
    ...item,
    media_type: 'tv',
  }))

  return [...movieData, ...tvData]
}

export async function discoverByGenre(type, genreId, page = 1) {
  const mediaType = type === 'tv' ? 'tv' : 'movie'

  const data = await fetchFromTMDB(
    `/discover/${mediaType}?language=en-US&sort_by=popularity.desc&with_genres=${genreId}&page=${page}`
  )

  return (data.results || []).map((item) => ({
    ...item,
    media_type: mediaType,
  }))
}