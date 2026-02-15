const siteUrl =
  (typeof process.env.NEXT_PUBLIC_SITE_URL === 'string' && process.env.NEXT_PUBLIC_SITE_URL.trim())
    ? process.env.NEXT_PUBLIC_SITE_URL.trim().replace(/\/$/, '')
    : 'https://www.howtobuildresume.com'

export const metadata = {
  title: 'Paste LinkedIn → Get Resume | howtobuildresume',
  description:
    'Turn your LinkedIn profile into a resume. Paste your LinkedIn text—we structure it into an ATS-ready resume. Free.',
  openGraph: {
    title: 'LinkedIn to Resume | howtobuildresume',
    description: 'Paste your LinkedIn profile and get an ATS-ready resume in minutes. Free.',
    url: `${siteUrl}/linkedin`,
  },
  alternates: { canonical: `${siteUrl}/linkedin` },
}

export default function LinkedInLayout({ children }) {
  return children
}
