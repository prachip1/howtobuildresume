const siteUrl =
  (typeof process.env.NEXT_PUBLIC_SITE_URL === 'string' && process.env.NEXT_PUBLIC_SITE_URL.trim())
    ? process.env.NEXT_PUBLIC_SITE_URL.trim().replace(/\/$/, '')
    : 'https://www.howtobuildresume.com'

export const metadata = {
  title: 'LinkedIn to Resume — Convert LinkedIn Profile Free | howtobuildresume',
  description:
    'Convert your LinkedIn profile into a resume in minutes. Paste your LinkedIn text and get an ATS-ready resume instantly. Free LinkedIn to resume converter.',
  keywords: [
    'linkedin to resume',
    'convert linkedin to resume',
    'linkedin resume builder',
    'linkedin profile to resume',
    'linkedin resume converter free',
    'turn linkedin into resume',
    'resume from linkedin',
    'free linkedin resume generator',
  ],
  openGraph: {
    title: 'LinkedIn to Resume — Convert LinkedIn Profile Free | howtobuildresume',
    description: 'Paste your LinkedIn profile and get an ATS-ready resume in minutes. Free LinkedIn to resume converter.',
    url: `${siteUrl}/linkedin`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LinkedIn to Resume — Free Converter | howtobuildresume',
    description: 'Convert your LinkedIn profile to an ATS-ready resume in minutes. Free.',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: `${siteUrl}/linkedin` },
}

const linkedinLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'LinkedIn to Resume Converter — howtobuildresume',
  description: 'Convert your LinkedIn profile into a structured, ATS-ready resume. Free LinkedIn to resume tool.',
  url: `${siteUrl}/linkedin`,
  isPartOf: { '@type': 'WebSite', name: 'howtobuildresume', url: siteUrl },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'LinkedIn to Resume', item: `${siteUrl}/linkedin` },
    ],
  },
}

export default function LinkedInLayout({ children }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(linkedinLd) }} />
      {children}
    </>
  )
}
