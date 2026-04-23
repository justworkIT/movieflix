export function slugify(text = '') {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function getDetailsPath(item, fallbackMediaType = 'movie') {
  const mediaType = item.media_type || fallbackMediaType
  const title = item.title || item.name || 'title'
  return `/${mediaType}/${item.id}/${slugify(title)}`
}