export default function ErrorMessage({ message = 'Something went wrong.' }) {
  return (
    <div className="px-6 py-10 text-red-500">
      {message}
    </div>
  )
}