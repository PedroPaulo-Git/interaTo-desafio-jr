'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  AlertTriangle,
  X,
  Pencil,
  Trash2,
  Calendar,
  User,
  Phone,
  PawPrint,
  Camera,
  Save,
  Dog,
  Cat,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ButtonSpinner } from '@/components/ui/loading-spinner'
import type { Animal, AnimalFormData } from '@/lib/types'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { animalSchema, type AnimalForm } from '@/lib/schemas'
import Image from 'next/image'
import { useTranslation, getLocale } from '@/lib/i18n'

// ============================================
// SLIDE PANEL BASE
// ============================================

interface SlidePanelProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  title: string
  icon?: React.ReactNode
}

function SlidePanel({ isOpen, onClose, children, title, icon }: SlidePanelProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            className="fixed bottom-0 right-0 z-50 w-full max-w-md h-[85vh] md:h-auto md:max-h-[80vh] md:bottom-6 md:right-6 md:rounded-2xl bg-card border border-border shadow-2xl overflow-hidden"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-secondary/30">
              <div className="flex items-center gap-3">
                {icon && (
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    {icon}
                  </div>
                )}
                <h2 className="text-lg font-semibold text-foreground">{title}</h2>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="rounded-full hover:bg-secondary"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto p-6" style={{ maxHeight: 'calc(80vh - 80px)' }}>
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// ============================================
// VIEW ANIMAL DIALOG
// ============================================

interface ViewAnimalDialogProps {
  animal: Animal | null
  isOpen: boolean
  onClose: () => void
  onEdit: () => void
  onDelete: () => void
}

export function ViewAnimalDialog({ animal, isOpen, onClose, onEdit, onDelete }: ViewAnimalDialogProps) {
  const { t } = useTranslation()
  const locale = getLocale()

  if (!animal) return null

  const PetIcon = animal.type === 'DOG' ? Dog : Cat
  const createdDate = new Date(animal.createdAt).toLocaleDateString(locale, {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })

  return (
    <SlidePanel
      isOpen={isOpen}
      onClose={onClose}
      title={t('animals.details')}
      icon={<PawPrint className="w-5 h-5 text-primary" />}
    >
      <div className="space-y-6">
        {/* Pet Image */}
        <div className="relative w-full aspect-square rounded-2xl bg-secondary/50 overflow-hidden">
          {animal.imageUrl ? (
            <Image
              src={animal.imageUrl || "/placeholder.svg"}
              alt={animal.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                <PetIcon className="w-10 h-10 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">{t('animals.noPhoto')}</p>
            </div>
          )}
        </div>

        {/* Pet Info */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-foreground">{animal.name}</h3>
            <span className={`px-3 py-1 rounded-full text-sm font-medium dark:text-gray-400 ${animal.type === 'DOG'
              ? 'bg-accent/20 text-accent-foreground'
              : 'bg-primary/20 text-primary'
              }`}>
              {animal.type === 'DOG' ? t('animals.dog') : t('animals.cat')}
            </span>
          </div>

          <div className="grid gap-4">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50">
              <PawPrint className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">{t('animals.breed')}</p>
                <p className="font-medium text-foreground">{animal.breed}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50">
              <Calendar className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">{t('animals.age')}</p>
                <p className="font-medium text-foreground">
                  {animal.age} {t('animals.years')}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50">
              <User className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">{t('animals.owner')}</p>
                <p className="font-medium text-foreground">{animal.ownerName}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50">
              <Phone className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">{t('animals.contact')}</p>
                <p className="font-medium text-foreground">{animal.ownerContact}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50">
              <Calendar className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">{t('animals.registeredAt')}</p>
                <p className="font-medium text-foreground">{createdDate}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        {animal.isOwner && (
          <div className="flex gap-3 pt-4 border-t border-border">
            <Button
              variant="outline"
              className="flex-1 h-12 rounded-xl gap-2 bg-transparent dark:text-white"
              onClick={onEdit}
            >
              <Pencil className="w-4 h-4" />
              {t('common.edit')}
            </Button>
            <Button
              variant="destructive"
              className="flex-1 h-12 rounded-xl gap-2"
              onClick={onDelete}
            >
              <Trash2 className="w-4 h-4" />
              {t('common.delete')}
            </Button>
          </div>
        )}
      </div>
    </SlidePanel>
  )
}

// ============================================
// EDIT ANIMAL DIALOG
// ============================================

interface EditAnimalDialogProps {
  animal: Animal | null
  isOpen: boolean
  onClose: () => void
  onSave: (data: AnimalFormData) => Promise<void>
}

export function EditAnimalDialog({ animal, isOpen, onClose, onSave }: EditAnimalDialogProps) {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<AnimalForm>({
    resolver: zodResolver(animalSchema),
  })

  React.useEffect(() => {
    if (animal) {
      reset({
        name: animal.name,
        age: animal.age,
        type: animal.type,
        breed: animal.breed,
        ownerName: animal.ownerName,
        ownerContact: animal.ownerContact,
      })
    }
  }, [animal, reset])

  const onSubmit = async (data: AnimalForm) => {
    setIsLoading(true)
    try {
      await onSave({
        ...data,
      })
      onClose()
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <SlidePanel
      isOpen={isOpen}
      onClose={onClose}
      title={t('animals.edit')}
      icon={<Pencil className="w-5 h-5 text-primary" />}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Image Upload Placeholder */}
        <div className="relative w-full aspect-video rounded-2xl bg-secondary/50 border-2 border-dashed border-border overflow-hidden flex items-center justify-center cursor-pointer hover:bg-secondary/70 transition-colors">
          {animal?.imageUrl ? (
            <Image
              src={animal.imageUrl || "/placeholder.svg"}
              alt="Pet"
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <Camera className="w-8 h-8" />
              <p className="text-sm">{t('animals.clickToAdd')}</p>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="edit-name">{t('animals.name')}</Label>
          <Input
            id="edit-name"
            className={`h-12 rounded-xl ${errors.name ? 'border-destructive' : ''}`}
            disabled={isLoading}
            {...register('name')}
          />
          {errors.name && <p className="text-xs text-destructive ml-1">{errors.name.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="edit-type">{t('animals.type')}</Label>
            <Select
              defaultValue={animal?.type}
              onValueChange={(value: 'DOG' | 'CAT') => setValue('type', value, { shouldValidate: true })}
              disabled={isLoading}
            >
              <SelectTrigger className={`h-12 rounded-xl ${errors.type ? 'border-destructive' : ''}`}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="DOG">{t('animals.dog')}</SelectItem>
                <SelectItem value="CAT">{t('animals.cat')}</SelectItem>
              </SelectContent>
            </Select>
            {errors.type && <p className="text-xs text-destructive ml-1">{errors.type.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-age">{t('animals.age')}</Label>
            <Input
              id="edit-age"
              type="number"
              className={`h-12 rounded-xl ${errors.age ? 'border-destructive' : ''}`}
              disabled={isLoading}
              {...register('age')}
            />
            {errors.age && <p className="text-xs text-destructive ml-1">{errors.age.message}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="edit-breed">{t('animals.breed')}</Label>
          <Input
            id="edit-breed"
            className={`h-12 rounded-xl ${errors.breed ? 'border-destructive' : ''}`}
            disabled={isLoading}
            {...register('breed')}
          />
          {errors.breed && <p className="text-xs text-destructive ml-1">{errors.breed.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="edit-owner">{t('animals.ownerName')}</Label>
          <Input
            id="edit-owner"
            className={`h-12 rounded-xl ${errors.ownerName ? 'border-destructive' : ''}`}
            disabled={isLoading}
            {...register('ownerName')}
          />
          {errors.ownerName && <p className="text-xs text-destructive ml-1">{errors.ownerName.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="edit-contact">{t('animals.contact')}</Label>
          <Input
            id="edit-contact"
            className={`h-12 rounded-xl ${errors.ownerContact ? 'border-destructive' : ''}`}
            disabled={isLoading}
            {...register('ownerContact')}
          />
          {errors.ownerContact && <p className="text-xs text-destructive ml-1">{errors.ownerContact.message}</p>}
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            className="flex-1 h-12 rounded-xl bg-transparent"
            onClick={onClose}
            disabled={isLoading}
          >
            {t('common.cancel')}
          </Button>
          <Button
            type="submit"
            className="flex-1 h-12 rounded-xl gap-2"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <ButtonSpinner />
                {t('common.saving')}
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                {t('common.save')}
              </>
            )}
          </Button>
        </div>
      </form>
    </SlidePanel>
  )
}

// ============================================
// DELETE CONFIRMATION DIALOG
// ============================================

interface DeleteAnimalDialogProps {
  animal: Animal | null
  isOpen: boolean
  onClose: () => void
  onConfirm: () => Promise<void>
}

export function DeleteAnimalDialog({ animal, isOpen, onClose, onConfirm }: DeleteAnimalDialogProps) {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)

  const handleDelete = async () => {
    setIsLoading(true)
    try {
      await onConfirm()
      onClose()
    } finally {
      setIsLoading(false)
    }
  }

  if (!animal) return null

  return (
    <SlidePanel
      isOpen={isOpen}
      onClose={onClose}
      title={t('animals.confirmDelete')}
      icon={<AlertTriangle className="w-5 h-5 text-destructive" />}
    >
      <div className="space-y-6">
        <div className="flex flex-col items-center text-center gap-4 py-4">
          <motion.div
            className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <AlertTriangle className="w-10 h-10 text-destructive" />
          </motion.div>

          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-foreground">
              {t('common.delete')} {animal.name}?
            </h3>
            <p className="text-muted-foreground">
              {t('animals.deleteWarning')}
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1 h-12 rounded-xl bg-transparent"
            onClick={onClose}
            disabled={isLoading}
          >
            {t('common.cancel')}
          </Button>
          <Button
            variant="destructive"
            className="flex-1 h-12 rounded-xl gap-2"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <ButtonSpinner />
                {t('animals.deleting')}
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4" />
                {t('common.delete')}
              </>
            )}
          </Button>
        </div>
      </div>
    </SlidePanel>
  )
}
