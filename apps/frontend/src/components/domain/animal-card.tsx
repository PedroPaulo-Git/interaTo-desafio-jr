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
import { cn } from "@/lib/utils"
import { useTranslation } from '@/lib/i18n'
import type { Animal, ViewMode } from '@/lib/types'

type AnimalCardProps = {
  animal: Animal
  onEdit?: (animal: Animal) => void
  onDelete?: (animal: Animal) => void
  onClick?: (animal: Animal) => void
  index?: number
  viewMode?: ViewMode
}

export function AnimalCard({
  animal,
  onEdit,
  onDelete,
  onClick,
  index = 0,
  viewMode = 'list'
}: AnimalCardProps) {
  const { t } = useTranslation()
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

  // Layout configurations based on viewMode
  const isGrid = viewMode === 'grid'
  const isCompact = viewMode === 'compact'
  const isList = viewMode === 'list'

  const cardClasses = cn(
    "bg-card rounded-3xl shadow-sm border border-border hover:shadow-lg hover:border-primary/20 transition-all cursor-pointer group relative overflow-hidden",
    isList ? "p-4" : "p-4 flex flex-col items-center text-center",
    isCompact && "p-3"
  )

  const avatarClasses = cn(
    "border-2 border-secondary relative",
    isList ? "w-14 h-14" : "w-24 h-24 mb-3",
    isCompact && "w-12 h-12 mb-2"
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleCardClick}
      className={cardClasses}
    >
      <div className={cn("flex gap-4 w-full", (isGrid || isCompact) && "flex-col items-center gap-2")}>
        {/* Avatar Section */}
        <div className="relative shrink-0">
          <Avatar className={avatarClasses}>
            {animal.imageUrl ? (
              <AvatarImage src={animal.imageUrl} alt={animal.name} className="object-cover" />
            ) : null}
            <AvatarFallback className="bg-secondary text-foreground">
              <PetIcon className={cn("w-6 h-6", (isGrid && !isCompact) && "w-10 h-10")} />
            </AvatarFallback>
          </Avatar>

          {/* Status dot */}
          <span className={cn(
            "absolute rounded-full border-2 border-card",
            statusColors[animal.type],
            isList ? "-bottom-0.5 -right-0.5 w-4 h-4" : "bottom-1 right-1 w-5 h-5",
            isCompact && "w-3 h-3 bottom-0 right-0"
          )} />
        </div>

        {/* Info Section */}
        <div className={cn("flex-1 min-w-0 w-full", (isGrid || isCompact) && "flex flex-col items-center")}>
          <div className={cn("flex items-center gap-2 w-full", isGrid || isCompact ? "justify-center" : "text-base")}>
            <h3 className={cn("font-semibold text-foreground truncate group-hover:text-primary transition-colors", isCompact ? "text-sm" : "text-base")}>
              {animal.name}
            </h3>
          </div>
          <p className={cn("text-muted-foreground truncate", isCompact ? "text-xs" : "text-sm")}>
            {animal.breed} {(!isCompact) && `• ${animal.age} ${t('animals.years')}`}
          </p>
          {isCompact && (
            <p className="text-[10px] text-muted-foreground truncate">
              {animal.age} {t('animals.years')}
            </p>
          )}
          {!isCompact && (
            <p className="text-xs text-muted-foreground truncate mt-0.5">
              {t('animals.owner')}: {animal.ownerName}
            </p>
          )}
        </div>

        {/* Actions Section */}
        <div className={cn(
          "flex items-center gap-1",
          (isGrid || isCompact) && "absolute top-2 right-2"
        )}>
          {animal.isOwner && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild onClick={handleMenuClick}>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "shrink-0 transition-opacity",
                    isCompact ? "h-6 w-6" : "h-8 w-8",
                    // In grid modes, always visible or on hover? Let's keep hover behavior but maybe more visible
                    "opacity-0 group-hover:opacity-100 bg-background/50 hover:bg-background"
                  )}
                >
                  <MoreVertical className={cn("text-muted-foreground", isCompact ? "w-3 h-3" : "w-4 h-4")} />
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
                  {t('common.edit')}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation()
                    onDelete?.(animal)
                  }}
                  className="gap-2 text-destructive focus:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                  {t('common.delete')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {isList && (
            <ChevronRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
          )}
        </div>
      </div>
    </motion.div>
  )
}
