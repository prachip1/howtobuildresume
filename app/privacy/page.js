import Link from 'next/link'

export const metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for howtobuildresume. How we collect, use, and protect your data.',
  robots: { index: true, follow: true },
}

export default function PrivacyPage() {
  return (
    <div className="min-h-full bg-[#f0f0f0]">
      <div className="bg-[#f0f0f0] rounded-t-3xl min-h-[calc(100vh-4rem)] pt-12 pb-24 px-4 sm:px-6 lg:px-8">
        <article className="max-w-3xl mx-auto">
          <header className="mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-black mb-4">
              Privacy Policy
            </h1>
            <p className="text-gray-600">
              Last updated: February 2025
            </p>
          </header>

          <section className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-xl font-bold text-black mb-2">Overview</h2>
              <p>
                howtobuildresume (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) respects your privacy. This policy describes how we collect, use, and protect information when you use our resume builder and related services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-black mb-2">Information we collect</h2>
              <p>
                We may collect information you provide when using our service, such as email address (when you sign up), resume content you upload or paste, and usage data (e.g., pages visited, actions taken). We use this to provide and improve our service and to communicate with you when necessary.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-black mb-2">How we use your information</h2>
              <p>
                We use your information to operate the resume builder, personalize your experience, send relevant communications (if you have opted in), and improve our product. We do not sell your personal information to third parties.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-black mb-2">Data security</h2>
              <p>
                We take reasonable measures to protect your data. Resume content and account data are stored and transmitted securely. You are responsible for keeping your login credentials safe.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-black mb-2">Cookies and similar technologies</h2>
              <p>
                We may use cookies and similar technologies for authentication, preferences, and analytics. You can manage cookie settings in your browser.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-black mb-2">Contact</h2>
              <p>
                For privacy-related questions, contact us through the contact information provided on our website.
              </p>
            </section>
          </section>

          <p className="mt-12">
            <Link href="/" className="text-ref-green font-medium hover:underline">
              ← Back to home
            </Link>
          </p>
        </article>
      </div>
    </div>
  )
}
