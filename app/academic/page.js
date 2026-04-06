'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { GraduationCap, ArrowRight, ArrowLeft, Globe, BookOpen, FlaskConical, Trophy } from 'lucide-react'
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

export default function AcademicPage() {
  const router = useRouter()
  const [degreeType, setDegreeType] = useState('')
  const [targetCountry, setTargetCountry] = useState('')
  const [targetProgram, setTargetProgram] = useState('')
  const [targetInstitution, setTargetInstitution] = useState('')
  const [error, setError] = useState('')

  const handleStart = () => {
    if (!degreeType || !targetCountry || !targetProgram.trim()) {
      setError('Please fill in degree type, country, and program before continuing.')
      return
    }
    setError('')

    const resumeData = {
      context: {
        resumePurpose: 'academic',
        degreeType,
        targetCountry,
        targetProgram: targetProgram.trim(),
        targetInstitution: targetInstitution.trim(),
        // keep job fields empty so existing code doesn't break
        jobRole: '',
        experienceYears: '',
        jobLookingFor: '',
        careerBreakYears: '0',
        careerBreakMonths: '0',
      },
      personalInfo: {
        name: '',
        email: '',
        phone: '',
        location: '',
        linkedin: '',
        github: '',
        portfolio: '',
      },
      summary: '',
      workExperience: [],
      education: [],
      skills: [],
      projects: [],
      certifications: [],
      researchExperience: [],
      publications: [],
      honors: [],
      languageSkills: [],
    }

    sessionStorage.setItem('resumeData', JSON.stringify(resumeData))
    sessionStorage.setItem('resumeSource', 'academic')
    sessionStorage.setItem('currentStep', '0')
    window.LyticData?.track('academic_resume_start', { degreeType, targetCountry, targetProgram })
    router.push('/resume/questions')
  }

  const degreeLabelMap = Object.fromEntries(DEGREE_OPTIONS.map(o => [o.value, o.label]))
  const countryLabelMap = Object.fromEntries(COUNTRY_OPTIONS.map(o => [o.value, o.label]))

  const contextPreview =
    degreeType && targetCountry && targetProgram.trim()
      ? `${degreeLabelMap[degreeType]} · ${targetProgram.trim()} · ${countryLabelMap[targetCountry]}`
      : null

  return (
    <div className="min-h-full bg-[#f0f0f0]">
      <div className="bg-[#f0f0f0] rounded-t-3xl min-h-[calc(100vh-4rem)] py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-black mb-8 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>

          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-white border-2 border-black shadow-key">
              <GraduationCap className="w-8 h-8 text-black" />
            </div>
            <h1 className="text-4xl font-bold text-black mb-2">
              Academic Resume Builder
            </h1>
            <p className="text-gray-600 max-w-md mx-auto">
              Building a resume for an MS, PhD, or any graduate program? We tailor the questions to your exact degree type and country.
            </p>
          </div>

          <Card className="border-2 border-black mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-black">
                <Globe className="w-5 h-5" />
                Tell us about your target program
              </CardTitle>
              <CardDescription className="text-gray-600">
                This is what makes the questions smart — an MS in Italy needs a different resume than an MS in the USA.
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
                    {DEGREE_OPTIONS.map(o => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                  </span>
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
                    {COUNTRY_OPTIONS.map(o => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                  </span>
                </div>
              </div>

              {/* Program / Field */}
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
                  Target institution <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <Input
                  type="text"
                  value={targetInstitution}
                  onChange={(e) => setTargetInstitution(e.target.value)}
                  placeholder="e.g. Politecnico di Milano, MIT, University of Toronto"
                  className="h-12 w-full rounded-xl border-2 border-gray-200 px-4 text-base text-black focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
                />
                <p className="text-xs text-gray-500">
                  Knowing the institution helps us tailor advice even further.
                </p>
              </div>

              {/* Context preview chip */}
              {contextPreview && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-gray-50 border border-gray-200">
                  <GraduationCap className="w-4 h-4 text-gray-500 shrink-0" />
                  <span className="text-sm text-gray-700">{contextPreview}</span>
                </div>
              )}

              {error && (
                <p className="text-sm text-red-600 font-medium">{error}</p>
              )}

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
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
                  className="inline-flex items-center gap-2"
                >
                  Generate my questions
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* How it works for academic */}
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
