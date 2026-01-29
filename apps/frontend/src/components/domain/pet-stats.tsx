'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { PawPrint, Dog, Cat, Activity } from 'lucide-react'
import { useTranslation } from '@/lib/i18n'
import { Card, CardContent } from '@/components/ui/card'
import type { PetStatsData } from '@/lib/types'

interface PetStatsProps {
    stats: PetStatsData
}

export function PetStats({ stats }: PetStatsProps) {
    const { t } = useTranslation()

    const items = [
        {
            label: t('stats.totalPets'),
            value: stats.total,
            icon: PawPrint,
            color: 'text-primary',
            bg: 'bg-primary/10',
            border: 'border-primary/20'
        },
        {
            label: t('stats.dogs'),
            value: stats.dogs,
            icon: Dog,
            color: 'text-accent',
            bg: 'bg-accent/10',
            border: 'border-accent/20'
        },
        {
            label: t('stats.cats'),
            value: stats.cats,
            icon: Cat,
            color: 'text-indigo-500',
            bg: 'bg-indigo-500/10',
            border: 'border-indigo-500/20'
        },
        {
            label: t('stats.avgAge'),
            value: `${stats.avgAge} ${t('animals.years')}`,
            icon: Activity,
            color: 'text-emerald-500',
            bg: 'bg-emerald-500/10',
            border: 'border-emerald-500/20'
        }
    ]

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {items.map((item, index) => {
                const Icon = item.icon
                return (
                    <motion.div
                        key={item.label}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -4 }}
                    >
                        <Card className={`rounded-3xl border ${item.border} bg-card shadow-sm overflow-hidden group`}>
                            <CardContent className="p-4 flex flex-col items-center text-center">
                                <div className={`w-12 h-12 rounded-2xl ${item.bg} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                                    <Icon className={`w-6 h-6 ${item.color}`} />
                                </div>
                                <p className="text-2xl font-bold text-foreground">{item.value}</p>
                                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{item.label}</p>
                            </CardContent>
                        </Card>
                    </motion.div>
                )
            })}
        </div>
    )
}
