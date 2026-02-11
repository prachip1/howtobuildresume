import Link from 'next/link'
import { ArrowLeft, Edit3, Eye, Save, Download, Layout, Database, Sparkles } from 'lucide-react'

export const metadata = {
  title: 'Edit My Resume — Coming Soon',
  description: 'Edit your resume in one place. Real-time preview, save to account, export PDF. Coming soon.',
}

const features = [
  {
    icon: Edit3,
    title: 'Edit everything in one place',
    desc: 'Update personal info, work experience, education, skills, and projects. Add or remove sections with ease.',
  },
  {
    icon: Eye,
    title: 'Real-time preview',
    desc: 'See your resume update as you type. No more guessing how it will look.',
  },
  {
    icon: Save,
    title: 'Save to your account',
    desc: 'Sync your resume across devices. Pick up where you left off anytime.',
  },
  {
    icon: Download,
    title: 'Export to PDF',
    desc: 'Download an ATS-friendly PDF ready to upload to job applications.',
  },
  {
    icon: Layout,
    title: 'Preserve your layout',
    desc: 'Upload a resume and we match its style. Edit content while keeping the look you like.',
  },
  {
    icon: Database,
    title: 'Multiple resumes',
    desc: 'Manage several resumes from your dashboard. Tailor each for different roles.',
  },
  {
    icon: Sparkles,
    title: 'Free to use',
    desc: 'Core editing, saving, and PDF export are free. Build resumes without paying.',
  },
]

export default function EditMyResumeComingSoonPage() {
  return (
    <div className="min-h-full bg-[#f0f0f0]">
      <div className="bg-[#f0f0f0] rounded-t-3xl min-h-[calc(100vh-4rem)] pt-12 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-black mb-8 text-sm font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>

          <header className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-ref-green/20 text-ref-green-dark font-medium text-sm mb-4">
              Coming soon
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-black mb-4">
              Edit My Resume
            </h1>
            <p className="text-lg text-gray-600 max-w-xl mx-auto">
              A full resume editor is on the way. Edit content, preview in real time, save to your account, and export to PDF—all in one place.
            </p>
          </header>

          <section className="mb-12">
            <h2 className="text-xl font-bold text-black mb-6">What you&apos;ll be able to do</h2>
            <div className="space-y-4">
              {features.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="group bg-white rounded-2xl p-5 sm:p-6 border-2 border-black shadow-key-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-key-md overflow-hidden relative"
                >
                  <div className="card-hover-grain" aria-hidden />
                  <div className="relative z-10 flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-ref-green/20 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-ref-green-dark" />
                    </div>
                    <div>
                      <h3 className="font-bold text-black mb-1">{title}</h3>
                      <p className="text-sm text-gray-600">{desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="text-center">
            <p className="text-gray-600 mb-6">
              In the meantime, build your resume with Upload, LinkedIn, or Start Blank.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl bg-ref-green text-black border-2 border-black shadow-key px-6 py-3 font-semibold hover:shadow-key-md transition-all"
            >
              Build resume now
            </Link>
          </section>
        </div>
      </div>
    </div>
  )
}
