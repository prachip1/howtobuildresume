'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { UserPlus, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { createClient } from '@/lib/supabase/client'

export default function SignupPage() {
  const router = useRouter()
  const supabase = createClient()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [redirectTo, setRedirectTo] = useState('/editmyresume')

  useEffect(() => {
    if (typeof window === 'undefined') return
    const params = new URLSearchParams(window.location.search)
    const redirect = params.get('redirect')
    if (redirect) {
      setRedirectTo(redirect)
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccessMessage('')

    if (!email || !password) {
      setError('Please enter email and password.')
      return
    }

    setIsLoading(true)
    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      })

      if (signUpError) {
        setError(signUpError.message || 'Failed to sign up. Please try again.')
        setIsLoading(false)
        return
      }

      // Only redirect if we have an active session (email confirmation disabled).
      // If confirmation is required, data.session is null and we show a clear message.
      if (data?.session) {
        setSuccessMessage('Account created! Redirecting...')
        router.replace(redirectTo)
        // Fallback: force navigation in case client router doesn't
        setTimeout(() => {
          window.location.href = redirectTo
        }, 500)
        return
      }

      // Email confirmation required: user exists but no session yet
      setSuccessMessage(
        'Account created! Check your email for a confirmation link, then sign in to continue.'
      )
    } catch (err) {
      console.error('Signup error:', err)
      setError('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-full bg-[#f0f0f0]">
      <div className="bg-white rounded-t-3xl min-h-[calc(100vh-4rem)] py-12 px-4">
        <div className="max-w-md mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-ref-green mb-8 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-ref-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserPlus className="w-8 h-8 text-ref-green" />
            </div>
            <h1 className="text-3xl font-bold text-black mb-2">Sign up</h1>
            <p className="text-gray-600">
              Create an account to save and manage your resumes
            </p>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Create account</CardTitle>
              <CardDescription>
                Get started with howtobuildresume—it&apos;s free.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-900">Email</label>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    className="w-full"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-900">Password</label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    className="w-full"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                {error && (
                  <div className="rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-700">
                    {error}
                  </div>
                )}
                {successMessage && (
                  <div className="rounded-lg bg-green-50 border border-green-200 px-3 py-3 text-sm text-green-800 space-y-2">
                    <p>{successMessage}</p>
                    {successMessage.includes('Check your email') && (
                      <Link
                        href={`/signin${redirectTo !== '/editmyresume' ? `?redirect=${encodeURIComponent(redirectTo)}` : ''}`}
                        className="inline-block font-medium text-green-700 hover:underline"
                      >
                        Go to sign in →
                      </Link>
                    )}
                  </div>
                )}
                <Button
                  className="w-full justify-center"
                  size="lg"
                  variant="cta"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing up...' : 'Sign up'}
                </Button>
                <p className="text-center text-sm text-gray-600">
                  Already have an account{' '}
                  <Link
                    href={`/signin${redirectTo ? `?redirect=${encodeURIComponent(redirectTo)}` : ''}`}
                    className="text-ref-green hover:underline font-medium"
                  >
                    Sign in
                  </Link>
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
