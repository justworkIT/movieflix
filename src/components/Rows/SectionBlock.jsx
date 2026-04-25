import MediaRow from './MediaRow'

export default function SectionBlock({ rows }) {
  return (
    <>
      {rows.map((row) => (
        <MediaRow
          key={row.title}
          title={row.title}
          items={row.items}
          mediaType={row.mediaType}
          seeMorePath={row.seeMorePath}
        />
      ))}
    </>
  )
}