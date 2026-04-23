export async function getPersonNews(personName) {
  if (!personName) return []

  const response = await fetch(
    `/.netlify/functions/person-news?personName=${encodeURIComponent(personName)}`
  )

  const data = await response.json()

  console.log('Netlify news response:', data)

  if (!response.ok) {
    console.error('News function error:', data)
    return []
  }

  return data.articles || []
}