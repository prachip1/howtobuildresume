'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  GraduationCap, ArrowRight, ArrowLeft, Globe, BookOpen,
  FlaskConical, Trophy, Upload, FileText, Loader2, AlertCircle, X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const DEGREE_OPTIONS = [
  { value: 'ms', label: "Master's Degree (MS / MSc / MA / MEng)" },
  { value: 'phd', label: 'PhD / Doctoral Program' },
  { value: 'mba', label: 'MBA (Master of Business Administration)' },
  { value: 'bachelor', label: "Bachelor's Degree (BS / BA)" },
  { value: 'diploma', label: 'Postgraduate Diploma / Certificate' },
  { value: 'other', label: 'Other Graduate Program' },
]

const COUNTRY_OPTIONS = [
  { value: 'usa', label: 'United States (USA)' },
  { value: 'uk', label: 'United Kingdom (UK)' },
  { value: 'canada', label: 'Canada' },
  { value: 'australia', label: 'Australia' },
  { value: 'germany', label: 'Germany' },
  { value: 'italy', label: 'Italy' },
  { value: 'france', label: 'France' },
  { value: 'netherlands', label: 'Netherlands' },
  { value: 'sweden', label: 'Sweden' },
  { value: 'switzerland', label: 'Switzerland' },
  { value: 'singapore', label: 'Singapore' },
  { value: 'india', label: 'India' },
  { value: 'other', label: 'Other Country' },
]

const steps = [
  {
    n: 1,
    icon: Globe,
    label: 'Tell us your target',
    desc: 'Degree type, country, and program — so we know exactly what format and sections matter',
  },
  {
    n: 2,
    icon: BookOpen,
    label: 'Answer smart questions',
    desc: 'AI generates questions specific to your degree type and the country you are applying to',
  },
  {
    n: 3,
    icon: FlaskConical,
    label: 'Research & academic background',
    desc: 'Research experience, publications, honors — what actually matters for academic applications',
  },
  {
    n: 4,
    icon: Trophy,
    label: 'Your tailored resume',
    desc: 'Get a resume built for your specific program — not a generic job resume',
  },
]

// Starting point options
const STARTING_POINT = {
  SCRATCH: 'scratch',
  UPLOAD: 'upload',
}

export default function AcademicPage() {
  const router = useRouter()

  // Target program context
  const [degreeType, setDegreeType] = useState('')
  const [targetCountry, setTargetCountry] = useState('')
  const [targetProgram, setTargetProgram] = useState('')
  const [targetInstitution, setTargetInstitution] = useState('')

  // Starting point
  const [startingPoint, setStartingPoint] = useState(STARTING_POINT.SCRATCH)
  const [file, setFile] = useState(null)

  // UI state
  const [isProcessing, setIsProcessing] = useState(false)
  const [processingMsg, setProcessingMsg] = useState('')
  const [error, setError] = useState('')

  const handleFileChange = (e) => {
    const selected = e.target.files[0]
    if (!selected) return
    if (selected.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB')
      return
    }
    setFile(selected)
    setError('')
  }

  /** Render first page of a PDF to base64 so the parse API can extract layout. */
  const getPdfFirstPageBase64 = async (fileObj) => {
    try {
      const pdfjsLib = await import('pdfjs-dist')
      if (typeof window !== 'undefined' && pdfjsLib.GlobalWorkerOptions) {
        pdfjsLib.GlobalWorkerOptions.workerSrc =
          'https://unpkg.com/pdfjs-dist@4.0.379/build/pdf.worker.min.mjs'
      }
      const arrayBuffer = await fileObj.arrayBuffer()
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
      const page = await pdf.getPage(1)
      const viewport = page.getViewport({ scale: 2 })
      const canvas = document.createElement('canvas')
      canvas.width = viewport.width
      canvas.height = viewport.height
      await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise
      const dataUrl = canvas.toDataURL('image/png')
      return dataUrl.indexOf(',') >= 0 ? dataUrl.split(',')[1] : dataUrl
    } catch {
      return null
    }
  }

  const buildAcademicContext = () => ({
    resumePurpose: 'academic',
    degreeType,
    targetCountry,
    targetProgram: targetProgram.trim(),
    targetInstitution: targetInstitution.trim(),
    jobRole: '',
    experienceYears: '',
    jobLookingFor: '',
    careerBreakYears: '0',
    careerBreakMonths: '0',
  })

  const emptyAcademicFields = {
    researchExperience: [],
    publications: [],
    honors: [],
    languageSkills: [],
  }

  const handleStart = async () => {
    if (!degreeType || !targetCountry || !targetProgram.trim()) {
      setError('Please fill in degree type, country, and program before continuing.')
      return
    }
    if (startingPoint === STARTING_POINT.UPLOAD && !file) {
      setError('Please select a resume file or switch to "Start from scratch".')
      return
    }
    setError('')
    setIsProcessing(true)

    try {
      let resumeData

      if (startingPoint === STARTING_POINT.UPLOAD && file) {
        // Step 1: parse the existing resume
        setProcessingMsg('Reading your resume...')
        const formData = new FormData()
        formData.append('file', file)
        if (file.type === 'application/pdf') {
          const img = await getPdfFirstPageBase64(file)
          if (img) formData.append('firstPageImage', img)
        }

        const parseRes = await fetch('/api/parse-file', { method: 'POST', body: formData })
        if (!parseRes.ok) {
          const body = await parseRes.json()
          throw new Error(body.error || 'Failed to parse resume')
        }
        const { resumeData: parsed } = await parseRes.json()

        // Step 2: merge parsed data with academic context + add empty academic sections
        resumeData = {
          ...parsed,
          context: buildAcademicContext(),
          // Preserve parsed sections; add academic-specific ones if absent
          researchExperience: parsed.researchExperience || [],
          publications: parsed.publications || [],
          honors: parsed.honors || [],
          languageSkills: parsed.languageSkills || [],
          // Mark that this came from an uploaded resume so AI can treat it as "existing data"
          _sourceResume: 'uploaded',
        }
      } else {
        // Scratch — empty slate
        resumeData = {
          context: buildAcademicContext(),
          personalInfo: { name: '', email: '', phone: '', location: '', linkedin: '', github: '', portfolio: '' },
          summary: '',
          workExperience: [],
          education: [],
          skills: [],
          projects: [],
          certifications: [],
          ...emptyAcademicFields,
        }
      }

      sessionStorage.setItem('resumeData', JSON.stringify(resumeData))
      sessionStorage.setItem('resumeSource', 'academic')
      sessionStorage.setItem('currentStep', '0')
      window.LyticData?.track('academic_resume_start', {
        degreeType,
        targetCountry,
        targetProgram: targetProgram.trim(),
        startingPoint,
      })
      router.push('/resume/questions')
    } catch (err) {
      console.error('Academic start error:', err)
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setIsProcessing(false)
      setProcessingMsg('')
    }
  }

  const degreeLabelMap = Object.fromEntries(DEGREE_OPTIONS.map(o => [o.value, o.label]))
  const countryLabelMap = Object.fromEntries(COUNTRY_OPTIONS.map(o => [o.value, o.label]))

  const contextPreview =
    degreeType && targetCountry && targetProgram.trim()
      ? `${degreeLabelMap[degreeType]} · ${targetProgram.trim()} · ${countryLabelMap[targetCountry]}`
      : null

  const ctaLabel = isProcessing
    ? processingMsg || 'Processing...'
    : startingPoint === STARTING_POINT.UPLOAD && file
    ? 'Upload & generate my questions'
    : 'Generate my questions'

  return (
    <div className="min-h-full bg-[#f0f0f0]">
      <div className="bg-[#f0f0f0] rounded-t-3xl min-h-[calc(100vh-4rem)] py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-black mb-8 text-sm">
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>

          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-white border-2 border-black shadow-key">
              <GraduationCap className="w-8 h-8 text-black" />
            </div>
            <h1 className="text-4xl font-bold text-black mb-2">Academic Resume Builder</h1>
            <p className="text-gray-600 max-w-md mx-auto">
              MS, PhD, MBA? We tailor the questions to your exact degree type and country — Italy, USA, Germany, wherever.
            </p>
          </div>

          {/* ── Card 1: Target program ── */}
          <Card className="border-2 border-black mb-5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-black">
                <Globe className="w-5 h-5" />
                Step 1 — Your target program
              </CardTitle>
              <CardDescription className="text-gray-600">
                An MS in Italy needs a different resume than an MS in the USA. Tell us where you are applying.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Degree Type */}
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-black">
                  Degree type <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={degreeType}
                    onChange={(e) => setDegreeType(e.target.value)}
                    className="w-full h-12 pl-4 pr-10 rounded-xl border-2 border-gray-200 bg-white text-base text-black focus:border-gray-400 focus:ring-2 focus:ring-gray-100 focus:outline-none transition-all appearance-none cursor-pointer"
                  >
                    <option value="">Select degree type...</option>
                    {DEGREE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                  <ChevronDown />
                </div>
              </div>

              {/* Target Country */}
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-black">
                  Target country <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={targetCountry}
                    onChange={(e) => setTargetCountry(e.target.value)}
                    className="w-full h-12 pl-4 pr-10 rounded-xl border-2 border-gray-200 bg-white text-base text-black focus:border-gray-400 focus:ring-2 focus:ring-gray-100 focus:outline-none transition-all appearance-none cursor-pointer"
                  >
                    <option value="">Select country...</option>
                    {COUNTRY_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                  <ChevronDown />
                </div>
              </div>

              {/* Program */}
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-black">
                  Program / field of study <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  value={targetProgram}
                  onChange={(e) => setTargetProgram(e.target.value)}
                  placeholder="e.g. Computer Science, Data Science, Civil Engineering"
                  className="h-12 w-full rounded-xl border-2 border-gray-200 px-4 text-base text-black focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
                />
              </div>

              {/* Institution */}
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-black">
                  Target institution{' '}
                  <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <Input
                  type="text"
                  value={targetInstitution}
                  onChange={(e) => setTargetInstitution(e.target.value)}
                  placeholder="e.g. Politecnico di Milano, MIT, University of Toronto"
                  className="h-12 w-full rounded-xl border-2 border-gray-200 px-4 text-base text-black focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
                />
                <p className="text-xs text-gray-500">Knowing the institution lets us tailor advice even further.</p>
              </div>

              {contextPreview && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-gray-50 border border-gray-200">
                  <GraduationCap className="w-4 h-4 text-gray-500 shrink-0" />
                  <span className="text-sm text-gray-700">{contextPreview}</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* ── Card 2: Starting point ── */}
          <Card className="border-2 border-black mb-5">
            <CardHeader>
              <CardTitle className="text-black flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Step 2 — Where are you starting from?
              </CardTitle>
              <CardDescription className="text-gray-600">
                Already have a job resume? Upload it and we will reuse what is relevant and only ask for what is missing.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Toggle buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => { setStartingPoint(STARTING_POINT.SCRATCH); setFile(null) }}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    startingPoint === STARTING_POINT.SCRATCH
                      ? 'border-black bg-white shadow-key'
                      : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                  }`}
                >
                  <FileText className={`w-5 h-5 mb-2 ${startingPoint === STARTING_POINT.SCRATCH ? 'text-black' : 'text-gray-400'}`} />
                  <p className="font-semibold text-sm text-black">Start from scratch</p>
                  <p className="text-xs text-gray-500 mt-0.5">I don&apos;t have a resume yet</p>
                </button>

                <button
                  type="button"
                  onClick={() => setStartingPoint(STARTING_POINT.UPLOAD)}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    startingPoint === STARTING_POINT.UPLOAD
                      ? 'border-black bg-white shadow-key'
                      : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                  }`}
                >
                  <Upload className={`w-5 h-5 mb-2 ${startingPoint === STARTING_POINT.UPLOAD ? 'text-black' : 'text-gray-400'}`} />
                  <p className="font-semibold text-sm text-black">Upload my resume</p>
                  <p className="text-xs text-gray-500 mt-0.5">I have a job resume to start from</p>
                </button>
              </div>

              {/* Upload area — only when upload selected */}
              {startingPoint === STARTING_POINT.UPLOAD && (
                <div className="pt-1 space-y-3">
                  {!file ? (
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-gray-400 transition-colors cursor-pointer bg-gray-50">
                      <input
                        type="file"
                        id="academic-file-upload"
                        accept=".pdf,.docx,.doc"
                        onChange={handleFileChange}
                        className="hidden"
                        disabled={isProcessing}
                      />
                      <label htmlFor="academic-file-upload" className="cursor-pointer flex flex-col items-center">
                        <Upload className="w-8 h-8 text-gray-400 mb-2" />
                        <p className="text-sm font-medium text-gray-700 mb-1">Click to upload your resume</p>
                        <p className="text-xs text-gray-500">PDF or DOCX, max 5MB</p>
                      </label>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border-2 border-black">
                      <FileText className="w-5 h-5 text-black shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-black truncate">{file.name}</p>
                        <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setFile(null)}
                        disabled={isProcessing}
                        className="p-1.5 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        <X className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>
                  )}

                  <div className="flex items-start gap-2 p-3 rounded-xl bg-gray-100 border border-gray-200">
                    <span className="text-gray-500 mt-0.5 shrink-0">💡</span>
                    <p className="text-xs text-gray-600">
                      We will extract your name, contact info, education, and work experience from your job resume.
                      Questions will then focus <strong>only on the academic gaps</strong> — research experience, publications, language skills, and what your specific program requires.
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 p-4 mb-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          {/* CTA */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
            <Link
              href="/"
              className="inline-flex items-center justify-center h-10 px-4 py-2 rounded-xl bg-white text-black hover:bg-gray-100 font-semibold border-2 border-black shadow-key hover:shadow-key-md active:shadow-key-sm text-sm transition-all"
            >
              Cancel
            </Link>
            <Button
              type="button"
              variant="cta"
              size="default"
              onClick={handleStart}
              disabled={isProcessing}
              className="inline-flex items-center gap-2"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {processingMsg || 'Processing...'}
                </>
              ) : (
                <>
                  {ctaLabel}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>

          {/* What happens next */}
          <Card className="border-2 border-black">
            <CardHeader>
              <CardTitle className="text-black text-base">What happens next</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {steps.map(({ n, icon: Icon, label, desc }) => (
                <div key={n} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 border border-gray-200">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0 bg-black text-white text-sm">
                    {n}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <Icon className="w-3.5 h-3.5 text-gray-500" />
                      <h3 className="font-semibold text-black text-sm">{label}</h3>
                    </div>
                    <p className="text-xs text-gray-600">{desc}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Building a job resume instead?{' '}
              <Link href="/blank" className="text-black hover:underline font-medium">Start blank</Link>
              {' '}or{' '}
              <Link href="/upload" className="text-black hover:underline font-medium">upload your resume</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Small inline chevron helper to keep JSX clean
function ChevronDown() {
  return (
    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m6 9 6 6 6-6" />
      </svg>
    </span>
  )
}
