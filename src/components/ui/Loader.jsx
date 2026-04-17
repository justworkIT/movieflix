export default function Loader({ text = 'Loading...' }) {
  return (
    <div className="px-6 py-10 text-white">
      {text}
    </div>
  )
}