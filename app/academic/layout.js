const siteUrl =
  (typeof process.env.NEXT_PUBLIC_SITE_URL === 'string' && process.env.NEXT_PUBLIC_SITE_URL.trim())
    ? process.env.NEXT_PUBLIC_SITE_URL.trim().replace(/\/$/, '')
    : 'https://www.howtobuildresume.com'

export const metadata = {
  title: 'Academic & Graduate School Resume Builder — Free | howtobuildresume',
  description:
    'Build a resume or CV for MS, PhD, MBA or any graduate school application. Country-aware — knows what Italy, USA, UK, Germany and other programs expect. Free.',
  keywords: [
    'academic resume builder',
    'graduate school resume',
    'MS application resume',
    'PhD application CV',
    'MBA resume builder',
    'academic CV builder',
    'graduate school CV',
    'university application resume',
    'research resume builder',
  ],
  openGraph: {
    title: 'Academic & Graduate School Resume Builder — Free | howtobuildresume',
    description: 'Build a resume for MS, PhD, or MBA applications. Tailored to your degree type and target country.',
    url: `${siteUrl}/academic`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Academic Resume Builder — Free | howtobuildresume',
    description: 'Build a graduate school resume tailored to your degree type and country. Free.',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: `${siteUrl}/academic` },
}

const academicLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Academic & Graduate School Resume Builder — howtobuildresume',
  description: 'Build a resume or CV for MS, PhD, MBA, or any graduate school application. Country-aware guidance.',
  url: `${siteUrl}/academic`,
  isPartOf: { '@type': 'WebSite', name: 'howtobuildresume', url: siteUrl },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Academic Resume Builder', item: `${siteUrl}/academic` },
    ],
  },
}

export default function AcademicLayout({ children }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(academicLd) }} />
      {children}
    </>
  )
}
