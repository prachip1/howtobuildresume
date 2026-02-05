'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FileText, Upload, Linkedin, Home } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/upload', label: 'Upload', icon: Upload },
  { href: '/linkedin', label: 'LinkedIn', icon: Linkedin },
  { href: '/blank', label: 'Start Blank', icon: FileText },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <header className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Left */}
          <Link href="/" className="flex items-center gap-2 text-gray-700 hover:text-gray-900 shrink-0">
            <span className="text-2xl font-light">📃</span>
            <span className="font-semibold text-gray-800">howtobuildresume</span>
          </Link>

          {/* Nav Links - Center (hidden on mobile) */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(({ href, label, icon: Icon }, i) => (
              <span key={href} className="flex items-center">
                {i > 0 && <span className="text-gray-400 mx-1">•</span>}
                <Link
                  href={href}
                  className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                    pathname === href ? 'text-ref-green' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {label}
                </Link>
              </span>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <Link href="/signin" className="hidden sm:inline text-sm font-medium text-gray-600 hover:text-gray-900">
              Login
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center px-4 py-2 rounded-xl bg-ref-green hover:bg-ref-green-dark text-black font-medium text-sm transition-colors border-2 border-black shadow-key hover:shadow-key-md active:shadow-key-sm"
            >
              Get Started — It&apos;s Free
            </Link>
          </div>
        </div>

        {/* Mobile menu */}
        <div className="md:hidden py-3 border-t border-gray-100">
          <div className="flex flex-wrap gap-2">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`px-3 py-1.5 rounded text-sm ${pathname === href ? 'bg-ref-green/10 text-ref-green' : 'text-gray-600'}`}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}
