'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Upload as UploadIcon, FileText, Loader2, AlertCircle, ArrowLeft } from 'lucide-react'
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

      const response = await fetch('/api/parse-file', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to process resume')
      }

      const { resumeData } = await response.json()
      sessionStorage.setItem('resumeData', JSON.stringify(resumeData))
      sessionStorage.setItem('resumeSource', 'upload')
      router.push('/resume/questions')
    } catch (err) {
      console.error('Upload error:', err)
      setError(err.message || 'Failed to process resume. Please try again.')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="min-h-full bg-ref-dark">
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
            <div className="w-16 h-16 bg-ref-yellow/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <UploadIcon className="w-8 h-8 text-ref-yellow" />
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
                    variant="ghost"
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

              <Button
                onClick={handleUpload}
                disabled={!file || isUploading}
                className="w-full"
                size="lg"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing Resume...
                  </>
                ) : (
                  'Process Resume'
                )}
              </Button>
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
