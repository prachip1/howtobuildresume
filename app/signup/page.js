'use client'

import Link from 'next/link'
import { UserPlus, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function SignupPage() {
  return (
    <div className="min-h-full bg-ref-dark">
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
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900">Email</label>
                <Input type="email" placeholder="you@example.com" className="w-full" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900">Password</label>
                <Input type="password" placeholder="••••••••" className="w-full" />
              </div>
              <Button className="w-full" size="lg">
                Sign up
              </Button>
              <p className="text-center text-sm text-gray-600">
                Already have an account?{' '}
                <Link href="/" className="text-ref-green hover:underline font-medium">
                  Sign in
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
