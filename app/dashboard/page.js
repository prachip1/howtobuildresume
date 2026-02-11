'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { FileText, Upload, ArrowRight, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export const dynamic = 'force-dynamic'

export default function DashboardPage() {
  const router = useRouter()
  const supabase = createClient()
  const [user, setUser] = useState(null)
  const [resumes, setResumes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const init = async () => {
      const { data: { user: u } } = await supabase.auth.getUser()
      if (!u) {
        router.push(`/signin?redirect=${encodeURIComponent('/dashboard')}`)
        return
      }
      setUser(u)

      const { data: list, error } = await supabase
        .from('resumes')
        .select('id, name, updated_at')
        .eq('user_id', u.id)
        .order('updated_at', { ascending: false })

      if (!error) setResumes(list || [])
      setLoading(false)
    }
    init()
  }, [router, supabase])

  const openResume = (id) => {
    sessionStorage.setItem('resumeId', id)
    sessionStorage.removeItem('resumeData') // force load from DB
    router.push('/editmyresume')
  }

  if (loading) {
    return (
      <div className="min-h-full bg-[#f0f0f0] flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-ref-green border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-gray-600 mt-3">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-full bg-[#f0f0f0]">
      <div className="bg-white rounded-t-3xl min-h-[calc(100vh-4rem)] py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-ref-green mb-8 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>

          <h1 className="text-3xl font-bold text-black mb-2">Dashboard</h1>
          <p className="text-gray-600 mb-8">
            Your saved resumes and quick actions
          </p>

          {/* Saved resumes */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                My Resumes
              </CardTitle>
              <CardDescription>
                Open a resume to edit or export as PDF
              </CardDescription>
            </CardHeader>
            <CardContent>
              {resumes.length === 0 ? (
                <p className="text-gray-500 text-sm">No saved resumes yet. Create one below.</p>
              ) : (
                <ul className="space-y-3">
                  {resumes.map((r) => (
                    <li
                      key={r.id}
                      className="flex items-center justify-between gap-4 p-3 rounded-xl bg-gray-50 border border-gray-200"
                    >
                      <div>
                        <p className="font-medium text-black">{r.name || 'Untitled Resume'}</p>
                        <p className="text-xs text-gray-500">
                          Updated {r.updated_at ? new Date(r.updated_at).toLocaleDateString() : '—'}
                        </p>
                      </div>
                      <Button variant="cta" size="default" onClick={() => openResume(r.id)}>
                        Open
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>

          {/* New resume */}
          <Card>
            <CardHeader>
              <CardTitle>New resume</CardTitle>
              <CardDescription>
                Upload a file, paste LinkedIn, or start from scratch
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              <Link href="/upload">
                <Button variant="register" size="default" className="inline-flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  Upload resume
                </Button>
              </Link>
              <Link href="/linkedin">
                <Button variant="register" size="default">
                  Paste LinkedIn
                </Button>
              </Link>
              <Link href="/blank">
                <Button variant="cta" size="default" className="inline-flex items-center gap-2">
                  Start from scratch
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
