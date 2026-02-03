import { NextResponse } from 'next/server'
import { parseFile } from '@/lib/file-parser'
import { parseResumeText } from '@/lib/openai'

export async function POST(request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file')

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

    return NextResponse.json({ resumeData })
  } catch (error) {
    console.error('Parse file error:', error)
    return NextResponse.json(
      { error: (error && error.message) ? String(error.message) : 'Failed to parse file' },
      { status: 500 }
    )
  }
}
