'use client'

export default function ResumeTemplate({ resumeData }) {
  if (!resumeData) return null

  const { personalInfo, summary, workExperience, education, skills, projects, certifications } = resumeData

  return (
    <div className="bg-white p-8 max-w-4xl mx-auto shadow-lg" id="resume-content">
      {/* Header */}
      <header className="mb-6 border-b-2 border-gray-800 pb-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {personalInfo?.name || 'Your Name'}
        </h1>
        <div className="flex flex-wrap gap-4 text-sm text-gray-700">
          {personalInfo?.email && (
            <span>{personalInfo.email}</span>
          )}
          {personalInfo?.phone && (
            <span>{personalInfo.phone}</span>
          )}
          {personalInfo?.location && (
            <span>{personalInfo.location}</span>
          )}
          {personalInfo?.linkedin && (
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              LinkedIn
            </a>
          )}
          {personalInfo?.github && (
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              GitHub
            </a>
          )}
          {personalInfo?.portfolio && (
            <a href={personalInfo.portfolio} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              Portfolio
            </a>
          )}
        </div>
      </header>

      {/* Professional Summary */}
      {summary && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2 uppercase tracking-wide border-b border-gray-300 pb-1">
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {summary}
          </p>
        </section>
      )}

      {/* Work Experience */}
      {workExperience && workExperience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3 uppercase tracking-wide border-b border-gray-300 pb-1">
            Professional Experience
          </h2>
          <div className="space-y-4">
            {workExperience.map((exp, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {exp.role || 'Job Title'}
                    </h3>
                    <p className="text-base font-medium text-gray-700">
                      {exp.company || 'Company Name'}
                    </p>
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    {exp.startDate && (
                      <span>{formatDate(exp.startDate)}</span>
                    )}
                    {exp.startDate && exp.endDate && <span> - </span>}
                    {exp.endDate && (
                      <span>{exp.endDate === 'Current' ? 'Present' : formatDate(exp.endDate)}</span>
                    )}
                  </div>
                </div>
                {exp.location && (
                  <p className="text-sm text-gray-600 mb-2">{exp.location}</p>
                )}
                {exp.description && (
                  <p className="text-gray-700 mb-2 leading-relaxed">
                    {exp.description}
                  </p>
                )}
                {exp.achievements && exp.achievements.length > 0 && (
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3 uppercase tracking-wide border-b border-gray-300 pb-1">
            Education
          </h2>
          <div className="space-y-3">
            {education.map((edu, index) => (
              <div key={index} className="mb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {edu.degree || 'Degree'} {edu.field && `in ${edu.field}`}
                    </h3>
                    <p className="text-base font-medium text-gray-700">
                      {edu.institution || 'Institution'}
                    </p>
                    {edu.honors && (
                      <p className="text-sm text-gray-600 italic">{edu.honors}</p>
                    )}
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    {edu.startDate && (
                      <span>{formatDate(edu.startDate)}</span>
                    )}
                    {edu.startDate && edu.endDate && <span> - </span>}
                    {edu.endDate && (
                      <span>{formatDate(edu.endDate)}</span>
                    )}
                  </div>
                </div>
                {edu.gpa && (
                  <p className="text-sm text-gray-600 mt-1">GPA: {edu.gpa}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3 uppercase tracking-wide border-b border-gray-300 pb-1">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-800 rounded text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3 uppercase tracking-wide border-b border-gray-300 pb-1">
            Projects
          </h2>
          <div className="space-y-3">
            {projects.map((project, index) => (
              <div key={index} className="mb-3">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {project.name || 'Project Name'}
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline ml-2 text-sm font-normal"
                      >
                        (View Project)
                      </a>
                    )}
                  </h3>
                  {project.date && (
                    <span className="text-sm text-gray-600">{formatDate(project.date)}</span>
                  )}
                </div>
                {project.description && (
                  <p className="text-gray-700 mb-2 leading-relaxed">
                    {project.description}
                  </p>
                )}
                {project.techStack && project.techStack.length > 0 && (
                  <p className="text-sm text-gray-600">
                    <strong>Technologies:</strong> {project.techStack.join(', ')}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {certifications && certifications.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3 uppercase tracking-wide border-b border-gray-300 pb-1">
            Certifications
          </h2>
          <div className="space-y-2">
            {certifications.map((cert, index) => (
              <div key={index} className="flex justify-between items-start">
                <div>
                  <h3 className="text-base font-semibold text-gray-900">
                    {cert.name || 'Certification Name'}
                  </h3>
                  {cert.issuer && (
                    <p className="text-sm text-gray-700">{cert.issuer}</p>
                  )}
                </div>
                {cert.date && (
                  <span className="text-sm text-gray-600">{formatDate(cert.date)}</span>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

function formatDate(dateString) {
  if (!dateString) return ''
  if (dateString === 'Current' || dateString === 'Present') return 'Present'
  
  try {
    const [year, month] = dateString.split('-')
    const date = new Date(year, parseInt(month) - 1)
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  } catch {
    return dateString
  }
}
