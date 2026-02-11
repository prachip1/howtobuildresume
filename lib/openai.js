import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

/**
 * Parse unstructured resume text into structured JSON
 */
export async function parseResumeText(text) {
  const prompt = `You are a resume parsing expert. Parse the following resume text and extract structured information. Return a JSON object with the following structure:

{
  "personalInfo": {
    "name": "string",
    "email": "string",
    "phone": "string",
    "location": "string",
    "linkedin": "string",
    "github": "string",
    "portfolio": "string"
  },
  "summary": "string",
  "workExperience": [
    {
      "company": "string",
      "role": "string",
      "startDate": "YYYY-MM",
      "endDate": "YYYY-MM or 'Current'",
      "location": "string",
      "description": "string",
      "achievements": ["string"]
    }
  ],
  "education": [
    {
      "institution": "string",
      "degree": "string",
      "field": "string",
      "startDate": "YYYY-MM",
      "endDate": "YYYY-MM",
      "gpa": "string",
      "honors": "string"
    }
  ],
  "skills": ["string"],
  "projects": [
    {
      "name": "string",
      "description": "string",
      "techStack": ["string"],
      "link": "string",
      "date": "YYYY-MM"
    }
  ],
  "certifications": [
    {
      "name": "string",
      "issuer": "string",
      "date": "YYYY-MM",
      "expiry": "YYYY-MM"
    }
  ]
}

Resume text:
${text}

Return only valid JSON, no additional text.`

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a resume parsing expert. Always return valid JSON only."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.3,
    })

    const parsed = JSON.parse(response.choices[0].message.content)
    return parsed
  } catch (error) {
    console.error('Error parsing resume:', error)
    throw new Error('Failed to parse resume text')
  }
}

/**
 * Parse LinkedIn profile text (plain text only; HTML/images already stripped)
 */
export async function parseLinkedInProfile(text) {
  const prompt = `You are a LinkedIn profile parsing expert. The input below is PLAIN TEXT only copied from a LinkedIn profile (no HTML, no images). It may include section labels, extra formatting, or UI text like "Message", "Connect", "See more". Extract all resume-relevant information.

**Critical extractions:**
- **Name**: Usually at the very top; often "FirstName LastName" or similar. Do not skip this.
- **Headline**: Often right under the name (e.g. "Software Engineer at X" or "Student at Y").
- **Location**: Look for city, region, or "Contact info" vicinity.
- **About / Summary**: Paragraph(s) about the person.
- **Experience**: Each role with company, title, dates, location, and description/bullets.
- **Education**: Institution, degree, field, dates.
- **Skills**: List all mentioned skills.
- **Certifications, Projects**: If present.

Return a JSON object with this exact structure. Use null or empty string for missing fields. For arrays, use [] if none.

{
  "personalInfo": {
    "name": "string",
    "email": "string",
    "phone": "string",
    "location": "string",
    "linkedin": "string",
    "github": "string",
    "portfolio": "string"
  },
  "summary": "string",
  "workExperience": [{"company": "string", "role": "string", "startDate": "YYYY-MM", "endDate": "YYYY-MM or 'Current'", "location": "string", "description": "string", "achievements": ["string"]}],
  "education": [{"institution": "string", "degree": "string", "field": "string", "startDate": "YYYY-MM", "endDate": "YYYY-MM", "gpa": "string", "honors": "string"}],
  "skills": ["string"],
  "projects": [{"name": "string", "description": "string", "techStack": ["string"], "link": "string", "date": "YYYY-MM"}],
  "certifications": [{"name": "string", "issuer": "string", "date": "YYYY-MM", "expiry": "YYYY-MM"}]
}

LinkedIn profile text (plain text only):
${text}

Return only valid JSON, no additional text or markdown.`

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a LinkedIn profile parsing expert. Always return valid JSON only."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.3,
    })

    const parsed = JSON.parse(response.choices[0].message.content)
    return parsed
  } catch (error) {
    console.error('Error parsing LinkedIn profile:', error)
    throw new Error('Failed to parse LinkedIn profile')
  }
}

/**
 * Infer resume layout from an image of the resume (e.g. first page of PDF).
 * Uses vision so the result closely matches the uploaded resume look.
 */
export async function analyzeResumeLayoutFromImage(imageBase64) {
  const url = imageBase64.startsWith('data:') ? imageBase64 : `data:image/png;base64,${imageBase64}`
  const prompt = `Look at this resume image. Describe its LAYOUT and FORMAT so we can recreate a similar look. Consider:
- Is the name/title centered or left-aligned?
- Is the body text left-aligned or justified?
- Is it single column or two columns (e.g. sidebar)?
- Is spacing compact (dense), normal, or relaxed (lots of white space)?
- Style: traditional (classic sections, serif feel), modern (clean, minimal), or minimal (very sparse)?

Return a JSON object with exactly these keys and only these allowed values:
- "nameAlignment": "left" | "center"
- "bodyAlignment": "left" | "justify"
- "columns": 1 | 2
- "spacing": "compact" | "normal" | "relaxed"
- "style": "traditional" | "modern" | "minimal"

Return only valid JSON, no other text.`

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: 'You are a resume layout expert. Return only valid JSON with the exact keys specified.' },
        {
          role: 'user',
          content: [
            { type: 'text', text: prompt },
            { type: 'image_url', image_url: { url } },
          ],
        },
      ],
      max_tokens: 300,
    })
    const text = response.choices[0]?.message?.content?.trim() || '{}'
    const parsed = JSON.parse(text.replace(/^```json\s*|\s*```$/g, ''))
    return {
      nameAlignment: ['left', 'center'].includes(parsed.nameAlignment) ? parsed.nameAlignment : 'left',
      bodyAlignment: ['left', 'justify'].includes(parsed.bodyAlignment) ? parsed.bodyAlignment : 'left',
      columns: [1, 2].includes(parsed.columns) ? parsed.columns : 1,
      spacing: ['compact', 'normal', 'relaxed'].includes(parsed.spacing) ? parsed.spacing : 'normal',
      style: ['traditional', 'modern', 'minimal'].includes(parsed.style) ? parsed.style : 'traditional',
    }
  } catch (error) {
    console.error('Error analyzing resume layout from image:', error)
    return null
  }
}

/**
 * Infer resume layout/style from structured resume data so we can match the user's original look.
 * Returns layout options: alignment, columns, spacing, style.
 * Used when we don't have an image (e.g. DOCX upload).
 */
export async function analyzeResumeLayout(resumeData) {
  const structure = {
    hasSummary: !!resumeData.summary,
    sectionOrder: [],
    workCount: (resumeData.workExperience || []).length,
    educationCount: (resumeData.education || []).length,
    skillsCount: (resumeData.skills || []).length,
    projectsCount: (resumeData.projects || []).length,
    certsCount: (resumeData.certifications || []).length,
    summaryLength: (resumeData.summary || '').length,
  }
  if (resumeData.personalInfo?.name) structure.sectionOrder.push('header')
  if (structure.hasSummary) structure.sectionOrder.push('summary')
  if (structure.workCount) structure.sectionOrder.push('experience')
  if (structure.educationCount) structure.sectionOrder.push('education')
  if (structure.skillsCount) structure.sectionOrder.push('skills')
  if (structure.projectsCount) structure.sectionOrder.push('projects')
  if (structure.certsCount) structure.sectionOrder.push('certifications')

  const prompt = `You are a resume layout expert. Given the STRUCTURE of a resume (not the content), infer how it was likely formatted so we can recreate a similar look.

Resume structure:
${JSON.stringify(structure, null, 2)}

Return a JSON object with exactly these keys and only these allowed values:
- "nameAlignment": "left" | "center"
- "bodyAlignment": "left" | "justify"
- "columns": 1 | 2
- "spacing": "compact" | "normal" | "relaxed"
- "style": "traditional" | "modern" | "minimal"

Choose based on common resume conventions: e.g. many sections/short summary often = compact; center name is common; two columns often when skills/sidebar present. Return only valid JSON.`

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are a resume layout expert. Return only valid JSON with the exact keys specified.' },
        { role: 'user', content: prompt },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.2,
    })
    const parsed = JSON.parse(response.choices[0].message.content)
    return {
      nameAlignment: ['left', 'center'].includes(parsed.nameAlignment) ? parsed.nameAlignment : 'left',
      bodyAlignment: ['left', 'justify'].includes(parsed.bodyAlignment) ? parsed.bodyAlignment : 'left',
      columns: [1, 2].includes(parsed.columns) ? parsed.columns : 1,
      spacing: ['compact', 'normal', 'relaxed'].includes(parsed.spacing) ? parsed.spacing : 'normal',
      style: ['traditional', 'modern', 'minimal'].includes(parsed.style) ? parsed.style : 'traditional',
    }
  } catch (error) {
    console.error('Error analyzing resume layout:', error)
    return {
      nameAlignment: 'left',
      bodyAlignment: 'left',
      columns: 1,
      spacing: 'normal',
      style: 'traditional',
    }
  }
}

/**
 * Generate smart questions based on resume data
 */
export async function generateSmartQuestions(resumeData) {
  const prompt = `Analyze this resume data and generate 3-5 smart, engaging questions that will help improve the resume. Focus on:
1. Missing quantifiable achievements
2. Weak descriptions that need enhancement
3. Missing relevant information
4. Areas that need more detail

Make questions conversational and encouraging, not monotonous. Each question should be specific and actionable.

Resume data:
${JSON.stringify(resumeData, null, 2)}

Return a JSON array of question objects:
[
  {
    "id": "string",
    "question": "string",
    "field": "string (which field this question relates to)",
    "type": "string (text, number, array, etc.)",
    "hint": "string (helpful tip or example)"
  }
]`

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a resume enhancement expert. Generate engaging, specific questions."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
    })

    const result = JSON.parse(response.choices[0].message.content)
    return result.questions || []
  } catch (error) {
    console.error('Error generating questions:', error)
    return []
  }
}
