import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

/**
 * Build a compact resume snapshot relevant to the question being asked.
 * Keeps token usage low by only sending what the AI needs.
 */
function buildResumeSnapshot(resumeData, question) {
  const section = question?.section || ''
  const snap = {}

  // Always include personal info
  if (resumeData.personalInfo) snap.personalInfo = resumeData.personalInfo

  // Include summary for context — but NOT for specific structured fields where it causes confusion
  const fieldLower = (question?.field || '').toLowerCase()
  const SKIP_SUMMARY_FIELDS = ['thesis', 'capstone', 'dissertation', 'thesistitle', 'capstonetitle']
  const isStructuredField = SKIP_SUMMARY_FIELDS.some(f => fieldLower.includes(f))
  if (resumeData.summary && !isStructuredField) snap.summary = resumeData.summary

  // Add section-specific data
  if (section === 'workExperience' || section === 'summary') {
    snap.workExperience = (resumeData.workExperience || []).slice(0, 3).map(e => ({
      role: e.role,
      company: e.company,
      startDate: e.startDate,
      endDate: e.endDate,
      description: e.description,
      achievements: (e.achievements || []).slice(0, 4),
    }))
  }
  if (section === 'education' || section === 'summary') {
    snap.education = (resumeData.education || []).slice(0, 2)
  }
  if (section === 'skills' || section === 'summary') {
    snap.skills = resumeData.skills || []
  }
  if (section === 'projects') {
    snap.projects = (resumeData.projects || []).slice(0, 2)
  }
  if (section === 'researchExperience') {
    snap.researchExperience = resumeData.researchExperience || []
    snap.education = (resumeData.education || []).slice(0, 2)
  }
  if (section === 'publications') {
    snap.publications = resumeData.publications || []
  }
  if (section === 'honors') {
    snap.honors = resumeData.honors || []
    snap.education = (resumeData.education || []).slice(0, 2)
  }
  if (section === 'languageSkills') {
    snap.languageSkills = resumeData.languageSkills || []
  }
  // If no specific match, include core sections
  if (Object.keys(snap).length <= 2) {
    snap.workExperience = (resumeData.workExperience || []).slice(0, 2)
    snap.education = (resumeData.education || []).slice(0, 1)
    snap.skills = (resumeData.skills || []).slice(0, 15)
  }
  return snap
}

function buildContextString(context) {
  if (!context) return ''
  const parts = []
  if (context.resumePurpose === 'academic') {
    if (context.degreeType) parts.push(`Applying for: ${context.degreeType.toUpperCase()}`)
    if (context.targetProgram) parts.push(`Program: ${context.targetProgram}`)
    if (context.targetCountry) parts.push(`Country: ${context.targetCountry}`)
    if (context.targetInstitution) parts.push(`Institution: ${context.targetInstitution}`)
  } else {
    if (context.jobRole) parts.push(`Target role: ${context.jobRole.replace(/_/g, ' ')}`)
    if (context.experienceYears) parts.push(`Experience: ${context.experienceYears} years`)
    if (context.jobLookingFor) parts.push(`Looking for: ${context.jobLookingFor.replace(/_/g, ' ')}`)
  }
  return parts.join(' | ')
}

export async function POST(request) {
  try {
    const { question, resumeData, context } = await request.json()

    if (!question || !resumeData) {
      return NextResponse.json({ error: 'question and resumeData are required' }, { status: 400 })
    }

    const snapshot = buildResumeSnapshot(resumeData, question)
    const contextStr = buildContextString(context)
    const isAcademic = context?.resumePurpose === 'academic'

    const systemPrompt = `You are an expert resume writer. Your job is to write a ready-to-use answer to a resume question, based on the user's actual background.

Rules:
- Use ONLY information from the user's resume snapshot — do not invent facts, companies, dates, or metrics that are not there.
- If their resume lacks specific metrics, write strong qualitative descriptions using their real experience.
- Write in first person where natural (no "I" for skill lists or titles).
- For summary/bio: 2–4 sentences, no bullet points.
- For descriptions/responsibilities: 2–4 lines, each starting with an action verb.
- For achievements: bullet-point format, one per line, each with a verb + outcome.
- For skills: comma-separated list, grouped logically.
- For academic bio: focus on research interest, relevant background, and program motivation.
- Return ONLY the answer text. No preamble, no explanation, no quotes.`

    const userPrompt = `QUESTION: ${question.question}
QUESTION TYPE: ${question.type} (section: ${question.section}, field: ${question.field || 'n/a'})
${contextStr ? `CONTEXT: ${contextStr}` : ''}

USER'S RESUME:
${JSON.stringify(snapshot, null, 2)}

Write a strong, professional answer to the question above using this person's real background.${isAcademic ? ' Frame it for a graduate school application, not a job application.' : ''}`

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      max_tokens: 350,
      temperature: 0.55,
    })

    const sample = response.choices[0]?.message?.content?.trim() || ''
    return NextResponse.json({ sample })
  } catch (error) {
    console.error('Generate sample error:', error)
    return NextResponse.json(
      { error: (error?.message) || 'Failed to generate sample' },
      { status: 500 }
    )
  }
}
