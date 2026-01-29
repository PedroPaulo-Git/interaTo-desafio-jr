'use client'

import { useState, useEffect } from 'react'
import { Languages, Check } from 'lucide-react'
import { setLocale, type Locale, useTranslation } from '@/lib/i18n'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function LanguageSelector() {
    const { locale: currentLocale } = useTranslation()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <Button variant="ghost" size="icon" className="rounded-xl hover:bg-primary/10 hover:text-primary  transition-all duration-300 ">
                <Languages className="w-5 h-5" />
            </Button>
        )
    }

    const handleChange = (locale: Locale) => {
        setLocale(locale)
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-xl hover:bg-primary/10 hover:text-primary transition-all duration-300 dark:text-white">
                    <Languages className="w-5 h-5" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40 rounded-2xl p-2">
                <DropdownMenuItem
                    onClick={() => handleChange('pt-BR')}
                    className="flex items-center justify-between rounded-sm cursor-pointer"
                >
                    <span className="flex items-center gap-2 dark:text-white">
                        <span>🇧🇷</span> Português
                    </span>
                    {currentLocale === 'pt-BR' && <Check className="w-4 h-4 text-primary dark:text-white" />}
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => handleChange('en-US')}
                    className="flex items-center justify-between rounded-sm cursor-pointer"
                >
                    <span className="flex items-center gap-2 dark:text-white">
                        <span>🇺🇸</span> English
                    </span>
                    {currentLocale === 'en-US' && <Check className="w-4 h-4 text-primary dark:text-white" />}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
