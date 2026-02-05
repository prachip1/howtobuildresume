'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-full bg-[#f0f0f0]">
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-black mb-2">Something went wrong</h1>
          <p className="text-gray-600 mb-6">
            We ran into an error. You can try again or go back home.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="cta" onClick={() => reset()} className="px-6 py-3">
              Try again
            </Button>
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white text-black hover:bg-gray-100 font-semibold border-2 border-black shadow-key hover:shadow-key-md active:shadow-key-sm transition-all"
            >
              Go home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
