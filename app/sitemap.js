/** @type {import('next').MetadataRoute.Sitemap} */
const BASE_URL =
  (typeof process.env.NEXT_PUBLIC_SITE_URL === 'string' && process.env.NEXT_PUBLIC_SITE_URL.trim())
    ? process.env.NEXT_PUBLIC_SITE_URL.trim().replace(/\/$/, '')
    : 'https://howtobuildresume.com'

const staticPages = [
  { url: '', changeFrequency: 'weekly', priority: 1 },
  { url: '/upload', changeFrequency: 'monthly', priority: 0.9 },
  { url: '/linkedin', changeFrequency: 'monthly', priority: 0.9 },
  { url: '/blank', changeFrequency: 'monthly', priority: 0.9 },
  { url: '/signup', changeFrequency: 'monthly', priority: 0.8 },
  { url: '/tips', changeFrequency: 'weekly', priority: 0.9 },
  { url: '/how-to-write-resume', changeFrequency: 'monthly', priority: 0.9 },
  { url: '/how-to-build-resume-as-fresher', changeFrequency: 'monthly', priority: 0.9 },
  { url: '/ats-resume-tips', changeFrequency: 'monthly', priority: 0.9 },
  { url: '/faq', changeFrequency: 'monthly', priority: 0.8 },
  { url: '/about', changeFrequency: 'monthly', priority: 0.7 },
  { url: '/privacy', changeFrequency: 'yearly', priority: 0.3 },
]

export default function sitemap() {
  return staticPages.map(({ url, changeFrequency, priority }) => ({
    url: `${BASE_URL}${url}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }))
}
