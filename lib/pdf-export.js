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

    // Scale factor: canvas pixels per mm
    const scale = canvas.width / imgWidth
    const pageHeightPx = Math.floor(pageHeight * scale)

    // Create PDF
    const pdf = new jsPDF('p', 'mm', 'a4')

    // Slice canvas into page-sized pieces to avoid text duplication at page breaks
    let pageTop = 0
    let isFirstPage = true

    while (pageTop < canvas.height) {
      const sliceHeight = Math.min(pageHeightPx, canvas.height - pageTop)

      const pageCanvas = document.createElement('canvas')
      pageCanvas.width = canvas.width
      pageCanvas.height = pageHeightPx

      const ctx = pageCanvas.getContext('2d')
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height)
      ctx.drawImage(canvas, 0, pageTop, canvas.width, sliceHeight, 0, 0, canvas.width, sliceHeight)

      if (!isFirstPage) pdf.addPage()
      pdf.addImage(pageCanvas.toDataURL('image/png'), 'PNG', 0, 0, imgWidth, pageHeight)

      pageTop += pageHeightPx
      isFirstPage = false
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
