/**
 * Parse uploaded file based on type
 * This runs on the server side
 */
export async function parseFile(file) {
  const pdfParse = (await import('pdf-parse')).default
  const mammoth = (await import('mammoth')).default
  
  const fileType = file.type || 'application/pdf'
  const arrayBuffer = await file.arrayBuffer()

  if (fileType === 'application/pdf') {
    try {
      const buffer = Buffer.from(arrayBuffer)
      const data = await pdfParse(buffer)
      return data.text
    } catch (error) {
      console.error('Error parsing PDF:', error)
      throw new Error('Failed to parse PDF file')
    }
  } else if (
    fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    fileType === 'application/msword'
  ) {
    try {
      const result = await mammoth.extractRawText({ arrayBuffer })
      return result.value
    } catch (error) {
      console.error('Error parsing DOCX:', error)
      throw new Error('Failed to parse DOCX file')
    }
  } else {
    throw new Error('Unsupported file type. Please upload PDF or DOCX files.')
  }
}
