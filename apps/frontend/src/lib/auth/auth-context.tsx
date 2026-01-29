'use client'

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import type { User, LoginCredentials, RegisterData, AuthResponse } from '@/lib/types'
import { authApi } from '@/lib/api/auth-api'
import { MOCK_USER, MOCK_TOKEN, initMockData, clearMockData } from '@/lib/mock-data'

// ============================================
// AUTH CONTEXT TYPES
// ============================================

interface AuthContextType {
  user: User | null
  token: string | null
  isLoading: boolean
  isAuthenticated: boolean
  isMockMode: boolean // MOCK: Flag para modo desenvolvedor
  login: (credentials: LoginCredentials) => Promise<void>
  loginAsDeveloper: () => void // MOCK: Login sem backend
  register: (data: RegisterData) => Promise<void>
  logout: () => void
  updateUser: (user: User) => void
}

// ============================================
// CONSTANTS
// ============================================

const AUTH_TOKEN_KEY = 'petshop_auth_token'
const AUTH_USER_KEY = 'petshop_auth_user'
const MOCK_MODE_KEY = 'petshop_mock_mode' // MOCK: Flag de modo desenvolvedor
const PUBLIC_ROUTES = ['/login', '/register', '/forgot-password']

// ============================================
// CONTEXT
// ============================================

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// ============================================
// PROVIDER
// ============================================

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isMockMode, setIsMockMode] = useState(false) // MOCK: Estado do modo desenvolvedor
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  // Initialize auth state from storage
  useEffect(() => {
    const initAuth = () => {
      try {
        // MOCK: Verificar se está em modo desenvolvedor
        const mockMode = localStorage.getItem(MOCK_MODE_KEY) === 'true'
        if (mockMode) {
          setIsMockMode(true)
          setToken(MOCK_TOKEN)
          setUser(MOCK_USER)
          setIsLoading(false)
          return
        }

        const storedToken = localStorage.getItem(AUTH_TOKEN_KEY)
        const storedUser = localStorage.getItem(AUTH_USER_KEY)

        if (storedToken && storedUser) {
          // Validate token (check expiration)
          const payload = JSON.parse(atob(storedToken.split('.')[1]))
          const isExpired = payload.exp * 1000 < Date.now()

          if (!isExpired) {
            setToken(storedToken)
            setUser(JSON.parse(storedUser))
          } else {
            // Token expired, clear storage
            localStorage.removeItem(AUTH_TOKEN_KEY)
            localStorage.removeItem(AUTH_USER_KEY)
          }
        }
      } catch (error) {
        console.error('Error initializing auth:', error)
        localStorage.removeItem(AUTH_TOKEN_KEY)
        localStorage.removeItem(AUTH_USER_KEY)
      } finally {
        setIsLoading(false)
      }
    }

    initAuth()
  }, [])

  // Route protection
  useEffect(() => {
    if (isLoading) return

    const isPublicRoute = PUBLIC_ROUTES.some(route => pathname.startsWith(route))
    const isRootRoute = pathname === '/'

    if (!token && !isPublicRoute && !isRootRoute) {
      router.replace('/login')
    }

    if (token && (isPublicRoute || isRootRoute)) {
      router.replace('/dashboard')
    }
  }, [token, pathname, isLoading, router])

  const login = useCallback(async (credentials: LoginCredentials) => {
    const response: AuthResponse = await authApi.login(credentials)

    setUser(response.user)
    setToken(response.token)

    localStorage.setItem(AUTH_TOKEN_KEY, response.token)
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(response.user))

    router.replace('/dashboard')
  }, [router])

  const register = useCallback(async (data: RegisterData) => {
    const response: AuthResponse = await authApi.register(data)

    setUser(response.user)
    setToken(response.token)

    localStorage.setItem(AUTH_TOKEN_KEY, response.token)
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(response.user))

    router.replace('/dashboard')
  }, [router])

  // MOCK: Login como desenvolvedor (sem backend)
  const loginAsDeveloper = useCallback(() => {
    initMockData()
    setIsMockMode(true)
    setUser(MOCK_USER)
    setToken(MOCK_TOKEN)
    localStorage.setItem(MOCK_MODE_KEY, 'true')
    router.replace('/dashboard')
  }, [router])

  const logout = useCallback(() => {
    // MOCK: Limpar dados mockados no logout
    if (isMockMode) {
      clearMockData()
      localStorage.removeItem(MOCK_MODE_KEY)
      setIsMockMode(false)
    }

    setUser(null)
    setToken(null)
    localStorage.removeItem(AUTH_TOKEN_KEY)
    localStorage.removeItem(AUTH_USER_KEY)
    router.replace('/login')
  }, [router, isMockMode])

  const updateUser = useCallback((updatedUser: User) => {
    setUser(updatedUser)
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(updatedUser))
  }, [])

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    isAuthenticated: !!token && !!user,
    isMockMode,
    login,
    loginAsDeveloper,
    register,
    logout,
    updateUser,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// ============================================
// HOOK
// ============================================

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
