import Link from 'next/link'
import { Upload, FileText, ArrowRight, Mail } from 'lucide-react'
import { GrLinkedin } from 'react-icons/gr'

const siteUrl =
  (typeof process.env.NEXT_PUBLIC_SITE_URL === 'string' && process.env.NEXT_PUBLIC_SITE_URL.trim())
    ? process.env.NEXT_PUBLIC_SITE_URL.trim().replace(/\/$/, '')
    : 'https://howtobuildresume.com'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'howtobuildresume - How to Build a Resume',
  description: 'Learn how to build a resume in minutes. Free ATS-optimized resume builder. Upload your resume, paste LinkedIn, or start from scratch.',
  url: siteUrl,
  applicationCategory: 'BusinessApplication',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: ['How to build a resume', 'Upload resume', 'Paste LinkedIn', 'Start blank', 'ATS-optimized', 'PDF export'],
}

export default function Home() {
  return (
    <div className="min-h-full bg-[#f0f0f0]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Main content area - same bg as outer so no black peeking at rounded corners */}
      <div className="bg-[#f0f0f0] rounded-t-3xl min-h-[calc(100vh-4rem)] pt-12 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section - targets "how to build resume" search */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black mb-6 leading-tight">
              How to Build a Resume
              <br />
              <span className="text-gray-700 font-normal">without hassle.</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Learn how to build a resume in minutes. Free ATS-optimized resume builder—upload your file, paste LinkedIn, or start from scratch.
            </p>
            {/* CTA - Email + Register like reference */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center max-w-md mx-auto">
              <div className="relative w-full sm:w-auto flex-1 max-w-sm">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  placeholder="Please Enter your email"
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border-2 border-black focus:border-gray-400 focus:ring-2 focus:ring-gray-200 outline-none transition-all shadow-key-sm"
                />
              </div>
              <Link
                href="/signup"
                className="w-full sm:w-auto px-8 py-3 rounded-xl bg-white text-black hover:bg-gray-100 font-semibold transition-colors whitespace-nowrap border-2 border-black shadow-key hover:shadow-key-md active:shadow-key-sm"
              >
                Register
              </Link>
            </div>
          </div>

          {/* Feature Cards - Floating style like reference */}
          <div className="relative">
            {/* Decorative green circles (secondary accent) */}
            <div className="absolute -left-20 -top-10 w-64 h-64 bg-ref-green/20 rounded-full blur-3xl -z-10" />
            <div className="absolute -right-20 bottom-20 w-48 h-48 bg-ref-green/10 rounded-full blur-3xl -z-10" />

            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {/* Upload Card - white face, black outline, right-inclined shadow */}
              <Link
                href="/upload"
                className="group relative bg-white rounded-2xl p-6 sm:p-8 shadow-key hover:shadow-key-md border-2 border-black transition-all duration-300 hover:-translate-y-0.5 overflow-hidden"
              >
                <div className="card-hover-grain" aria-hidden />
                <div className="relative z-10 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white border-2 border-black flex items-center justify-center shrink-0 shadow-key-sm group-hover:bg-ref-green/10 transition-colors">
                    <Upload className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h3 className="font-bold text-black text-lg mb-1">Upload Resume</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Upload your existing resume and we&apos;ll enhance it with smart questions.
                    </p>
                    <span className="inline-flex items-center gap-1.5 rounded-xl bg-ref-green text-black border-2 border-black shadow-key px-4 py-2 font-medium text-sm group-hover:shadow-key-md transition-all">
                      Get Started <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>

              {/* LinkedIn Card - white face, black outline, right-inclined shadow */}
              <Link
                href="/linkedin"
                className="group relative bg-white rounded-2xl p-6 sm:p-8 border-2 border-black transition-all duration-300 hover:-translate-y-0.5 shadow-key hover:shadow-key-md overflow-hidden"
              >
                <div className="card-hover-grain" aria-hidden />
                <div className="relative z-10 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white border-2 border-black flex items-center justify-center shrink-0 shadow-key">
                    <GrLinkedin className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h3 className="font-bold text-black text-lg mb-1">Paste LinkedIn</h3>
                    <p className="text-sm text-gray-700 mb-4">
                      Copy your LinkedIn profile and we&apos;ll structure it into a resume.
                    </p>
                    <span className="inline-flex items-center gap-1.5 rounded-xl bg-ref-green text-black border-2 border-black shadow-key px-4 py-2 font-medium text-sm group-hover:shadow-key-md transition-all">
                      Get Started <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>

              {/* Start Blank Card - white face, black outline, right-inclined shadow */}
              <Link
                href="/blank"
                className="group relative bg-white rounded-2xl p-6 sm:p-8 border-2 border-black transition-all duration-300 hover:-translate-y-0.5 shadow-key hover:shadow-key-md overflow-hidden"
              >
                <div className="card-hover-grain" aria-hidden />
                <div className="relative z-10 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white border-2 border-black flex items-center justify-center shrink-0 shadow-key">
                    <FileText className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h3 className="font-bold text-black text-lg mb-1">Start Blank</h3>
                    <p className="text-sm text-gray-700 mb-4">
                      Begin from scratch with our guided step-by-step process.
                    </p>
                    <span className="inline-flex items-center gap-1.5 rounded-xl bg-ref-green text-black border-2 border-black shadow-key px-4 py-2 font-medium text-sm group-hover:shadow-key-md transition-all">
                      Get Started <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
