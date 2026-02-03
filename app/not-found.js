import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-full bg-[#f0f0f0]">
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full text-center">
          <h1 className="text-4xl font-bold text-black mb-2">404</h1>
          <p className="text-xl text-gray-600 mb-6">This page could not be found.</p>
          <Link
            href="/"
            className="inline-flex px-6 py-3 rounded-xl bg-ref-green text-black border-2 border-black shadow-key hover:shadow-key-md font-medium transition-all"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  )
}
