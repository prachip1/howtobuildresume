'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft, Download, Loader2, RotateCcw, AlertTriangle,
  ChevronDown, ChevronUp, CheckCircle2, XCircle, AlertCircle,
  User, Briefcase, GraduationCap, Wrench, FileText, Save,
  FlaskConical, BookOpen, Trophy, Languages,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import ResumeTemplate from '@/components/resume/ResumeTemplate'

export const dynamic = 'force-dynamic'

const BACK_MAP = {
  upload: { href: '/upload', label: 'Back to upload' },
  linkedin: { href: '/linkedin', label: 'Back to LinkedIn' },
  blank: { href: '/', label: 'Back to home' },
  academic: { href: '/academic', label: 'Back to academic' },
}

// ─── ATS Score Calculator ─────────────────────────────────────────────────────

function calcATS(data) {
  if (!data) return { score: 0, tips: [], breakdown: [] }
  let score = 0
  const tips = []
  const breakdown = []

  // Contact info (20 pts)
  const pi = data.personalInfo || {}
  let contactScore = 0
  if (pi.name?.trim()) contactScore += 5
  if (pi.email?.trim()) contactScore += 5
  if (pi.phone?.trim()) contactScore += 4
  if (pi.location?.trim()) contactScore += 3
  if (pi.linkedin?.trim()) contactScore += 3
  score += contactScore
  breakdown.push({ label: 'Contact info', score: contactScore, max: 20 })
  if (!pi.linkedin?.trim()) tips.push('Add your LinkedIn URL — many ATS systems check for it')
  if (!pi.phone?.trim()) tips.push('Add a phone number to complete your contact section')

  // Summary (15 pts)
  const summary = (data.summary || '').trim()
  let summaryScore = 0
  if (summary) {
    summaryScore += 10
    if (summary.length >= 150) summaryScore += 5
    else tips.push('Expand your summary to 150+ characters for a full score')
  } else {
    tips.push('Add a professional summary — it\'s the first thing ATS and recruiters read')
  }
  score += summaryScore
  breakdown.push({ label: 'Summary', score: summaryScore, max: 15 })

  // Work experience (30 pts)
  const work = data.workExperience || []
  let workScore = 0
  if (work.length > 0) {
    workScore += 10
    const hasDesc = work.some(w => (w.description || '').trim())
    if (hasDesc) workScore += 8
    else tips.push('Add descriptions to your work roles')
    const allAch = work.flatMap(w => w.achievements || [])
    if (allAch.length > 0) {
      workScore += 7
      const hasNumbers = allAch.some(a => /\d/.test(a))
      if (hasNumbers) workScore += 5
      else tips.push('Add numbers/metrics to achievements (%, $, team size)')
    } else {
      tips.push('Add key achievements to each work role')
    }
  } else {
    tips.push('Add at least one work experience entry')
  }
  score += workScore
  breakdown.push({ label: 'Work experience', score: workScore, max: 30 })

  // Education (10 pts)
  const edu = data.education || []
  const eduScore = edu.length > 0 ? 10 : 0
  score += eduScore
  breakdown.push({ label: 'Education', score: eduScore, max: 10 })
  if (!edu.length) tips.push('Add your education details')

  // Skills (15 pts)
  const skills = data.skills || []
  let skillsScore = 0
  if (skills.length > 0) {
    skillsScore += 8
    if (skills.length >= 8) skillsScore += 7
    else tips.push(`Add ${8 - skills.length} more skills to maximise this section`)
  } else {
    tips.push('Add a skills section — it\'s heavily weighted by ATS')
  }
  score += skillsScore
  breakdown.push({ label: 'Skills', score: skillsScore, max: 15 })

  // Projects bonus (10 pts)
  const projects = data.projects || []
  const projScore = projects.length > 0 ? Math.min(10, projects.length * 5) : 0
  score += projScore
  breakdown.push({ label: 'Projects', score: projScore, max: 10 })

  return { score: Math.min(100, score), tips: tips.slice(0, 4), breakdown }
}

function scoreColor(score) {
  if (score >= 85) return { text: 'text-green-600', bg: 'bg-green-100', bar: 'bg-green-500', label: 'Excellent' }
  if (score >= 70) return { text: 'text-blue-600', bg: 'bg-blue-100', bar: 'bg-blue-500', label: 'Good' }
  if (score >= 50) return { text: 'text-amber-600', bg: 'bg-amber-100', bar: 'bg-amber-500', label: 'Fair' }
  return { text: 'text-red-600', bg: 'bg-red-100', bar: 'bg-red-500', label: 'Needs work' }
}

// ─── ATS Score Panel ──────────────────────────────────────────────────────────

function ATSPanel({ data }) {
  const [open, setOpen] = useState(true)
  const { score, tips, breakdown } = calcATS(data)
  const c = scoreColor(score)

  return (
    <div className="bg-white border-2 border-black rounded-2xl shadow-key overflow-hidden mb-6">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl ${c.bg} flex items-center justify-center shrink-0`}>
            <span className={`text-base font-bold ${c.text}`}>{score}</span>
          </div>
          <div className="text-left">
            <p className="font-bold text-black text-sm">ATS Score — {c.label}</p>
            <p className="text-xs text-gray-500">out of 100 · click to {open ? 'collapse' : 'expand'}</p>
          </div>
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
      </button>

      {open && (
        <div className="px-5 pb-5 border-t border-gray-100">
          {/* Overall bar */}
          <div className="mt-4 mb-5">
            <div className="h-2.5 w-full rounded-full bg-gray-100 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${c.bar}`}
                style={{ width: `${score}%` }}
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {/* Breakdown */}
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Breakdown</p>
              <div className="space-y-2">
                {breakdown.map(({ label, score: s, max }) => (
                  <div key={label} className="flex items-center gap-2">
                    <span className="text-xs text-gray-600 w-28 shrink-0">{label}</span>
                    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${s === max ? 'bg-green-400' : s > 0 ? 'bg-amber-400' : 'bg-gray-200'}`}
                        style={{ width: `${(s / max) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500 shrink-0 w-10 text-right">{s}/{max}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tips */}
            {tips.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Improve your score</p>
                <div className="space-y-1.5">
                  {tips.map((tip, i) => (
                    <div key={i} className="flex items-start gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                      <p className="text-xs text-gray-600">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Edit Panel ───────────────────────────────────────────────────────────────

function AccordionSection({ icon: Icon, title, open, onToggle, children }) {
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4 text-gray-600" />
          <span className="text-sm font-semibold text-black">{title}</span>
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
      </button>
      {open && <div className="px-4 py-4 space-y-3 bg-white">{children}</div>}
    </div>
  )
}

function Field({ label, value, onChange, type = 'text', rows }) {
  const cls = "w-full rounded-xl border border-gray-200 px-3 py-2 text-sm text-black focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-200 transition-all"
  return (
    <div>
      <label className="block text-xs font-medium text-gray-500 mb-1">{label}</label>
      {rows ? (
        <textarea
          value={value || ''}
          onChange={e => onChange(e.target.value)}
          rows={rows}
          className={`${cls} resize-none`}
        />
      ) : (
        <input
          type={type}
          value={value || ''}
          onChange={e => onChange(e.target.value)}
          className={cls}
        />
      )}
    </div>
  )
}

function EditPanel({ data, onChange }) {
  const [openSec, setOpenSec] = useState('contact')
  const toggle = (s) => setOpenSec(o => o === s ? null : s)

  const setPI = (field, val) =>
    onChange({ ...data, personalInfo: { ...(data.personalInfo || {}), [field]: val } })

  const setSummary = (val) => onChange({ ...data, summary: val })

  const setSkills = (val) =>
    onChange({ ...data, skills: val.split(',').map(s => s.trim()).filter(Boolean) })

  const setWork = (idx, field, val) => {
    const arr = [...(data.workExperience || [])]
    arr[idx] = { ...arr[idx], [field]: val }
    onChange({ ...data, workExperience: arr })
  }

  const setWorkAch = (idx, val) => {
    const arr = [...(data.workExperience || [])]
    arr[idx] = { ...arr[idx], achievements: val.split('\n').filter(Boolean) }
    onChange({ ...data, workExperience: arr })
  }

  const setEdu = (idx, field, val) => {
    const arr = [...(data.education || [])]
    arr[idx] = { ...arr[idx], [field]: val }
    onChange({ ...data, education: arr })
  }

  const setResearch = (idx, field, val) => {
    const arr = [...(data.researchExperience || [])]
    arr[idx] = { ...arr[idx], [field]: val }
    onChange({ ...data, researchExperience: arr })
  }

  const setResearchAch = (idx, val) => {
    const arr = [...(data.researchExperience || [])]
    arr[idx] = { ...arr[idx], achievements: val.split('\n').filter(Boolean) }
    onChange({ ...data, researchExperience: arr })
  }

  const setPub = (idx, field, val) => {
    const arr = [...(data.publications || [])]
    arr[idx] = { ...arr[idx], [field]: val }
    onChange({ ...data, publications: arr })
  }

  const setHonor = (idx, field, val) => {
    const arr = [...(data.honors || [])]
    arr[idx] = { ...arr[idx], [field]: val }
    onChange({ ...data, honors: arr })
  }

  const setLang = (idx, field, val) => {
    const arr = [...(data.languageSkills || [])]
    arr[idx] = { ...arr[idx], [field]: val }
    onChange({ ...data, languageSkills: arr })
  }

  const pi = data.personalInfo || {}

  return (
    <div className="space-y-2">
      {/* Contact */}
      <AccordionSection icon={User} title="Contact Info" open={openSec === 'contact'} onToggle={() => toggle('contact')}>
        <Field label="Full name" value={pi.name} onChange={v => setPI('name', v)} />
        <Field label="Email" value={pi.email} onChange={v => setPI('email', v)} type="email" />
        <Field label="Phone" value={pi.phone} onChange={v => setPI('phone', v)} type="tel" />
        <Field label="Location" value={pi.location} onChange={v => setPI('location', v)} />
        <Field label="LinkedIn URL" value={pi.linkedin} onChange={v => setPI('linkedin', v)} />
        <Field label="GitHub URL" value={pi.github} onChange={v => setPI('github', v)} />
        <Field label="Portfolio URL" value={pi.portfolio} onChange={v => setPI('portfolio', v)} />
      </AccordionSection>

      {/* Summary */}
      <AccordionSection icon={FileText} title="Summary" open={openSec === 'summary'} onToggle={() => toggle('summary')}>
        <Field label="Professional summary" value={data.summary} onChange={setSummary} rows={5} />
        <p className="text-xs text-gray-400">Aim for 150–300 characters. Start with your role + years of experience.</p>
      </AccordionSection>

      {/* Skills */}
      <AccordionSection icon={Wrench} title="Skills" open={openSec === 'skills'} onToggle={() => toggle('skills')}>
        <Field
          label="Skills (comma-separated)"
          value={(data.skills || []).join(', ')}
          onChange={setSkills}
          rows={3}
        />
        <p className="text-xs text-gray-400">Add 8+ skills. Match exact keywords from job descriptions.</p>
      </AccordionSection>

      {/* Work Experience */}
      <AccordionSection icon={Briefcase} title="Work Experience" open={openSec === 'work'} onToggle={() => toggle('work')}>
        {(data.workExperience || []).length === 0 && (
          <p className="text-xs text-gray-400">No work experience found.</p>
        )}
        {(data.workExperience || []).map((w, i) => (
          <div key={i} className={`space-y-2 ${i > 0 ? 'pt-3 border-t border-gray-100' : ''}`}>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Role {i + 1}</p>
            <Field label="Job title" value={w.role} onChange={v => setWork(i, 'role', v)} />
            <Field label="Company" value={w.company} onChange={v => setWork(i, 'company', v)} />
            <Field label="Location" value={w.location} onChange={v => setWork(i, 'location', v)} />
            <div className="grid grid-cols-2 gap-2">
              <Field label="Start (YYYY-MM)" value={w.startDate} onChange={v => setWork(i, 'startDate', v)} />
              <Field label="End (YYYY-MM / Current)" value={w.endDate} onChange={v => setWork(i, 'endDate', v)} />
            </div>
            <Field label="Description" value={w.description} onChange={v => setWork(i, 'description', v)} rows={3} />
            <Field
              label="Achievements (one per line)"
              value={(w.achievements || []).join('\n')}
              onChange={v => setWorkAch(i, v)}
              rows={4}
            />
          </div>
        ))}
      </AccordionSection>

      {/* Education */}
      <AccordionSection icon={GraduationCap} title="Education" open={openSec === 'education'} onToggle={() => toggle('education')}>
        {(data.education || []).length === 0 && (
          <p className="text-xs text-gray-400">No education found.</p>
        )}
        {(data.education || []).map((e, i) => (
          <div key={i} className={`space-y-2 ${i > 0 ? 'pt-3 border-t border-gray-100' : ''}`}>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Entry {i + 1}</p>
            <Field label="Institution" value={e.institution} onChange={v => setEdu(i, 'institution', v)} />
            <Field label="Degree" value={e.degree} onChange={v => setEdu(i, 'degree', v)} />
            <Field label="Field of study" value={e.field} onChange={v => setEdu(i, 'field', v)} />
            <div className="grid grid-cols-2 gap-2">
              <Field label="Start (YYYY-MM)" value={e.startDate} onChange={v => setEdu(i, 'startDate', v)} />
              <Field label="End (YYYY-MM)" value={e.endDate} onChange={v => setEdu(i, 'endDate', v)} />
            </div>
            <Field label="GPA / Grade" value={e.gpa} onChange={v => setEdu(i, 'gpa', v)} />
            <Field label="Honors / Awards" value={e.honors} onChange={v => setEdu(i, 'honors', v)} />
          </div>
        ))}
      </AccordionSection>

      {/* Research Experience — shown only if data exists */}
      {(data.researchExperience || []).length > 0 && (
        <AccordionSection icon={FlaskConical} title="Research Experience" open={openSec === 'research'} onToggle={() => toggle('research')}>
          {(data.researchExperience || []).map((r, i) => (
            <div key={i} className={`space-y-2 ${i > 0 ? 'pt-3 border-t border-gray-100' : ''}`}>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Entry {i + 1}</p>
              <Field label="Role / Position" value={r.role} onChange={v => setResearch(i, 'role', v)} />
              <Field label="Institution / Lab" value={r.institution} onChange={v => setResearch(i, 'institution', v)} />
              <Field label="Supervisor" value={r.supervisor} onChange={v => setResearch(i, 'supervisor', v)} />
              <div className="grid grid-cols-2 gap-2">
                <Field label="Start (YYYY-MM)" value={r.startDate} onChange={v => setResearch(i, 'startDate', v)} />
                <Field label="End (YYYY-MM / Current)" value={r.endDate} onChange={v => setResearch(i, 'endDate', v)} />
              </div>
              <Field label="Description" value={r.description} onChange={v => setResearch(i, 'description', v)} rows={3} />
              <Field
                label="Key contributions (one per line)"
                value={(r.achievements || []).join('\n')}
                onChange={v => setResearchAch(i, v)}
                rows={4}
              />
            </div>
          ))}
        </AccordionSection>
      )}

      {/* Publications — shown only if data exists */}
      {(data.publications || []).length > 0 && (
        <AccordionSection icon={BookOpen} title="Publications" open={openSec === 'publications'} onToggle={() => toggle('publications')}>
          {(data.publications || []).map((p, i) => (
            <div key={i} className={`space-y-2 ${i > 0 ? 'pt-3 border-t border-gray-100' : ''}`}>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Publication {i + 1}</p>
              <Field label="Title" value={p.title} onChange={v => setPub(i, 'title', v)} />
              <Field label="Authors" value={p.authors} onChange={v => setPub(i, 'authors', v)} />
              <Field label="Venue / Journal / Conference" value={p.venue} onChange={v => setPub(i, 'venue', v)} />
              <div className="grid grid-cols-2 gap-2">
                <Field label="Year" value={p.year} onChange={v => setPub(i, 'year', v)} />
                <Field label="Status (e.g. published, under review)" value={p.status} onChange={v => setPub(i, 'status', v)} />
              </div>
              <Field label="DOI / Link" value={p.doi} onChange={v => setPub(i, 'doi', v)} />
            </div>
          ))}
        </AccordionSection>
      )}

      {/* Honors & Awards — shown only if data exists */}
      {(data.honors || []).length > 0 && (
        <AccordionSection icon={Trophy} title="Honors & Awards" open={openSec === 'honors'} onToggle={() => toggle('honors')}>
          {(data.honors || []).map((h, i) => (
            <div key={i} className={`space-y-2 ${i > 0 ? 'pt-3 border-t border-gray-100' : ''}`}>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Award {i + 1}</p>
              <Field label="Award name" value={h.name} onChange={v => setHonor(i, 'name', v)} />
              <Field label="Institution / Organization" value={h.institution} onChange={v => setHonor(i, 'institution', v)} />
              <Field label="Year" value={h.year} onChange={v => setHonor(i, 'year', v)} />
              <Field label="Description / Scope" value={h.description} onChange={v => setHonor(i, 'description', v)} rows={2} />
            </div>
          ))}
        </AccordionSection>
      )}

      {/* Language Skills — shown only if data exists */}
      {(data.languageSkills || []).length > 0 && (
        <AccordionSection icon={Languages} title="Language Skills" open={openSec === 'languages'} onToggle={() => toggle('languages')}>
          {(data.languageSkills || []).map((l, i) => (
            <div key={i} className={`space-y-2 ${i > 0 ? 'pt-3 border-t border-gray-100' : ''}`}>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Language {i + 1}</p>
              <Field label="Language" value={l.language} onChange={v => setLang(i, 'language', v)} />
              <Field label="Proficiency (e.g. Fluent, B2, Native)" value={l.proficiency} onChange={v => setLang(i, 'proficiency', v)} />
              <Field label="Test / Certification (e.g. IELTS, TOEFL)" value={l.certification} onChange={v => setLang(i, 'certification', v)} />
              <Field label="Score (e.g. 7.5, 108)" value={l.score} onChange={v => setLang(i, 'score', v)} />
            </div>
          ))}
        </AccordionSection>
      )}
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ResumePreviewPage() {
  const router = useRouter()
  const [resumeData, setResumeData] = useState(null)   // live (displayed in preview)
  const [editData, setEditData] = useState(null)        // editable copy
  const [layout, setLayout] = useState(null)
  const [source, setSource] = useState('upload')
  const [isExporting, setIsExporting] = useState(false)
  const [exportError, setExportError] = useState('')
  const [hasUnsaved, setHasUnsaved] = useState(false)

  useEffect(() => {
    const storedData = sessionStorage.getItem('resumeData')
    const storedLayout = sessionStorage.getItem('resumeLayout')
    const storedSource = sessionStorage.getItem('resumeSource')
    if (!storedData) { router.push('/'); return }
    const parsed = JSON.parse(storedData)
    setResumeData(parsed)
    setEditData(JSON.parse(JSON.stringify(parsed)))     // deep clone for editing
    setLayout(storedLayout ? JSON.parse(storedLayout) : null)
    setSource(storedSource || 'upload')
  }, [router])

  const handleEditChange = useCallback((updated) => {
    setEditData(updated)
    setHasUnsaved(true)
  }, [])

  const handleSave = () => {
    setResumeData(editData)
    sessionStorage.setItem('resumeData', JSON.stringify(editData))
    setHasUnsaved(false)
  }

  const handleDownloadPDF = async () => {
    // Auto-save first so PDF reflects latest edits
    if (hasUnsaved) handleSave()
    setIsExporting(true)
    setExportError('')
    try {
      const { exportToPDF } = await import('@/lib/pdf-export')
      await exportToPDF(resumeData)
    } catch (err) {
      console.error('PDF export error:', err)
      setExportError('Could not generate PDF. Try Ctrl+P / Cmd+P as a fallback.')
    } finally {
      setIsExporting(false)
    }
  }

  const handleStartOver = () => {
    sessionStorage.removeItem('resumeData')
    sessionStorage.removeItem('resumeLayout')
    sessionStorage.removeItem('resumeSource')
    sessionStorage.removeItem('currentStep')
    router.push('/')
  }

  if (!resumeData || !editData) {
    return (
      <div className="min-h-full flex items-center justify-center bg-[#f0f0f0]">
        <div className="bg-white rounded-2xl p-8 text-center">
          <div className="w-12 h-12 border-2 border-ref-green border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-gray-600 mt-4">Loading your resume...</p>
        </div>
      </div>
    )
  }

  const back = BACK_MAP[source] || BACK_MAP.upload

  return (
    <div className="min-h-full bg-[#f0f0f0]">
      <div className="bg-[#f0f0f0] rounded-t-3xl min-h-[calc(100vh-4rem)] py-8 px-4">
        <div className="max-w-7xl mx-auto">

          {/* Back + title */}
          <Link href={back.href} className="inline-flex items-center gap-2 text-gray-500 hover:text-black mb-4 text-sm transition-colors">
            <ArrowLeft className="w-4 h-4" />
            {back.label}
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-black">Your resume is ready</h1>
              <p className="text-sm text-gray-500 mt-0.5">Edit on the right, preview updates live. Download when done.</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {hasUnsaved && (
                <Button variant="register" size="sm" onClick={handleSave} className="inline-flex items-center gap-1.5 text-sm">
                  <Save className="w-3.5 h-3.5" />
                  Save changes
                </Button>
              )}
              <Button
                variant="cta"
                size="default"
                onClick={handleDownloadPDF}
                disabled={isExporting}
                className="inline-flex items-center gap-2"
              >
                {isExporting ? <><Loader2 className="w-4 h-4 animate-spin" /> Generating…</> : <><Download className="w-4 h-4" /> Download PDF</>}
              </Button>
            </div>
          </div>

          {/* ATS Score */}
          <ATSPanel data={resumeData} />

          {/* AI disclaimer */}
          <div className="flex items-start gap-2.5 px-4 py-3 mb-6 bg-white border border-gray-200 rounded-xl">
            <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <p className="text-xs text-gray-500">
              <span className="font-semibold text-gray-700">AI-generated — review before sending.</span>{' '}
              Check dates, titles, and numbers. Use the edit panel to fix anything that looks off.
            </p>
          </div>

          {/* Main: edit left, preview right */}
          <div className="grid lg:grid-cols-[420px_1fr] gap-6 items-start">

            {/* ── Edit panel ── */}
            <div className="bg-white rounded-2xl border-2 border-black shadow-key p-5 lg:sticky lg:top-6 lg:max-h-[calc(100vh-120px)] lg:overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-black text-base">Edit your resume</h2>
                {hasUnsaved && (
                  <span className="text-xs text-amber-600 font-medium bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                    Unsaved changes
                  </span>
                )}
              </div>
              <EditPanel data={editData} onChange={handleEditChange} />
              {hasUnsaved && (
                <Button variant="cta" className="w-full mt-4 inline-flex items-center justify-center gap-2" onClick={handleSave}>
                  <Save className="w-4 h-4" />
                  Save & update preview
                </Button>
              )}
            </div>

            {/* ── Live preview ── */}
            <div className="bg-white rounded-2xl border-2 border-black shadow-key overflow-hidden">
              <div className="flex items-center justify-between bg-gray-50 px-5 py-2.5 border-b border-gray-200">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Live preview</p>
                <p className="text-xs text-gray-400">Reflects saved changes</p>
              </div>
              <div className="p-4 overflow-auto max-h-[calc(100vh-200px)]">
                <ResumeTemplate resumeData={resumeData} layout={layout} />
              </div>
            </div>
          </div>

          {/* Export error */}
          {exportError && (
            <div className="flex items-start gap-2 p-4 mt-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              {exportError}
            </div>
          )}

          {/* Bottom actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mt-8 pb-8">
            <Button variant="register" size="lg" onClick={handleStartOver} className="inline-flex items-center gap-2">
              <RotateCcw className="w-4 h-4" />
              Start over
            </Button>
            <Button
              variant="cta"
              size="lg"
              onClick={handleDownloadPDF}
              disabled={isExporting}
              className="inline-flex items-center gap-2 min-w-[180px] justify-center"
            >
              {isExporting ? <><Loader2 className="w-4 h-4 animate-spin" /> Generating PDF…</> : <><Download className="w-4 h-4" /> Download PDF</>}
            </Button>
          </div>

          <p className="text-center text-xs text-gray-400 pb-4">
            Use Ctrl+P / Cmd+P as a fallback if the download button doesn&apos;t work.
          </p>

        </div>
      </div>
    </div>
  )
}
