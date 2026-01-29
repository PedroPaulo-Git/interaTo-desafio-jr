'use client'

import Link from 'next/link'
import { PawPrint, Plus, List, type LucideIcon } from 'lucide-react'
import { useTranslation } from '@/lib/i18n'

type MenuItemProps = {
  href: string
  icon: LucideIcon
  label: string
  variant?: 'default' | 'accent'
}

function MenuItem({ href, icon: Icon, label, variant = 'default' }: MenuItemProps) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-4 p-4 rounded-2xl border transition-all hover:shadow-md ${variant === 'accent'
          ? 'border-accent bg-accent/5 hover:bg-accent/10'
          : 'border-border bg-card hover:bg-secondary/50'
        }`}
    >
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${variant === 'accent'
          ? 'bg-accent/10'
          : 'bg-primary/10'
        }`}>
        <Icon className={`w-6 h-6 ${variant === 'accent' ? 'text-accent' : 'text-primary'
          }`} />
      </div>
      <span className="font-medium text-foreground">{label}</span>
    </Link>
  )
}

export function MenuGrid() {
  const { t } = useTranslation()

  return (
    <div className="space-y-3">
      <MenuItem
        href="/dashboard/animals"
        icon={PawPrint}
        label={t('dashboard.myAnimals')}
      />
      <MenuItem
        href="/dashboard/animals/new"
        icon={Plus}
        label={t('animals.new')}
        variant="accent"
      />
      <MenuItem
        href="/dashboard/all-animals"
        icon={List}
        label={t('dashboard.allAnimals')}
      />
    </div>
  )
}
