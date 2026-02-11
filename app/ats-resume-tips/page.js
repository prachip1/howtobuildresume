import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata = {
  title: 'ATS Resume Tips — Build a Resume That Passes ATS',
  description:
    'How to build a resume that passes ATS: keywords, formatting, section names, file format. Get past applicant tracking systems. Free resume builder.',
  openGraph: {
    title: 'ATS Resume Tips — Build Resume for ATS | howtobuildresume',
    description: 'Build a resume that passes ATS. Keywords, formatting, and best practices.',
  },
}

const atsTips = [
  {
    title: 'Use keywords from the job description',
    body: 'ATS ranks resumes by keyword match. Copy important terms (skills, tools, job titles) from the posting and use them naturally in your summary, experience, and skills.',
  },
  {
    title: 'Stick to simple formatting',
    body: 'Use standard headings (Experience, Education, Skills), single columns, and common fonts (e.g., Arial, Calibri). Avoid tables, text boxes, headers/footers, and graphics that ATS can\'t read.',
  },
  {
    title: 'Save as PDF or Word',
    body: 'Many ATS accept both. If the job says "upload resume," PDF is usually safe. When in doubt, use a clean Word (.docx) file. Our builder exports ATS-friendly PDFs.',
  },
  {
    title: 'Spell out acronyms once',
    body: 'Use "Applicant Tracking System (ATS)" or "Search Engine Optimization (SEO)" so the system matches both the full term and the acronym.',
  },
  {
    title: 'Use standard section names',
    body: 'Label sections clearly: "Work Experience," "Education," "Skills." Creative names like "Where I\'ve Been" can confuse ATS.',
  },
  {
    title: 'Avoid images and complex layouts',
    body: 'Logos, charts, and multi-column layouts often break parsing. Keep the layout linear and text-based so ATS can extract your content correctly.',
  },
]

export default function AtsTipsPage() {
  return (
    <div className="min-h-full bg-[#f0f0f0]">
      <div className="bg-[#f0f0f0] rounded-t-3xl min-h-[calc(100vh-4rem)] pt-12 pb-24 px-4 sm:px-6 lg:px-8">
        <article className="max-w-3xl mx-auto">
          <header className="mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-black mb-4">
              ATS Resume Tips: Get Past Applicant Tracking Systems
            </h1>
            <p className="text-lg text-gray-600">
              Most companies use ATS to screen resumes. These tips help your resume get through so a human actually reads it. Our resume builder is built with ATS in mind.
            </p>
          </header>

          <section className="space-y-8">
            {atsTips.map((tip, i) => (
              <section key={i} className="bg-white rounded-2xl p-6 border-2 border-black shadow-key">
                <h2 className="text-xl font-bold text-black mb-2">{tip.title}</h2>
                <p className="text-gray-700">{tip.body}</p>
              </section>
            ))}
          </section>

          <section className="mt-12 p-6 bg-white rounded-2xl border-2 border-black shadow-key">
            <h2 className="text-xl font-bold text-black mb-2">Build an ATS-optimized resume</h2>
            <p className="text-gray-700 mb-4">
              howtobuildresume uses clean structure and standard sections so your resume parses correctly in ATS. Upload, paste LinkedIn, or start blank—then export a PDF ready to submit.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl bg-ref-green text-black border-2 border-black shadow-key px-4 py-2 font-medium hover:shadow-key-md transition-all"
            >
              Build resume now <ArrowRight className="w-4 h-4" />
            </Link>
          </section>
        </article>
      </div>
    </div>
  )
}
