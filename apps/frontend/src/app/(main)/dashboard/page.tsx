'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { StatsHeader } from '@/components/domain/stats-header'
import { MenuGrid } from '@/components/domain/menu-grid'
import { AnimalCard } from '@/components/domain/animal-card'
import {
  ViewAnimalDialog,
  EditAnimalDialog,
  DeleteAnimalDialog
} from '@/components/domain/animal-dialogs'
import { Separator } from '@/components/ui/separator'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { useAuth } from '@/lib/auth/auth-context'
import { animalsApi } from '@/lib/api/animals-api'
import { ViewModeSelector } from '@/components/domain/view-mode-selector'
import type { Animal, AnimalFormData, DialogState, ViewMode } from '@/lib/types'
import { toast } from 'sonner'

export default function DashboardPage() {
  const { user, token } = useAuth()
  const [animals, setAnimals] = useState<Animal[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [viewMode, setViewMode] = useState<ViewMode>('list')
  const [dialogState, setDialogState] = useState<DialogState>({
    isOpen: false,
    type: null,
    animal: null,
  })

  useEffect(() => {
    const fetchAnimals = async () => {
      if (!token) return
      try {
        const data = await animalsApi.getAll(token)
        setAnimals(data)
      } catch (error) {
        toast.error('Erro ao carregar animais')
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAnimals()
  }, [token])

  const openDialog = (type: 'view' | 'edit' | 'delete', animal: Animal) => {
    setDialogState({ isOpen: true, type, animal })
  }

  const closeDialog = () => {
    setDialogState({ isOpen: false, type: null, animal: null })
  }

  const handleEdit = async (data: AnimalFormData) => {
    if (!token || !dialogState.animal) return
    try {
      const updated = await animalsApi.update(token, dialogState.animal.id, data)
      setAnimals(prev => prev.map(a => a.id === updated.id ? updated : a))
      toast.success('Animal atualizado com sucesso!')
    } catch (error) {
      toast.error('Erro ao atualizar animal')
      throw error
    }
  }

  const handleDelete = async () => {
    if (!token || !dialogState.animal) return
    try {
      await animalsApi.delete(token, dialogState.animal.id)
      setAnimals(prev => prev.filter(a => a.id !== dialogState.animal?.id))
      toast.success('Animal excluido com sucesso!')
    } catch (error) {
      toast.error('Erro ao excluir animal')
      throw error
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <LoadingSpinner size="lg" text="Carregando dados..." />
      </div>
    )
  }

  return (
    <div className="min-h-full">
      <StatsHeader userName={user?.name?.split(' ')[0] || 'Usuario'} />

      <motion.div
        className="px-6 md:px-10 py-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <MenuGrid />
      </motion.div>

      <Separator className="mx-4 w-auto" />

      <motion.div
        className="px-6 md:px-10 py-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">
            Animais recentes
          </h2>
          <ViewModeSelector currentMode={viewMode} onModeChange={setViewMode} />
        </div>

        <div className={
          viewMode === 'list'
            ? "space-y-3"
            : viewMode === 'grid'
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
              : "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3"
        }>
          {animals.slice(0, 5).map((animal, index) => (
            <AnimalCard
              key={animal.id}
              animal={animal}
              index={index}
              viewMode={viewMode}
              onClick={(a) => openDialog('view', a)}
              onEdit={(a) => openDialog('edit', a)}
              onDelete={(a) => openDialog('delete', a)}
            />
          ))}
        </div>
      </motion.div>

      {/* Dialogs */}
      <ViewAnimalDialog
        animal={dialogState.animal}
        isOpen={dialogState.isOpen && dialogState.type === 'view'}
        onClose={closeDialog}
        onEdit={() => {
          setDialogState(prev => ({ ...prev, type: 'edit' }))
        }}
        onDelete={() => {
          setDialogState(prev => ({ ...prev, type: 'delete' }))
        }}
      />

      <EditAnimalDialog
        animal={dialogState.animal}
        isOpen={dialogState.isOpen && dialogState.type === 'edit'}
        onClose={closeDialog}
        onSave={handleEdit}
      />

      <DeleteAnimalDialog
        animal={dialogState.animal}
        isOpen={dialogState.isOpen && dialogState.type === 'delete'}
        onClose={closeDialog}
        onConfirm={handleDelete}
      />
    </div>
  )
}
