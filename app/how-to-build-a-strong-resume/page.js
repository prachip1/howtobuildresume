import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const siteUrl =
  (typeof process.env.NEXT_PUBLIC_SITE_URL === 'string' && process.env.NEXT_PUBLIC_SITE_URL.trim())
    ? process.env.NEXT_PUBLIC_SITE_URL.trim().replace(/\/$/, '')
    : 'https://www.howtobuildresume.com'

export const metadata = {
  title: 'How to Build a Strong Resume — Tips That Get You Shortlisted',
  description:
    'How to build a strong resume: impact-focused bullets, keyword alignment, clear structure, and tailoring. Free guide + ATS resume builder. Build a strong resume that stands out.',
  keywords: [
    'how to build a strong resume',
    'strong resume',
    'build a strong resume',
    'resume that stands out',
    'powerful resume',
    'effective resume',
    'resume tips',
  ],
  openGraph: {
    title: 'How to Build a Strong Resume | howtobuildresume',
    description: 'Learn how to build a strong resume with impact, keywords, and clear structure. Free guide + resume builder.',
    url: `${siteUrl}/how-to-build-a-strong-resume`,
  },
  alternates: { canonical: `${siteUrl}/how-to-build-a-strong-resume` },
}

const tips = [
  {
    title: 'Lead with impact, not duties',
    body: 'A strong resume shows what you achieved, not just what you were responsible for. Use action verbs and numbers: "Increased conversion by 25%" beats "Responsible for conversion."',
  },
  {
    title: 'Match the job description',
    body: 'Use the same keywords and phrases from the posting in your summary, experience, and skills. This helps ATS rank you and shows recruiters you\'re a fit.',
  },
  {
    title: 'Keep structure clear and simple',
    body: 'Use standard headings (Experience, Education, Skills), one font, consistent spacing, and one or two pages. Clarity beats creativity for both humans and ATS.',
  },
  {
    title: 'Quantify wherever you can',
    body: 'Numbers make your resume stronger: team size, revenue impact, time saved, percentage improved. Even rough estimates ("~20% faster") add credibility.',
  },
  {
    title: 'Tailor for each role',
    body: 'A strong resume is not one-size-fits-all. Adjust your summary and top bullets to reflect what each employer cares about. Save a master version, then tailor copies.',
  },
  {
    title: 'Put your best content first',
    body: 'Recruiters skim. Put your strongest role and best achievements at the top of each section. Lead each bullet with the most impressive result.',
  },
  {
    title: 'Proofread and trim',
    body: 'Typos weaken a strong resume. Read aloud, use a spell-check, and cut filler. Every line should earn its place.',
  },
]

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Build a Strong Resume',
  description: 'Tips to build a strong resume: impact-focused bullets, keyword alignment, clear structure, and tailoring for each job.',
  step: tips.map((t) => ({
    '@type': 'HowToStep',
    name: t.title,
    text: t.body,
  })),
}

export default function HowToBuildAStrongResumePage() {
  return (
    <div className="min-h-full bg-[#f0f0f0]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <div className="bg-[#f0f0f0] rounded-t-3xl min-h-[calc(100vh-4rem)] pt-12 pb-24 px-4 sm:px-6 lg:px-8">
        <article className="max-w-3xl mx-auto">
          <header className="mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-black mb-4">
              How to Build a Strong Resume
            </h1>
            <p className="text-lg text-gray-600">
              A strong resume gets you shortlisted. Learn how to build one with impact-focused bullets, keyword alignment, clear structure, and tailoring—plus a free ATS-friendly resume builder.
            </p>
          </header>

          <section className="space-y-6 mb-12">
            {tips.map((tip, i) => (
              <section key={i} className="bg-white rounded-2xl p-6 border-2 border-black shadow-key">
                <h2 className="text-xl font-bold text-black mb-2">{tip.title}</h2>
                <p className="text-gray-700">{tip.body}</p>
              </section>
            ))}
          </section>

          <section className="p-6 bg-white rounded-2xl border-2 border-black shadow-key">
            <h2 className="text-xl font-bold text-black mb-2">Build your strong resume free</h2>
            <p className="text-gray-700 mb-4">
              Use howtobuildresume to apply these tips: upload a draft, paste LinkedIn, or start blank. We guide you with smart questions and ATS-friendly formatting.
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
