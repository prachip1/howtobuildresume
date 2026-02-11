import Link from 'next/link'
import { Upload, FileText, ArrowRight, Mail, CheckCircle2, BookOpen, Sparkles, Target } from 'lucide-react'
import { GrLinkedin } from 'react-icons/gr'

const siteUrl =
  (typeof process.env.NEXT_PUBLIC_SITE_URL === 'string' && process.env.NEXT_PUBLIC_SITE_URL.trim())
    ? process.env.NEXT_PUBLIC_SITE_URL.trim().replace(/\/$/, '')
    : 'https://www.howtobuildresume.com'

const webAppLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'howtobuildresume - How to Build a Resume',
  description: 'How to build a resume in minutes. Free ATS resume builder. Build resume as fresher or professional—upload, paste LinkedIn, or start blank.',
  url: siteUrl,
  applicationCategory: 'BusinessApplication',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: ['How to build a resume', 'How to build resume as fresher', 'Build resume', 'Upload resume', 'Paste LinkedIn', 'Start blank', 'ATS-optimized', 'PDF export'],
}

const howToLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Build a Resume',
  description: 'Step-by-step guide to build a resume: upload existing resume, paste LinkedIn, or start from blank. Free ATS-optimized resume builder.',
  step: [
    { '@type': 'HowToStep', name: 'Choose your path', text: 'Upload your resume, paste your LinkedIn profile, or start from a blank template.' },
    { '@type': 'HowToStep', name: 'Answer smart questions', text: 'We ask targeted questions to improve your resume content and structure.' },
    { '@type': 'HowToStep', name: 'Edit and tailor', text: 'Review and edit your resume. Add keywords from job descriptions for ATS.' },
    { '@type': 'HowToStep', name: 'Export PDF', text: 'Download your resume as a professional PDF ready to submit to jobs.' },
  ],
}

const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'How do I build a resume?', acceptedAnswer: { '@type': 'Answer', text: 'You can upload an existing resume (we\'ll enhance it with smart questions), paste your LinkedIn profile (we\'ll turn it into a resume), or start from a blank template. Pick one path on the homepage and follow the steps.' } },
    { '@type': 'Question', name: 'How to build a resume as a fresher?', acceptedAnswer: { '@type': 'Answer', text: 'As a fresher, start with our blank template or paste your LinkedIn. Focus on education, projects, internships, and skills. Use our step-by-step guide and ATS tips. Build resume free at howtobuildresume.' } },
    { '@type': 'Question', name: 'Is the resume builder free?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. You can create and export your resume for free. The core resume builder is free.' } },
  ],
}

export default function Home() {
  return (
    <div className="min-h-full bg-[#f0f0f0]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      {/* Main content area - same bg as outer so no black peeking at rounded corners */}
      <div className="bg-[#f0f0f0] rounded-t-3xl min-h-[calc(100vh-4rem)] pt-12 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section - targets "how to build resume" search */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black mb-6 leading-tight">
              How to Build a Resume
              <br />
              <span className="text-gray-700 font-normal">without hassle.</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Learn how to build a resume in minutes—whether you&apos;re a fresher or a professional. Free ATS resume builder: upload your file, paste LinkedIn, or start from scratch.
            </p>
            {/* CTA - Email + Register like reference */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center max-w-md mx-auto">
              <div className="relative w-full sm:w-auto flex-1 max-w-sm">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  placeholder="Please Enter your email"
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border-2 border-black focus:border-gray-400 focus:ring-2 focus:ring-gray-200 outline-none transition-all shadow-key-sm"
                />
              </div>
              <Link
                href="/signup"
                className="w-full sm:w-auto px-8 py-3 rounded-xl bg-white text-black hover:bg-gray-100 font-semibold transition-colors whitespace-nowrap border-2 border-black shadow-key hover:shadow-key-md active:shadow-key-sm"
              >
                Register
              </Link>
            </div>
          </div>

          {/* Three ways to start - main CTAs */}
          <div className="relative">
            <h2 className="text-2xl sm:text-3xl font-bold text-black text-center mb-2">
              Choose one way to start
            </h2>
            <p className="text-gray-600 text-center max-w-xl mx-auto mb-10">
              Pick the option that fits you — you only need to do one.
            </p>
            {/* Decorative green circles (secondary accent) */}
            <div className="absolute -left-20 -top-10 w-64 h-64 bg-ref-green/20 rounded-full blur-3xl -z-10" />
            <div className="absolute -right-20 bottom-20 w-48 h-48 bg-ref-green/10 rounded-full blur-3xl -z-10" />

            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {/* Upload Card - white face, black outline, right-inclined shadow */}
              <Link
                href="/upload"
                className="group relative bg-white rounded-2xl p-6 sm:p-8 shadow-key hover:shadow-key-md border-2 border-black transition-all duration-300 hover:-translate-y-0.5 overflow-hidden"
              >
                <div className="card-hover-grain" aria-hidden />
                <div className="relative z-10 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white border-2 border-black flex items-center justify-center shrink-0 shadow-key-sm">
                    <Upload className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h3 className="font-bold text-black text-lg mb-1">Upload Resume</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Upload your existing resume and we&apos;ll enhance it with smart questions.
                    </p>
                    <span className="inline-flex items-center gap-1.5 rounded-xl bg-ref-green text-black border-2 border-black shadow-key px-4 py-2 font-medium text-sm group-hover:shadow-key-md transition-all">
                      Get Started <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>

              {/* LinkedIn Card - white face, black outline, right-inclined shadow */}
              <Link
                href="/linkedin"
                className="group relative bg-white rounded-2xl p-6 sm:p-8 border-2 border-black transition-all duration-300 hover:-translate-y-0.5 shadow-key hover:shadow-key-md overflow-hidden"
              >
                <div className="card-hover-grain" aria-hidden />
                <div className="relative z-10 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white border-2 border-black flex items-center justify-center shrink-0 shadow-key">
                    <GrLinkedin className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h3 className="font-bold text-black text-lg mb-1">Paste LinkedIn</h3>
                    <p className="text-sm text-gray-700 mb-4">
                      Copy your LinkedIn profile and we&apos;ll structure it into a resume.
                    </p>
                    <span className="inline-flex items-center gap-1.5 rounded-xl bg-ref-green text-black border-2 border-black shadow-key px-4 py-2 font-medium text-sm group-hover:shadow-key-md transition-all">
                      Get Started <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>

              {/* Start Blank Card - white face, black outline, right-inclined shadow */}
              <Link
                href="/blank"
                className="group relative bg-white rounded-2xl p-6 sm:p-8 border-2 border-black transition-all duration-300 hover:-translate-y-0.5 shadow-key hover:shadow-key-md overflow-hidden"
              >
                <div className="card-hover-grain" aria-hidden />
                <div className="relative z-10 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white border-2 border-black flex items-center justify-center shrink-0 shadow-key">
                    <FileText className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h3 className="font-bold text-black text-lg mb-1">Start Blank</h3>
                    <p className="text-sm text-gray-700 mb-4">
                      Begin from scratch with our guided step-by-step process.
                    </p>
                    <span className="inline-flex items-center gap-1.5 rounded-xl bg-ref-green text-black border-2 border-black shadow-key px-4 py-2 font-medium text-sm group-hover:shadow-key-md transition-all">
                      Get Started <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* How it works */}
          <section className="mt-24 mb-24">
            <h2 className="text-2xl sm:text-3xl font-bold text-black text-center mb-3">
              How it works
            </h2>
            <p className="text-gray-600 text-center max-w-xl mx-auto mb-12">
              Choose your path, answer a few questions, and get a job-ready resume in minutes.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { step: '1', title: 'Choose your path', desc: 'Upload a resume, paste LinkedIn, or start blank.', icon: Target },
                { step: '2', title: 'Answer smart questions', desc: 'We ask targeted questions to improve your content.', icon: Sparkles },
                { step: '3', title: 'Edit & tailor', desc: 'Review, add keywords, and match the job description.', icon: FileText },
                { step: '4', title: 'Export PDF', desc: 'Download an ATS-friendly resume ready to submit.', icon: CheckCircle2 },
              ].map(({ step, title, desc, icon: Icon }) => (
                <div
                  key={step}
                  className="group relative bg-white rounded-2xl p-6 border-2 border-black shadow-key-sm text-center transition-all duration-300 hover:-translate-y-0.5 hover:shadow-key-md overflow-hidden cursor-pointer"
                >
                  <div className="card-hover-grain" aria-hidden />
                  <div className="relative z-10">
                    <span className="inline-flex w-10 h-10 rounded-xl bg-ref-green text-black font-bold items-center justify-center mb-3">{step}</span>
                    <Icon className="w-6 h-6 text-black mx-auto mb-2 opacity-80" />
                    <h3 className="font-bold text-black mb-1">{title}</h3>
                    <p className="text-sm text-gray-600">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Why howtobuildresume */}
          <section className="mb-24">
            <div className="bg-white rounded-2xl border-2 border-black shadow-key p-8 sm:p-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-black text-center mb-8">
                Why howtobuildresume
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  'Free forever — create and export without paying.',
                  'ATS-optimized — clean format that passes applicant tracking systems.',
                  'Three ways in — upload, paste LinkedIn, or start from scratch.',
                  'Guided questions — we help you say more with less effort.',
                  'PDF in minutes — no design skills needed.',
                  'For freshers & pros — first resume or career change.',
                ].map((line, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-ref-green shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm sm:text-base">{line}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Guides & resources — fresher guide lives here */}
          <section className="mb-24">
            <h2 className="text-2xl sm:text-3xl font-bold text-black text-center mb-3">
              Guides & resources
            </h2>
            <p className="text-gray-600 text-center max-w-xl mx-auto mb-10">
              Step-by-step guides to build a resume that gets shortlisted.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link
                href="/how-to-build-resume-as-fresher"
                className="group relative bg-white rounded-2xl p-6 border-2 border-black shadow-key hover:shadow-key-md transition-all hover:-translate-y-0.5 flex flex-col overflow-hidden"
              >
                <div className="card-hover-grain" aria-hidden />
                <div className="relative z-10 flex flex-col flex-1">
                  <BookOpen className="w-8 h-8 text-black mb-3 opacity-80" />
                  <h3 className="font-bold text-black text-lg mb-2">How to Build a Resume as a Fresher</h3>
                  <p className="text-sm text-gray-600 mb-4 flex-1">
                    New to the job market? Focus on education, projects, internships, and skills. Step-by-step tips for your first resume.
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-ref-green font-medium text-sm group-hover:gap-2 transition-all">
                    Read guide <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
              <Link
                href="/how-to-write-resume"
                className="group relative bg-white rounded-2xl p-6 border-2 border-black shadow-key hover:shadow-key-md transition-all hover:-translate-y-0.5 flex flex-col overflow-hidden"
              >
                <div className="card-hover-grain" aria-hidden />
                <div className="relative z-10 flex flex-col flex-1">
                  <FileText className="w-8 h-8 text-black mb-3 opacity-80" />
                  <h3 className="font-bold text-black text-lg mb-2">How to Build a Resume (Full Guide)</h3>
                  <p className="text-sm text-gray-600 mb-4 flex-1">
                    Sections, formatting, ATS tips, and examples. Build a resume that gets past screening.
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-ref-green font-medium text-sm group-hover:gap-2 transition-all">
                    Read guide <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
              <Link
                href="/tips"
                className="group relative bg-white rounded-2xl p-6 border-2 border-black shadow-key hover:shadow-key-md transition-all hover:-translate-y-0.5 flex flex-col overflow-hidden"
              >
                <div className="card-hover-grain" aria-hidden />
                <div className="relative z-10 flex flex-col flex-1">
                  <Sparkles className="w-8 h-8 text-black mb-3 opacity-80" />
                  <h3 className="font-bold text-black text-lg mb-2">Resume Writing Tips</h3>
                  <p className="text-sm text-gray-600 mb-4 flex-1">
                    Action verbs, keywords, length, and formatting. Use these with our builder for best results.
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-ref-green font-medium text-sm group-hover:gap-2 transition-all">
                    Read tips <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            </div>
          </section>

          {/* Final CTA */}
          <section className="text-center pb-8">
            <div className="bg-white rounded-2xl border-2 border-black shadow-key p-8 sm:p-10 max-w-2xl mx-auto">
              <h2 className="text-xl sm:text-2xl font-bold text-black mb-2">
                Ready to build your resume?
              </h2>
              <p className="text-gray-600 mb-6">
                Upload, paste LinkedIn, or start blank — free.
              </p>
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 rounded-xl bg-ref-green text-black border-2 border-black shadow-key px-6 py-3 font-semibold hover:shadow-key-md transition-all"
              >
                Get started — it&apos;s free <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
