export async function handler(event) {
  const personName = event.queryStringParameters?.personName

  if (!personName) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Missing personName' }),
    }
  }

  const apiKey = process.env.GNEWS_API_KEY

  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Missing GNEWS_API_KEY' }),
    }
  }

  const query = encodeURIComponent(
    `"${personName}" movie OR film OR actor OR actress`
  )

  const url = `https://gnews.io/api/v4/search?q=${query}&lang=en&max=5&apikey=${apiKey}`

  try {
    const response = await fetch(url)
    const data = await response.json()

    return {
      statusCode: response.status,
      body: JSON.stringify(data),
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to fetch news' }),
    }
  }
}