import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const siteUrl =
  (typeof process.env.NEXT_PUBLIC_SITE_URL === 'string' && process.env.NEXT_PUBLIC_SITE_URL.trim())
    ? process.env.NEXT_PUBLIC_SITE_URL.trim().replace(/\/$/, '')
    : 'https://www.howtobuildresume.com'

export const metadata = {
  title: 'How to Build a Resume as a Fresher — Step-by-Step Guide (Free)',
  description:
    'How to build a resume as a fresher with no experience: step-by-step guide covering education, projects, internships, skills, and ATS formatting. Free resume builder for freshers.',
  keywords: [
    'how to build resume as fresher',
    'how to build a resume as fresher',
    'resume for freshers',
    'first resume',
    'fresher resume',
    'build resume as fresher',
    'resume builder for freshers',
    'how to make resume with no experience',
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
    title: 'Start with contact info and a clear objective',
    body: 'Add your full name, professional email, phone number, and city. Below that, write a 2–3 line objective — not a summary. A summary recaps experience you don\'t yet have; an objective states your degree, your strongest skill or interest, and the type of role you\'re pursuing. Use keywords from the job descriptions you\'re targeting. Example: "Final-year Computer Science student with hands-on experience in Python and web development seeking a junior software engineering role."',
  },
  {
    n: 2,
    title: 'Lead with your education section',
    body: 'As a fresher, education is your primary credential — put it near the top. List your degree, university, graduation year (or expected), and GPA if it\'s strong (3.5+). Add any relevant coursework, specializations, or academic achievements that align with the jobs you\'re applying for. Include certifications and online courses here too (Coursera, LinkedIn Learning, AWS, etc.) — they signal initiative and can substitute for work experience.',
  },
  {
    n: 3,
    title: 'Highlight projects and internships',
    body: 'This section is often the strongest part of a fresher\'s resume. Include academic projects, personal projects, hackathon entries, internships, and any freelance or volunteer tech work. For each entry: write the project or company name, the technologies or methods used, and 2–3 bullet points describing what you built or contributed and what impact it had. Example: "Built a web scraper in Python that aggregated job listings from 5 sites, reducing manual search time by 80%." Even small projects count if they\'re relevant.',
  },
  {
    n: 4,
    title: 'Add a strong, targeted skills section',
    body: 'List the technical skills, tools, and frameworks that are directly relevant to the roles you\'re applying for. Pull specific terms from job descriptions and use them exactly as written (e.g., "React.js," "SQL," "Google Analytics"). Group by category if you have many: "Programming," "Frameworks," "Tools," "Soft Skills." Be honest — only list skills you can speak to confidently in an interview. A shorter, accurate list beats a long list padded with tools you barely used.',
  },
  {
    n: 5,
    title: 'Keep it to one page and make it ATS-friendly',
    body: 'As a fresher, your resume should be exactly one page. Use simple, single-column formatting with standard section headings ("Education," "Experience," "Skills"). Avoid graphics, tables, or multi-column layouts — ATS systems often misparse these. Save as PDF unless the job specifies otherwise. Tailor your objective, skills, and top bullet points for each application using keywords from the job posting. One well-tailored resume per application beats ten generic ones.',
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
        text: 'Focus on education, academic projects, internships, certifications, and skills. Write a clear objective instead of a summary. Use bullet points to describe what you built or contributed — even in academic or personal projects. Our free resume builder lets you start blank or paste your LinkedIn and guides you step by step.',
      },
    },
    {
      '@type': 'Question',
      name: 'What should a fresher put on a resume?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A fresher resume should include: contact information, an objective or career goal statement, education (degree, school, year, GPA if strong), academic and personal projects, internships or volunteer work, skills section (technical and relevant soft skills), and certifications. Keep it to one page and tailor the keywords to each job.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long should a fresher resume be?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A fresher resume should be exactly one page. You don\'t have 10 years of experience to fill two pages, and a padded one-and-a-half page resume looks worse than a tight one-page version. Focus on quality over quantity — every line should earn its place.',
      },
    },
    {
      '@type': 'Question',
      name: 'Should a fresher write a summary or objective?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A fresher should write an objective, not a summary. A professional summary recaps career achievements you don\'t yet have. An objective states your current status (degree, field), your key strength or skill, and the type of role you\'re targeting. Keep it to 2–3 sentences and use keywords from the job description.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I make my fresher resume ATS-friendly?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'To make a fresher resume ATS-friendly: use keywords from the job description in your objective, skills, and project descriptions. Use standard section headings (Education, Experience, Skills). Avoid tables, graphics, and multi-column layouts. Save as PDF. Keep it one page with clean, simple formatting.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I put academic projects on my resume as a fresher?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — academic projects are one of the strongest sections on a fresher resume. Include the project name, technologies used, and 2–3 bullet points describing what you built and the outcome. Focus on projects that are relevant to the roles you\'re applying for. Personal projects, hackathon entries, and open-source contributions count too.',
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
              Step-by-step guide to building your first resume. No experience? No problem — focus on education, projects, and skills. Use our free resume builder to create an ATS-friendly resume that gets shortlisted.
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

          <section className="space-y-6 mb-12">
            <h2 className="text-2xl font-bold text-black">Frequently asked questions for freshers</h2>
            {faqLd.mainEntity.map((faq, i) => (
              <section key={i} className="bg-white rounded-2xl p-6 border-2 border-black shadow-key">
                <h3 className="text-lg font-bold text-black mb-2">{faq.name}</h3>
                <p className="text-gray-700">{faq.acceptedAnswer.text}</p>
              </section>
            ))}
          </section>

          <section className="p-6 bg-white rounded-2xl border-2 border-black shadow-key">
            <h2 className="text-xl font-bold text-black mb-2">Build your fresher resume free</h2>
            <p className="text-gray-700 mb-4">
              Use howtobuildresume to build your first resume in minutes. Start blank, paste your LinkedIn, or upload a draft — we&apos;ll guide you with smart questions and ATS-friendly formatting.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl bg-ref-green text-black border-2 border-black shadow-key px-4 py-2 font-medium hover:shadow-key-md transition-all"
            >
              Build resume now <ArrowRight className="w-4 h-4" />
            </Link>
          </section>

          <section className="mt-8 p-6 bg-white rounded-2xl border-2 border-black shadow-key">
            <h2 className="text-xl font-bold text-black mb-3">More resume guides</h2>
            <ul className="space-y-2 text-gray-700">
              <li><Link href="/how-to-write-resume" className="text-black font-medium underline underline-offset-2">How to build a resume — step-by-step guide</Link></li>
              <li><Link href="/tips" className="text-black font-medium underline underline-offset-2">Resume writing tips</Link></li>
              <li><Link href="/how-to-build-a-strong-resume" className="text-black font-medium underline underline-offset-2">How to build a strong resume</Link></li>
              <li><Link href="/ats-resume-tips" className="text-black font-medium underline underline-offset-2">ATS resume tips</Link></li>
            </ul>
          </section>
        </article>
      </div>
    </div>
  )
}
