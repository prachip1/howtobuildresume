import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Analytics } from "@vercel/analytics/next"
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

const siteUrl =
  (typeof process.env.NEXT_PUBLIC_SITE_URL === 'string' && process.env.NEXT_PUBLIC_SITE_URL.trim())
    ? process.env.NEXT_PUBLIC_SITE_URL.trim().replace(/\/$/, '')
    : 'https://www.howtobuildresume.com'

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'How to Build a Resume — Free ATS Resume Builder | howtobuildresume',
    template: '%s | howtobuildresume',
  },
  description:
    'How to build a resume in minutes. Free ATS resume builder — upload your file, paste LinkedIn, or start from scratch. Export to PDF. No signup needed to download.',
  applicationName: 'howtobuildresume',
  keywords: [
    'how to build resume',
    'how to build a resume',
    'how to build resume as fresher',
    'build resume',
    'build a resume',
    'resume builder',
    'free resume builder',
    'free resume maker',
    'ATS resume',
    'first resume',
    'resume for freshers',
    'resume template',
    'create resume',
    'resume writing',
    'LinkedIn to resume',
    'resume tips',
    'professional resume',
  ],
  authors: [{ name: 'howtobuildresume' }],
  creator: 'howtobuildresume',
  publisher: 'howtobuildresume',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'howtobuildresume',
    title: 'How to Build a Resume — Free ATS Resume Builder',
    description:
      'How to build a resume in minutes. Upload, paste LinkedIn, or start from scratch. ATS-ready PDF export. Free.',
    images: [{ url: '/howtobuildresume.png', width: 500, height: 500, alt: 'howtobuildresume - How to Build a Resume' }],
  },
  twitter: {
    card: 'summary',
    title: 'How to Build a Resume — Free ATS Resume Builder',
    description: 'Upload, paste LinkedIn, or start from scratch. ATS-ready resume + PDF. Free.',
    images: ['/howtobuildresume.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: { canonical: siteUrl },
  icons: {
    icon: '/howtobuildresume.png',
  },
  verification: {
    google: 'JWaXGAuBaF5G7Lkdk98W1TmFN9TRmda9we4dLpZP1QA',
  },
}

const organizationLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${siteUrl}/#organization`,
  name: 'howtobuildresume',
  alternateName: ['How to Build Resume', 'how to build resume', 'How to Build a Resume'],
  url: siteUrl,
  logo: {
    '@type': 'ImageObject',
    url: `${siteUrl}/howtobuildresume.png`,
    width: 500,
    height: 500,
  },
}

const websiteLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${siteUrl}/#website`,
  name: 'howtobuildresume',
  alternateName: ['How to Build Resume', 'how to build resume', 'How to Build a Resume'],
  url: siteUrl,
  description: 'How to build a resume in minutes. Free ATS resume builder.',
  publisher: { '@id': `${siteUrl}/#organization` },
  inLanguage: 'en-US',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
        />
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="min-h-[calc(100vh-4rem)] flex-1 bg-[#f0f0f0]">{children}</main>
          <Footer />
        </div>
        <Analytics />
        {/* LocalData analytics */}
        <Script id="localdata-config" strategy="beforeInteractive">{`
          window.LOCALDATA_CONFIG = { apiKey: '${process.env.NEXT_PUBLIC_LOCALDATA_API_KEY || ''}' };
        `}</Script>
        <Script src="https://www.localdata.to/localdata.js" strategy="afterInteractive" />
      </body>
    </html>
  )
}
