import { NextResponse } from 'next/server'
import { generateAcademicQuestions } from '@/lib/openai'

export async function POST(request) {
  try {
    const { academicContext } = await request.json()

    if (!academicContext || !academicContext.degreeType || !academicContext.targetCountry) {
      return NextResponse.json(
        { error: 'academicContext with degreeType and targetCountry is required' },
        { status: 400 }
      )
    }

    const questions = await generateAcademicQuestions(academicContext)

    return NextResponse.json({ questions })
  } catch (error) {
    console.error('Generate academic questions error:', error)
    return NextResponse.json(
      { error: (error && error.message) ? String(error.message) : 'Failed to generate academic questions' },
      { status: 500 }
    )
  }
}
