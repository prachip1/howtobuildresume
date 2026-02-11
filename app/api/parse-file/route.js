import { NextResponse } from 'next/server'
import { parseFile } from '@/lib/file-parser'
import { parseResumeText, analyzeResumeLayoutFromImage, analyzeResumeLayout } from '@/lib/openai'

export async function POST(request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file')
    const firstPageImage = formData.get('firstPageImage') // base64 from client (PDF first page)

    if (!file) {
      return NextResponse.json(
        { error: 'File is required' },
        { status: 400 }
      )
    }

    // Parse file to text
    const text = await parseFile(file)

    // Parse text to structured data
    const resumeData = await parseResumeText(text)

    // Layout: use vision from image if provided (PDF), else infer from structure (DOCX)
    let layout = null
    if (firstPageImage && typeof firstPageImage === 'string' && firstPageImage.length > 100) {
      layout = await analyzeResumeLayoutFromImage(firstPageImage)
    }
    if (!layout) {
      layout = await analyzeResumeLayout(resumeData)
    }

    return NextResponse.json({ resumeData, layout })
  } catch (error) {
    console.error('Parse file error:', error)
    return NextResponse.json(
      { error: (error && error.message) ? String(error.message) : 'Failed to parse file' },
      { status: 500 }
    )
  }
}
