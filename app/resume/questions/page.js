'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, ArrowLeft, Lightbulb, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { QUESTION_FLOW, getNextQuestion, getProgress, updateResumeData, getHintForQuestion } from '@/lib/questions'

export default function QuestionsPage() {
  const [resumeData, setResumeData] = useState(null)
  const [source, setSource] = useState(null)
  const [currentQuestion, setCurrentQuestion] = useState(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answer, setAnswer] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isGeneratingQuestions, setIsGeneratingQuestions] = useState(false)
  const [dynamicQuestions, setDynamicQuestions] = useState([])
  const router = useRouter()

  useEffect(() => {
    // Load resume data from session
    const storedData = sessionStorage.getItem('resumeData')
    const storedSource = sessionStorage.getItem('resumeSource')
    const storedIndex = sessionStorage.getItem('currentStep')

    if (!storedData) {
      router.push('/')
      return
    }

    const data = JSON.parse(storedData)
    setResumeData(data)
    setSource(storedSource)
    
    if (storedSource === 'blank') {
      // Use predefined question flow
      const index = storedIndex ? parseInt(storedIndex) : 0
      setCurrentQuestionIndex(index)
      setCurrentQuestion(QUESTION_FLOW.blank[index] || null)
      setAnswer(getAnswerFromData(data, QUESTION_FLOW.blank[index]))
    } else {
      // Generate smart questions for upload/linkedin
      generateQuestionsForResume(data)
    }
    
    setIsLoading(false)
  }, [])

  const generateQuestionsForResume = async (data) => {
    setIsGeneratingQuestions(true)
    try {
      const response = await fetch('/api/generate-questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ resumeData: data }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate questions')
      }

      const { questions } = await response.json()
      setDynamicQuestions(questions)
      if (questions.length > 0) {
        setCurrentQuestion(questions[0])
        setAnswer(getAnswerFromData(data, questions[0]))
      }
    } catch (error) {
      console.error('Error generating questions:', error)
      // Fallback: redirect to editor
      router.push('/editmyresume')
    } finally {
      setIsGeneratingQuestions(false)
    }
  }

  const getAnswerFromData = (data, question) => {
    if (!question || !data) return ''
    
    if (question.section === 'context') {
      return data.context?.[question.field] ?? ''
    }
    if (question.section === 'personalInfo') {
      return data.personalInfo?.[question.field] || ''
    } else if (question.section === 'summary') {
      return data.summary || ''
    } else if (question.section === 'workExperience') {
      const lastExp = data.workExperience?.[data.workExperience.length - 1]
      if (question.field === 'achievements' && lastExp?.achievements) {
        return Array.isArray(lastExp.achievements) 
          ? lastExp.achievements.join('\n')
          : ''
      }
      return lastExp?.[question.field] || ''
    } else if (question.section === 'education') {
      const lastEdu = data.education?.[data.education.length - 1]
      return lastEdu?.[question.field] || ''
    } else if (question.section === 'skills') {
      return Array.isArray(data.skills) ? data.skills.join(', ') : ''
    }
    
    return ''
  }

  const handleNext = () => {
    if (!currentQuestion) return

    // Update resume data with answer
    const updated = updateResumeData(resumeData, currentQuestion, answer)
    setResumeData(updated)
    sessionStorage.setItem('resumeData', JSON.stringify(updated))

    if (source === 'blank') {
      // Move to next predefined question
      const nextIndex = currentQuestionIndex + 1
      if (nextIndex >= QUESTION_FLOW.blank.length) {
        // All questions done, go to editor
        sessionStorage.setItem('resumeData', JSON.stringify(updated))
        router.push('/editmyresume')
        return
      }
      
      setCurrentQuestionIndex(nextIndex)
      sessionStorage.setItem('currentStep', nextIndex.toString())
      const nextQuestion = QUESTION_FLOW.blank[nextIndex]
      setCurrentQuestion(nextQuestion)
      setAnswer(getAnswerFromData(updated, nextQuestion))
    } else {
      // Move to next dynamic question
      const currentIndex = dynamicQuestions.findIndex(q => q.id === currentQuestion.id)
      if (currentIndex >= dynamicQuestions.length - 1) {
        // All questions done
        sessionStorage.setItem('resumeData', JSON.stringify(updated))
        router.push('/editmyresume')
        return
      }
      
      const nextQuestion = dynamicQuestions[currentIndex + 1]
      setCurrentQuestion(nextQuestion)
      setAnswer(getAnswerFromData(updated, nextQuestion))
    }
  }

  const handlePrevious = () => {
    if (source === 'blank') {
      if (currentQuestionIndex === 0) return
      const prevIndex = currentQuestionIndex - 1
      setCurrentQuestionIndex(prevIndex)
      sessionStorage.setItem('currentStep', prevIndex.toString())
      const prevQuestion = QUESTION_FLOW.blank[prevIndex]
      setCurrentQuestion(prevQuestion)
      setAnswer(getAnswerFromData(resumeData, prevQuestion))
    } else {
      const currentIndex = dynamicQuestions.findIndex(q => q.id === currentQuestion.id)
      if (currentIndex === 0) return
      const prevQuestion = dynamicQuestions[currentIndex - 1]
      setCurrentQuestion(prevQuestion)
      setAnswer(getAnswerFromData(resumeData, prevQuestion))
    }
  }

  const handleSkip = () => {
    handleNext()
  }

  const getProgressValue = () => {
    if (source === 'blank') {
      return getProgress(currentQuestion?.id, source, QUESTION_FLOW.blank.length)
    } else {
      const currentIndex = dynamicQuestions.findIndex(q => q.id === currentQuestion?.id)
      return dynamicQuestions.length > 0 
        ? Math.round(((currentIndex + 1) / dynamicQuestions.length) * 100)
        : 0
    }
  }

  const getQuestionNumber = () => {
    if (source === 'blank') {
      return `${currentQuestionIndex + 1} of ${QUESTION_FLOW.blank.length}`
    } else {
      const currentIndex = dynamicQuestions.findIndex(q => q.id === currentQuestion?.id)
      return `${currentIndex + 1} of ${dynamicQuestions.length}`
    }
  }

  if (isLoading || isGeneratingQuestions) {
    return (
      <div className="min-h-full flex items-center justify-center bg-[#f0f0f0]">
        <div className="bg-white rounded-2xl p-8 text-center">
          <div className="w-12 h-12 border-2 border-ref-green border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-gray-600 mt-4">
            {isGeneratingQuestions ? 'Analyzing your resume and preparing questions...' : 'Loading...'}
          </p>
        </div>
      </div>
    )
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-full flex items-center justify-center bg-[#f0f0f0]">
        <div className="max-w-md p-8 text-center bg-white rounded-xl border-2 border-black shadow-key">
          <CheckCircle2 className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-black mb-2">All Done!</h2>
          <p className="text-gray-600 mb-6">Redirecting to resume editor...</p>
        </div>
      </div>
    )
  }

  const context = resumeData?.context || {}
  const hintText = getHintForQuestion(currentQuestion, context)

  return (
    <div className="min-h-full bg-[#f0f0f0]">
      <div className="bg-[#f0f0f0] rounded-t-3xl min-h-[calc(100vh-4rem)] py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Minimal progress - interactive feel */}
          <div className="mb-10">
            <div className="flex justify-between items-center text-sm text-gray-500 mb-1.5">
              <span>{getQuestionNumber()}</span>
              <span>{getProgressValue()}%</span>
            </div>
            <div className="h-1 w-full rounded-full bg-gray-200 overflow-hidden">
              <div
                className="h-full bg-gray-400 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${getProgressValue()}%` }}
              />
            </div>
          </div>

          {/* Question - prominent, conversational */}
          <div className="max-w-2xl">
            <h2 className="text-3xl lg:text-4xl font-bold text-black mb-3 leading-tight tracking-tight">
              {currentQuestion.question}
            </h2>
            <p className="flex items-center gap-2 text-sm text-gray-500 mb-8">
              <Lightbulb className="w-4 h-4 flex-shrink-0 opacity-70" />
              {hintText}
            </p>

            {/* Input area - clean, no box */}
            <div className="mb-10">
              {currentQuestion.type === 'textarea' ? (
                <Textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder={currentQuestion.placeholder}
                  className="min-h-[140px] w-full rounded-2xl border-2 border-gray-200 bg-white px-4 py-3 text-base text-black placeholder:text-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-100 focus:outline-none transition-all resize-none"
                />
              ) : currentQuestion.type === 'array' ? (
                <Textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder={currentQuestion.placeholder}
                  className="min-h-[120px] w-full rounded-2xl border-2 border-gray-200 bg-white px-4 py-3 text-base text-black placeholder:text-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-100 focus:outline-none transition-all resize-none"
                />
              ) : currentQuestion.type === 'select' ? (
                <div className="relative">
                  <select
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    className="question-select w-full h-14 pl-5 pr-12 rounded-2xl border-2 border-gray-200 bg-white text-base text-black focus:border-gray-400 focus:ring-2 focus:ring-gray-100 focus:outline-none transition-all appearance-none cursor-pointer [&_option]:text-black [&_option]:bg-white [&_option]:py-2"
                  >
                    <option value="">Choose one...</option>
                    {(currentQuestion.options || []).map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                  </span>
                </div>
              ) : (
                <Input
                  type={currentQuestion.type}
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder={currentQuestion.placeholder}
                  className="h-14 w-full rounded-2xl border-2 border-gray-200 px-4 text-base text-black focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
                />
              )}
            </div>

            {/* Actions - inline, minimal */}
            <div className="flex flex-wrap items-center gap-3">
              <Button
                type="button"
                variant="register"
                onClick={handlePrevious}
                disabled={source === 'blank' && currentQuestionIndex === 0}
                className="inline-flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              {!currentQuestion.required && (
                <Button
                  type="button"
                  variant="register"
                  onClick={handleSkip}
                >
                  Skip
                </Button>
              )}
              <Button
                type="button"
                variant="cta"
                onClick={handleNext}
                disabled={currentQuestion.required && !answer.trim()}
                className="inline-flex items-center gap-2"
              >
                Next
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <p className="mt-12 text-center text-sm text-gray-400">
            You&apos;re doing great — keep going
          </p>
        </div>
      </div>
    </div>
  )
}
