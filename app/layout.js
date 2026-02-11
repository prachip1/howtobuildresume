import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({ subsets: ['latin'] })

const siteUrl =
  (typeof process.env.NEXT_PUBLIC_SITE_URL === 'string' && process.env.NEXT_PUBLIC_SITE_URL.trim())
    ? process.env.NEXT_PUBLIC_SITE_URL.trim().replace(/\/$/, '')
    : 'https://www.howtobuildresume.com'

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'How to Build a Resume — Free Resume Builder for Freshers & Professionals',
    template: '%s | howtobuildresume',
  },
  description:
    'How to build a resume in minutes: free guide + ATS resume builder. Build resume as fresher or professional—upload file, paste LinkedIn, or start blank. Build resume that gets hired.',
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
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'howtobuildresume',
    title: 'How to Build a Resume — Free Resume Builder for Freshers & Professionals',
    description:
      'How to build a resume in minutes. Build resume as fresher or pro—upload, paste LinkedIn, or start blank. Free ATS resume builder.',
    images: [{ url: '/howtobuildresume.png', width: 1200, height: 630, alt: 'howtobuildresume - How to Build a Resume' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Build a Resume — Free Resume Builder | howtobuildresume',
    description: 'How to build a resume in minutes. Build resume as fresher or professional. Free ATS resume builder.',
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
    // Add your verification codes when you have them (Google Search Console, etc.)
    // google: 'your-google-verification-code',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="min-h-[calc(100vh-4rem)] flex-1 bg-[#f0f0f0]">{children}</main>
          <Footer />
        </div>
        <Analytics />
      </body>
    </html>
  )
}
