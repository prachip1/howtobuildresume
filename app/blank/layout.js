const siteUrl =
  (typeof process.env.NEXT_PUBLIC_SITE_URL === 'string' && process.env.NEXT_PUBLIC_SITE_URL.trim())
    ? process.env.NEXT_PUBLIC_SITE_URL.trim().replace(/\/$/, '')
    : 'https://www.howtobuildresume.com'

export const metadata = {
  title: 'Start from Scratch | howtobuildresume',
  description:
    'Build your resume from scratch with our guided step-by-step process. Answer smart questions and get an ATS-ready resume. Free.',
  openGraph: {
    title: 'Start Blank Resume | howtobuildresume',
    description: 'Build your resume from scratch with guided questions. Free ATS resume builder.',
    url: `${siteUrl}/blank`,
  },
  alternates: { canonical: `${siteUrl}/blank` },
}

export default function BlankLayout({ children }) {
  return children
}
