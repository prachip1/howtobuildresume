import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

const siteUrl =
  (typeof process.env.NEXT_PUBLIC_SITE_URL === 'string' && process.env.NEXT_PUBLIC_SITE_URL.trim())
    ? process.env.NEXT_PUBLIC_SITE_URL.trim().replace(/\/$/, '')
    : 'https://howtobuildresume.com'

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'How to Build a Resume Free | howtobuildresume - ATS-Optimized Resume Builder',
    template: '%s | howtobuildresume',
  },
  description:
    'Learn how to build a resume in minutes. Free ATS-optimized resume builder—upload your resume, paste LinkedIn, or start from scratch. Get hired faster.',
  keywords: [
    'how to build a resume',
    'how to build resume',
    'build a resume',
    'resume builder',
    'free resume maker',
    'ATS resume',
    'first resume',
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
    title: 'How to Build a Resume Free | howtobuildresume - ATS Resume Builder',
    description:
      'Learn how to build a resume in minutes. Free ATS-optimized resume builder. Upload, paste LinkedIn, or start blank.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'howtobuildresume - How to Build a Resume' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Build a Resume Free | howtobuildresume',
    description: 'Learn how to build a resume in minutes. Free ATS-optimized resume builder.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: { canonical: siteUrl },
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
          <main className="min-h-[calc(100vh-4rem)] flex-1 bg-ref-dark">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
