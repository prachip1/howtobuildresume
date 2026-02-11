import Link from 'next/link'

const resourcesLinks = [
  { href: '/tips', label: 'Resume Tips' },
  { href: '/how-to-write-resume', label: 'How to Build a Resume' },
  { href: '/how-to-build-resume-as-fresher', label: 'Resume for Freshers' },
  { href: '/ats-resume-tips', label: 'ATS Resume Tips' },
  { href: '/faq', label: 'FAQ' },
  { href: '/about', label: 'About' },
  { href: '/privacy', label: 'Privacy' },
]

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 text-gray-700">
              <img src="/howtobuildresume.png" alt="" className="h-7 w-7 object-contain" />
              <span className="font-semibold text-gray-800">howtobuildresume</span>
            </div>
            <p className="mt-2 text-sm text-gray-500 max-w-xs">
              How to build a resume in minutes. Free ATS resume builder for freshers and professionals.
            </p>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
              Resources
            </h3>
            <nav className="flex flex-col gap-2 text-sm" aria-label="Footer resources">
              {resourcesLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-gray-600 hover:text-gray-900 font-medium transition-colors w-fit"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  )
}
