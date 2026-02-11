import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata = {
  title: 'Resume Writing Tips — How to Build a Standout Resume',
  description:
    'Expert resume writing tips: structure, action verbs, keywords. Build a resume that gets noticed. Free resume builder tips for freshers and professionals.',
  openGraph: {
    title: 'Resume Writing Tips — Build a Resume | howtobuildresume',
    description: 'Expert tips to build a standout, ATS-friendly resume. Free resume builder.',
  },
}

const tips = [
  {
    title: 'Use strong action verbs',
    body: 'Start bullet points with verbs like "Led," "Developed," "Implemented," "Achieved," "Managed." Avoid weak phrases like "Responsible for" or "Helped with."',
  },
  {
    title: 'Quantify your impact',
    body: 'Add numbers wherever possible: "Increased sales by 20%," "Managed a team of 5," "Reduced costs by $10K." Numbers make your resume more credible and scannable.',
  },
  {
    title: 'Keep it to one or two pages',
    body: 'For most roles, one page is ideal for early-career; two pages max for senior roles. Every line should earn its place.',
  },
  {
    title: 'Tailor to the job',
    body: 'Match keywords from the job description. Use the same terms (skills, tools, titles) so ATS and recruiters see a clear fit.',
  },
  {
    title: 'Put the most important info first',
    body: 'Lead with a strong summary or objective, then experience, then education and skills. Put your best achievements at the top of each section.',
  },
  {
    title: 'Use a clean, simple format',
    body: 'Stick to one font, clear headings, and consistent spacing. Fancy designs can break in ATS systems—simple and readable wins.',
  },
  {
    title: 'Proofread carefully',
    body: 'Spelling and grammar errors hurt your credibility. Read aloud or use a tool; even one typo can cost you an interview.',
  },
  {
    title: 'Include relevant keywords',
    body: 'Include industry and role-specific keywords naturally in your summary, experience, and skills. This helps both ATS and human readers.',
  },
]

export default function TipsPage() {
  return (
    <div className="min-h-full bg-[#f0f0f0]">
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

          <section className="mt-12 p-6 bg-white rounded-2xl border-2 border-black shadow-key">
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
        </article>
      </div>
    </div>
  )
}
