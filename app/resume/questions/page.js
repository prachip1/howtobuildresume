'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, ArrowLeft, Lightbulb, CheckCircle2, Copy, Check, Sparkles, GripVertical, FileText as FileIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { QUESTION_FLOW, getNextQuestion, getProgress, updateResumeData, getHintForQuestion, makeLoopBlock } from '@/lib/questions'

// ─── Sample content map ──────────────────────────────────────────────────────

const ROLE_SUMMARIES = {
  software_engineer: `Results-driven Software Engineer with 4+ years of experience designing and shipping full-stack web applications. Skilled in React, Node.js, and AWS. Passionate about clean code, system performance, and mentoring junior developers.`,
  product_manager: `Strategic Product Manager with 5+ years leading cross-functional teams from idea to launch. Track record of growing user engagement 35%+ through data-driven roadmaps. Strong communicator bridging engineering, design, and business stakeholders.`,
  data_scientist: `Data Scientist with 3+ years turning complex datasets into actionable insights. Proficient in Python, SQL, and ML frameworks (scikit-learn, TensorFlow). Delivered models that reduced operational costs by $2M+.`,
  designer: `UX/UI Designer with 4 years creating intuitive digital experiences for B2B and consumer products. Expert in Figma and design systems. Reduced customer support tickets by 22% through redesigned user flows.`,
  marketing_manager: `Results-oriented Marketing Manager with 6+ years driving brand growth and lead generation. Managed $500K+ ad budgets and grew organic traffic by 120%. Expert in SEO, email campaigns, and multi-channel strategy.`,
  sales: `Sales professional with 5+ years exceeding quota in SaaS environments. Consistently ranked in top 10% of regional team. Built a $2M+ pipeline from scratch; closed enterprise deals averaging $80K ARR.`,
  default: `Dedicated professional with 4+ years of hands-on experience delivering results. Proven ability to collaborate cross-functionally and drive measurable impact. Passionate about continuous learning and growth.`,
}

const ROLE_SKILLS = {
  software_engineer: `JavaScript, TypeScript, React, Next.js, Node.js, Python\nPostgreSQL, MongoDB, Redis\nAWS (EC2, S3, Lambda), Docker, Git, CI/CD\nREST APIs, GraphQL, Agile/Scrum`,
  data_scientist: `Python, R, SQL\npandas, NumPy, scikit-learn, TensorFlow, PyTorch\nTableau, Power BI, Spark\nA/B testing, Statistical modeling, AWS SageMaker`,
  product_manager: `Product roadmapping, Agile/Scrum, JIRA\nSQL, Figma, A/B testing\nUser research, Stakeholder management\nOKRs, Google Analytics, Mixpanel`,
  designer: `Figma, Adobe XD, Sketch, Illustrator\nPrototyping, Wireframing, User research\nDesign systems, Accessibility (WCAG 2.1)\nHTML/CSS, Usability testing`,
  marketing_manager: `Google Ads, Meta Ads, SEO/SEM\nHubSpot, Mailchimp, Google Analytics 4\nContent strategy, Copywriting, CRM\nA/B testing, Email automation`,
  sales: `Salesforce CRM, HubSpot, LinkedIn Sales Navigator\nCold outreach, Account management, Pipeline management\nContract negotiation, SaaS sales, Enterprise sales`,
  default: `[Primary technical skill], [Secondary skill], [Tool or platform]\n[Methodology], [Soft skill], [Certification if any]`,
}

const SECTION_SAMPLES = {
  summary: {
    academic: {
      sample: `Motivated Computer Science graduate with research experience in machine learning and distributed systems. Seeking an MS program to deepen expertise in neural architecture design. Co-authored one conference paper; proficient in Python, PyTorch, and CUDA.`,
      tip: 'For academic applications, lead with your research interests + relevant background. Mention publications, lab experience, or thesis. Admission committees look for research potential, not just GPA.',
    },
    default: {
      // role-aware, handled in getSampleForQuestion
      tip: 'Lead with role + years of experience. Include 2–3 specific strengths or metrics. ATS scans the summary first — mirror the exact keywords from the job description.',
    },
  },
  workExperience: {
    description: {
      sample: `Led development of a customer-facing REST API serving 80K+ daily requests, reducing average response time by 35%.
Collaborated with design and product teams in 2-week agile sprints to ship 6 major features per quarter.
Refactored legacy codebase, cutting critical bug count by 60% and lifting test coverage from 40% to 85%.`,
      tip: 'Start every line with an action verb (Led, Built, Reduced, Shipped). Add scope: team size, user count, revenue, or %. ATS systems reward quantified impact — numbers are your best friend.',
    },
    achievements: {
      sample: `Increased user retention by 28% through a redesigned onboarding flow
Reduced cloud infrastructure cost by $12K/month via service consolidation
Shipped payment integration that generated $400K in additional revenue in Q1
Mentored 3 junior engineers; 2 received promotions within 6 months`,
      tip: 'One achievement per line. Format: action verb + what you did + measurable result. Percentages, dollar amounts, and team sizes make these ATS-scannable and attention-grabbing to hiring managers.',
    },
  },
  skills: {
    tip: 'Copy skill keywords verbatim from job descriptions you are targeting. ATS is literal — "React" and "React.js" may be counted separately. Group by category: languages → frameworks → tools → methodologies.',
  },
  researchExperience: {
    sample: `Research Assistant — Computational Biology Lab, supervised by Prof. A. Mehta (Jan 2023 – Present)
Developed a Python pipeline to automate genomic data preprocessing, reducing analysis time by 70%.
Co-authored one conference paper submitted to ISMB 2024.
Managed and curated a 10M+ record biological database used by 3 research groups.`,
    tip: 'Include: lab name, supervisor name, date range, and specific contributions. Quantify outcomes (papers, datasets, time saved, funding). This is the #1 differentiator for MS/PhD applications.',
  },
  publications: {
    sample: `"Efficient Graph Neural Networks for Protein Structure Prediction" — A. Smith, B. Patel, C. Rao. Submitted to NeurIPS 2024 (under review).
"Comparative Analysis of Sorting Algorithms on GPU Clusters" — Presented at IEEE IPDPS 2023. DOI: 10.1109/IPDPS.2023.XXXXX`,
    tip: 'Use citation format: Author(s), Title, Venue, Year, status (published / under review / in preparation). Even workshop papers and posters count — list everything. Admissions committees weight publications heavily.',
  },
  honors: {
    sample: `Dean's List — University of Mumbai, 2021, 2022, 2023
Merit Scholarship — ₹50,000/year for academic excellence (top 5% of batch)
Best Undergraduate Thesis Award — Dept. of Computer Science, 2023
National Science Olympiad — Silver Medal, 2020`,
    tip: 'Include: award name, institution, year, and scope (e.g., "top 5% of batch", "national level"). Specific details signal credibility. Vague claims like "academic excellence" without context are ignored.',
  },
  languageSkills: {
    sample: `English — Fluent (IELTS 7.5 / TOEFL 108)
Italian — Intermediate (B1 — CILS certification)
Hindi — Native / Mother tongue
German — Basic (A2 — Goethe-Institut)`,
    tip: 'List: language, proficiency level (CEFR: A1–C2), and test score if any. Always include your English test score for international programs. Native language should be listed last.',
  },
  projects: {
    sample: `E-Commerce Recommendation Engine — Python, scikit-learn, FastAPI, PostgreSQL
Built a collaborative filtering model achieving 82% prediction accuracy on 50K+ product interactions.
Deployed as a REST microservice handling 1,000 requests/minute with 99.9% uptime.
GitHub: github.com/yourname/rec-engine | Live: rec-engine.vercel.app`,
    tip: 'Include: project name, tech stack, what you built, and a measurable outcome. Add a GitHub/live link — recruiters and professors click them. Quantify: users, accuracy, requests/sec, or time saved.',
  },
  certifications: {
    sample: `AWS Certified Solutions Architect — Associate | Amazon Web Services | Jun 2023
Google Analytics Certification | Google | Jan 2024
Project Management Professional (PMP) | PMI | Mar 2022`,
    tip: 'List each certification on its own line: Name | Issuer | Date. Include the full official name — recruiters and ATS systems search for exact certificate names.',
  },
  education: {
    tip: 'For the degree field, spell out the full degree name (e.g. "Bachelor of Science in Computer Science"). Include GPA only if it\'s 3.5+ on a 4.0 scale, or equivalent in your country\'s grading system.',
  },
}

// ─── Pull real data from uploaded resume ─────────────────────────────────────

function getFromUploadedResume(question, resumeData) {
  if (!resumeData || resumeData._sourceResume !== 'uploaded') return null

  const section = question.section
  const field = (question.field || '').toLowerCase()
  const type = question.type

  // Summary
  if (section === 'summary' || question.id === 'summary') {
    const s = resumeData.summary?.trim()
    if (s) return {
      sample: s,
      tip: 'This is your existing summary. Strengthen it: start with your role + years, add 1–2 specific achievements, and mirror keywords from the job description.',
      fromResume: true,
    }
  }

  // Work experience — description
  if (section === 'workExperience' && type === 'textarea' && field !== 'achievements') {
    const exps = resumeData.workExperience || []
    const last = exps[exps.length - 1]
    const desc = last?.description?.trim()
    if (desc) return {
      sample: desc,
      tip: 'From your most recent role. Start each line with an action verb and add metrics (%, $, team size) wherever possible.',
      fromResume: true,
    }
  }

  // Work experience — achievements
  if ((section === 'workExperience' && field === 'achievements') || question.id === 'work_achievements') {
    const exps = resumeData.workExperience || []
    const last = exps[exps.length - 1]
    const ach = last?.achievements
    if (ach?.length) {
      const formatted = Array.isArray(ach) ? ach.join('\n') : ach
      return {
        sample: formatted,
        tip: 'Your existing achievements. Strengthen each with a number — "Reduced load time by 40%" beats "Reduced load time" in ATS scoring.',
        fromResume: true,
      }
    }
  }

  // Skills
  if (section === 'skills' || question.id === 'skills') {
    const skills = resumeData.skills
    if (skills?.length) {
      const formatted = Array.isArray(skills) ? skills.join(', ') : skills
      return {
        sample: formatted,
        tip: 'Your existing skills list. Add any keywords from the job description you\'re targeting — ATS matches exact terms, so "React.js" ≠ "React" in some systems.',
        fromResume: true,
      }
    }
  }

  // Education fields
  if (section === 'education') {
    const edu = (resumeData.education || []).slice(-1)[0]
    if (edu) {
      // map common field name variants
      const fieldMap = {
        institution: ['institution', 'school', 'university', 'college'],
        degree: ['degree'],
        field: ['field', 'major', 'subject'],
        gpa: ['gpa', 'cgpa', 'grade', 'wam', 'mark'],
        startDate: ['startdate', 'start'],
        endDate: ['enddate', 'end', 'graduation'],
      }
      for (const [key, variants] of Object.entries(fieldMap)) {
        if (variants.some(v => field.includes(v))) {
          const val = edu[key]?.trim?.() || edu[field]?.trim?.()
          if (val) return {
            sample: val,
            tip: 'From your uploaded resume. Verify this is accurate and complete before moving on.',
            fromResume: true,
          }
        }
      }
    }
  }

  // Projects
  if (section === 'projects' && type === 'textarea') {
    const proj = (resumeData.projects || []).slice(-1)[0]
    const desc = proj?.description?.trim()
    if (desc) return {
      sample: desc,
      tip: 'From your uploaded resume. Add tech stack, outcome metrics, and a GitHub/live link if available.',
      fromResume: true,
    }
  }

  return null
}

// ─── Sample content (generic fallback) ───────────────────────────────────────

function getSampleForQuestion(question, context = {}, resumeData = null) {
  if (!question) return null

  // Prefer real data from uploaded resume
  const fromResume = getFromUploadedResume(question, resumeData)
  if (fromResume) return fromResume

  const { jobRole, resumePurpose } = context
  const isAcademic = resumePurpose === 'academic'

  // ── By question ID (blank flow predefined questions) ──
  if (question.id === 'summary') {
    if (isAcademic) return SECTION_SAMPLES.summary.academic
    const roleKey = jobRole && ROLE_SUMMARIES[jobRole] ? jobRole : 'default'
    return {
      sample: ROLE_SUMMARIES[roleKey],
      tip: SECTION_SAMPLES.summary.default.tip,
    }
  }
  if (question.id === 'work_description') return SECTION_SAMPLES.workExperience.description
  if (question.id === 'work_achievements') return SECTION_SAMPLES.workExperience.achievements
  if (question.id === 'skills') {
    const roleKey = jobRole && ROLE_SKILLS[jobRole] ? jobRole : 'default'
    return {
      sample: ROLE_SKILLS[roleKey],
      tip: SECTION_SAMPLES.skills.tip,
    }
  }

  // ── By section (dynamic academic/upload questions) ──
  if (question.section === 'summary') {
    if (isAcademic) return SECTION_SAMPLES.summary.academic
    const roleKey = jobRole && ROLE_SUMMARIES[jobRole] ? jobRole : 'default'
    return { sample: ROLE_SUMMARIES[roleKey], tip: SECTION_SAMPLES.summary.default.tip }
  }
  if (question.section === 'workExperience') {
    if (question.field === 'achievements') return SECTION_SAMPLES.workExperience.achievements
    if (question.type === 'textarea') return SECTION_SAMPLES.workExperience.description
  }
  if (question.section === 'skills') {
    const roleKey = jobRole && ROLE_SKILLS[jobRole] ? jobRole : 'default'
    return { sample: ROLE_SKILLS[roleKey], tip: SECTION_SAMPLES.skills.tip }
  }
  // Gate/loop confirm questions — no sample panel
  if (question.section === 'loop' || question.section === 'gate') return null

  if (question.section === 'researchExperience') return SECTION_SAMPLES.researchExperience
  if (question.section === 'publications') return SECTION_SAMPLES.publications
  if (question.section === 'honors') return SECTION_SAMPLES.honors
  if (question.section === 'languageSkills') return SECTION_SAMPLES.languageSkills
  if (question.section === 'projects' && question.type === 'textarea') return SECTION_SAMPLES.projects
  if (question.section === 'certifications' && question.field === 'name') return SECTION_SAMPLES.certifications
  if (question.section === 'education') {
    const field = (question.field || '').toLowerCase()
    // Thesis / capstone — specific sample
    if (field.includes('thesis') || field.includes('capstone') || field.includes('dissertation')) {
      return {
        sample: 'Design and Implementation of a Federated Learning Framework for Privacy-Preserving Healthcare Data Analysis',
        tip: 'Write the full official title of your thesis or capstone. If you don\'t recall the exact wording, get as close as possible — you can refine it later. A clear, specific title signals research depth to admissions committees.',
      }
    }
    // Only show the degree-field tip for institution / degree / field / GPA questions
    const basicFields = ['institution', 'degree', 'field', 'gpa', 'grade', 'cgpa', 'wam', 'mark']
    if (basicFields.some(f => field.includes(f))) return SECTION_SAMPLES.education
    // All other education fields — no generic tip, show nothing
    return null
  }

  // For tip-only entries (no sample text, just guidance)
  if (question.hint && (question.type === 'textarea' || question.type === 'array')) {
    return { sample: null, tip: question.hint }
  }

  return null
}

// ─── Question Content Component ──────────────────────────────────────────────

function QuestionContent({
  currentQuestion, hintText, answer, setAnswer,
  source, currentQuestionIndex, handlePrevious, handleSkip, handleNext, onConfirm,
}) {
  return (
    <div className="max-w-2xl">
      <h2 className="text-3xl lg:text-4xl font-bold text-black mb-3 leading-tight tracking-tight">
        {currentQuestion.question}
      </h2>
      <p className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Lightbulb className="w-4 h-4 flex-shrink-0 opacity-70" />
        {hintText}
      </p>

      <div className="mb-10">
        {currentQuestion.type === 'confirm' ? (
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => { setAnswer('yes'); onConfirm?.('yes') }}
              className={`flex-1 h-14 rounded-2xl border-2 text-base font-semibold transition-all ${
                answer === 'yes'
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-black border-gray-200 hover:border-gray-400'
              }`}
            >
              Yes
            </button>
            <button
              type="button"
              onClick={() => { setAnswer('no'); onConfirm?.('no') }}
              className={`flex-1 h-14 rounded-2xl border-2 text-base font-semibold transition-all ${
                answer === 'no'
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-black border-gray-200 hover:border-gray-400'
              }`}
            >
              No, continue
            </button>
          </div>
        ) : currentQuestion.type === 'textarea' ? (
          <Textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder={currentQuestion.placeholder}
            className="min-h-[160px] w-full rounded-2xl border-2 border-gray-200 bg-white px-4 py-3 text-base text-black placeholder:text-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-100 focus:outline-none transition-all resize-none"
          />
        ) : currentQuestion.type === 'array' ? (
          <Textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder={currentQuestion.placeholder}
            className="min-h-[140px] w-full rounded-2xl border-2 border-gray-200 bg-white px-4 py-3 text-base text-black placeholder:text-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-100 focus:outline-none transition-all resize-none"
          />
        ) : currentQuestion.type === 'select' ? (
          <div className="relative">
            <select
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="question-select w-full h-14 pl-5 pr-12 rounded-2xl border-2 border-gray-200 bg-white text-base text-black focus:border-gray-400 focus:ring-2 focus:ring-gray-100 focus:outline-none transition-all appearance-none cursor-pointer"
            >
              <option value="">Choose one...</option>
              {(currentQuestion.options || []).map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
            </span>
          </div>
        ) : (
          <Input
            type={currentQuestion.type}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder={currentQuestion.placeholder}
            className="h-14 w-full rounded-2xl border-2 border-gray-200 px-4 text-base text-black focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
          />
        )}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button
          type="button"
          variant="register"
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          className="inline-flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        {!currentQuestion.required && currentQuestion.type !== 'confirm' && (
          <Button type="button" variant="register" onClick={handleSkip}>
            Skip
          </Button>
        )}
        <Button
          type="button"
          variant="cta"
          onClick={handleNext}
          disabled={
            (currentQuestion.required && !answer.trim()) ||
            (currentQuestion.type === 'confirm' && !answer)
          }
          className="inline-flex items-center gap-2"
        >
          {currentQuestion.type === 'confirm' ? 'Continue' : 'Next'}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

// ─── Sample Panel Component ───────────────────────────────────────────────────

function SamplePanel({ question, context, resumeData, onUseSample }) {
  const [copied, setCopied] = useState(false)
  const [aiSample, setAiSample] = useState(null)       // AI-written answer
  const [isGenerating, setIsGenerating] = useState(false)
  const cacheRef = useRef(new Map())                   // questionId → generated string

  const isUploaded = resumeData?._sourceResume === 'uploaded'

  // Static fallback data (generic samples or raw resume data)
  const staticData = getSampleForQuestion(question, context, resumeData)

  // Reset on question change
  useEffect(() => {
    setCopied(false)
    setAiSample(null)

    if (!isUploaded || !question?.id) return

    // Skip for select / simple text questions — AI isn't useful there
    if (question.type === 'select' || question.type === 'month') return

    // Skip confirm questions entirely
    if (question.type === 'confirm') return

    // Skip for simple data fields where a generated paragraph makes no sense
    // Also skip thesis/capstone title — AI hallucinates or echoes the summary when no thesis exists
    const SIMPLE_FIELDS = ['gpa', 'cgpa', 'score', 'grade', 'year', 'startDate', 'endDate',
      'phone', 'email', 'location', 'linkedin', 'github', 'portfolio', 'doi', 'link',
      'thesisTitle', 'capstoneTitle', 'dissertationTitle',
      // Certifications/projects structured fields — static samples are better
      'issuer', 'date', 'techStack', 'link']
    const fieldLower = (question.field || '').toLowerCase()
    const isThesisField = ['thesis', 'capstone', 'dissertation'].some(f => fieldLower.includes(f))
    if (SIMPLE_FIELDS.includes(question.field) || isThesisField) return

    // Check cache
    if (cacheRef.current.has(question.id)) {
      setAiSample(cacheRef.current.get(question.id))
      return
    }

    // Call API
    const generate = async () => {
      setIsGenerating(true)
      try {
        const res = await fetch('/api/generate-sample', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ question, resumeData, context }),
        })
        if (!res.ok) throw new Error('Failed')
        const { sample } = await res.json()
        if (sample) {
          cacheRef.current.set(question.id, sample)
          setAiSample(sample)
        }
      } catch {
        // Silently fall back to static data
      } finally {
        setIsGenerating(false)
      }
    }

    generate()
  }, [question?.id])

  // Decide what to show
  const displaySample = isUploaded ? (aiSample || null) : staticData?.sample
  const displayTip = isUploaded
    ? 'AI-written using your resume — edit anything that looks off before using it.'
    : staticData?.tip
  const isAiWritten = isUploaded && !!aiSample

  // Don't render if nothing useful to show and not loading
  if (!isGenerating && !displaySample && !staticData?.tip) return null
  // For non-uploaded: respect the static data check
  if (!isUploaded && !staticData) return null

  const handleCopy = () => {
    if (!displaySample) return
    onUseSample(displaySample)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-white rounded-2xl border-2 border-black shadow-key p-5 flex flex-col gap-4">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {isAiWritten ? (
            <div className="w-7 h-7 rounded-lg bg-ref-green flex items-center justify-center shrink-0">
              <Sparkles className="w-3.5 h-3.5 text-black" />
            </div>
          ) : isGenerating ? (
            <div className="w-7 h-7 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center shrink-0 animate-pulse">
              <Sparkles className="w-3.5 h-3.5 text-gray-400" />
            </div>
          ) : (
            <div className="w-7 h-7 rounded-lg bg-ref-green flex items-center justify-center shrink-0">
              <Sparkles className="w-3.5 h-3.5 text-black" />
            </div>
          )}
          <span className="font-semibold text-black text-sm">
            {isGenerating ? 'Writing from your resume…' : isAiWritten ? 'Written from your resume' : 'Sample answer'}
          </span>
        </div>
        {isAiWritten && (
          <span className="text-xs px-2 py-0.5 rounded-full bg-ref-green/20 text-black border border-ref-green font-medium">
            AI · your data
          </span>
        )}
      </div>

      {/* Loading skeleton */}
      {isGenerating && (
        <div className="space-y-2 animate-pulse">
          <div className="h-3 bg-gray-200 rounded-full w-full" />
          <div className="h-3 bg-gray-200 rounded-full w-5/6" />
          <div className="h-3 bg-gray-200 rounded-full w-4/6" />
          <div className="h-3 bg-gray-200 rounded-full w-full mt-1" />
          <div className="h-3 bg-gray-200 rounded-full w-3/4" />
        </div>
      )}

      {/* Generated / static sample text */}
      {!isGenerating && displaySample && (
        <div className="flex flex-col gap-2">
          <pre className="whitespace-pre-wrap font-sans text-sm text-gray-700 bg-gray-50 rounded-xl border border-gray-200 px-4 py-3 leading-relaxed">
            {displaySample}
          </pre>
          <button
            type="button"
            onClick={handleCopy}
            className="self-end flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-gray-200 text-xs font-medium text-gray-600 hover:bg-ref-green hover:border-black hover:text-black transition-all shadow-sm"
          >
            {copied ? (
              <><Check className="w-3 h-3" /> Copied!</>
            ) : (
              <><Copy className="w-3 h-3" /> Use this</>
            )}
          </button>
        </div>
      )}

      {/* ATS tip */}
      {!isGenerating && displayTip && (
        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-gray-50 border border-gray-200">
          <Lightbulb className="w-4 h-4 text-gray-500 shrink-0 mt-0.5" />
          <p className="text-xs text-gray-600 leading-relaxed">{displayTip}</p>
        </div>
      )}

      {/* Footer */}
      {!isGenerating && displaySample && (
        <p className="text-xs text-gray-400 text-center">
          {isAiWritten
            ? 'Review carefully — AI can make mistakes. Edit before submitting.'
            : 'Edit to match your real experience — accuracy = better ATS score.'}
        </p>
      )}
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function QuestionsPage() {
  const [resumeData, setResumeData] = useState(null)
  const [source, setSource] = useState(null)
  const [currentQuestion, setCurrentQuestion] = useState(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answer, setAnswer] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isGeneratingQuestions, setIsGeneratingQuestions] = useState(false)
  const [dynamicQuestions, setDynamicQuestions] = useState([])
  const [leftPct, setLeftPct] = useState(62)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef(null)
  const loopCounters = useRef({})
  const router = useRouter()

  const startDrag = useCallback((e) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  useEffect(() => {
    if (!isDragging) return
    const onMove = (e) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const pct = ((e.clientX - rect.left) / rect.width) * 100
      setLeftPct(Math.min(80, Math.max(28, pct)))
    }
    const onUp = () => setIsDragging(false)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
  }, [isDragging])

  useEffect(() => {
    const storedData = sessionStorage.getItem('resumeData')
    const storedSource = sessionStorage.getItem('resumeSource')
    const storedIndex = sessionStorage.getItem('currentStep')

    if (!storedData) {
      router.push('/')
      return
    }

    const data = JSON.parse(storedData)
    setResumeData(data)
    setSource(storedSource)

    if (storedSource === 'blank') {
      const questions = [...QUESTION_FLOW.blank]
      setDynamicQuestions(questions)
      // Restore position by question ID (robust to list changes)
      const storedId = storedIndex // reuse storage key, now stores question ID
      const startIdx = storedId
        ? Math.max(0, questions.findIndex(q => q.id === storedId))
        : 0
      setCurrentQuestionIndex(startIdx)
      setCurrentQuestion(questions[startIdx] || null)
      setAnswer(getAnswerFromData(data, questions[startIdx]))
    } else if (storedSource === 'academic') {
      generateAcademicQuestionsFlow(data)
    } else {
      generateQuestionsForResume(data)
    }

    setIsLoading(false)
  }, [])

  const generateAcademicQuestionsFlow = async (data) => {
    setIsGeneratingQuestions(true)
    try {
      const response = await fetch('/api/generate-academic-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          academicContext: data.context,
          existingResumeData: data._sourceResume === 'uploaded' ? data : null,
        }),
      })
      if (!response.ok) throw new Error('Failed to generate academic questions')
      const { questions } = await response.json()
      setDynamicQuestions(questions)
      if (questions.length > 0) {
        setCurrentQuestion(questions[0])
        setAnswer(getAnswerFromData(data, questions[0]))
      }
      window.LyticData?.track('academic_questions_generated', {
        degreeType: data.context?.degreeType,
        targetCountry: data.context?.targetCountry,
        targetProgram: data.context?.targetProgram,
      })
    } catch (error) {
      console.error('Error generating academic questions:', error)
      router.push('/resume/preview')
    } finally {
      setIsGeneratingQuestions(false)
    }
  }

  const generateQuestionsForResume = async (data) => {
    setIsGeneratingQuestions(true)
    try {
      const response = await fetch('/api/generate-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeData: data }),
      })
      if (!response.ok) throw new Error('Failed to generate questions')
      const { questions } = await response.json()
      setDynamicQuestions(questions)
      if (questions.length > 0) {
        setCurrentQuestion(questions[0])
        setAnswer(getAnswerFromData(data, questions[0]))
      }
      window.LyticData?.track('ats_score', { source: sessionStorage.getItem('resumeSource') || 'upload' })
    } catch (error) {
      console.error('Error generating questions:', error)
      router.push('/resume/preview')
    } finally {
      setIsGeneratingQuestions(false)
    }
  }

  const getAnswerFromData = (data, question) => {
    if (!question || !data) return ''
    // Confirm questions (loop/gate) always start blank
    if (question.section === 'loop' || question.section === 'gate') return ''
    if (question.section === 'context') return data.context?.[question.field] ?? ''
    if (question.section === 'personalInfo') return data.personalInfo?.[question.field] || ''
    if (question.section === 'summary') return data.summary || ''
    if (question.section === 'workExperience') {
      const lastExp = data.workExperience?.[data.workExperience.length - 1]
      if (question.field === 'achievements' && lastExp?.achievements) {
        return Array.isArray(lastExp.achievements) ? lastExp.achievements.join('\n') : ''
      }
      return lastExp?.[question.field] || ''
    }
    if (question.section === 'education') {
      const lastEdu = data.education?.[data.education.length - 1]
      return lastEdu?.[question.field] || ''
    }
    if (question.section === 'skills') {
      return Array.isArray(data.skills) ? data.skills.join(', ') : ''
    }
    // Generic: certifications, projects, and any other array sections
    if (question.section && Array.isArray(data[question.section])) {
      const lastEntry = data[question.section][data[question.section].length - 1]
      if (!lastEntry || !question.field) return ''
      const val = lastEntry[question.field]
      if (Array.isArray(val)) return val.join(question.splitBy === ',' ? ', ' : '\n')
      return val || ''
    }
    return ''
  }

  // answerOverride lets confirm buttons advance without waiting for state to settle
  const handleNext = (answerOverride) => {
    if (!currentQuestion) return
    const currentAnswer = answerOverride !== undefined ? answerOverride : answer
    const updated = updateResumeData(resumeData, currentQuestion, currentAnswer)
    setResumeData(updated)
    sessionStorage.setItem('resumeData', JSON.stringify(updated))

    const questions = dynamicQuestions
    const currentIndex = questions.findIndex(q => q.id === currentQuestion.id)

    // ── Gate question: skip entire gated section on "no" ──────────────────────
    if (currentQuestion.section === 'gate' && currentQuestion.gateSection) {
      if (currentAnswer !== 'yes') {
        let nextIdx = currentIndex + 1
        while (
          nextIdx < questions.length &&
          (questions[nextIdx].section === currentQuestion.gateSection ||
           questions[nextIdx].loopGroup === currentQuestion.gateSection)
        ) nextIdx++
        navigateToQuestion(questions[nextIdx] || null, updated)
        return
      }
      // "yes" → fall through to normal next
    }

    // ── Loop question: insert more questions on "yes" ─────────────────────────
    if (currentQuestion.section === 'loop' && currentQuestion.loopGroup) {
      if (currentAnswer === 'yes') {
        const group = currentQuestion.loopGroup
        const counter = (loopCounters.current[group] || 0) + 1
        loopCounters.current[group] = counter

        // Push a new empty entry into that section
        const newUpdated = { ...updated }
        if (!newUpdated[group]) newUpdated[group] = []
        newUpdated[group] = [...newUpdated[group], {}]
        setResumeData(newUpdated)
        sessionStorage.setItem('resumeData', JSON.stringify(newUpdated))

        // Insert new question block right after the current confirm question
        const block = makeLoopBlock(group, counter)
        const newQuestions = [
          ...questions.slice(0, currentIndex + 1),
          ...block,
          ...questions.slice(currentIndex + 1),
        ]
        setDynamicQuestions(newQuestions)
        const firstNew = block[0]
        setCurrentQuestion(firstNew)
        setAnswer(getAnswerFromData(newUpdated, firstNew))
        if (source === 'blank') sessionStorage.setItem('currentStep', firstNew.id)
        return
      }
      // "no" → fall through to normal next
    }

    // ── Normal navigation ─────────────────────────────────────────────────────
    if (currentIndex >= questions.length - 1) {
      router.push('/resume/preview')
      return
    }
    const nextQuestion = questions[currentIndex + 1]
    navigateToQuestion(nextQuestion, updated)
  }

  const navigateToQuestion = (question, data) => {
    if (!question) {
      router.push('/resume/preview')
      return
    }
    const idx = dynamicQuestions.findIndex(q => q.id === question.id)
    setCurrentQuestion(question)
    setCurrentQuestionIndex(Math.max(0, idx))
    setAnswer(getAnswerFromData(data || resumeData, question))
    if (source === 'blank') sessionStorage.setItem('currentStep', question.id)
  }

  const handlePrevious = () => {
    const questions = dynamicQuestions
    const currentIndex = questions.findIndex(q => q.id === currentQuestion?.id)
    if (currentIndex <= 0) return
    const prevQuestion = questions[currentIndex - 1]
    setCurrentQuestion(prevQuestion)
    setCurrentQuestionIndex(currentIndex - 1)
    setAnswer(getAnswerFromData(resumeData, prevQuestion))
    if (source === 'blank') sessionStorage.setItem('currentStep', prevQuestion.id)
  }

  const handleSkip = () => { handleNext('') }

  const getProgressValue = () => {
    const currentIndex = dynamicQuestions.findIndex(q => q.id === currentQuestion?.id)
    return dynamicQuestions.length > 0
      ? Math.round(((currentIndex + 1) / dynamicQuestions.length) * 100)
      : 0
  }

  const getQuestionNumber = () => {
    const currentIndex = dynamicQuestions.findIndex(q => q.id === currentQuestion?.id)
    return `${currentIndex + 1} of ${dynamicQuestions.length}`
  }

  if (isLoading || isGeneratingQuestions) {
    return (
      <div className="min-h-full flex items-center justify-center bg-[#f0f0f0]">
        <div className="bg-white rounded-2xl p-8 text-center">
          <div className="w-12 h-12 border-2 border-ref-green border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-gray-600 mt-4">
            {isGeneratingQuestions
              ? source === 'academic'
                ? resumeData?._sourceResume === 'uploaded'
                  ? `Analyzing your resume and building academic questions for ${resumeData?.context?.targetProgram || 'your program'} in ${resumeData?.context?.targetCountry || 'your country'}...`
                  : `Building questions for your ${resumeData?.context?.degreeType?.toUpperCase() || 'academic'} application in ${resumeData?.context?.targetProgram || 'your program'}...`
                : 'Analyzing your resume and preparing questions...'
              : 'Loading...'}
          </p>
        </div>
      </div>
    )
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-full flex items-center justify-center bg-[#f0f0f0]">
        <div className="max-w-md p-8 text-center bg-white rounded-xl border-2 border-black shadow-key">
          <CheckCircle2 className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-black mb-2">All Done!</h2>
          <p className="text-gray-600 mb-6">Redirecting to your resume...</p>
        </div>
      </div>
    )
  }

  const context = resumeData?.context || {}
  const hintText = getHintForQuestion(currentQuestion, context)
  const hasSamplePanel = !!getSampleForQuestion(currentQuestion, context, resumeData)

  return (
    <div className="min-h-full bg-[#f0f0f0]">
      <div className="bg-[#f0f0f0] rounded-t-3xl min-h-[calc(100vh-4rem)] py-12 px-4">
        <div className="max-w-6xl mx-auto">

          {/* Progress bar */}
          <div className="mb-10">
            <div className="flex justify-between items-center text-sm text-gray-500 mb-1.5">
              <span>{getQuestionNumber()}</span>
              <span>{getProgressValue()}%</span>
            </div>
            <div className="h-1 w-full rounded-full bg-gray-200 overflow-hidden">
              <div
                className="h-full bg-gray-400 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${getProgressValue()}%` }}
              />
            </div>
          </div>

          {/* ── Desktop: resizable two-column layout ── */}
          {hasSamplePanel ? (
            <>
              <div
                ref={containerRef}
                className={`hidden xl:flex items-start${isDragging ? ' select-none cursor-col-resize' : ''}`}
              >
                {/* Left: question */}
                <div style={{ width: `${leftPct}%` }} className="min-w-0 pr-6">
                  <QuestionContent
                    currentQuestion={currentQuestion}
                    hintText={hintText}
                    answer={answer}
                    setAnswer={setAnswer}
                    source={source}
                    currentQuestionIndex={currentQuestionIndex}
                    handlePrevious={handlePrevious}
                    handleSkip={handleSkip}
                    handleNext={handleNext}
                    onConfirm={handleNext}
                  />
                </div>

                {/* Drag handle */}
                <div
                  onMouseDown={startDrag}
                  title="Drag to resize"
                  className={`
                    shrink-0 w-5 self-stretch flex flex-col items-center justify-center gap-1
                    cursor-col-resize group relative
                  `}
                >
                  {/* visible track line */}
                  <div className={`absolute inset-y-0 left-1/2 -translate-x-1/2 w-px transition-colors duration-150 ${isDragging ? 'bg-ref-green' : 'bg-gray-200 group-hover:bg-gray-400'}`} />
                  {/* grip pill */}
                  <div className={`relative z-10 flex flex-col items-center justify-center gap-0.5 px-1 py-2 rounded-full border transition-all duration-150 ${isDragging ? 'bg-ref-green border-black shadow-key-sm' : 'bg-white border-gray-300 group-hover:border-gray-500 group-hover:shadow-sm'}`}>
                    <GripVertical className={`w-3 h-3 transition-colors duration-150 ${isDragging ? 'text-black' : 'text-gray-400 group-hover:text-gray-600'}`} />
                  </div>
                </div>

                {/* Right: sample panel */}
                <div style={{ width: `${100 - leftPct}%` }} className="min-w-0 pl-3 sticky top-8">
                  <SamplePanel
                    question={currentQuestion}
                    context={context}
                    resumeData={resumeData}
                    onUseSample={setAnswer}
                  />
                </div>
              </div>

              {/* Mobile: single column */}
              <div className="xl:hidden">
                <QuestionContent
                  currentQuestion={currentQuestion}
                  hintText={hintText}
                  answer={answer}
                  setAnswer={setAnswer}
                  source={source}
                  currentQuestionIndex={currentQuestionIndex}
                  handlePrevious={handlePrevious}
                  handleSkip={handleSkip}
                  handleNext={handleNext}
                  onConfirm={handleNext}
                />
                <div className="mt-8">
                  <SamplePanel
                    question={currentQuestion}
                    context={context}
                    resumeData={resumeData}
                    onUseSample={setAnswer}
                  />
                </div>
              </div>
            </>
          ) : (
            /* No sample panel — full width question */
            <QuestionContent
              currentQuestion={currentQuestion}
              hintText={hintText}
              answer={answer}
              setAnswer={setAnswer}
              source={source}
              currentQuestionIndex={currentQuestionIndex}
              handlePrevious={handlePrevious}
              handleSkip={handleSkip}
              handleNext={handleNext}
              onConfirm={handleNext}
            />
          )}

          <p className="mt-12 text-center text-sm text-gray-400">
            You&apos;re doing great — keep going
          </p>
        </div>
      </div>
    </div>
  )
}
