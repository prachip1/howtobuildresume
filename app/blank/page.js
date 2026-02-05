'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FileText, ArrowRight, Hammer, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function BlankPage() {
  const router = useRouter()

  const handleStart = () => {
    const emptyResumeData = {
      context: {
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
    }
    sessionStorage.setItem('resumeData', JSON.stringify(emptyResumeData))
    sessionStorage.setItem('resumeSource', 'blank')
    sessionStorage.setItem('currentStep', '0')
    router.push('/resume/questions')
  }

  const steps = [
    { n: 1, label: 'Personal Information', desc: "We'll start with the basics—your name, contact info, and links", bg: 'bg-gray-100', border: 'border-gray-200', dot: 'bg-black text-white' },
    { n: 2, label: 'Work Experience', desc: "Tell us about your roles, achievements, and impact", bg: 'bg-gray-100', border: 'border-gray-200', dot: 'bg-black text-white' },
    { n: 3, label: 'Education & Skills', desc: 'Add your education background and technical skills', bg: 'bg-gray-100', border: 'border-gray-200', dot: 'bg-black text-white' },
    { n: 4, label: 'Polish & Enhance', desc: "We'll help you add quantifiable achievements and optimize keywords", bg: 'bg-gray-100', border: 'border-gray-200', dot: 'bg-black text-white' },
  ]

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
              <FileText className="w-8 h-8 text-black" />
            </div>
            <h1 className="text-4xl font-bold text-black mb-2">
              Start from Scratch
            </h1>
            <p className="text-gray-600">
              We&apos;ll guide you through creating your perfect resume step by step
            </p>
          </div>

          <Card className="border-2 border-black">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-black">
                <Hammer className="w-5 h-5 text-black" />
                Let&apos;s build you a resume
              </CardTitle>
              <CardDescription className="text-gray-600">
                Our smart question flow will help you create a professional, ATS-optimized resume
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {steps.map(({ n, label, desc, bg, border, dot }) => (
                  <div key={n} className={`flex items-start gap-3 p-4 rounded-xl ${bg} border ${border}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0 ${dot}`}>
                      {n}
                    </div>
                    <div>
                      <h3 className="font-semibold text-black mb-1">{label}</h3>
                      <p className="text-sm text-gray-600">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-gray-100 border border-gray-200 rounded-xl">
                <p className="text-sm text-gray-800">
                  <strong className="text-black">Don&apos;t worry!</strong> We&apos;ll ask engaging questions one at a time.
                  You can always go back and edit. This won&apos;t be boring, we promise!
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3">
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
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have a resume?{' '}
              <Link href="/upload" className="text-black hover:underline font-medium">Upload it here</Link>
              {' '}or{' '}
              <Link href="/linkedin" className="text-black hover:underline font-medium">paste your LinkedIn</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
