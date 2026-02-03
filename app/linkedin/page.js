'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Linkedin, Loader2, AlertCircle, Sparkles, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { extractPlainTextOnly } from '@/lib/text-sanitizer'

export default function LinkedInPage() {
  const [linkedinText, setLinkedinText] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState(null)
  const router = useRouter()

  const handlePaste = useCallback((e) => {
    const pasted = e.clipboardData?.getData?.('text/plain') ?? ''
    if (!pasted) return
    e.preventDefault()
    const plain = extractPlainTextOnly(pasted)
    setLinkedinText(plain)
    setError(null)
  }, [])

  const handleSubmit = async () => {
    if (!linkedinText.trim()) {
      setError('Please paste your LinkedIn profile text')
      return
    }
    const plainText = extractPlainTextOnly(linkedinText)
    if (plainText.length < 50) {
      setError('The text seems too short. Please paste your complete LinkedIn profile.')
      return
    }
    setIsProcessing(true)
    setError(null)
    try {
      const response = await fetch('/api/parse-linkedin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: plainText }),
      })
      if (!response.ok) {
        const err = await response.json()
        throw new Error(err.error || 'Failed to parse LinkedIn profile')
      }
      const { resumeData } = await response.json()
      sessionStorage.setItem('resumeData', JSON.stringify(resumeData))
      sessionStorage.setItem('resumeSource', 'linkedin')
      router.push('/resume/questions')
    } catch (err) {
      console.error('LinkedIn parsing error:', err)
      setError(err.message || 'Failed to parse LinkedIn profile. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-full bg-ref-dark">
      <div className="bg-white rounded-t-3xl min-h-[calc(100vh-4rem)] py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-ref-green mb-8 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-ref-yellow/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Linkedin className="w-8 h-8 text-ref-yellow" />
            </div>
            <h1 className="text-4xl font-bold text-black mb-2">
              Paste Your LinkedIn Profile
            </h1>
            <p className="text-gray-600">
              Copy your LinkedIn profile information and paste it here. We&apos;ll structure it into a professional resume format.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-ref-yellow" />
                LinkedIn Profile Text
              </CardTitle>
              <CardDescription>
                Copy all text from your LinkedIn profile (About, Experience, Education, Skills, etc.) and paste it below. Only text is used—images and other non-text are ignored.
              </CardDescription>
            </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Textarea
                placeholder="Paste your LinkedIn profile text here...&#10;&#10;Include:&#10;- Your headline and summary&#10;- Work experience&#10;- Education&#10;- Skills&#10;- Certifications&#10;- Projects"
                value={linkedinText}
                onChange={(e) => {
                  setLinkedinText(e.target.value)
                  setError(null)
                }}
                onPaste={handlePaste}
                className="min-h-[300px] font-mono text-sm"
                disabled={isProcessing}
              />
              <p className="text-xs text-gray-500">{linkedinText.length} characters</p>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p className="text-sm">{error}</p>
              </div>
            )}

            <div className="p-4 bg-ref-green/10 rounded-xl border border-ref-green/20">
              <p className="text-sm font-medium text-black mb-2">💡 Tips for best results:</p>
              <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                <li>Include your full work experience with dates</li>
                <li>Copy your education details</li>
                <li>Include all relevant skills</li>
                <li>Add any certifications or projects</li>
              </ul>
            </div>

            <Button
              onClick={handleSubmit}
              disabled={!linkedinText.trim() || isProcessing}
              className="w-full"
              size="lg"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing Your Profile...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Structure My Resume
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don&apos;t have a LinkedIn profile?{' '}
            <Link href="/blank" className="text-ref-green hover:underline font-medium">Start from scratch</Link>
            {' '}or{' '}
            <Link href="/upload" className="text-ref-yellow hover:underline font-medium">upload your resume</Link>
          </p>
        </div>
        </div>
      </div>
    </div>
  )
}
