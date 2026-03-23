const siteUrl =
  (typeof process.env.NEXT_PUBLIC_SITE_URL === 'string' && process.env.NEXT_PUBLIC_SITE_URL.trim())
    ? process.env.NEXT_PUBLIC_SITE_URL.trim().replace(/\/$/, '')
    : 'https://www.howtobuildresume.com'

export const metadata = {
  title: 'Upload Resume & Improve It — Free ATS Resume Builder | howtobuildresume',
  description:
    'Upload your resume (PDF or Word) and improve it with smart questions. Get an ATS-optimized, job-ready resume in minutes. Free — no credit card.',
  keywords: [
    'upload resume',
    'improve my resume',
    'resume enhancer online',
    'ATS resume checker free',
    'upload and edit resume',
    'resume upload free',
    'enhance resume online',
    'fix my resume',
    'resume improvement tool',
  ],
  openGraph: {
    title: 'Upload Resume & Improve It — Free ATS Resume Builder | howtobuildresume',
    description: 'Upload your resume (PDF or Word) — we improve it with smart questions and ATS formatting. Free.',
    url: `${siteUrl}/upload`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Upload Resume & Improve It — Free | howtobuildresume',
    description: 'Upload your resume and get an ATS-optimized version in minutes. Free.',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: `${siteUrl}/upload` },
}

const uploadLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Upload Resume & Improve It — howtobuildresume',
  description: 'Upload your existing resume (PDF or Word) and improve it with smart questions. Get an ATS-optimized resume free.',
  url: `${siteUrl}/upload`,
  isPartOf: { '@type': 'WebSite', name: 'howtobuildresume', url: siteUrl },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Upload Resume', item: `${siteUrl}/upload` },
    ],
  },
}

export default function UploadLayout({ children }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(uploadLd) }} />
      {children}
    </>
  )
}
