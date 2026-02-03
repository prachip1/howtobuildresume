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
