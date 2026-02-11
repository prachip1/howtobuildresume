'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Upload as UploadIcon, FileText, Loader2, AlertCircle, ArrowLeft } from 'lucide-react'
import { RiUploadCloud2Line } from 'react-icons/ri'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function UploadPage() {
  const [file, setFile] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState(null)
  const router = useRouter()

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      if (selectedFile.size > 5 * 1024 * 1024) {
        setError('File size must be less than 5MB')
        return
      }
      setFile(selectedFile)
      setError(null)
    }
  }

  /** For PDF: render first page to image so the server can use vision to match layout. */
  const getPdfFirstPageBase64 = async (fileObj) => {
    const pdfjsLib = await import('pdfjs-dist')
    if (typeof window !== 'undefined' && pdfjsLib.GlobalWorkerOptions) {
      pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://unpkg.com/pdfjs-dist@4.0.379/build/pdf.worker.min.mjs'
    }
    const arrayBuffer = await fileObj.arrayBuffer()
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
    const page = await pdf.getPage(1)
    const scale = 2
    const viewport = page.getViewport({ scale })
    const canvas = document.createElement('canvas')
    canvas.width = viewport.width
    canvas.height = viewport.height
    const ctx = canvas.getContext('2d')
    const renderTask = page.render({ canvasContext: ctx, viewport })
    await renderTask.promise
    const dataUrl = canvas.toDataURL('image/png')
    return dataUrl.indexOf(',') >= 0 ? dataUrl.split(',')[1] : dataUrl
  }

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file')
      return
    }

    setIsUploading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('file', file)

      // For PDFs: send first-page image so server can use vision to match your resume layout
      if (file.type === 'application/pdf') {
        try {
          const firstPageBase64 = await getPdfFirstPageBase64(file)
          if (firstPageBase64) formData.append('firstPageImage', firstPageBase64)
        } catch (e) {
          console.warn('Could not render PDF first page for layout:', e)
        }
      }

      const response = await fetch('/api/parse-file', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const errBody = await response.json()
        throw new Error(errBody.error || 'Failed to process resume')
      }

      const { resumeData, layout } = await response.json()
      sessionStorage.setItem('resumeData', JSON.stringify(resumeData))
      sessionStorage.setItem('resumeSource', 'upload')
      if (layout) sessionStorage.setItem('resumeLayout', JSON.stringify(layout))
      router.push('/resume/preview')
    } catch (err) {
      console.error('Upload error:', err)
      setError(err.message || 'Failed to process resume. Please try again.')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="min-h-full bg-[#f0f0f0]">
      <div className="bg-white rounded-t-3xl min-h-[calc(100vh-4rem)] py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-ref-green mb-8 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-white border-2 border-black shadow-key">
              <RiUploadCloud2Line className="w-8 h-8 text-black" />
            </div>
            <h1 className="text-4xl font-bold text-black mb-2">
              Upload Your Resume
            </h1>
            <p className="text-gray-600">
              Upload your existing resume and we&apos;ll enhance it with smart questions
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Select Your Resume</CardTitle>
              <CardDescription>
                We support PDF and DOCX files up to 5MB
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-ref-green transition-colors cursor-pointer bg-gray-50">
                <input
                  type="file"
                  id="file-upload"
                  accept=".pdf,.docx,.doc"
                  onChange={handleFileChange}
                  className="hidden"
                  disabled={isUploading}
                />
                <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
                  <UploadIcon className="w-12 h-12 text-gray-400 mb-4" />
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">
                    PDF, DOCX (MAX. 5MB)
                  </p>
                </label>
              </div>

              {file && (
                <div className="flex items-center gap-3 p-4 bg-ref-green/10 rounded-xl border border-ref-green/20">
                  <FileText className="w-5 h-5 text-ref-green" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-black">{file.name}</p>
                    <p className="text-xs text-gray-600">
                      {(file.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                  <Button
                    variant="register"
                    size="sm"
                    onClick={() => setFile(null)}
                    disabled={isUploading}
                  >
                    Remove
                  </Button>
                </div>
              )}

              {error && (
                <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <p className="text-sm">{error}</p>
                </div>
              )}

              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center h-10 px-4 py-2 rounded-xl bg-white text-black hover:bg-gray-100 font-semibold border-2 border-black shadow-key hover:shadow-key-md active:shadow-key-sm text-sm transition-all"
                >
                  Cancel
                </Link>
                <Button
                  variant="cta"
                  onClick={handleUpload}
                  disabled={!file || isUploading}
                  size="default"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    'Process Resume'
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don&apos;t have a resume?{' '}
              <Link href="/blank" className="text-ref-green hover:underline font-medium">
                Start from scratch
              </Link>
              {' '}or{' '}
              <Link href="/linkedin" className="text-ref-yellow hover:underline font-medium">
                paste your LinkedIn
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
