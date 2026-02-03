import { NextResponse } from 'next/server'
import { parseResumeText } from '@/lib/openai'

export async function POST(request) {
  try {
    const { text } = await request.json()

    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      )
    }

    const resumeData = await parseResumeText(text)

    return NextResponse.json({ resumeData })
  } catch (error) {
    console.error('Parse resume error:', error)
    return NextResponse.json(
      { error: (error && error.message) ? String(error.message) : 'Failed to parse resume' },
      { status: 500 }
    )
  }
}
