import { NextResponse } from 'next/server'
import { parseLinkedInProfile } from '@/lib/openai'
import { extractPlainTextOnly } from '@/lib/text-sanitizer'

export async function POST(request) {
  try {
    const { text } = await request.json()

    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      )
    }

    // Extract plain text only: strip HTML, images, data URLs, non-printable chars
    const plainText = extractPlainTextOnly(text)
    if (!plainText.trim()) {
      return NextResponse.json(
        { error: 'No plain text found. Please paste only text (no images or files).' },
        { status: 400 }
      )
    }

    const resumeData = await parseLinkedInProfile(plainText)

    return NextResponse.json({ resumeData })
  } catch (error) {
    console.error('Parse LinkedIn error:', error)
    return NextResponse.json(
      { error: (error && error.message) ? String(error.message) : 'Failed to parse LinkedIn profile' },
      { status: 500 }
    )
  }
}
