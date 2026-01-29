'use client'

import React from 'react'
import { LayoutList, LayoutGrid, Grid3x3 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ViewMode } from '@/lib/types'
import { cn } from '@/lib/utils'
import { useTranslation } from '@/lib/i18n'

interface ViewModeSelectorProps {
    currentMode: ViewMode
    onModeChange: (mode: ViewMode) => void
    disabled?: boolean
}

export function ViewModeSelector({ currentMode, onModeChange, disabled }: ViewModeSelectorProps) {
    const { t } = useTranslation()

    return (
        <div className="flex items-center p-1 bg-secondary/50 rounded-lg border border-border">
            <Button
                variant="ghost"
                size="icon"
                className={cn(
                    "h-8 w-8 rounded-md transition-all",
                    currentMode === 'list'
                        ? "bg-background shadow-sm text-foreground hover:bg-background"
                        : "text-muted-foreground hover:text-foreground"
                )}
                onClick={() => onModeChange('list')}
                disabled={disabled}
                title={t('viewMode.list')}
            >
                <LayoutList className="w-4 h-4" />
            </Button>

            <Button
                variant="ghost"
                size="icon"
                className={cn(
                    "h-8 w-8 rounded-md transition-all",
                    currentMode === 'grid'
                        ? "bg-background shadow-sm text-foreground hover:bg-background"
                        : "text-muted-foreground hover:text-foreground"
                )}
                onClick={() => onModeChange('grid')}
                disabled={disabled}
                title={t('viewMode.grid')}
            >
                <LayoutGrid className="w-4 h-4" />
            </Button>

            <Button
                variant="ghost"
                size="icon"
                className={cn(
                    "h-8 w-8 rounded-md transition-all",
                    currentMode === 'compact'
                        ? "bg-background shadow-sm text-foreground hover:bg-background"
                        : "text-muted-foreground hover:text-foreground"
                )}
                onClick={() => onModeChange('compact')}
                disabled={disabled}
                title={t('viewMode.compact')}
            >
                <Grid3x3 className="w-4 h-4" />
            </Button>
        </div>
    )
}
