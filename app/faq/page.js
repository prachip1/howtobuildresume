import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const siteUrl =
  (typeof process.env.NEXT_PUBLIC_SITE_URL === 'string' && process.env.NEXT_PUBLIC_SITE_URL.trim())
    ? process.env.NEXT_PUBLIC_SITE_URL.trim().replace(/\/$/, '')
    : 'https://www.howtobuildresume.com'

export const metadata = {
  title: 'FAQ — How to Build a Resume & Resume Builder Questions',
  description:
    'FAQ: How to build a resume, build resume as fresher, upload vs LinkedIn vs blank, ATS, PDF export, resume length, and more. Get answers about our free resume builder.',
  openGraph: {
    title: 'FAQ — How to Build a Resume | howtobuildresume',
    description: 'Frequently asked questions about how to build a resume and our free resume builder.',
    url: `${siteUrl}/faq`,
  },
  alternates: { canonical: `${siteUrl}/faq` },
}

const faqs = [
  {
    q: 'How do I build my resume?',
    a: 'You can upload an existing resume (we\'ll enhance it with smart questions), paste your LinkedIn profile (we\'ll turn it into a resume), or start from a blank template. Pick one path on the homepage and follow the steps. The whole process takes 10–20 minutes.',
  },
  {
    q: 'How to build a resume as a fresher?',
    a: 'As a fresher, use our blank template or paste LinkedIn. Focus on education, academic projects, internships, and skills. Write a clear objective instead of a summary. See our step-by-step guide at /how-to-build-resume-as-fresher for a full walkthrough.',
  },
  {
    q: 'Is howtobuildresume free?',
    a: 'Yes. You can create and export your resume for free. We may offer premium features later, but the core resume builder is and will remain free.',
  },
  {
    q: 'Will my resume pass ATS (Applicant Tracking Systems)?',
    a: 'We use clean formatting and standard sections so your resume parses well in most ATS. Use keywords from the job description and follow our ATS tips for best results. See our full guide at /ats-resume-tips.',
  },
  {
    q: 'Can I export my resume as PDF?',
    a: 'Yes. After building your resume you can download it as a PDF, ready to upload to any job application portal.',
  },
  {
    q: 'What file formats can I upload?',
    a: 'You can upload common document formats (e.g., .docx, .pdf) so we can parse your existing resume and help you improve it with guided questions.',
  },
  {
    q: 'How do I paste my LinkedIn?',
    a: 'Copy the text from your LinkedIn profile (About, Experience, Education, Skills) and paste it into our LinkedIn flow. We\'ll structure it into a formatted resume you can edit and export.',
  },
  {
    q: 'Do I need an account?',
    a: 'You may need to sign up to save and export your resume. Check the signup flow on the site for current requirements — it\'s quick and free.',
  },
  {
    q: 'How long should my resume be?',
    a: 'One page is ideal for early-career and most mid-level candidates. Two pages is fine for senior professionals with 10+ years of experience. Anything longer is rarely necessary. Cut irrelevant roles and filler to keep it tight.',
  },
  {
    q: 'Should I tailor my resume for every job?',
    a: 'Yes — tailoring your resume to each job is one of the highest-impact things you can do. Adjust your summary and top bullet points to reflect the role\'s priorities, and use keywords from the job description. Keep a master copy and create tailored versions per application.',
  },
  {
    q: 'What sections should a resume include?',
    a: 'Every resume should have: contact information, a professional summary or objective, work experience, education, and skills. Optional sections include certifications, projects, languages, and volunteer work. Only add sections that are relevant to the role you\'re applying for.',
  },
  {
    q: 'How do I write resume bullet points?',
    a: 'Start each bullet with a strong action verb (Led, Built, Reduced, Launched), describe what you did, and include a measurable result. Example: "Increased customer retention by 15% by redesigning the onboarding flow." Aim for 3–5 bullets per role, focusing on achievements over duties.',
  },
  {
    q: 'Can I use howtobuildresume for a career change?',
    a: 'Yes. Use the blank template to build a resume from scratch, or upload your existing resume and reshape it. Focus your summary and skills on the target role. Highlight transferable skills and relevant projects or side work, even if your job titles don\'t match exactly.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
}

export default function FaqPage() {
  return (
    <div className="min-h-full bg-[#f0f0f0]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="bg-[#f0f0f0] rounded-t-3xl min-h-[calc(100vh-4rem)] pt-12 pb-24 px-4 sm:px-6 lg:px-8">
        <article className="max-w-3xl mx-auto">
          <header className="mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-black mb-4">
              Frequently Asked Questions — How to Build a Resume
            </h1>
            <p className="text-lg text-gray-600">
              Common questions about how to build a resume and howtobuildresume: upload, LinkedIn, blank template, ATS, PDF export, and more.
            </p>
          </header>

          <section className="space-y-6">
            {faqs.map((faq, i) => (
              <section key={i} className="bg-white rounded-2xl p-6 border-2 border-black shadow-key">
                <h2 className="text-lg font-bold text-black mb-2">{faq.q}</h2>
                <p className="text-gray-700">{faq.a}</p>
              </section>
            ))}
          </section>

          <section className="mt-12 p-6 bg-white rounded-2xl border-2 border-black shadow-key">
            <p className="text-gray-700 mb-4">
              Ready to build your resume? Upload, paste LinkedIn, or start blank — all free.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl bg-ref-green text-black border-2 border-black shadow-key px-4 py-2 font-medium hover:shadow-key-md transition-all"
            >
              Build resume now <ArrowRight className="w-4 h-4" />
            </Link>
          </section>

          <section className="mt-8 p-6 bg-white rounded-2xl border-2 border-black shadow-key">
            <h2 className="text-xl font-bold text-black mb-3">Resume guides</h2>
            <ul className="space-y-2 text-gray-700">
              <li><Link href="/how-to-write-resume" className="text-black font-medium underline underline-offset-2">How to build a resume — step-by-step guide</Link></li>
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
