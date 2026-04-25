import {
  MOVIE_GENRES,
  TV_GENRES,
} from '../services/tmdb'

export function getMediaYear(item) {
  const date = item.release_date || item.first_air_date || ''
  return date ? date.slice(0, 4) : 'N/A'
}

export function getMediaGenre(item) {
  if (item.genres?.length) {
    return item.genres
      .slice(0, 2)
      .map((genre) => genre.name)
      .join(', ')
  }

  if (item.genre_ids?.length) {
    const isTv =
      item.media_type === 'tv' ||
      Boolean(item.first_air_date) ||
      Boolean(item.name)

    const genreMap = isTv ? TV_GENRES : MOVIE_GENRES

    const genres = item.genre_ids
      .slice(0, 2)
      .map((id) => genreMap[id])
      .filter(Boolean)

    return genres.length ? genres.join(', ') : 'Unknown'
  }

  return 'Unknown'
}

export function getMediaMeta(item) {
  return `${getMediaYear(item)} • ${getMediaGenre(item)}`
}