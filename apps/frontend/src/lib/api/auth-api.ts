import type { LoginCredentials, RegisterData, AuthResponse, User } from '@/lib/types'

// ============================================
// API BASE URL
// ============================================

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333'

// ============================================
// AUTH API SERVICE
// ============================================

export const authApi = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Login failed')
    }

    const responseData = await response.json()
    return {
      user: responseData.user,
      token: responseData.access_token, // Map backend access_token to frontend token
    }
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    const payload = {
      name: data.name,
      email: data.email,
      password: data.password,
      contact: data.phone, // Map phone to contact for backend
    }

    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Registration failed')
    }

    const responseData = await response.json()
    return {
      user: responseData.user,
      token: responseData.access_token, // Map backend access_token to frontend token
    }
  },

  async validateToken(token: string): Promise<User | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/validate`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) return null
      return response.json()
    } catch {
      return null
    }
  },
}
