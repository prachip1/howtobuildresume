import { NextResponse } from 'next/server'
import { generateSmartQuestions } from '@/lib/openai'

export async function POST(request) {
  try {
    const { resumeData } = await request.json()

    if (!resumeData) {
      return NextResponse.json(
        { error: 'Resume data is required' },
        { status: 400 }
      )
    }

    const questions = await generateSmartQuestions(resumeData)

    return NextResponse.json({ questions })
  } catch (error) {
    console.error('Generate questions error:', error)
    return NextResponse.json(
      { error: (error && error.message) ? String(error.message) : 'Failed to generate questions' },
      { status: 500 }
    )
  }
}
