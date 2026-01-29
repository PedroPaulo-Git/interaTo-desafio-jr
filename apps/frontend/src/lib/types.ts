// ============================================
// DOMAIN TYPES
// ============================================

export type AnimalType = 'DOG' | 'CAT'

export interface Animal {
  id: string
  name: string
  age: number
  type: AnimalType
  breed: string
  ownerName: string
  ownerContact: string
  imageUrl?: string
  createdAt: string
  updatedAt: string
  ownerId: string
  isOwner?: boolean
}

export interface User {
  id: string
  name: string
  email: string
  phone?: string
  avatarUrl?: string
  createdAt: string
}

// ============================================
// API TYPES
// ============================================

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  name: string
  email: string
  phone: string
  password: string
}

export interface AuthResponse {
  user: User
  token: string
}

export interface ApiError {
  message: string
  code?: string
  status?: number
}

// ============================================
// FORM TYPES
// ============================================

export interface AnimalFormData {
  name: string
  age: number
  type: AnimalType
  breed: string
  ownerName: string
  ownerContact: string
  imageUrl?: string
}

// ============================================
// UI STATE TYPES
// ============================================

export type ViewMode = 'list' | 'grid' | 'compact'

export interface DialogState {
  isOpen: boolean
  type: 'edit' | 'delete' | 'view' | null
  animal: Animal | null
}

export interface ToastState {
  isVisible: boolean
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
}
