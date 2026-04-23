const GNEWS_API_KEY = import.meta.env.VITE_GNEWS_API_KEY
const GNEWS_BASE_URL = 'https://gnews.io/api/v4'

export async function getPersonNews(personName) {
  console.log('GNews API key exists:', Boolean(GNEWS_API_KEY))
  console.log('Person name for news:', personName)

  if (!GNEWS_API_KEY || !personName) {
    console.warn('Missing API key or person name')
    return []
  }

  const query = encodeURIComponent(`"${personName}" movie OR film OR actor OR actress`)
  const url = `${GNEWS_BASE_URL}/search?q=${query}&lang=en&max=5&apikey=${GNEWS_API_KEY}`

  console.log('GNews URL:', url)

  const response = await fetch(url)

  console.log('GNews status:', response.status)

  const data = await response.json()

  console.log('GNews response:', data)

  if (!response.ok) {
    throw new Error(data.errors?.join(', ') || 'Failed to fetch person news')
  }

  return data.articles || []
}