import type { Animal, AnimalFormData } from '@/lib/types'

// ============================================
// API BASE URL
// ============================================

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

// ============================================
// MOCK DATA
// ============================================

let mockAnimals: Animal[] = [
  {
    id: '1',
    name: 'Rex',
    age: 3,
    type: 'DOG',
    breed: 'Golden Retriever',
    ownerName: 'Maria Silva',
    ownerContact: '(11) 99999-1111',
    imageUrl: undefined,
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
    userId: '1',
    isOwner: true,
  },
  {
    id: '2',
    name: 'Mimi',
    age: 2,
    type: 'CAT',
    breed: 'Persa',
    ownerName: 'Joao Santos',
    ownerContact: '(11) 99999-2222',
    imageUrl: undefined,
    createdAt: '2024-01-20T14:15:00Z',
    updatedAt: '2024-01-20T14:15:00Z',
    userId: '2',
    isOwner: false,
  },
  {
    id: '3',
    name: 'Thor',
    age: 5,
    type: 'DOG',
    breed: 'Labrador',
    ownerName: 'Maria Silva',
    ownerContact: '(11) 99999-1111',
    imageUrl: undefined,
    createdAt: '2024-02-01T09:00:00Z',
    updatedAt: '2024-02-01T09:00:00Z',
    userId: '1',
    isOwner: true,
  },
  {
    id: '4',
    name: 'Luna',
    age: 1,
    type: 'CAT',
    breed: 'Siames',
    ownerName: 'Ana Costa',
    ownerContact: '(11) 99999-3333',
    imageUrl: undefined,
    createdAt: '2024-02-10T16:45:00Z',
    updatedAt: '2024-02-10T16:45:00Z',
    userId: '3',
    isOwner: false,
  },
  {
    id: '5',
    name: 'Bob',
    age: 4,
    type: 'DOG',
    breed: 'Bulldog Frances',
    ownerName: 'Pedro Lima',
    ownerContact: '(11) 99999-4444',
    imageUrl: undefined,
    createdAt: '2024-02-15T11:20:00Z',
    updatedAt: '2024-02-15T11:20:00Z',
    userId: '4',
    isOwner: false,
  },
  {
    id: '6',
    name: 'Bella',
    age: 2,
    type: 'DOG',
    breed: 'Poodle',
    ownerName: 'Carla Mendes',
    ownerContact: '(11) 99999-5555',
    imageUrl: undefined,
    createdAt: '2024-03-01T08:00:00Z',
    updatedAt: '2024-03-01T08:00:00Z',
    userId: '1',
    isOwner: true,
  },
]

// ============================================
// API HELPERS
// ============================================

function getAuthHeader(token: string): HeadersInit {
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  }
}

// ============================================
// ANIMALS API SERVICE
// ============================================

export const animalsApi = {
  async getAll(token: string): Promise<Animal[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/animals`, {
        headers: getAuthHeader(token),
      })

      if (!response.ok) throw new Error('Failed to fetch animals')
      return response.json()
    } catch {
      console.warn('API unavailable, using mock data')
      await new Promise(resolve => setTimeout(resolve, 500))
      return mockAnimals
    }
  },

  async getMyAnimals(token: string): Promise<Animal[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/animals/my`, {
        headers: getAuthHeader(token),
      })

      if (!response.ok) throw new Error('Failed to fetch my animals')
      return response.json()
    } catch {
      console.warn('API unavailable, using mock data')
      await new Promise(resolve => setTimeout(resolve, 500))
      return mockAnimals.filter(a => a.isOwner)
    }
  },

  async getById(token: string, id: string): Promise<Animal | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/animals/${id}`, {
        headers: getAuthHeader(token),
      })

      if (!response.ok) return null
      return response.json()
    } catch {
      console.warn('API unavailable, using mock data')
      await new Promise(resolve => setTimeout(resolve, 300))
      return mockAnimals.find(a => a.id === id) || null
    }
  },

  async create(token: string, data: AnimalFormData): Promise<Animal> {
    try {
      const response = await fetch(`${API_BASE_URL}/animals`, {
        method: 'POST',
        headers: getAuthHeader(token),
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error('Failed to create animal')
      return response.json()
    } catch {
      console.warn('API unavailable, using mock data')
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const newAnimal: Animal = {
        id: Date.now().toString(),
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        userId: '1',
        isOwner: true,
      }
      
      mockAnimals = [newAnimal, ...mockAnimals]
      return newAnimal
    }
  },

  async update(token: string, id: string, data: Partial<AnimalFormData>): Promise<Animal> {
    try {
      const response = await fetch(`${API_BASE_URL}/animals/${id}`, {
        method: 'PUT',
        headers: getAuthHeader(token),
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error('Failed to update animal')
      return response.json()
    } catch {
      console.warn('API unavailable, using mock data')
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const index = mockAnimals.findIndex(a => a.id === id)
      if (index !== -1) {
        mockAnimals[index] = {
          ...mockAnimals[index],
          ...data,
          updatedAt: new Date().toISOString(),
        }
        return mockAnimals[index]
      }
      throw new Error('Animal not found')
    }
  },

  async delete(token: string, id: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/animals/${id}`, {
        method: 'DELETE',
        headers: getAuthHeader(token),
      })

      if (!response.ok) throw new Error('Failed to delete animal')
    } catch {
      console.warn('API unavailable, using mock data')
      await new Promise(resolve => setTimeout(resolve, 500))
      mockAnimals = mockAnimals.filter(a => a.id !== id)
    }
  },
}
