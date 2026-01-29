import type { Animal, AnimalFormData } from '@/lib/types'

// ============================================
// API BASE URL
// ============================================

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333'

// ============================================
// API HELPERS
// ============================================

function getAuthHeader(token: string): HeadersInit {
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  }
}


function getUserIdFromToken(token: string): string | null {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    return payload.sub
  } catch {
    return null
  }
}

// ============================================
// ANIMALS API SERVICE
// ============================================

export const animalsApi = {
  async getAll(token: string): Promise<Animal[]> {
    const userId = getUserIdFromToken(token)
    const response = await fetch(`${API_BASE_URL}/animals`, {
      headers: getAuthHeader(token),
    })

    if (!response.ok) throw new Error('Failed to fetch animals')
    const animals: Animal[] = await response.json()

    return animals.map(animal => ({
      ...animal,
      isOwner: userId ? String(animal.ownerId) === String(userId) : false
    }))
  },

  async getMyAnimals(token: string): Promise<Animal[]> {
    const userId = getUserIdFromToken(token)
    if (!userId) throw new Error('Invalid token')

    const response = await fetch(`${API_BASE_URL}/animals`, {
      headers: getAuthHeader(token),
    })

    if (!response.ok) throw new Error('Failed to fetch my animals')
    const animals: Animal[] = await response.json()

    return animals
      .filter(animal => String(animal.ownerId) === String(userId))
      .map(animal => ({ ...animal, isOwner: true }))
  },

  async getById(token: string, id: string): Promise<Animal | null> {
    const userId = getUserIdFromToken(token)
    const response = await fetch(`${API_BASE_URL}/animals/${id}`, {
      headers: getAuthHeader(token),
    })

    if (!response.ok) return null
    const animal: Animal = await response.json()

    return {
      ...animal,
      isOwner: userId ? animal.ownerId === userId : false
    }
  },

  async create(token: string, data: AnimalFormData): Promise<Animal> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { imageUrl, ...animalData } = data

    const response = await fetch(`${API_BASE_URL}/animals`, {
      method: 'POST',
      headers: getAuthHeader(token),
      body: JSON.stringify(animalData),
    })

    if (!response.ok) throw new Error('Failed to create animal')
    return response.json()
  },

  async update(token: string, id: string, data: Partial<AnimalFormData>): Promise<Animal> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { imageUrl, ...animalData } = data

    const response = await fetch(`${API_BASE_URL}/animals/${id}`, {
      method: 'PUT',
      headers: getAuthHeader(token),
      body: JSON.stringify(animalData),
    })

    if (!response.ok) throw new Error('Failed to update animal')
    return response.json()
  },

  async delete(token: string, id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/animals/${id}`, {
      method: 'DELETE',
      headers: getAuthHeader(token),
    })

    if (!response.ok) throw new Error('Failed to delete animal')
  },
}
