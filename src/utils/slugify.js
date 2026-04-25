export function slugify(text = '') {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function getMediaSlug(item, fallbackMediaType = 'movie') {
  const mediaType = item.media_type || fallbackMediaType

  const title = item.title || item.name || 'title'

  const id = item.id

  const year =
    (item.release_date || item.first_air_date || '').slice(0, 4)

  const cleanTitle = slugify(title)

  return {
    mediaType,
    title,
    cleanTitle,
    id,
    year,
  }
}

export function getDetailsPath(item, fallbackMediaType = 'movie') {
  const { mediaType, cleanTitle, year, id } =
    getMediaSlug(item, fallbackMediaType)

  const slug = year
    ? `${cleanTitle}-${year}`
    : cleanTitle  

  return `/watch/${slug}/${mediaType}/${id}`
}

export function getGenrePath(id,name) {
  return `/watch/${slugify(name)}-movies-and-tv-shows/genre/${id}`
}

export function getYearPath(year) {
  return `/watch/${slugify(year)}-movies-and-tv-shows/`
}

export function getCastPath(cast) {
  return `/watch/${slugify(cast.name)}-movies-and-tv-shows/${cast.id}`
}