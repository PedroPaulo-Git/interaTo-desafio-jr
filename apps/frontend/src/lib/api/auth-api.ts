import type { LoginCredentials, RegisterData, AuthResponse, User } from '@/lib/types'

// ============================================
// API BASE URL
// ============================================

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333'

// ============================================
// MOCK JWT GENERATOR (for development)
// ============================================

function generateMockJWT(user: User): string {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
  const payload = btoa(JSON.stringify({
    sub: user.id,
    email: user.email,
    name: user.name,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), // 24 hours
  }))
  const signature = btoa('mock-signature')
  return `${header}.${payload}.${signature}`
}

// ============================================
// AUTH API SERVICE
// ============================================

export const authApi = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    let response;
    try {
      response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      })
    } catch (error) {
      // Fallback to mock for development ONLY on network error
      console.warn('API unavailable (Network Error), using mock data')

      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800))

      const mockUser: User = {
        id: '1',
        name: 'Usuario Demo',
        email: credentials.email,
        phone: '(11) 99999-9999',
        createdAt: new Date().toISOString(),
      }

      return {
        user: mockUser,
        token: generateMockJWT(mockUser),
      }
    }

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Login failed')
    }

    return response.json()
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    let response;
    try {
      response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
    } catch (error) {
      // Fallback to mock for development ONLY on network error
      console.warn('API unavailable (Network Error), using mock data')

      await new Promise(resolve => setTimeout(resolve, 800))

      const mockUser: User = {
        id: Date.now().toString(),
        name: data.name,
        email: data.email,
        phone: data.phone,
        createdAt: new Date().toISOString(),
      }

      return {
        user: mockUser,
        token: generateMockJWT(mockUser),
      }
    }

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Registration failed')
    }

    return response.json()
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
      // Fallback: validate mock JWT
      try {
        const payload = JSON.parse(atob(token.split('.')[1]))
        if (payload.exp * 1000 > Date.now()) {
          return {
            id: payload.sub,
            name: payload.name,
            email: payload.email,
            createdAt: new Date().toISOString(),
          }
        }
      } catch {
        return null
      }
      return null
    }
  },
}
