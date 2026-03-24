import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const siteUrl =
  (typeof process.env.NEXT_PUBLIC_SITE_URL === 'string' && process.env.NEXT_PUBLIC_SITE_URL.trim())
    ? process.env.NEXT_PUBLIC_SITE_URL.trim().replace(/\/$/, '')
    : 'https://www.howtobuildresume.com'

export const metadata = {
  title: 'Resume Writing Tips — How to Build a Standout Resume',
  description:
    'Expert resume writing tips: action verbs, quantified achievements, ATS keywords, tailoring, and clean formatting. Build a resume that gets noticed. Free resume builder.',
  keywords: [
    'resume writing tips',
    'how to write a good resume',
    'resume tips',
    'best resume tips',
    'how to make a resume stand out',
    'resume writing advice',
    'resume tips for job seekers',
  ],
  openGraph: {
    title: 'Resume Writing Tips — Build a Resume | howtobuildresume',
    description: 'Expert tips to build a standout, ATS-friendly resume. Free resume builder.',
    url: `${siteUrl}/tips`,
  },
  alternates: { canonical: `${siteUrl}/tips` },
}

const tips = [
  {
    title: 'Use strong action verbs',
    body: 'Start every bullet point with a powerful action verb: "Led," "Developed," "Implemented," "Achieved," "Reduced," "Launched." Avoid weak openers like "Responsible for" or "Helped with" — they bury your contribution. Action verbs immediately signal ownership and initiative to recruiters. Keep a list of 20–30 verbs relevant to your field and rotate them across bullets so they don\'t all sound the same.',
  },
  {
    title: 'Quantify your impact',
    body: 'Numbers transform a vague bullet into a convincing proof point. "Increased sales by 20%," "Managed a team of 8," "Cut processing time by 30 minutes." If you don\'t have exact figures, use honest approximations ("~15% improvement," "across 3 product lines"). Quantified bullets are more memorable, easier for recruiters to evaluate, and more likely to score well in ATS keyword ranking.',
  },
  {
    title: 'Keep it to one or two pages',
    body: 'For early-career and mid-level roles, aim for one page. Senior roles with 10+ years of experience can use two pages. Anything longer risks being skimmed or ignored. Cut roles older than 15 years, irrelevant positions, and filler descriptions. Every line should directly support why you\'re the right hire for this specific role.',
  },
  {
    title: 'Tailor to every job you apply to',
    body: 'A generic resume is a weak resume. Read each job description carefully and mirror the exact skills, tools, and job titles used. Adjust your summary to reflect the role\'s priorities. Save a master version with everything, then create a tailored copy per application. This takes 10–15 minutes per job but significantly improves your shortlisting rate.',
  },
  {
    title: 'Put the most important information first',
    body: 'Recruiters spend 6–10 seconds on a first scan. Lead with a strong professional summary at the top, then experience, then education and skills. Within each section, put your strongest role and best achievements first. Don\'t bury your biggest win at the bottom of a long list — if the recruiter stops reading early, they should have already seen your best work.',
  },
  {
    title: 'Use a clean, ATS-friendly format',
    body: 'Use one clean font (Arial, Calibri, or Georgia), consistent spacing, and standard section headings like "Work Experience," "Education," and "Skills." Avoid tables, text boxes, headers/footers, and graphics — ATS systems often can\'t parse these correctly. A simple layout also looks more professional to human readers and loads faster in applicant portals.',
  },
  {
    title: 'Proofread carefully — every time',
    body: 'A single typo can cost you an interview. Proofread by reading your resume out loud (you catch more errors this way). Use spellcheck, then read backwards sentence by sentence. Ask a trusted friend or colleague to review it. After any edit, re-read the full document — it\'s easy to introduce new errors while fixing old ones.',
  },
  {
    title: 'Include relevant keywords throughout',
    body: 'ATS systems rank resumes by how many job-relevant keywords they contain. Use exact terms from the job description in your summary, experience bullets, and skills section. Include both the spelled-out form and the acronym ("Machine Learning / ML") so both versions match. Avoid keyword stuffing — integrate terms naturally so the resume still reads well to a human.',
  },
  {
    title: 'Write a targeted summary or objective',
    body: 'Your summary is the first thing read — make it count. In 2–4 sentences, state your title or level, your strongest skill or achievement, and the kind of role you\'re targeting. Use keywords from the job description. For freshers, an objective (your goal and what you offer) works better than a summary of experience you don\'t yet have.',
  },
  {
    title: 'Only include relevant experience and skills',
    body: 'Listing every job you\'ve ever had dilutes the impact of your resume. Include experience that\'s relevant to the role you\'re applying for. For older or unrelated roles, summarize briefly or remove them. In your skills section, list skills that appear in job descriptions for your target roles — not every tool you\'ve ever touched.',
  },
  {
    title: 'Use consistent formatting conventions',
    body: 'Inconsistent formatting signals carelessness to recruiters. Use the same date format throughout (e.g., "Jan 2022 – Mar 2024"). Align all dates consistently. Use the same bullet style and indentation across all sections. Bold company names or don\'t bold them — pick one style and stick to it everywhere. Small inconsistencies add up.',
  },
]

const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What are the most important resume writing tips?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The most impactful resume tips are: use strong action verbs, quantify your achievements with numbers, tailor your resume to each job description, use ATS-friendly formatting, and proofread carefully. A clean one-page resume with specific, measurable bullet points consistently outperforms longer, generic ones.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I make my resume stand out?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'To make your resume stand out, lead with a targeted summary, use quantified bullet points ("increased revenue by 25%"), tailor keywords to the job description, and keep formatting clean and scannable. Most resumes are generic — a tailored resume with specific achievements immediately stands out to both ATS and human recruiters.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long should a resume be?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'One page is ideal for early-career and mid-level candidates. Two pages is acceptable for senior professionals with 10+ years of experience. Anything longer risks being ignored. Cut irrelevant jobs, outdated skills, and filler descriptions to keep it tight and focused.',
      },
    },
    {
      '@type': 'Question',
      name: 'Should I customize my resume for each job?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — tailoring your resume to each job is one of the highest-impact things you can do. Adjust your summary and top bullet points to reflect the role\'s priorities, and match keywords from the job description. Keep a master version and create a tailored copy per application.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I write strong resume bullet points?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Write resume bullet points starting with a strong action verb, followed by what you did and the measurable result. Use the format: [Verb] + [what you did] + [result/impact]. Example: "Reduced customer onboarding time by 40% by redesigning the intake form and automating follow-ups." Aim for 3–5 bullets per role, focusing on achievements over duties.',
      },
    },
  ],
}

export default function TipsPage() {
  return (
    <div className="min-h-full bg-[#f0f0f0]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <div className="bg-[#f0f0f0] rounded-t-3xl min-h-[calc(100vh-4rem)] pt-12 pb-24 px-4 sm:px-6 lg:px-8">
        <article className="max-w-3xl mx-auto">
          <header className="mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-black mb-4">
              Resume Writing Tips
            </h1>
            <p className="text-lg text-gray-600">
              Use these proven tips to write a resume that gets noticed by recruiters and passes ATS checks. Then build yours with our free resume builder.
            </p>
          </header>

          <section className="space-y-8">
            {tips.map((tip, i) => (
              <section key={i} className="bg-white rounded-2xl p-6 border-2 border-black shadow-key">
                <h2 className="text-xl font-bold text-black mb-2">{tip.title}</h2>
                <p className="text-gray-700">{tip.body}</p>
              </section>
            ))}
          </section>

          <section className="mt-12 space-y-6 mb-12">
            <h2 className="text-2xl font-bold text-black">Frequently asked questions about resume writing</h2>
            {faqLd.mainEntity.map((faq, i) => (
              <section key={i} className="bg-white rounded-2xl p-6 border-2 border-black shadow-key">
                <h3 className="text-lg font-bold text-black mb-2">{faq.name}</h3>
                <p className="text-gray-700">{faq.acceptedAnswer.text}</p>
              </section>
            ))}
          </section>

          <section className="p-6 bg-white rounded-2xl border-2 border-black shadow-key">
            <h2 className="text-xl font-bold text-black mb-2">Ready to build your resume?</h2>
            <p className="text-gray-700 mb-4">
              Apply these tips using our free resume builder. Upload an existing resume, paste your LinkedIn, or start from scratch.
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
