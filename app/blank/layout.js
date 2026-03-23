const siteUrl =
  (typeof process.env.NEXT_PUBLIC_SITE_URL === 'string' && process.env.NEXT_PUBLIC_SITE_URL.trim())
    ? process.env.NEXT_PUBLIC_SITE_URL.trim().replace(/\/$/, '')
    : 'https://www.howtobuildresume.com'

export const metadata = {
  title: 'Build Resume from Scratch — Free Step-by-Step Resume Builder | howtobuildresume',
  description:
    'Build a resume from scratch with a guided step-by-step process. Perfect for freshers and career changers. Free ATS resume builder — no experience needed.',
  keywords: [
    'build resume from scratch',
    'create resume from scratch',
    'resume builder from scratch',
    'how to build a resume step by step',
    'free resume builder for freshers',
    'start resume from scratch',
    'build first resume',
    'resume builder no experience',
    'create resume free online',
  ],
  openGraph: {
    title: 'Build Resume from Scratch — Free Step-by-Step Resume Builder | howtobuildresume',
    description: 'Build your resume from scratch with guided questions. Perfect for freshers. Free ATS resume builder.',
    url: `${siteUrl}/blank`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Build Resume from Scratch — Free | howtobuildresume',
    description: 'Step-by-step resume builder from scratch. Free, ATS-ready, perfect for freshers.',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: `${siteUrl}/blank` },
}

const blankLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Build Resume from Scratch — howtobuildresume',
  description: 'Build a resume from scratch with a guided, step-by-step process. Free ATS resume builder for freshers and professionals.',
  url: `${siteUrl}/blank`,
  isPartOf: { '@type': 'WebSite', name: 'howtobuildresume', url: siteUrl },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Build Resume from Scratch', item: `${siteUrl}/blank` },
    ],
  },
}

export default function BlankLayout({ children }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blankLd) }} />
      {children}
    </>
  )
}
