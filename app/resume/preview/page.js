'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Eye, ArrowRight, ArrowLeft, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import ResumeTemplate from '@/components/resume/ResumeTemplate'

export const dynamic = 'force-dynamic'

export default function ResumePreviewPage() {
  const router = useRouter()
  const [resumeData, setResumeData] = useState(null)
  const [layout, setLayout] = useState(null)
  const [source, setSource] = useState(null)

  useEffect(() => {
    const storedData = sessionStorage.getItem('resumeData')
    const storedLayout = sessionStorage.getItem('resumeLayout')
    const storedSource = sessionStorage.getItem('resumeSource')

    if (!storedData) {
      router.push('/')
      return
    }

    setResumeData(JSON.parse(storedData))
    setLayout(storedLayout ? JSON.parse(storedLayout) : null)
    setSource(storedSource || 'upload')
  }, [router])

  const handleContinueToEdit = () => {
    // Data already in sessionStorage; go to edit (no questions for upload flow)
    router.push('/editmyresume')
  }

  const handleUploadDifferent = () => {
    sessionStorage.removeItem('resumeData')
    sessionStorage.removeItem('resumeLayout')
    sessionStorage.removeItem('resumeSource')
    router.push('/upload')
  }

  if (!resumeData) {
    return (
      <div className="min-h-full flex items-center justify-center bg-[#f0f0f0]">
        <div className="bg-white rounded-2xl p-8 text-center">
          <div className="w-12 h-12 border-2 border-ref-green border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-gray-600 mt-4">Loading preview...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-full bg-[#f0f0f0]">
      <div className="bg-white rounded-t-3xl min-h-[calc(100vh-4rem)] py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/upload"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-ref-green mb-6 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to upload
          </Link>

          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-ref-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Eye className="w-7 h-7 text-ref-green" />
            </div>
            <h1 className="text-3xl font-bold text-black mb-2">Preview your resume</h1>
            <p className="text-gray-600 max-w-lg mx-auto">
              This is how your resume will look. We&apos;ve matched the layout and style from your upload.
              If you&apos;re happy with it, continue to edit or export.
            </p>
          </div>

          {/* Preview card */}
          <div className="rounded-xl shadow-xl border border-gray-200 overflow-hidden bg-white mb-8">
            <div className="bg-gray-100 px-4 py-2 border-b border-gray-200">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Preview</p>
            </div>
            <div className="p-4 md:p-6 overflow-auto max-h-[70vh]">
              <ResumeTemplate resumeData={resumeData} layout={layout} />
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Button
              variant="register"
              size="lg"
              onClick={handleUploadDifferent}
              className="inline-flex items-center gap-2"
            >
              <Upload className="w-4 h-4" />
              Upload a different file
            </Button>
            <Button
              variant="cta"
              size="lg"
              onClick={handleContinueToEdit}
              className="inline-flex items-center gap-2"
            >
              Yes, continue to edit
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          <p className="text-center text-sm text-gray-500 mt-6">
            You can edit content, save, and export to PDF from the next screen.
          </p>
        </div>
      </div>
    </div>
  )
}
