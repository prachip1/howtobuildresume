/**
 * Export resume to PDF (client-side only)
 */
export async function exportToPDF(resumeData) {
  // Dynamic imports for client-side only
  const { default: jsPDF } = await import('jspdf')
  const html2canvas = (await import('html2canvas')).default

  if (typeof window === 'undefined') {
    throw new Error('PDF export must be called from client-side')
  }
  try {
    // Get the resume content element
    const element = document.getElementById('resume-content')
    if (!element) {
      throw new Error('Resume content not found')
    }

    // Create canvas from HTML
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
    })

    // Calculate PDF dimensions
    const imgWidth = 210 // A4 width in mm
    const pageHeight = 297 // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width
    let heightLeft = imgHeight

    // Create PDF
    const pdf = new jsPDF('p', 'mm', 'a4')
    let position = 0

    // Add first page
    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight)
    heightLeft -= pageHeight

    // Add additional pages if needed
    while (heightLeft > 0) {
      position = heightLeft - imgHeight
      pdf.addPage()
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight
    }

    // Generate filename
    const name = resumeData.personalInfo?.name || 'resume'
    const filename = `${name.replace(/\s+/g, '_')}_Resume.pdf`

    // Save PDF
    pdf.save(filename)
  } catch (error) {
    console.error('PDF export error:', error)
    throw error
  }
}
