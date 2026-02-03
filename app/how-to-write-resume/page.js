import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata = {
  title: 'How to Write a Resume - Step-by-Step Guide for 2025',
  description:
    'Learn how to write a resume from scratch: sections, formatting, ATS optimization, and examples. Free guide + resume builder to create your first resume.',
  openGraph: {
    title: 'How to Write a Resume | howtobuildresume',
    description: 'Step-by-step guide to writing a professional resume. Free resume builder included.',
  },
}

const steps = [
  { n: 1, title: 'Choose your format', body: 'Use reverse-chronological order (most recent job first). It\'s what recruiters and ATS expect. Only use functional or hybrid if you have big employment gaps.' },
  { n: 2, title: 'Add contact info', body: 'Name, email, phone, and city/region. Optionally add LinkedIn. No need for full address or photo in most markets.' },
  { n: 3, title: 'Write a short summary', body: '2–4 sentences that say who you are, what you offer, and what you\'re looking for. Use keywords from your target job.' },
  { n: 4, title: 'List your experience', body: 'For each role: job title, company, dates, and 3–5 bullet points. Start with action verbs and include results (numbers, impact).' },
  { n: 5, title: 'Add education', body: 'Degree, school, graduation year. Add GPA only if strong and relevant. Include certifications or courses if they match the job.' },
  { n: 6, title: 'Include skills', body: 'List technical and soft skills. Use terms from the job description. Group by category (e.g., "Technical," "Tools") if you have many.' },
  { n: 7, title: 'Proofread and tailor', body: 'Check spelling and grammar. Then tailor the summary, keywords, and bullet points to each job you apply to.' },
]

export default function HowToWriteResumePage() {
  return (
    <div className="min-h-full bg-[#f0f0f0]">
      <div className="bg-[#f0f0f0] rounded-t-3xl min-h-[calc(100vh-4rem)] pt-12 pb-24 px-4 sm:px-6 lg:px-8">
        <article className="max-w-3xl mx-auto">
          <header className="mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-black mb-4">
              How to Write a Resume
            </h1>
            <p className="text-lg text-gray-600">
              A step-by-step guide to writing a professional resume that gets past ATS and into a recruiter&apos;s hands. Use our free resume builder to put it all together.
            </p>
          </header>

          <section className="space-y-6 mb-12">
            {steps.map(({ n, title, body }) => (
              <section key={n} className="bg-white rounded-2xl p-6 border-2 border-black shadow-key">
                <span className="inline-block w-8 h-8 rounded-lg bg-ref-green text-black font-bold text-center leading-8 mb-2">{n}</span>
                <h2 className="text-xl font-bold text-black mb-2">{title}</h2>
                <p className="text-gray-700">{body}</p>
              </section>
            ))}
          </section>

          <section className="p-6 bg-white rounded-2xl border-2 border-black shadow-key">
            <h2 className="text-xl font-bold text-black mb-2">Write your resume with howtobuildresume</h2>
            <p className="text-gray-700 mb-4">
              Follow this guide and build your resume in one place. Upload a draft, paste your LinkedIn, or start from a blank template—all free.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl bg-ref-green text-black border-2 border-black shadow-key px-4 py-2 font-medium hover:shadow-key-md transition-all"
            >
              Start building <ArrowRight className="w-4 h-4" />
            </Link>
          </section>
        </article>
      </div>
    </div>
  )
}
