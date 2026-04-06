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
 * Generate smart, country- and degree-aware questions for academic/graduate applications
 */
export async function generateAcademicQuestions(context) {
  const { degreeType, targetCountry, targetProgram, targetInstitution } = context

  const degreeLabel = {
    ms: "Master's degree (MS/MSc/MA/MEng)",
    phd: 'PhD / Doctoral program',
    mba: 'MBA (Master of Business Administration)',
    bachelor: "Bachelor's degree",
    diploma: 'Postgraduate Diploma / Certificate',
    other: 'Graduate program',
  }[degreeType] || degreeType

  const countryLabel = {
    usa: 'United States',
    uk: 'United Kingdom',
    canada: 'Canada',
    australia: 'Australia',
    germany: 'Germany',
    italy: 'Italy',
    france: 'France',
    netherlands: 'Netherlands',
    sweden: 'Sweden',
    switzerland: 'Switzerland',
    singapore: 'Singapore',
    india: 'India',
    other: 'an international institution',
  }[targetCountry] || targetCountry

  const countryGuidance = {
    usa: `
- Format: Resume (not CV), ideally 1-2 pages for MS; PhD CVs can be longer.
- GPA: Report on a 4.0 scale. Mention if your institution used a different scale.
- No photo, no date of birth, no marital status on US academic resumes.
- Research experience is the most important section for MS/PhD — specific lab names, PI names, and project outcomes matter.
- Publications, conference papers, and posters are strong differentiators.
- GRE scores (if required by the program) should be mentioned.
- TOEFL/IELTS scores required if English is not the first language.
- Relevant coursework and academic projects are valued, especially for MS.`,

    uk: `
- Format: CV (not resume), 2 pages is standard and acceptable.
- Do NOT include a photo, date of birth, nationality, or marital status — this is illegal/discouraged in UK applications.
- Degree classification matters (First Class, 2:1, 2:2 etc.) — ask for it.
- IELTS score (minimum 6.5 for most programs) is required for non-native English speakers.
- Research experience, dissertations, and final-year projects are highly valued.
- Publications are a bonus for MS; expected for PhD.`,

    canada: `
- Format: Resume (1-2 pages for MS) or CV (PhD, academia).
- GPA on a 4.0 scale or percentage — ask for both if possible.
- TOEFL/IELTS required for non-native speakers.
- Canadian universities value both research experience and industry co-op/internships.
- Publications and conference presentations strengthen PhD applications significantly.
- Bilingual note: for Quebec institutions, French proficiency may be needed.`,

    australia: `
- Format: CV, 2-3 pages is fine.
- No photo required; age and marital status not needed.
- IELTS (minimum 6.5) required for non-native speakers.
- Australian universities value research experience and honours thesis.
- GPA or WAM (Weighted Average Mark, out of 100) — ask for this specifically.
- Industry experience valued for professional master's programs.`,

    germany: `
- Format: Lebenslauf (CV) — structured, usually 2 pages.
- Photo is optional but historically common — ask if they want to include one.
- German grade scale is 1-5 where 1 is the best — clarify the scale when asking for GPA.
- Language skills are critically important: level of German (A1-C2) and English proficiency.
- Motivation letter (Motivationsschreiben) is standard — align resume to support it.
- Research internships (HiWi positions), thesis projects, and Praktika are highly valued.
- Hochschulzugangsberechtigung (entry qualification) may be relevant.`,

    italy: `
- Format: Curriculum Vitae (CV) — 2 pages is fine and common.
- Italian degree grading: "voto di laurea" is out of 110 (e.g., 110/110 con lode = highest honors). Ask for this specifically, not GPA.
- Language skills are critical: Italian proficiency level (A1-C2), and IELTS/TOEFL for English-taught programs.
- Photo is optional but common on Italian CVs — ask the user if they want to include it.
- Tesi di laurea (undergraduate thesis) title and summary are important and expected.
- Erasmus or international exchange experience is highly valued.
- Research internships, university laboratory work, and STEM projects matter.
- For Politecnico programs specifically, engineering/technical project depth is key.
- Ask about certifications like ECDL/ICDL if relevant (common in Italy).`,

    france: `
- Format: CV, typically 1 page for MS, 2 for PhD.
- Photo is common and expected on French CVs.
- French language proficiency (DELF/DALF level) may be required for French-taught programs; ask for it.
- TOEFL/IELTS for English-taught programs (GEM, etc.).
- Grandes Écoles system: if applying to a Grande École master's, Classe Prépa background is very relevant.
- Research internships (stages de recherche) and engineering projects are highly valued.
- French grading: out of 20 (e.g., 16/20 is excellent). Clarify scale.`,

    netherlands: `
- Format: CV, 1-2 pages. Most Dutch master's programs are English-taught.
- No photo required.
- IELTS/TOEFL required for non-native speakers; minimum IELTS 6.5 for most programs.
- Dutch grading: out of 10 (7 is satisfactory, 8 is good, 9-10 is excellent). Ask for this.
- Research experience, bachelor's thesis, and technical projects are important.
- Motivation and fit with the research group matter a lot — ask about research interests.`,

    sweden: `
- Format: CV, 1-2 pages. English widely used.
- No photo required.
- Swedish grading: A-F scale (A=highest) or older VG/G/U system. Ask for grade.
- IELTS/TOEFL for non-native speakers.
- Research thesis, independent projects, and lab work are valued.
- Sustainability and innovation projects are well-regarded in Swedish institutions.`,

    switzerland: `
- Format: CV, 1-2 pages, clean and precise.
- Photo is common (especially for German-speaking Switzerland).
- ETH Zurich / EPFL applications require strong GPA (ETH uses 6.0 scale, EPFL uses 6.0 scale too).
- Language proficiency: German/French/Italian depending on region; English for international programs.
- Research experience and publications are critical for ETH/EPFL.
- Strong mathematics and technical background should be highlighted.`,

    singapore: `
- Format: Resume, 1-2 pages.
- No photo, age, or marital status needed.
- IELTS/TOEFL for non-native English speakers.
- NUS/NTU/SMU value research experience, publications, and strong academic record.
- GPA on a 5.0 scale (NUS/NTU) — ask for this specifically.
- Industry internships alongside research experience are valued.`,

    india: `
- Format: Resume or CV, 2-3 pages typical.
- Photo often included — ask the user.
- GATE score is critical for IIT/IISc MS/MTech applications — ask for it specifically.
- CGPA on a 10.0 scale (most Indian universities) — ask for CGPA, not GPA.
- Publications in journals/conferences, especially IEEE/Springer, are strong for PhD.
- Research internships (IISc, IISER, DRDO, etc.) are highly valued.
- JEE rank (for IIT admissions context) may be relevant.`,
  }[targetCountry] || `
- Follow standard international academic CV conventions.
- 2 pages is generally acceptable.
- Include language proficiency, GPA (with scale), research experience, and publications.
- Check the specific institution's requirements.`

  const degreeGuidance = {
    ms: `
- Research experience (even short-term or coursework-based) is the #1 differentiator.
- Undergraduate thesis or capstone project should be highlighted with outcomes.
- Relevant coursework is worth listing if it aligns with the target program.
- Publications are a bonus but not required — ask if they have any conference papers or posters.
- Technical skills and tools specific to the field are important.
- Statement of purpose alignment: ask about why this specific program and research interests.`,

    phd: `
- Publications are expected — ask for journal papers, conference papers, and posters separately.
- Research experience with specific labs, supervisors (PIs), and outcomes is essential.
- Research statement / proposal alignment — the resume must support their research narrative.
- Conference presentations and workshops attended show engagement with the field.
- Teaching experience (TA roles) is valued.
- Ask specifically about any grants or fellowships received.
- Ask about target supervisor/lab at the institution if known.`,

    mba: `
- Work experience (usually 3-7 years) is the most important section — go deep on impact and leadership.
- Leadership examples: team sizes managed, projects led, revenue impact.
- Community involvement, volunteering, and extracurriculars matter significantly.
- GMAT/GRE/EA scores should be collected.
- Career goals and why MBA now — ask about this for the personal statement section.
- International experience is valued.
- Promotions and career progression should be highlighted.`,

    bachelor: `
- High school academic record and standardized test scores (SAT/ACT/IB/A-Levels etc.) by country.
- Extracurricular activities and leadership roles are very important.
- Volunteer work, community service, sports, and arts involvement.
- Awards and recognition at school or national level.
- Personal statement / essay alignment — ask about interests and motivations.`,

    diploma: `
- Professional work experience and specific skills are most relevant.
- Certifications already held should be listed.
- Reason for pursuing the diploma / professional development motivation.
- Industry-specific skills and tools.`,
  }[degreeType] || `
- Collect standard academic background: education, research/work experience, skills, achievements.`

  const prompt = `You are an expert academic resume and CV advisor. You deeply understand graduate school application requirements across different countries and programs.

The user is building a resume/CV for the following application:
- Degree: ${degreeLabel}
- Program / Field: ${targetProgram}
- Country: ${countryLabel}${targetInstitution ? `\n- Institution: ${targetInstitution}` : ''}

Your task: Generate exactly 12-15 smart, conversational questions that collect all the information needed to build a strong resume for this specific application. The questions must reflect country-specific conventions and degree-specific priorities.

COUNTRY-SPECIFIC REQUIREMENTS FOR ${countryLabel.toUpperCase()}:
${countryGuidance}

DEGREE-SPECIFIC PRIORITIES FOR ${degreeLabel.toUpperCase()}:
${degreeGuidance}

QUESTION ORDER (follow this structure):
1. Personal info: name, email, phone, location (always first, 4 questions)
2. Education: primary degree details (institution, degree, grade/GPA in the correct scale for ${countryLabel}, graduation year, thesis title if relevant)
3. Academic summary / objective: a short academic bio or statement of purpose summary
4. Research experience (if relevant to ${degreeLabel}): lab name, supervisor, period, contributions
5. Work experience (if relevant — especially for MBA): company, role, period, impact
6. Publications / conference papers (if relevant to ${degreeLabel}): citation-style details
7. Honors, awards, scholarships
8. Language skills (critical for ${countryLabel}): language name and proficiency level
9. Technical skills and tools relevant to ${targetProgram}
10. Extracurricular activities / leadership (if relevant to ${degreeLabel})

IMPORTANT RULES:
- Hints must be specific to ${countryLabel} and ${degreeLabel} — not generic resume advice.
- Use the correct grading scale in hints (e.g., for Italy: out of 110; for Germany: 1-5 scale; for USA: out of 4.0).
- Questions should feel conversational and encouraging, not like a form.
- Skip sections that are clearly irrelevant (e.g., don't ask about GATE scores for Italy).
- If the institution is known (${targetInstitution || 'not specified'}), tailor hints to that institution's known preferences.

Return a valid JSON object with a "questions" array. Each question object must have exactly these fields:
{
  "id": "unique_snake_case_string",
  "section": "one of: personalInfo | summary | education | workExperience | researchExperience | publications | honors | languageSkills | skills | projects",
  "field": "the specific field name within that section (e.g. name, email, institution, gpa, description)",
  "question": "the conversational question text shown to the user",
  "type": "one of: text | email | tel | url | textarea | array | select | month",
  "required": true or false,
  "placeholder": "example answer or format hint",
  "hint": "specific, actionable tip for this question in context of ${degreeLabel} in ${countryLabel}"
}`

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are an expert academic resume advisor. You know the exact requirements for graduate school applications across every major country. Return only valid JSON with a "questions" array.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.4,
    })

    const result = JSON.parse(response.choices[0].message.content)
    return result.questions || []
  } catch (error) {
    console.error('Error generating academic questions:', error)
    throw new Error('Failed to generate academic questions')
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
