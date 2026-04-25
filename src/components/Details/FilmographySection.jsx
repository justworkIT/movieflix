import MediaCard from '../Media/MediaCard'

export default function FilmographySection({ credits }) {
  if (!credits.length) return null

  const filteredCredits = credits.filter(
    (item) =>
      item.media_type === 'movie' ||
      item.media_type === 'tv'
  )

  const movieResults = filteredCredits
    .filter(
      (item) => item.media_type === 'movie'
    )
    .sort(sortByNewest)

  const tvResults = filteredCredits
    .filter((item) => item.media_type === 'tv')
    .sort(sortByNewest)

  return (
    <section className="mt-2">
      <h2 className="mb-2 text-3xl font-bold">
        Filmography
      </h2>

      <FilmographyGroup
        title="Movies"
        items={movieResults}
      />

      <FilmographyGroup
        title="TV Shows"
        items={tvResults}
      />
    </section>
  )
}

function FilmographyGroup({
  title,
  items,
}) {
  if (!items.length) return null

  return (
    <section className="mb-10">
      <h3 className="mb-0 text-2xl font-bold">
        {title}
      </h3>
<div className="h-px flex-1 bg-gradient-to-r from-white/80 to-30" />
      <div className="flex flex-wrap gap-2 mt-2">
{items.map((item) => (
  <MediaCard
    key={item.id}
    item={item}
    mediaType={item.media_type}
  />
))}
      </div>
    </section>
  )
}

function sortByNewest(a, b) {
  const dateA =
    a.release_date ||
    a.first_air_date ||
    ''

  const dateB =
    b.release_date ||
    b.first_air_date ||
    ''

  return dateB.localeCompare(dateA)
}