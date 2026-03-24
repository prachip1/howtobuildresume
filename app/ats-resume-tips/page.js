import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const siteUrl =
  (typeof process.env.NEXT_PUBLIC_SITE_URL === 'string' && process.env.NEXT_PUBLIC_SITE_URL.trim())
    ? process.env.NEXT_PUBLIC_SITE_URL.trim().replace(/\/$/, '')
    : 'https://www.howtobuildresume.com'

export const metadata = {
  title: 'ATS Resume Tips — Build a Resume That Passes ATS',
  description:
    'How to make your resume ATS-friendly: use job description keywords, clean single-column formatting, standard section names, and the right file format. Free ATS-optimized resume builder.',
  keywords: [
    'ATS resume tips',
    'how to make resume ATS friendly',
    'applicant tracking system resume',
    'ATS optimized resume',
    'how to pass ATS',
    'ATS resume keywords',
    'ATS friendly resume format',
  ],
  openGraph: {
    title: 'ATS Resume Tips — Build Resume for ATS | howtobuildresume',
    description: 'Build a resume that passes ATS. Keywords, formatting, and best practices.',
    url: `${siteUrl}/ats-resume-tips`,
  },
  alternates: { canonical: `${siteUrl}/ats-resume-tips` },
}

const atsTips = [
  {
    title: 'Use keywords from the job description',
    body: 'ATS ranks resumes by keyword match. Scan each job posting and pull out the most repeated terms — skills, tools, job titles, and qualifications. Use these exact words (not synonyms) in your summary, experience bullets, and skills section. The more your resume reflects the language of the posting, the higher it ranks. Include both spelled-out and acronym forms: "Project Management / PMP" and "JavaScript / JS" to match both variations.',
  },
  {
    title: 'Stick to simple, single-column formatting',
    body: 'Use standard headings (Work Experience, Education, Skills), a single-column layout, and a common font like Arial, Calibri, or Times New Roman. Avoid tables, text boxes, and multi-column designs — ATS parsers often misread these and scramble your content into the wrong fields. Anything that\'s hard for a parser to read will likely result in your resume being ranked lower or filtered out entirely.',
  },
  {
    title: 'Save and submit as PDF or .docx',
    body: 'Most modern ATS accept both PDF and Word (.docx). PDF is generally safe as long as the file is text-based (not a scanned image). If the job posting specifies a format, use that. Avoid .doc (old Word format), .pages (Apple), or image files like .jpg or .png — these often parse incorrectly or not at all. Our resume builder exports ATS-friendly, text-based PDFs.',
  },
  {
    title: 'Spell out acronyms at least once',
    body: 'ATS systems match keywords literally. Write "Applicant Tracking System (ATS)" and "Search Engine Optimization (SEO)" so the system can match both the full phrase and the short form. This is especially important for certifications, tools, and professional titles that are commonly abbreviated in your industry.',
  },
  {
    title: 'Use standard section names',
    body: 'Label your resume sections with names ATS recognizes: "Work Experience" or "Professional Experience," "Education," "Skills," "Certifications." Avoid creative names like "Where I\'ve Been" or "What I Know" — these confuse parsers and may cause sections to be misclassified or skipped entirely. Standard section names ensure your content lands in the right fields in the ATS database.',
  },
  {
    title: 'Avoid images, logos, and complex layouts',
    body: 'Profile photos, company logos, charts, progress bars, and icons look good visually but break ATS parsing. These elements are either ignored or cause parsing errors that scramble surrounding text. Your resume should be 100% text-based. If you want to show design skill, save it for your portfolio or personal site — not your resume.',
  },
  {
    title: 'Match your job title to the posting',
    body: 'ATS systems often match candidates against job title fields specifically. If the job is listed as "Senior Software Engineer" and your current title is "Software Developer III," consider whether using the more standard industry title in your summary is accurate and appropriate. Don\'t misrepresent your title, but do use terms that reflect what your role actually was and what the market recognizes.',
  },
  {
    title: 'Never put important content in headers or footers',
    body: 'Many ATS ignore headers and footers entirely during parsing. Never put your name, contact info, or any other important content there. Keep everything in the main body of the document. Your name and contact details should appear at the very top of the page body — not in a document header section — so they are reliably extracted by the ATS.',
  },
]

const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is an ATS and how does it screen resumes?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ATS stands for Applicant Tracking System. Companies use it to automatically screen and rank resumes before a human ever sees them. The system parses your resume into structured fields (name, experience, skills) and ranks you based on keyword match with the job description. Resumes that don\'t match enough keywords or that use complex formatting are often filtered out automatically.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I make my resume ATS-friendly?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'To make your resume ATS-friendly: use keywords from the job description, stick to a single-column layout with standard section names, avoid tables and graphics, save as PDF or .docx, and never put important content in headers or footers. Use standard section headings like "Work Experience," "Education," and "Skills."',
      },
    },
    {
      '@type': 'Question',
      name: 'Does PDF format pass ATS?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — most modern ATS systems accept PDF files, as long as the PDF is text-based (not a scanned image). A text-based PDF created from a word processor or our resume builder will parse correctly. Avoid PDFs created from scans or images, as the ATS cannot extract text from them.',
      },
    },
    {
      '@type': 'Question',
      name: 'What percentage of resumes are rejected by ATS?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Studies suggest that a large proportion of resumes are filtered out by ATS before a recruiter sees them. Most rejections happen due to keyword mismatch (resume doesn\'t reflect the job description language) or formatting issues (tables, graphics, or complex layouts that confuse the parser). Following ATS best practices dramatically improves your chances of reaching a human reviewer.',
      },
    },
    {
      '@type': 'Question',
      name: 'Should I use a resume template for ATS?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, but choose the right kind. ATS-friendly templates use single-column layouts, standard section headings, plain text formatting, and no graphics or tables. Avoid fancy designer templates with multiple columns, sidebars, icons, or decorative elements — even if they look great, they often fail ATS parsing. Our free resume builder uses an ATS-optimized template by default.',
      },
    },
  ],
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Make Your Resume ATS-Friendly',
  description: 'Steps to optimize your resume to pass Applicant Tracking Systems: keywords, formatting, file format, and section names.',
  step: atsTips.map((t) => ({
    '@type': 'HowToStep',
    name: t.title,
    text: t.body,
  })),
}

export default function AtsTipsPage() {
  return (
    <div className="min-h-full bg-[#f0f0f0]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <div className="bg-[#f0f0f0] rounded-t-3xl min-h-[calc(100vh-4rem)] pt-12 pb-24 px-4 sm:px-6 lg:px-8">
        <article className="max-w-3xl mx-auto">
          <header className="mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-black mb-4">
              ATS Resume Tips: Get Past Applicant Tracking Systems
            </h1>
            <p className="text-lg text-gray-600">
              Most companies use ATS to screen resumes before a human ever sees them. These tips help your resume get parsed correctly, ranked higher, and seen by a recruiter. Our resume builder is built with ATS in mind.
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

          <section className="mt-12 space-y-6 mb-12">
            <h2 className="text-2xl font-bold text-black">Frequently asked questions about ATS</h2>
            {faqLd.mainEntity.map((faq, i) => (
              <section key={i} className="bg-white rounded-2xl p-6 border-2 border-black shadow-key">
                <h3 className="text-lg font-bold text-black mb-2">{faq.name}</h3>
                <p className="text-gray-700">{faq.acceptedAnswer.text}</p>
              </section>
            ))}
          </section>

          <section className="p-6 bg-white rounded-2xl border-2 border-black shadow-key">
            <h2 className="text-xl font-bold text-black mb-2">Build an ATS-optimized resume</h2>
            <p className="text-gray-700 mb-4">
              howtobuildresume uses clean structure and standard sections so your resume parses correctly in ATS. Upload, paste LinkedIn, or start blank — then export a PDF ready to submit.
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
              <li><Link href="/how-to-build-resume-as-fresher" className="text-black font-medium underline underline-offset-2">How to build a resume as a fresher</Link></li>
            </ul>
          </section>
        </article>
      </div>
    </div>
  )
}
