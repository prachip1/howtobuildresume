'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Download, Save, Edit2, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import ResumeTemplate from '@/components/resume/ResumeTemplate'
import { createClient } from '@/lib/supabase/client'
import { exportToPDF } from '@/lib/pdf-export'

export default function EditResumePage() {
  const [resumeData, setResumeData] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [resumeId, setResumeId] = useState(null)
  const router = useRouter()
  const supabase = createClient()
  const FREE_RESUME_LIMIT = 10

  useEffect(() => {
    const storedData = sessionStorage.getItem('resumeData')
    const storedResumeId = sessionStorage.getItem('resumeId')

    // Opening from dashboard: only resumeId, no session data — load from DB
    if (storedResumeId && !storedData) {
      loadResumeFromDB(storedResumeId)
      return
    }

    if (!storedData) {
      router.push('/')
      return
    }

    const data = JSON.parse(storedData)
    setResumeData(data)
    if (storedResumeId) setResumeId(storedResumeId)
  }, [])

  const loadResumeFromDB = async (id) => {
    try {
      const [
        { data: resumeRow, error: resumeErr },
        { data: personalRows, error: personalErr },
        { data: workRows, error: workErr },
        { data: educationRows, error: educationErr },
        { data: skillRows, error: skillErr },
        { data: projectRows, error: projectErr },
      ] = await Promise.all([
        supabase.from('resumes').select('id, name').eq('id', id).single(),
        supabase.from('personal_info').select('*').eq('resume_id', id).maybeSingle(),
        supabase.from('work_experience').select('*').eq('resume_id', id).order('created_at', { ascending: true }),
        supabase.from('education').select('*').eq('resume_id', id).order('created_at', { ascending: true }),
        supabase.from('skills').select('name').eq('resume_id', id).order('created_at', { ascending: true }),
        supabase.from('projects').select('*').eq('resume_id', id).order('created_at', { ascending: true }),
      ])

      if (resumeErr || !resumeRow) {
        console.error('Resume not found:', resumeErr)
        router.push('/dashboard')
        return
      }

      const personal = personalRows || {}
      const personalInfo = {
        name: personal.name,
        email: personal.email,
        phone: personal.phone,
        location: personal.location,
        linkedin: personal.linkedin,
        github: personal.github,
        portfolio: personal.portfolio,
      }

      const workExperience = (workRows || []).map((row) => ({
        role: row.role,
        company: row.company,
        startDate: row.start_date,
        endDate: row.end_date,
        location: row.location,
        description: row.description,
        achievements: Array.isArray(row.achievements) ? row.achievements : [],
      }))

      const education = (educationRows || []).map((row) => ({
        institution: row.institution,
        degree: row.degree,
        field: row.field,
        startDate: row.start_date,
        endDate: row.end_date,
        gpa: row.gpa,
        honors: row.honors,
      }))

      const skills = (skillRows || []).map((s) => s.name)

      const projects = (projectRows || []).map((row) => ({
        name: row.name,
        description: row.description,
        tech_stack: Array.isArray(row.tech_stack) ? row.tech_stack : [],
        link: row.link,
        date: row.date,
      }))

      const summary = personal.summary ?? resumeRow.summary ?? ''

      setResumeId(resumeRow.id)
      setResumeData({
        personalInfo,
        summary,
        workExperience,
        education,
        skills,
        projects,
        certifications: [],
      })
    } catch (error) {
      console.error('Error loading resume:', error)
      router.push('/dashboard')
    }
  }

  const handleSave = async () => {
    if (!resumeData) return

    // Require authentication to save
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      router.push(`/signup?redirect=${encodeURIComponent('/resume/edit')}`)
      return
    }

    // Soft limit: only count new resumes in last 30 days
    if (!resumeId) {
      try {
        const since = new Date()
        since.setDate(since.getDate() - 30)

        const { count, error: countError } = await supabase
          .from('resumes')
          .select('id', { count: 'exact', head: true })
          .eq('user_id', user.id)
          .gte('updated_at', since.toISOString())

        if (countError) {
          console.error('Error checking resume limit:', countError)
        } else if ((count ?? 0) >= FREE_RESUME_LIMIT) {
          alert(
            `You have reached the free limit of ${FREE_RESUME_LIMIT} resumes in the last 30 days. ` +
              'You can continue editing existing resumes or try again later.'
          )
          return
        }
      } catch (err) {
        console.error('Error enforcing resume limit:', err)
      }
    }

    setIsSaving(true)
    try {
      // Save to Supabase
      const { data: resume, error } = await supabase
        .from('resumes')
        .upsert({
          id: resumeId,
          user_id: user.id,
          session_token: null,
          name: resumeData.personalInfo?.name || 'My Resume',
          updated_at: new Date().toISOString(),
        })
        .select()
        .single()

      if (error) throw error

      const savedResumeId = resume.id
      setResumeId(savedResumeId)
      sessionStorage.setItem('resumeId', savedResumeId)

      // Save personal info
      if (resumeData.personalInfo) {
        await supabase
          .from('personal_info')
          .upsert({
            resume_id: savedResumeId,
            ...resumeData.personalInfo,
            updated_at: new Date().toISOString(),
          })
      }

      // Save work experience
      if (resumeData.workExperience && resumeData.workExperience.length > 0) {
        // Delete existing and insert new
        await supabase
          .from('work_experience')
          .delete()
          .eq('resume_id', savedResumeId)

        const workExp = resumeData.workExperience.map(exp => ({
          resume_id: savedResumeId,
          role: exp.role,
          company: exp.company,
          start_date: exp.startDate,
          end_date: exp.endDate,
          location: exp.location,
          description: exp.description,
          achievements: exp.achievements || [],
        }))

        if (workExp.length > 0) {
          await supabase
            .from('work_experience')
            .insert(workExp)
        }
      }

      // Save education
      if (resumeData.education && resumeData.education.length > 0) {
        await supabase
          .from('education')
          .delete()
          .eq('resume_id', savedResumeId)

        const edu = resumeData.education.map(ed => ({
          resume_id: savedResumeId,
          institution: ed.institution,
          degree: ed.degree,
          field: ed.field,
          start_date: ed.startDate,
          end_date: ed.endDate,
          gpa: ed.gpa,
          honors: ed.honors,
        }))

        if (edu.length > 0) {
          await supabase
            .from('education')
            .insert(edu)
        }
      }

      // Save skills
      if (resumeData.skills && resumeData.skills.length > 0) {
        await supabase
          .from('skills')
          .delete()
          .eq('resume_id', savedResumeId)

        const skills = resumeData.skills.map(skill => ({
          resume_id: savedResumeId,
          name: skill,
        }))

        if (skills.length > 0) {
          await supabase
            .from('skills')
            .insert(skills)
        }
      }

      alert('Resume saved successfully!')
    } catch (error) {
      console.error('Error saving resume:', error)
      alert('Failed to save resume. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  const handleExportPDF = async () => {
    if (!resumeData) return

    // Require authentication to export
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      router.push(`/signup?redirect=${encodeURIComponent('/resume/edit')}`)
      return
    }

    setIsExporting(true)
    try {
      await exportToPDF(resumeData)
    } catch (error) {
      console.error('Error exporting PDF:', error)
      alert('Failed to export PDF. Please try again.')
    } finally {
      setIsExporting(false)
    }
  }

  if (!resumeData) {
    return (
      <div className="min-h-full flex items-center justify-center bg-[#f0f0f0]">
        <div className="bg-white rounded-2xl p-8 text-center">
          <div className="w-12 h-12 border-2 border-ref-green border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-gray-600 mt-4">Loading resume...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-full bg-[#f0f0f0]">
      <div className="bg-white rounded-t-3xl min-h-[calc(100vh-4rem)] py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-black">Your Resume</h1>
              <p className="text-gray-600 mt-1">Review and export your ATS-optimized resume</p>
            </div>
            <div className="flex gap-3">
              <Button variant="register" onClick={handleSave} disabled={isSaving}>
                <Save className="mr-2 h-4 w-4" />
                {isSaving ? 'Saving...' : 'Save'}
              </Button>
              <Button variant="cta" onClick={handleExportPDF} disabled={isExporting}>
                <Download className="mr-2 h-4 w-4" />
                {isExporting ? 'Exporting...' : 'Export PDF'}
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-6 lg:p-8">
            <ResumeTemplate resumeData={resumeData} />
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Resume Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-700">
              <li>✅ Your resume is ATS-optimized with proper formatting</li>
              <li>✅ All sections are clearly labeled and easy to scan</li>
              <li>✅ Use action verbs and quantifiable achievements</li>
              <li>✅ Keep it to 1-2 pages for best results</li>
              <li>✅ Review for typos and formatting consistency</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
