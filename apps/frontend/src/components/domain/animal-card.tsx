'use client'

import React from "react"

import { motion } from 'framer-motion'
import { Cat, Dog, MoreVertical, Pencil, Trash2, ChevronRight } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { Animal } from '@/lib/types'

type AnimalCardProps = {
  animal: Animal
  onEdit?: (animal: Animal) => void
  onDelete?: (animal: Animal) => void
  onClick?: (animal: Animal) => void
  index?: number
}

export function AnimalCard({ animal, onEdit, onDelete, onClick, index = 0 }: AnimalCardProps) {
  const statusColors = {
    DOG: 'bg-accent',
    CAT: 'bg-primary',
  }

  const PetIcon = animal.type === 'DOG' ? Dog : Cat

  const handleCardClick = () => {
    onClick?.(animal)
  }

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={handleCardClick}
      className="bg-card rounded-3xl p-4 shadow-sm border border-border hover:shadow-lg hover:border-primary/20 transition-all cursor-pointer group"
    >
      <div className="flex items-center gap-4">
        <div className="relative">
          <Avatar className="w-14 h-14 border-2 border-secondary">
            {animal.imageUrl ? (
              <AvatarImage src={animal.imageUrl || "/placeholder.svg"} alt={animal.name} />
            ) : null}
            <AvatarFallback className="bg-secondary text-foreground">
              <PetIcon className="w-6 h-6" />
            </AvatarFallback>
          </Avatar>
          {/* Status dot */}
          <span className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 border-card ${statusColors[animal.type]}`} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
              {animal.name}
            </h3>
          </div>
          <p className="text-sm text-muted-foreground truncate">
            {animal.breed} - {animal.age} {animal.age === 1 ? 'ano' : 'anos'}
          </p>
          <p className="text-xs text-muted-foreground truncate mt-0.5">
            Tutor: {animal.ownerName}
          </p>
        </div>

        <div className="flex items-center gap-1">
          {animal.isOwner && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild onClick={handleMenuClick}>
                <Button variant="ghost" size="icon" className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreVertical className="w-5 h-5 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem 
                  onClick={(e) => { 
                    e.stopPropagation()
                    onEdit?.(animal) 
                  }} 
                  className="gap-2"
                >
                  <Pencil className="w-4 h-4" />
                  Editar
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={(e) => { 
                    e.stopPropagation()
                    onDelete?.(animal) 
                  }} 
                  className="gap-2 text-destructive focus:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                  Excluir
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          
          <ChevronRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>
    </motion.div>
  )
}
