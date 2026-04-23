import { useEffect, useState } from 'react'
import { getPersonNews } from '../../services/news'

export default function PersonNewsSection({ personName }) {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!personName || personName === 'Cast Member') return

    let cancelled = false

    async function loadNews() {
      try {
        setLoading(true)

        console.log('Loading news for:', personName)

        const newsData = await getPersonNews(personName)

        console.log('News returned to component:', newsData)
        console.log('News count:', newsData.length)

        if (!cancelled) {
          if (newsData.length > 0) {
            setArticles(newsData)
          } else {
            console.warn('News API returned empty articles. Keeping old articles.')
          }
        }
      } catch (err) {
        console.error('News section error:', err)
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadNews()

    return () => {
      cancelled = true
    }
  }, [personName])

  return (
    <section>
      <h2 className="mb-6 text-2xl font-bold">Latest News</h2>

      {loading && articles.length === 0 ? (
        <p className="text-sm text-zinc-400">Loading news...</p>
      ) : null}

      {articles.length > 0 ? (
        <div className="space-y-4">
          {articles.map((article) => (
            <a
              key={article.url}
              href={article.url}
              target="_blank"
              rel="noreferrer"
              className="block overflow-hidden rounded-xl border border-white/10 bg-white/5 transition hover:border-white/20 hover:bg-white/10"
            >
              {article.image ? (
                <img
                  src={article.image}
                  alt={article.title}
                  className="h-auto w-full object-contain bg-zinc-900"
                />
              ) : null}

              <div className="p-4">
                <h3 className="line-clamp-2 text-base font-semibold text-white">
                  {article.title}
                </h3>

                {article.source?.name ? (
                  <p className="mt-2 text-xs text-zinc-500">
                    {article.source.name}
                  </p>
                ) : null}

                {article.description ? (
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-zinc-300">
                    {article.description}
                  </p>
                ) : null}
              </div>
            </a>
          ))}
        </div>
      ) : !loading ? (
        <p className="text-sm text-zinc-400">No recent news found.</p>
      ) : null}
    </section>
  )
}