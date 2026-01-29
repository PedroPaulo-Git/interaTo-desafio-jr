'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth/auth-context'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

export default function Home() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        router.replace('/dashboard')
      } else {
        router.replace('/login')
      }
    }
  }, [isAuthenticated, isLoading, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <LoadingSpinner size="lg" text="Carregando..." />
    </div>
  )
}