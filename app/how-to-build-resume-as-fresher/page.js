import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const siteUrl =
  (typeof process.env.NEXT_PUBLIC_SITE_URL === 'string' && process.env.NEXT_PUBLIC_SITE_URL.trim())
    ? process.env.NEXT_PUBLIC_SITE_URL.trim().replace(/\/$/, '')
    : 'https://howtobuildresume.com'

export const metadata = {
  title: 'How to Build a Resume as a Fresher — Step-by-Step Guide (Free)',
  description:
    'How to build a resume as a fresher: step-by-step guide. First resume tips—education, projects, skills, internships. Free resume builder for freshers. Build resume that gets shortlisted.',
  keywords: [
    'how to build resume as fresher',
    'how to build a resume as fresher',
    'resume for freshers',
    'first resume',
    'fresher resume',
    'build resume as fresher',
    'resume builder for freshers',
  ],
  openGraph: {
    title: 'How to Build a Resume as a Fresher | Free Guide & Resume Builder',
    description: 'Step-by-step guide: how to build a resume as a fresher. Free resume builder for first-time job seekers.',
    url: `${siteUrl}/how-to-build-resume-as-fresher`,
  },
  alternates: { canonical: `${siteUrl}/how-to-build-resume-as-fresher` },
}

const steps = [
  {
    n: 1,
    title: 'Start with contact and summary',
    body: 'Add your name, email, phone, and city. Write a short objective or summary (2–3 lines) stating your degree, field, and the kind of role you want. Use keywords from job descriptions.',
  },
  {
    n: 2,
    title: 'Lead with education',
    body: 'As a fresher, education is your main credential. List degree, college, year (or expected year), and relevant coursework or grades if strong. Add certifications and online courses that match the job.',
  },
  {
    n: 3,
    title: 'Highlight projects and internships',
    body: 'Include academic projects, internships, and any freelance or volunteer work. For each: name, technologies used, and 2–3 bullet points with results (e.g., "Built X using Y, improving Z").',
  },
  {
    n: 4,
    title: 'Add a strong skills section',
    body: 'List technical skills (languages, tools, frameworks) and soft skills. Use terms from the job posting. Group by category (e.g., Programming, Tools) if you have many.',
  },
  {
    n: 5,
    title: 'Keep it to one page and ATS-friendly',
    body: 'Stick to one page. Use simple headings (Experience, Education, Skills), standard fonts, and no graphics so ATS can read your resume. Tailor keywords for each application.',
  },
]

const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I build a resume as a fresher with no experience?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Focus on education, projects, internships, certifications, and skills. Use a clear objective and strong action verbs. Our free resume builder lets you start blank or paste LinkedIn and guides you step by step.',
      },
    },
    {
      '@type': 'Question',
      name: 'What should a fresher put on a resume?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Include: contact info, objective/summary, education (with relevant coursework), projects, internships or volunteer work, and skills. Keep it to one page and tailor keywords to the job.',
      },
    },
  ],
}

export default function HowToBuildResumeAsFresherPage() {
  return (
    <div className="min-h-full bg-[#f0f0f0]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <div className="bg-[#f0f0f0] rounded-t-3xl min-h-[calc(100vh-4rem)] pt-12 pb-24 px-4 sm:px-6 lg:px-8">
        <article className="max-w-3xl mx-auto">
          <header className="mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-black mb-4">
              How to Build a Resume as a Fresher
            </h1>
            <p className="text-lg text-gray-600">
              Step-by-step guide to build your first resume. No experience? No problem—focus on education, projects, and skills. Use our free resume builder to create an ATS-friendly resume that gets shortlisted.
            </p>
          </header>

          <section className="space-y-6 mb-12">
            {steps.map(({ n, title, body }) => (
              <section key={n} className="bg-white rounded-2xl p-6 border-2 border-black shadow-key">
                <span className="inline-block w-8 h-8 rounded-lg bg-ref-green text-black font-bold text-center leading-8 mb-2">
                  {n}
                </span>
                <h2 className="text-xl font-bold text-black mb-2">{title}</h2>
                <p className="text-gray-700">{body}</p>
              </section>
            ))}
          </section>

          <section className="p-6 bg-white rounded-2xl border-2 border-black shadow-key">
            <h2 className="text-xl font-bold text-black mb-2">Build your fresher resume free</h2>
            <p className="text-gray-700 mb-4">
              Use howtobuildresume to build your first resume in minutes. Start blank, paste your LinkedIn, or upload a draft—we&apos;ll guide you with smart questions and ATS-friendly formatting.
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
