import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata = {
  title: 'FAQ - Resume Builder Questions Answered',
  description:
    'Frequently asked questions about howtobuildresume: how to build a resume, upload vs LinkedIn vs blank, ATS, PDF export, and more.',
  openGraph: {
    title: 'FAQ | howtobuildresume',
    description: 'Frequently asked questions about our free resume builder.',
  },
}

const faqs = [
  {
    q: 'How do I build my resume?',
    a: 'You can upload an existing resume (we\'ll enhance it with smart questions), paste your LinkedIn profile (we\'ll turn it into a resume), or start from a blank template. Pick one path on the homepage and follow the steps.',
  },
  {
    q: 'Is howtobuildresume free?',
    a: 'Yes. You can create and export your resume for free. We may offer premium features later, but the core resume builder is free.',
  },
  {
    q: 'Will my resume pass ATS (Applicant Tracking Systems)?',
    a: 'We use clean formatting and standard sections so your resume parses well in most ATS. Use keywords from the job description and follow our ATS tips for best results.',
  },
  {
    q: 'Can I export my resume as PDF?',
    a: 'Yes. After building your resume you can download it as a PDF ready to upload to job applications.',
  },
  {
    q: 'What file formats can I upload?',
    a: 'You can upload common document formats (e.g., .docx, .pdf) so we can parse your existing resume and suggest improvements.',
  },
  {
    q: 'How do I paste my LinkedIn?',
    a: 'Copy the text from your LinkedIn profile (About, Experience, Education, Skills) and paste it into our LinkedIn flow. We\'ll structure it into a resume you can edit and export.',
  },
  {
    q: 'Do I need an account?',
    a: 'You may need to sign up to save and export your resume. Check the signup flow on the site for current requirements.',
  },
]

export default function FaqPage() {
  return (
    <div className="min-h-full bg-[#f0f0f0]">
      <div className="bg-[#f0f0f0] rounded-t-3xl min-h-[calc(100vh-4rem)] pt-12 pb-24 px-4 sm:px-6 lg:px-8">
        <article className="max-w-3xl mx-auto">
          <header className="mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-black mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-gray-600">
              Common questions about howtobuildresume and how to build your first resume.
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
              Ready to build your resume? Upload, paste LinkedIn, or start blank.
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
