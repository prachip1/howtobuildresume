const siteUrl =
  (typeof process.env.NEXT_PUBLIC_SITE_URL === 'string' && process.env.NEXT_PUBLIC_SITE_URL.trim())
    ? process.env.NEXT_PUBLIC_SITE_URL.trim().replace(/\/$/, '')
    : 'https://www.howtobuildresume.com'

export const metadata = {
  title: 'Upload Resume | howtobuildresume',
  description:
    'Upload your existing resume and we enhance it with smart questions. Get an ATS-ready version in minutes. Free.',
  openGraph: {
    title: 'Upload Resume | howtobuildresume',
    description: 'Upload your resume—we improve it with smart questions and ATS-friendly formatting. Free.',
    url: `${siteUrl}/upload`,
  },
  alternates: { canonical: `${siteUrl}/upload` },
}

export default function UploadLayout({ children }) {
  return children
}
