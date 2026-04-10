/**
 * Question flow configuration for resume building.
 *
 * Order: Personal Info → Context → Summary → Work (looped) →
 *        Education (looped) → Certifications (looped) → Projects (looped) → Skills
 */

// ─── Question block factories (used for initial flow + loop insertions) ────────

function makeWorkExpBlock(loopIndex = 0) {
  const s = loopIndex > 0 ? `_we${loopIndex}` : ''
  return [
    {
      id: `work_role${s}`,
      section: 'workExperience', field: 'role', type: 'text', required: false,
      question: loopIndex > 0
        ? `Role #${loopIndex + 1}: What was your job title?`
        : "Let's add your work experience. What's your most recent or current job title?",
      hint: 'e.g., Senior Software Engineer, Marketing Manager',
      placeholder: 'Software Engineer',
    },
    {
      id: `work_company${s}`,
      section: 'workExperience', field: 'company', type: 'text', required: false,
      question: 'What company did you work for?',
      hint: 'Full company name', placeholder: 'Tech Corp Inc.',
    },
    {
      id: `work_start_date${s}`,
      section: 'workExperience', field: 'startDate', type: 'month', required: false,
      question: 'When did you start this role?',
      hint: 'Month and year', placeholder: '2020-01',
    },
    {
      id: `work_end_date${s}`,
      section: 'workExperience', field: 'endDate', type: 'month', required: false,
      question: 'When did you leave? (leave blank if current)',
      hint: 'Leave blank if you are still in this role', placeholder: '2024-12',
    },
    {
      id: `work_description${s}`,
      section: 'workExperience', field: 'description', type: 'textarea', required: false,
      question: 'Describe your responsibilities and key contributions',
      hint: 'Use action verbs: Led, Built, Reduced. Add numbers wherever possible.',
      placeholder: 'Led a team of 5 developers to build...',
    },
    {
      id: `work_achievements${s}`,
      section: 'workExperience', field: 'achievements', type: 'array', required: false,
      question: 'What were your key achievements? (one per line)',
      hint: 'Example: "Increased sales by 30%" or "Reduced load time by 50%"',
      placeholder: 'Increased user engagement by 40%\nLed migration of legacy system\nMentored 3 junior developers',
    },
  ]
}

function makeEduBlock(loopIndex = 0) {
  const s = loopIndex > 0 ? `_edu${loopIndex}` : ''
  return [
    {
      id: `edu_institution${s}`,
      section: 'education', field: 'institution', type: 'text', required: false,
      question: loopIndex > 0
        ? `Degree #${loopIndex + 1}: Which institution?`
        : "What's your highest level of education? (institution name)",
      hint: 'University or college name', placeholder: 'University of California, Berkeley',
    },
    {
      id: `edu_degree${s}`,
      section: 'education', field: 'degree', type: 'text', required: false,
      question: 'What degree did you earn?',
      hint: 'e.g., Bachelor of Science, Master of Arts', placeholder: 'Bachelor of Science',
    },
    {
      id: `edu_field${s}`,
      section: 'education', field: 'field', type: 'text', required: false,
      question: 'What was your field of study?',
      hint: 'e.g., Computer Science, Business Administration', placeholder: 'Computer Science',
    },
    {
      id: `edu_end_date${s}`,
      section: 'education', field: 'endDate', type: 'month', required: false,
      question: 'When did you graduate (or expect to)?',
      hint: 'Graduation month and year', placeholder: '2022-05',
    },
    {
      id: `edu_gpa${s}`,
      section: 'education', field: 'gpa', type: 'text', required: false,
      question: 'What was your GPA? (Optional — skip if below 3.5)',
      hint: 'Only include if 3.5+ on a 4.0 scale, or equivalent. Leave blank to skip.',
      placeholder: '3.8 / 4.0',
    },
  ]
}

function makeCertBlock(loopIndex = 0) {
  const s = loopIndex > 0 ? `_cert${loopIndex}` : ''
  return [
    {
      id: `cert_name${s}`,
      section: 'certifications', field: 'name', type: 'text', required: false,
      question: loopIndex > 0
        ? `Certification #${loopIndex + 1}: What is it called?`
        : 'What is the certification called?',
      hint: 'e.g., AWS Solutions Architect, Google Analytics, PMP, CPA',
      placeholder: 'AWS Certified Solutions Architect',
    },
    {
      id: `cert_issuer${s}`,
      section: 'certifications', field: 'issuer', type: 'text', required: false,
      question: 'Who issued it?',
      hint: 'Issuing organisation', placeholder: 'Amazon Web Services',
    },
    {
      id: `cert_date${s}`,
      section: 'certifications', field: 'date', type: 'month', required: false,
      question: 'When did you earn it?',
      hint: 'Month and year you received the certification', placeholder: '2023-06',
    },
  ]
}

function makeProjectBlock(loopIndex = 0) {
  const s = loopIndex > 0 ? `_proj${loopIndex}` : ''
  return [
    {
      id: `proj_name${s}`,
      section: 'projects', field: 'name', type: 'text', required: false,
      question: loopIndex > 0
        ? `Project #${loopIndex + 1}: What is it called?`
        : "Let's add a project. What is it called?",
      hint: 'Give it a clear, specific name', placeholder: 'E-Commerce Recommendation Engine',
    },
    {
      id: `proj_tech${s}`,
      section: 'projects', field: 'techStack', type: 'text', required: false,
      splitBy: ',',
      question: 'What tech stack did you use? (comma-separated)',
      hint: 'Languages, frameworks, tools — copy exact names you want on your resume',
      placeholder: 'Python, FastAPI, PostgreSQL, React',
    },
    {
      id: `proj_description${s}`,
      section: 'projects', field: 'description', type: 'textarea', required: false,
      question: 'What did you build, and what was the outcome?',
      hint: 'Describe what it does, who uses it, and any measurable results.',
      placeholder: 'Built a collaborative filtering model achieving 82% accuracy on 50K+ product interactions...',
    },
    {
      id: `proj_link${s}`,
      section: 'projects', field: 'link', type: 'url', required: false,
      question: 'GitHub or live link? (Optional)',
      hint: 'Paste a GitHub repo URL or deployed app link — recruiters click these.',
      placeholder: 'https://github.com/yourname/project',
    },
  ]
}

// ─── Loop confirm text ─────────────────────────────────────────────────────────

const LOOP_CONFIRM = {
  workExperience: {
    question: 'Do you want to add another work experience?',
    hint: 'Add as many roles as you have. Most resumes include 2–4 positions.',
  },
  education: {
    question: 'Do you want to add another degree or qualification?',
    hint: 'e.g., a second degree, diploma, exchange programme, or bootcamp',
  },
  certifications: {
    question: 'Do you want to add another certification?',
    hint: 'Include any relevant professional or academic certifications.',
  },
  projects: {
    question: 'Do you want to add another project?',
    hint: 'Include personal, academic, or open-source work — all count.',
  },
}

function makeLoopConfirm(loopGroup, iteration = 0) {
  const suffix = iteration > 0 ? `_${iteration}` : ''
  return {
    id: `${loopGroup}_loop${suffix}`,
    section: 'loop',
    loopGroup,
    type: 'confirm',
    required: false,
    question: LOOP_CONFIRM[loopGroup].question,
    hint: LOOP_CONFIRM[loopGroup].hint,
  }
}

/**
 * Export for page.js to call when user answers "Yes" on a loop question.
 * Returns the block of questions to insert (including the next loop confirm at the end).
 */
export function makeLoopBlock(loopGroup, loopIndex) {
  let block = []
  if (loopGroup === 'workExperience') block = makeWorkExpBlock(loopIndex)
  else if (loopGroup === 'education') block = makeEduBlock(loopIndex)
  else if (loopGroup === 'certifications') block = makeCertBlock(loopIndex)
  else if (loopGroup === 'projects') block = makeProjectBlock(loopIndex)
  block.push(makeLoopConfirm(loopGroup, loopIndex))
  return block
}

// ─── Main question flow ────────────────────────────────────────────────────────

export const QUESTION_FLOW = {
  blank: [
    // ── 1. Personal Info ──────────────────────────────────────────────────────
    {
      id: 'name',
      section: 'personalInfo', field: 'name', type: 'text', required: true,
      question: "What's your full name?",
      hint: 'Use your professional name as it appears on official documents',
      placeholder: 'John Doe',
    },
    {
      id: 'email',
      section: 'personalInfo', field: 'email', type: 'email', required: true,
      question: "What's your email address?",
      hint: 'Use a professional email address',
      placeholder: 'john.doe@email.com',
    },
    {
      id: 'phone',
      section: 'personalInfo', field: 'phone', type: 'tel', required: false,
      question: "What's your phone number?",
      hint: 'Include country code if applying internationally',
      placeholder: '+1 (555) 123-4567',
    },
    {
      id: 'location',
      section: 'personalInfo', field: 'location', type: 'text', required: false,
      question: 'Where are you located?',
      hint: 'City, State or City, Country',
      placeholder: 'San Francisco, CA',
    },
    {
      id: 'linkedin',
      section: 'personalInfo', field: 'linkedin', type: 'url', required: false,
      question: 'LinkedIn profile URL? (Optional)',
      hint: 'Paste your LinkedIn profile URL',
      placeholder: 'https://linkedin.com/in/johndoe',
    },
    {
      id: 'github',
      section: 'personalInfo', field: 'github', type: 'url', required: false,
      question: 'GitHub profile URL? (Optional)',
      hint: 'Great for developers — paste your GitHub URL',
      placeholder: 'https://github.com/johndoe',
    },
    {
      id: 'portfolio',
      section: 'personalInfo', field: 'portfolio', type: 'url', required: false,
      question: 'Portfolio or personal website? (Optional)',
      hint: 'Showcase your work with a portfolio link',
      placeholder: 'https://johndoe.com',
    },

    // ── 2. Context (for hint personalisation) ────────────────────────────────
    {
      id: 'job_role',
      section: 'context', field: 'jobRole', type: 'select', required: false,
      question: 'What is your current or target job role?',
      hint: 'Select the role that best matches your experience or target',
      options: [
        { value: '', label: 'Select role...' },
        { value: 'software_engineer', label: 'Software Engineer' },
        { value: 'product_manager', label: 'Product Manager' },
        { value: 'data_scientist', label: 'Data Scientist' },
        { value: 'designer', label: 'Designer' },
        { value: 'marketing_manager', label: 'Marketing Manager' },
        { value: 'sales', label: 'Sales' },
        { value: 'other', label: 'Other' },
      ],
    },
    {
      id: 'experience_years',
      section: 'context', field: 'experienceYears', type: 'select', required: false,
      question: 'How many years of experience do you have?',
      hint: 'Total relevant work experience',
      options: [
        { value: '', label: 'Select...' },
        { value: '0-1', label: '0–1 years (student / fresh grad)' },
        { value: '1-3', label: '1–3 years' },
        { value: '3-5', label: '3–5 years' },
        { value: '5-10', label: '5–10 years' },
        { value: '10+', label: '10+ years' },
      ],
    },
    {
      id: 'job_looking_for',
      section: 'context', field: 'jobLookingFor', type: 'select', required: false,
      question: 'What type of role are you looking for?',
      hint: 'Helps us tailor your resume content and hints',
      options: [
        { value: '', label: 'Select...' },
        { value: 'same_role', label: 'Same role' },
        { value: 'senior_role', label: 'Senior role' },
        { value: 'lead_role', label: 'Lead / manager role' },
        { value: 'career_change', label: 'Career change' },
        { value: 'first_job', label: 'First job' },
        { value: 'other', label: 'Other' },
      ],
    },
    {
      id: 'career_break',
      section: 'context', field: 'careerBreak', type: 'select', required: false,
      question: 'Any career break? (Optional)',
      hint: 'Total time away from work — used to personalise your summary hint',
      options: [
        { value: '', label: 'No break' },
        { value: '3 months', label: '3 months' },
        { value: '6 months', label: '6 months' },
        { value: '1 year', label: '1 year' },
        { value: '1.5 years', label: '1.5 years' },
        { value: '2 years', label: '2 years' },
        { value: '3+ years', label: '3+ years' },
      ],
    },

    // ── 3. Summary ────────────────────────────────────────────────────────────
    {
      id: 'summary',
      section: 'summary', field: 'summary', type: 'textarea', required: false,
      question: 'Write a brief professional summary (2–3 sentences)',
      hint: 'Highlight your role, years of experience, and what makes you stand out. Mirror keywords from jobs you are targeting.',
      placeholder: 'Experienced software engineer with 5+ years of expertise in full-stack development...',
    },

    // ── 4. Work Experience (loop) ─────────────────────────────────────────────
    ...makeWorkExpBlock(0),
    makeLoopConfirm('workExperience'),

    // ── 5. Education (loop) ───────────────────────────────────────────────────
    ...makeEduBlock(0),
    makeLoopConfirm('education'),

    // ── 6. Certifications (gate → loop) ──────────────────────────────────────
    {
      id: 'cert_gate',
      section: 'gate',
      gateSection: 'certifications',
      type: 'confirm',
      required: false,
      question: 'Do you have any certifications to add?',
      hint: 'e.g., AWS, Google Cloud, PMP, CPA, Coursera, Udemy — even online certificates count',
    },
    ...makeCertBlock(0),
    makeLoopConfirm('certifications'),

    // ── 7. Projects (gate → loop) ─────────────────────────────────────────────
    {
      id: 'proj_gate',
      section: 'gate',
      gateSection: 'projects',
      type: 'confirm',
      required: false,
      question: 'Do you have any projects to showcase?',
      hint: 'Personal, academic, freelance, or open-source work — all count',
    },
    ...makeProjectBlock(0),
    makeLoopConfirm('projects'),

    // ── 8. Skills ──────────────────────────────────────────────────────────────
    {
      id: 'skills',
      section: 'skills', field: 'skills', type: 'array', required: false,
      question: 'What are your key skills? (comma-separated)',
      hint: 'Include technical skills, tools, frameworks, and soft skills. Mirror exact keywords from job descriptions you are targeting — ATS is literal.',
      placeholder: 'JavaScript, React, Node.js, Python, AWS, Docker, Agile, Leadership',
    },
  ],
}

// ─── Navigation helpers ────────────────────────────────────────────────────────

export function getNextQuestion(resumeData, currentQuestionId, source) {
  if (source === 'blank') {
    const questions = QUESTION_FLOW.blank
    const currentIndex = questions.findIndex(q => q.id === currentQuestionId)
    if (currentIndex === -1) return questions[0]
    if (currentIndex >= questions.length - 1) return null
    return questions[currentIndex + 1]
  }
  return null
}

export function getProgress(currentQuestionId, source, totalQuestions) {
  if (source === 'blank') {
    const questions = QUESTION_FLOW.blank
    const currentIndex = questions.findIndex(q => q.id === currentQuestionId)
    return Math.round(((currentIndex + 1) / questions.length) * 100)
  }
  return totalQuestions > 0 ? Math.round((currentQuestionId / totalQuestions) * 100) : 0
}

export function getHintForQuestion(question, context = {}) {
  const baseHint = question.hint || 'Answer based on your experience.'
  const { jobRole, jobLookingFor, careerBreak } = context

  if (question.id === 'name') {
    if (jobLookingFor === 'first_job') return 'Use your full name as on your degree or ID. For first jobs, consistency matters.'
    return baseHint
  }
  if (question.id === 'summary') {
    if (jobRole === 'software_engineer' && context.experienceYears === '10+') return 'Lead with seniority: "Senior engineer with 10+ years..." and key tech stack.'
    if (jobLookingFor === 'career_change') return 'Focus on transferable skills and why you are switching. Keep it confident and clear.'
    if (careerBreak && careerBreak !== '') return `Briefly acknowledge the ${careerBreak} break if relevant. Emphasise recent skills or learning.`
    return baseHint
  }
  if (question.section === 'workExperience') {
    if (context.experienceYears === '0-1' || context.experienceYears === '1-3') return 'Include internships and projects. Use action verbs and numbers where possible.'
    if (jobLookingFor === 'senior_role' || jobLookingFor === 'lead_role') return 'Highlight leadership, ownership, and impact. Use metrics (%, $, team size).'
    return baseHint
  }
  if (question.id === 'skills') {
    if (jobRole === 'software_engineer') return 'List languages, frameworks, tools. Match keywords from the job you want.'
    if (jobLookingFor === 'career_change') return 'Lead with skills that transfer to the new role, then add role-specific ones.'
    return baseHint
  }
  return baseHint
}

// ─── Resume data updater ───────────────────────────────────────────────────────

export function updateResumeData(resumeData, question, answer) {
  const updated = { ...resumeData }

  // Loop/gate confirm questions — no data to write
  if (question.section === 'loop' || question.section === 'gate') return updated

  if (question.section === 'context') {
    updated.context = { ...updated.context, [question.field]: answer }
    return updated
  }

  if (question.section === 'personalInfo') {
    updated.personalInfo = { ...updated.personalInfo, [question.field]: answer }
    return updated
  }

  if (question.section === 'summary') {
    updated.summary = answer
    return updated
  }

  if (question.section === 'workExperience') {
    if (!updated.workExperience) updated.workExperience = []
    if (updated.workExperience.length === 0) updated.workExperience.push({})
    const last = updated.workExperience.length - 1
    updated.workExperience[last] = {
      ...updated.workExperience[last],
      [question.field]: question.type === 'array' && typeof answer === 'string'
        ? answer.split('\n').filter(a => a.trim())
        : answer,
    }
    return updated
  }

  if (question.section === 'education') {
    if (!updated.education) updated.education = []
    if (updated.education.length === 0) updated.education.push({})
    const last = updated.education.length - 1
    updated.education[last] = { ...updated.education[last], [question.field]: answer }
    return updated
  }

  if (question.section === 'skills') {
    updated.skills = typeof answer === 'string'
      ? answer.split(',').map(s => s.trim()).filter(s => s)
      : answer
    return updated
  }

  // Generic handler: certifications, projects, researchExperience, publications,
  // honors, languageSkills, and any future AI-generated sections
  if (question.section) {
    if (!updated[question.section]) updated[question.section] = []
    if (updated[question.section].length === 0) updated[question.section].push({})
    const last = updated[question.section].length - 1
    updated[question.section][last] = {
      ...updated[question.section][last],
      [question.field]: question.type === 'array' && typeof answer === 'string'
        ? answer.split('\n').filter(a => a.trim())
        : question.splitBy && typeof answer === 'string'
          ? answer.split(question.splitBy).map(s => s.trim()).filter(s => s)
          : answer,
    }
  }

  return updated
}
