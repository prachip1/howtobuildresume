/**
 * Question flow configuration for resume building
 * These questions are organized, engaging, and help build a complete resume
 * Context (job role, experience, etc.) is asked first so hints can depend on it
 */

export const QUESTION_FLOW = {
  blank: [
    // Context - first page (for hint personalization)
    {
      id: 'job_role',
      section: 'context',
      question: 'What is your current / target job role?',
      field: 'jobRole',
      type: 'select',
      required: false,
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
      section: 'context',
      question: 'How many years of experience do you have?',
      field: 'experienceYears',
      type: 'select',
      required: false,
      hint: 'Total relevant work experience',
      options: [
        { value: '', label: 'Select...' },
        { value: '0-1', label: '0-1 years' },
        { value: '1-3', label: '1-3 years' },
        { value: '3-5', label: '3-5 years' },
        { value: '5-10', label: '5-10 years' },
        { value: '10+', label: '10+ years' },
      ],
    },
    {
      id: 'job_looking_for',
      section: 'context',
      question: 'What type of role are you looking for?',
      field: 'jobLookingFor',
      type: 'select',
      required: false,
      hint: 'Helps us tailor your resume and hints',
      options: [
        { value: '', label: 'Select...' },
        { value: 'same_role', label: 'Same role' },
        { value: 'senior_role', label: 'Senior role' },
        { value: 'lead_role', label: 'Lead role' },
        { value: 'career_change', label: 'Career change' },
        { value: 'first_job', label: 'First job' },
        { value: 'other', label: 'Other' },
      ],
    },
    {
      id: 'career_break_years',
      section: 'context',
      question: 'Career break — years (if any)',
      field: 'careerBreakYears',
      type: 'select',
      required: false,
      hint: 'Total years of career break',
      options: [
        { value: '0', label: '0 years' },
        { value: '1', label: '1 year' },
        { value: '2', label: '2 years' },
        { value: '3', label: '3 years' },
        { value: '4', label: '4 years' },
        { value: '5', label: '5 years' },
        { value: '6+', label: '6+ years' },
      ],
    },
    {
      id: 'career_break_months',
      section: 'context',
      question: 'Career break — months (if any)',
      field: 'careerBreakMonths',
      type: 'select',
      required: false,
      hint: 'Additional months (0–11)',
      options: [
        { value: '0', label: '0 months' },
        { value: '1', label: '1 month' },
        { value: '2', label: '2 months' },
        { value: '3', label: '3 months' },
        { value: '4', label: '4 months' },
        { value: '5', label: '5 months' },
        { value: '6', label: '6 months' },
        { value: '7', label: '7 months' },
        { value: '8', label: '8 months' },
        { value: '9', label: '9 months' },
        { value: '10', label: '10 months' },
        { value: '11', label: '11 months' },
      ],
    },
    // Personal Information Section
    {
      id: 'name',
      section: 'personalInfo',
      question: "What's your full name?",
      field: 'name',
      type: 'text',
      required: true,
      hint: "Use your professional name as it appears on official documents",
      placeholder: "e.g., John Doe"
    },
    {
      id: 'email',
      section: 'personalInfo',
      question: "What's your email address?",
      field: 'email',
      type: 'email',
      required: true,
      hint: "Use a professional email address",
      placeholder: "john.doe@email.com"
    },
    {
      id: 'phone',
      section: 'personalInfo',
      question: "What's your phone number?",
      field: 'phone',
      type: 'tel',
      required: false,
      hint: "Include country code if applying internationally",
      placeholder: "+1 (555) 123-4567"
    },
    {
      id: 'location',
      section: 'personalInfo',
      question: "Where are you located?",
      field: 'location',
      type: 'text',
      required: false,
      hint: "City, State or City, Country",
      placeholder: "San Francisco, CA"
    },
    {
      id: 'linkedin',
      section: 'personalInfo',
      question: "Do you have a LinkedIn profile? (Optional)",
      field: 'linkedin',
      type: 'url',
      required: false,
      hint: "Paste your LinkedIn profile URL",
      placeholder: "https://linkedin.com/in/johndoe"
    },
    {
      id: 'github',
      section: 'personalInfo',
      question: "Do you have a GitHub profile? (Optional)",
      field: 'github',
      type: 'url',
      required: false,
      hint: "Great for developers! Paste your GitHub URL",
      placeholder: "https://github.com/johndoe"
    },
    {
      id: 'portfolio',
      section: 'personalInfo',
      question: "Do you have a portfolio website? (Optional)",
      field: 'portfolio',
      type: 'url',
      required: false,
      hint: "Showcase your work with a portfolio link",
      placeholder: "https://johndoe.com"
    },
    {
      id: 'summary',
      section: 'summary',
      question: "Write a brief professional summary (2-3 sentences)",
      field: 'summary',
      type: 'textarea',
      required: false,
      hint: "💡 Tip: Highlight your key strengths, years of experience, and what makes you unique",
      placeholder: "Experienced software engineer with 5+ years of expertise in full-stack development..."
    },
    // Work Experience
    {
      id: 'work_start',
      section: 'workExperience',
      question: "Let's add your work experience! What's your most recent or current job title?",
      field: 'role',
      type: 'text',
      required: false,
      hint: "e.g., Senior Software Engineer, Marketing Manager",
      placeholder: "Software Engineer"
    },
    {
      id: 'work_company',
      section: 'workExperience',
      question: "What company did you work for?",
      field: 'company',
      type: 'text',
      required: false,
      hint: "Company name",
      placeholder: "Tech Corp Inc."
    },
    {
      id: 'work_start_date',
      section: 'workExperience',
      question: "When did you start this role?",
      field: 'startDate',
      type: 'month',
      required: false,
      hint: "Month and year",
      placeholder: "2020-01"
    },
    {
      id: 'work_end_date',
      section: 'workExperience',
      question: "When did you end this role? (Leave blank if current)",
      field: 'endDate',
      type: 'month',
      required: false,
      hint: "Leave blank if you're still working here",
      placeholder: "2024-12 or leave blank"
    },
    {
      id: 'work_description',
      section: 'workExperience',
      question: "Describe your responsibilities and achievements in this role",
      field: 'description',
      type: 'textarea',
      required: false,
      hint: "💡 Tip: Use action verbs like 'Led', 'Developed', 'Improved'. Include numbers when possible!",
      placeholder: "Led a team of 5 developers to build..."
    },
    {
      id: 'work_achievements',
      section: 'workExperience',
      question: "What were your key achievements? (One per line, use numbers!)",
      field: 'achievements',
      type: 'array',
      required: false,
      hint: "💡 Example: 'Increased sales by 30%' or 'Reduced load time by 50%'",
      placeholder: "Increased user engagement by 40%\nLed migration of legacy system\nMentored 3 junior developers"
    },
    // Education
    {
      id: 'edu_institution',
      section: 'education',
      question: "What's your highest level of education?",
      field: 'institution',
      type: 'text',
      required: false,
      hint: "University or college name",
      placeholder: "University of California, Berkeley"
    },
    {
      id: 'edu_degree',
      section: 'education',
      question: "What degree did you earn?",
      field: 'degree',
      type: 'text',
      required: false,
      hint: "e.g., Bachelor of Science, Master of Arts",
      placeholder: "Bachelor of Science"
    },
    {
      id: 'edu_field',
      section: 'education',
      question: "What was your field of study?",
      field: 'field',
      type: 'text',
      required: false,
      hint: "e.g., Computer Science, Business Administration",
      placeholder: "Computer Science"
    },
    // Skills
    {
      id: 'skills',
      section: 'skills',
      question: "What are your key skills? (Separate with commas)",
      field: 'skills',
      type: 'array',
      required: false,
      hint: "💡 Include technical skills, tools, languages, frameworks",
      placeholder: "JavaScript, React, Node.js, Python, AWS, Docker"
    },
  ],
  
  // For uploaded/LinkedIn resumes, we'll generate dynamic questions
  // based on what's missing or needs enhancement
}

/**
 * Get next question based on current state
 */
export function getNextQuestion(resumeData, currentQuestionId, source) {
  if (source === 'blank') {
    const questions = QUESTION_FLOW.blank
    const currentIndex = questions.findIndex(q => q.id === currentQuestionId)
    
    if (currentIndex === -1) return questions[0]
    if (currentIndex >= questions.length - 1) return null // All questions done
    
    return questions[currentIndex + 1]
  }
  
  // For upload/linkedin, we'll use AI-generated questions
  return null
}

/**
 * Get progress percentage
 */
export function getProgress(currentQuestionId, source, totalQuestions) {
  if (source === 'blank') {
    const questions = QUESTION_FLOW.blank
    const currentIndex = questions.findIndex(q => q.id === currentQuestionId)
    return Math.round(((currentIndex + 1) / questions.length) * 100)
  }
  
  // For dynamic questions
  return totalQuestions > 0 ? Math.round((currentQuestionId / totalQuestions) * 100) : 0
}

/**
 * Update resume data with answer
 */
/**
 * Get hint text for a question based on context (job role, experience, etc.)
 */
export function getHintForQuestion(question, context = {}) {
  const baseHint = question.hint || 'Answer based on your experience.'
  const { jobRole, experienceYears, jobLookingFor, careerBreakYears, careerBreakMonths } = context
  const hasCareerBreak = (careerBreakYears && careerBreakYears !== '0') || (careerBreakMonths && careerBreakMonths !== '0')

  // Name
  if (question.id === 'name') {
    if (jobLookingFor === 'first_job') return 'Use your full name as on your degree or ID. For first job, consistency matters.'
    return baseHint
  }
  // Summary
  if (question.id === 'summary') {
    if (jobRole === 'software_engineer' && experienceYears === '10+') return 'Lead with seniority: "Senior engineer with 10+ years..." and key tech stack.'
    if (jobLookingFor === 'career_change') return 'Focus on transferable skills and why you are switching. Keep it confident and clear.'
    if (hasCareerBreak) return 'Briefly mention the break if relevant (e.g. "Returning after X years"). Emphasize recent skills or learning.'
    return baseHint
  }
  // Work / role
  if (question.section === 'workExperience') {
    if (experienceYears === '0-1' || experienceYears === '1-3') return 'Include internships and projects. Use action verbs and numbers where possible.'
    if (jobLookingFor === 'senior_role' || jobLookingFor === 'lead_role') return 'Highlight leadership, ownership, and impact. Use metrics (%, $, team size).'
    return baseHint
  }
  // Skills
  if (question.id === 'skills') {
    if (jobRole === 'software_engineer') return 'List languages, frameworks, tools. Match keywords from the job you want.'
    if (jobLookingFor === 'career_change') return 'Lead with skills that transfer to the new role, then add role-specific ones.'
    return baseHint
  }

  return baseHint
}

export function updateResumeData(resumeData, question, answer) {
  const updated = { ...resumeData }
  
  if (question.section === 'context') {
    updated.context = {
      ...updated.context,
      [question.field]: answer
    }
    return updated
  }
  if (question.section === 'personalInfo') {
    updated.personalInfo = {
      ...updated.personalInfo,
      [question.field]: answer
    }
  } else if (question.section === 'summary') {
    updated.summary = answer
  } else if (question.section === 'workExperience') {
    // For work experience, we're building the current entry
    if (!updated.workExperience) updated.workExperience = []
    if (updated.workExperience.length === 0) {
      updated.workExperience.push({})
    }
    const lastIndex = updated.workExperience.length - 1
    updated.workExperience[lastIndex] = {
      ...updated.workExperience[lastIndex],
      [question.field]: question.type === 'array' && typeof answer === 'string' 
        ? answer.split('\n').filter(a => a.trim())
        : answer
    }
  } else if (question.section === 'education') {
    if (!updated.education) updated.education = []
    if (updated.education.length === 0) {
      updated.education.push({})
    }
    const lastIndex = updated.education.length - 1
    updated.education[lastIndex] = {
      ...updated.education[lastIndex],
      [question.field]: answer
    }
  } else if (question.section === 'skills') {
    updated.skills = typeof answer === 'string' 
      ? answer.split(',').map(s => s.trim()).filter(s => s)
      : answer
  }
  
  return updated
}
