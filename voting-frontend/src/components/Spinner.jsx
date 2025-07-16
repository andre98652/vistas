export default function Spinner() {
  return (
    <div className="flex justify-center items-center py-10">
      <svg className="animate-spin h-8 w-8 text-blue-600"
           viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"
                className="opacity-25"/>
        <path d="M22 12a10 10 0 01-10 10V20a8 8 0 008-8h2z"
              fill="currentColor" className="opacity-75"/>
      </svg>
    </div>
  )
}
