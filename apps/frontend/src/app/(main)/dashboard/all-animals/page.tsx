'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Users, PawPrint } from 'lucide-react'
import { AnimalCard } from '@/components/domain/animal-card'
import { 
  ViewAnimalDialog, 
  EditAnimalDialog, 
  DeleteAnimalDialog 
} from '@/components/domain/animal-dialogs'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { useAuth } from '@/lib/auth/auth-context'
import { animalsApi } from '@/lib/api/animals-api'
import type { Animal, AnimalFormData, DialogState } from '@/lib/types'
import { toast } from 'sonner'

export default function AllAnimalsPage() {
  const { token } = useAuth()
  const [animals, setAnimals] = useState<Animal[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState<string>('all')
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

  const filteredAnimals = animals.filter((animal) => {
    const matchesSearch = animal.name.toLowerCase().includes(search.toLowerCase()) ||
      animal.breed.toLowerCase().includes(search.toLowerCase()) ||
      animal.ownerName.toLowerCase().includes(search.toLowerCase())
    const matchesType = typeFilter === 'all' || animal.type === typeFilter
    return matchesSearch && matchesType
  })

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
        <LoadingSpinner size="lg" text="Carregando todos os animais..." />
      </div>
    )
  }

  return (
    <div className="min-h-full">
      <motion.div 
        className="px-4 py-6 bg-gradient-to-br from-primary/5 via-secondary to-accent/5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
            <Users className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Todos os Animais</h1>
            <p className="text-sm text-muted-foreground">
              {animals.length} {animals.length === 1 ? 'animal cadastrado' : 'animais cadastrados'}
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div 
        className="px-4 py-4 space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome, raca ou tutor..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 h-11 rounded-xl"
            />
          </div>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-32 h-11 rounded-xl">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filtrar" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="DOG">Cachorro</SelectItem>
              <SelectItem value="CAT">Gato</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {filteredAnimals.length === 0 ? (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-secondary rounded-full flex items-center justify-center">
              <PawPrint className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-foreground">Nenhum animal encontrado</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Tente ajustar os filtros de busca
            </p>
          </motion.div>
        ) : (
          <div className="space-y-3">
            {filteredAnimals.map((animal, index) => (
              <AnimalCard
                key={animal.id}
                animal={animal}
                index={index}
                onClick={(a) => openDialog('view', a)}
                onEdit={(a) => openDialog('edit', a)}
                onDelete={(a) => openDialog('delete', a)}
              />
            ))}
          </div>
        )}
      </motion.div>

      {/* Dialogs */}
      <ViewAnimalDialog
        animal={dialogState.animal}
        isOpen={dialogState.isOpen && dialogState.type === 'view'}
        onClose={closeDialog}
        onEdit={() => setDialogState(prev => ({ ...prev, type: 'edit' }))}
        onDelete={() => setDialogState(prev => ({ ...prev, type: 'delete' }))}
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
