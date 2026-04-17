import MediaRow from './MediaRow'

export default function SectionBlock({ title, rows = [] }) {
  return (
    <section>
      {title ? <h3 className="mb-4 text-2xl font-bold">{title}</h3> : null}

      <div className="space-y-8">
        {rows.map((row) => (
          <MediaRow
            key={row.title}
            title={row.title}
            items={row.items}
            mediaType={row.mediaType}
          />
        ))}
      </div>
    </section>
  )
}