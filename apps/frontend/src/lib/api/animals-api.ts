import type { Animal, AnimalFormData, PetStatsData } from '@/lib/types'
import { getMockAnimals, getMockAnimal, createMockAnimal, updateMockAnimal, deleteMockAnimal, MOCK_TOKEN } from '@/lib/mock-data'

// ============================================
// API BASE URL
// ============================================

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333'

// ============================================
// API HELPERS
// ============================================

// MOCK: Verificar se está em modo desenvolvedor
function isMockMode(token: string): boolean {
  return token === MOCK_TOKEN
}

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
    // MOCK: Retornar dados mockados se em modo desenvolvedor
    if (isMockMode(token)) {
      return getMockAnimals()
    }

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
    // MOCK: Filtrar apenas animais do usuário mockado
    if (isMockMode(token)) {
      return getMockAnimals().filter(a => a.isOwner)
    }

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
    // MOCK: Buscar animal mockado por ID
    if (isMockMode(token)) {
      return getMockAnimal(id)
    }

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
    // MOCK: Criar animal mockado
    if (isMockMode(token)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { imageUrl, ...animalData } = data
      return createMockAnimal(animalData)
    }

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
    // MOCK: Atualizar animal mockado
    if (isMockMode(token)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { imageUrl, ...animalData } = data
      return updateMockAnimal(id, animalData)
    }

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
    // MOCK: Deletar animal mockado
    if (isMockMode(token)) {
      deleteMockAnimal(id)
      return
    }

    const response = await fetch(`${API_BASE_URL}/animals/${id}`, {
      method: 'DELETE',
      headers: getAuthHeader(token),
    })

    if (!response.ok) throw new Error('Failed to delete animal')
  },

  async getStats(token: string): Promise<PetStatsData> {
    if (isMockMode(token)) {
      const animals = getMockAnimals()
      const dogs = animals.filter(a => a.type === 'DOG').length
      const cats = animals.filter(a => a.type === 'CAT').length
      const total = animals.length
      const avgAge = total > 0 ? animals.reduce((sum, a) => sum + a.age, 0) / total : 0

      return {
        total,
        dogs,
        cats,
        avgAge: Math.round(avgAge * 10) / 10
      }
    }

    const response = await fetch(`${API_BASE_URL}/animals/stats`, {
      headers: getAuthHeader(token),
    })

    if (!response.ok) throw new Error('Failed to fetch stats')
    return response.json()
  },
}
