// ==============================================================
// MOCK DATA - Sistema de desenvolvimento sem backend
// ==============================================================

import type { User, Animal } from './types'

const MOCK_STORAGE_KEY = 'mock_animals'
const MOCK_USER_KEY = 'mock_user'

// Mock User (Desenvolvedor)
export const MOCK_USER: User = {
    id: 'mock-user-001',
    name: 'Desenvolvedor',
    email: 'dev@petshop.com',
    phone: '11 99999-9999',
    createdAt: new Date().toISOString(),
}

// Mock Token
export const MOCK_TOKEN = 'mock-jwt-token-dev-mode'

// Animais iniciais para demonstração
const INITIAL_ANIMALS: Animal[] = [
    {
        id: 'mock-001',
        name: 'Rex',
        type: 'DOG',
        breed: 'Golden Retriever',
        age: 3,
        ownerId: MOCK_USER.id,
        ownerName: MOCK_USER.name,
        ownerContact: MOCK_USER.phone!,
        createdAt: new Date('2024-01-15').toISOString(),
        updatedAt: new Date('2024-01-15').toISOString(),
        isOwner: true,
    },
    {
        id: 'mock-002',
        name: 'Mimi',
        type: 'CAT',
        breed: 'Siamês',
        age: 2,
        ownerId: MOCK_USER.id,
        ownerName: MOCK_USER.name,
        ownerContact: MOCK_USER.phone!,
        createdAt: new Date('2024-02-20').toISOString(),
        updatedAt: new Date('2024-02-20').toISOString(),
        isOwner: true,
    },
    {
        id: 'mock-003',
        name: 'Bob',
        type: 'DOG',
        breed: 'Bulldog',
        age: 5,
        ownerId: 'other-user',
        ownerName: 'João Silva',
        ownerContact: '11 98888-8888',
        createdAt: new Date('2024-03-10').toISOString(),
        updatedAt: new Date('2024-03-10').toISOString(),
        isOwner: false,
    },
]

// ===== CRUD Operations =====

export function initMockData() {
    localStorage.setItem(MOCK_STORAGE_KEY, JSON.stringify(INITIAL_ANIMALS))
    localStorage.setItem(MOCK_USER_KEY, JSON.stringify(MOCK_USER))
}

export function clearMockData() {
    localStorage.removeItem(MOCK_STORAGE_KEY)
    localStorage.removeItem(MOCK_USER_KEY)
}

export function getMockAnimals(): Animal[] {
    const data = localStorage.getItem(MOCK_STORAGE_KEY)
    return data ? JSON.parse(data) : []
}

export function getMockAnimal(id: string): Animal | null {
    const animals = getMockAnimals()
    return animals.find(a => a.id === id) || null
}

export function createMockAnimal(data: Omit<Animal, 'id' | 'createdAt' | 'updatedAt' | 'ownerId' | 'isOwner'>): Animal {
    const animals = getMockAnimals()
    const newAnimal: Animal = {
        ...data,
        id: `mock-${Date.now()}`,
        ownerId: MOCK_USER.id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isOwner: true,
    }
    animals.push(newAnimal)
    localStorage.setItem(MOCK_STORAGE_KEY, JSON.stringify(animals))
    return newAnimal
}

export function updateMockAnimal(id: string, data: Partial<Animal>): Animal {
    const animals = getMockAnimals()
    const index = animals.findIndex(a => a.id === id)
    if (index === -1) throw new Error('Animal not found')

    animals[index] = {
        ...animals[index],
        ...data,
        updatedAt: new Date().toISOString()
    }
    localStorage.setItem(MOCK_STORAGE_KEY, JSON.stringify(animals))
    return animals[index]
}

export function deleteMockAnimal(id: string): void {
    const animals = getMockAnimals()
    const filtered = animals.filter(a => a.id !== id)
    localStorage.setItem(MOCK_STORAGE_KEY, JSON.stringify(filtered))
}
