import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const siteUrl =
  (typeof process.env.NEXT_PUBLIC_SITE_URL === 'string' && process.env.NEXT_PUBLIC_SITE_URL.trim())
    ? process.env.NEXT_PUBLIC_SITE_URL.trim().replace(/\/$/, '')
    : 'https://www.howtobuildresume.com'

export const metadata = {
  title: 'How to Build a Resume — Step-by-Step Guide (Free)',
  description:
    'How to build a resume from scratch: choose your format, write a summary, list experience with quantified bullets, add skills, and optimize for ATS. Free guide + resume builder.',
  keywords: ['how to build a resume', 'how to build resume', 'build resume', 'build a resume', 'resume guide', 'how to make a resume', 'resume from scratch'],
  openGraph: {
    title: 'How to Build a Resume — Step-by-Step Guide | howtobuildresume',
    description: 'Step-by-step guide: how to build a resume. Free resume builder included.',
    url: `${siteUrl}/how-to-write-resume`,
  },
  alternates: { canonical: `${siteUrl}/how-to-write-resume` },
}

const steps = [
  {
    n: 1,
    title: 'Choose your format',
    body: 'Use reverse-chronological order (most recent job first) — it\'s what recruiters and ATS expect and the safest choice for most job seekers. Only use a functional (skills-based) or hybrid format if you have significant employment gaps or are making a major career change. Whatever format you choose, keep it consistent throughout. Most hiring managers prefer clean, predictable layouts over creative ones.',
  },
  {
    n: 2,
    title: 'Add contact information',
    body: 'Include your full name, professional email address, phone number, and city/region. Optionally add your LinkedIn URL or portfolio link. You do not need a full mailing address in most markets — city and state/country is enough. Avoid adding a photo unless it\'s standard in your country (e.g., some European markets). Make sure your email sounds professional, not a nickname from years ago.',
  },
  {
    n: 3,
    title: 'Write a short professional summary',
    body: 'Write 2–4 sentences at the top of your resume that immediately tell the recruiter who you are, what you offer, and what you\'re looking for. Lead with your job title or years of experience, name your top strength or achievement, and close with your target role or industry. Use keywords from the job description here. This section is often the only part read before a recruiter decides whether to continue — make it count.',
  },
  {
    n: 4,
    title: 'List your work experience',
    body: 'For each role, include: job title, company name, location, and dates (month/year). Under each role, write 3–5 bullet points that describe what you achieved — not just what you were assigned. Start each bullet with a strong action verb ("Led," "Built," "Reduced") and include numbers wherever possible ("Increased conversion by 18%," "Managed a team of 6"). Tailor these bullets to the job you\'re applying for.',
  },
  {
    n: 5,
    title: 'Add your education',
    body: 'List your highest degree first: degree name, institution, graduation year (or expected year). Include GPA only if it\'s strong (3.5+) and you\'re early in your career. Add relevant certifications, bootcamps, or online courses below your formal education — especially if they directly relate to the role. For senior professionals, keep the education section brief; your experience should speak louder.',
  },
  {
    n: 6,
    title: 'Include a skills section',
    body: 'List technical and domain-specific skills relevant to your target roles. Use exact terms from job descriptions (e.g., "Python," "Google Analytics," "Agile / Scrum"). Group skills by category if you have many: "Technical," "Tools," "Languages." Be honest — don\'t list skills you can\'t back up in an interview. Soft skills like "communication" add little value unless illustrated through your bullet points.',
  },
  {
    n: 7,
    title: 'Proofread and tailor before every application',
    body: 'Before sending, check spelling and grammar carefully — read the resume aloud to catch awkward phrasing. Then tailor your summary, top bullets, and skills section to each specific job. Adjust keywords to match the posting. Save a master version of your resume, then create a named copy per application (e.g., "Resume_CompanyName_Role"). Small tailoring efforts consistently improve shortlisting rates.',
  },
]

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Build a Resume',
  description: 'A step-by-step guide to building a professional resume that gets past ATS and into a recruiter\'s hands.',
  step: steps.map((s) => ({
    '@type': 'HowToStep',
    name: s.title,
    text: s.body,
  })),
}

const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I build a resume from scratch?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'To build a resume from scratch: choose a reverse-chronological format, add your contact info and a professional summary, list your work experience with quantified bullet points, add your education and skills, then proofread and tailor it to the job. Our free resume builder walks you through each step with guided questions.',
      },
    },
    {
      '@type': 'Question',
      name: 'What should every resume include?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Every resume should include: contact information (name, email, phone, city), a professional summary or objective, work experience with achievement-focused bullet points, education, and a skills section. Optional sections include certifications, projects, languages, and volunteer work.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long should a resume be?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'One page is ideal for most early-career and mid-level candidates. Senior professionals with 10+ years of experience can use two pages. Anything longer is rarely necessary and risks being skimmed. Cut older roles, irrelevant experience, and filler to stay tight.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I build a resume with no experience?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'If you have no work experience, focus on education, academic projects, internships, volunteering, certifications, and skills. Write an objective instead of a summary. Use specific examples of what you built, learned, or contributed — even in non-work contexts. Our free resume builder has a guided blank template for freshers.',
      },
    },
    {
      '@type': 'Question',
      name: 'What format should I save my resume in?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Save your resume as a PDF for most applications — it preserves formatting and is accepted by most ATS. If the job posting requests a Word file (.docx), use that instead. Avoid .pages, image files, or other formats that may not parse correctly.',
      },
    },
  ],
}

export default function HowToWriteResumePage() {
  return (
    <div className="min-h-full bg-[#f0f0f0]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <div className="bg-[#f0f0f0] rounded-t-3xl min-h-[calc(100vh-4rem)] pt-12 pb-24 px-4 sm:px-6 lg:px-8">
        <article className="max-w-3xl mx-auto">
          <header className="mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-black mb-4">
              How to Build a Resume
            </h1>
            <p className="text-lg text-gray-600">
              A step-by-step guide to building a professional resume that gets past ATS and into a recruiter&apos;s hands. Follow each step below, then build your resume free with our builder.
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

          <section className="space-y-6 mb-12">
            <h2 className="text-2xl font-bold text-black">Frequently asked questions</h2>
            {faqLd.mainEntity.map((faq, i) => (
              <section key={i} className="bg-white rounded-2xl p-6 border-2 border-black shadow-key">
                <h3 className="text-lg font-bold text-black mb-2">{faq.name}</h3>
                <p className="text-gray-700">{faq.acceptedAnswer.text}</p>
              </section>
            ))}
          </section>

          <section className="p-6 bg-white rounded-2xl border-2 border-black shadow-key">
            <h2 className="text-xl font-bold text-black mb-2">Build your resume with howtobuildresume</h2>
            <p className="text-gray-700 mb-4">
              Follow this guide and build your resume in one place. Upload a draft, paste your LinkedIn, or start from a blank template — all free.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl bg-ref-green text-black border-2 border-black shadow-key px-4 py-2 font-medium hover:shadow-key-md transition-all"
            >
              Start building <ArrowRight className="w-4 h-4" />
            </Link>
          </section>

          <section className="mt-8 p-6 bg-white rounded-2xl border-2 border-black shadow-key">
            <h2 className="text-xl font-bold text-black mb-3">More resume guides</h2>
            <ul className="space-y-2 text-gray-700">
              <li><Link href="/tips" className="text-black font-medium underline underline-offset-2">Resume writing tips</Link></li>
              <li><Link href="/how-to-build-a-strong-resume" className="text-black font-medium underline underline-offset-2">How to build a strong resume</Link></li>
              <li><Link href="/how-to-build-resume-as-fresher" className="text-black font-medium underline underline-offset-2">How to build a resume as a fresher</Link></li>
              <li><Link href="/ats-resume-tips" className="text-black font-medium underline underline-offset-2">ATS resume tips</Link></li>
            </ul>
          </section>
        </article>
      </div>
    </div>
  )
}
