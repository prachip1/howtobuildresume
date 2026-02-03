import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata = {
  title: 'About howtobuildresume - Free Resume Builder',
  description:
    'About howtobuildresume: free ATS-optimized resume builder. Upload resume, paste LinkedIn, or start blank. Build your first resume without hassle.',
  openGraph: {
    title: 'About | howtobuildresume',
    description: 'About our free resume builder. Build your first resume in minutes.',
  },
}

export default function AboutPage() {
  return (
    <div className="min-h-full bg-[#f0f0f0]">
      <div className="bg-[#f0f0f0] rounded-t-3xl min-h-[calc(100vh-4rem)] pt-12 pb-24 px-4 sm:px-6 lg:px-8">
        <article className="max-w-3xl mx-auto">
          <header className="mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-black mb-4">
              About howtobuildresume
            </h1>
            <p className="text-lg text-gray-600">
              We help you build your first resume—or improve the one you have—without hassle.
            </p>
          </header>

          <section className="space-y-8">
            <section className="bg-white rounded-2xl p-6 border-2 border-black shadow-key">
              <h2 className="text-xl font-bold text-black mb-2">What we do</h2>
              <p className="text-gray-700 mb-4">
                howtobuildresume is a free resume builder that creates professional, ATS-optimized resumes. You can upload an existing resume and we&apos;ll enhance it with smart questions, paste your LinkedIn profile and we&apos;ll turn it into a resume, or start from a blank template and build step by step.
              </p>
              <p className="text-gray-700">
                Our goal is to make resume writing simple so you can focus on getting hired.
              </p>
            </section>

            <section className="bg-white rounded-2xl p-6 border-2 border-black shadow-key">
              <h2 className="text-xl font-bold text-black mb-2">Why ATS matters</h2>
              <p className="text-gray-700">
                Most companies use Applicant Tracking Systems (ATS) to screen resumes. We use clean formatting and standard sections so your resume parses correctly in ATS. We also provide tips on keywords and structure so your resume gets past the bots and in front of recruiters.
              </p>
            </section>

            <section className="bg-white rounded-2xl p-6 border-2 border-black shadow-key">
              <h2 className="text-xl font-bold text-black mb-2">Get started</h2>
              <p className="text-gray-700 mb-4">
                Choose your path: upload a resume, paste LinkedIn, or start blank. Then follow the steps to build and export your resume as a PDF.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-xl bg-ref-green text-black border-2 border-black shadow-key px-4 py-2 font-medium hover:shadow-key-md transition-all"
              >
                Build resume now <ArrowRight className="w-4 h-4" />
              </Link>
            </section>
          </section>
        </article>
      </div>
    </div>
  )
}
