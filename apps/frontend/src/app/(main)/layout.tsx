'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'
import {
  Bell,
  Menu,
  User,
  PawPrint,
  Home,
  Plus,
  List,
  LogOut,
  Moon,
  Sun,
  Settings,
} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { ProtectedRoute } from '@/components/auth/protected-route'
import { useAuth } from '@/lib/auth/auth-context'
import { LanguageSelector } from '@/components/domain/language-selector'
import { useTranslation } from '@/lib/i18n'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const theme = resolvedTheme; // Declare the theme variable
  const { t } = useTranslation()

  const getNavItems = () => [
    { href: '/dashboard', label: t('dashboard.title'), icon: Home },
    { href: '/dashboard/animals', label: t('dashboard.myAnimals'), icon: PawPrint },
    { href: '/dashboard/animals/new', label: t('dashboard.newAnimal'), icon: Plus },
    { href: '/dashboard/all-animals', label: t('dashboard.allAnimals'), icon: List },
  ]

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
  }

  const userInitials = user?.name
    ?.split(' ')
    .map(n => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase() || 'US'

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background text-foreground max-w-[100vw]">
        {/* Mobile Header */}
        <motion.header
          className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <div className="flex items-center justify-between px-2 sm:px-10 h-16">
            <Link href="/dashboard" className="flex items-center gap-2">
              <motion.div
                className=" rounded-xl py-2 flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image src="/img/LogoHigh.png" alt="Logo" className="sm:w-24 sm:h-24 w-16 h-16" width={100} height={100} />
                {/* <PawPrint className="w-5 h-5 text-primary-foreground" /> */}
              </motion.div>

            </Link>

            <div className="flex items-center gap-1">
              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="relative overflow-hidden rounded-xl bg-transparent hover:bg-secondary text-muted-foreground hover:text-foreground transition-all duration-200"
              >
                <div className="relative w-5 h-5 flex items-center justify-center">
                  <AnimatePresence mode="popLayout" initial={false}>
                    {mounted && (
                      <motion.div
                        key={theme}
                        initial={{ rotate: -90, scale: 0, opacity: 0 }}
                        animate={{ rotate: 0, scale: 1, opacity: 1 }}
                        exit={{ rotate: 90, scale: 0, opacity: 0 }}
                        transition={{ duration: 0.23, ease: "circOut" }}
                      >
                        {theme === 'dark' ? (
                          <Sun className="w-5 h-5 text-amber-400" />
                        ) : (
                          <Moon className="w-5 h-5" />
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Button>

              {/* Language Selector */}
              <LanguageSelector />

              {/* Notifications */}
              <Button
                variant="ghost"
                size="icon"
                className="relative rounded-xl bg-transparent hover:bg-secondary text-muted-foreground hover:text-foreground transition-all duration-200"
              >
                <Bell className="w-5 h-5" />
                <motion.span
                  className="absolute top-2.5 right-2.5 w-2 h-2 bg-accent rounded-full ring-2 ring-background"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </Button>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-xl bg-transparent hover:bg-secondary transition-all duration-200 p-0"
                  >
                    <Avatar className="w-8 h-8 border border-border shadow-sm">
                      <AvatarImage src={user?.avatarUrl || undefined} alt={user?.name} />
                      <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                        {userInitials}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 rounded-2xl p-2 shadow-xl border-border/50">
                  <div className="px-3 py-2 mb-1">
                    <p className="font-bold text-foreground">{user?.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                  </div>
                  <DropdownMenuSeparator className="mx-1" />
                  <Link href="/dashboard/profile">
                    <DropdownMenuItem className="gap-3 cursor-pointer rounded-xl py-2.5 focus:bg-primary/10 group transition-colors">
                      <User className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      <span className="font-medium group-hover:text-primary transition-colors">
                        {t('dashboard.profile')}
                      </span>
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/dashboard/profile#settings">
                    <DropdownMenuItem className="gap-3 cursor-pointer rounded-xl py-2.5 focus:bg-primary/10 group transition-colors">
                      <Settings className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      <span className="font-medium group-hover:text-primary transition-colors">
                        {t('profile.settings')}
                      </span>
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator className="mx-1" />
                  <DropdownMenuItem
                    onClick={logout}
                    className="gap-3 text-destructive focus:text-destructive focus:bg-destructive/10 cursor-pointer rounded-xl py-2.5 group transition-colors"
                  >
                    <LogOut className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                    <span className="font-medium">{t('auth.logout')}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Mobile Menu */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="w-5 h-5 text-muted-foreground" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-72">
                  <SheetHeader>
                    <SheetTitle className="flex items-center gap-2">
                      <PawPrint className="w-5 h-5 text-primary" />
                      Menu
                    </SheetTitle>
                  </SheetHeader>
                  <nav className="mt-6 flex flex-col gap-2">
                    {getNavItems().map((item) => {
                      const Icon = item.icon
                      const isActive = pathname === item.href
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${isActive
                            ? 'bg-primary text-primary-foreground'
                            : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                            }`}
                        >
                          <Icon className="w-5 h-5" />
                          {item.label}
                        </Link>
                      )
                    })}
                    <div className="border-t border-border my-4" />
                    <Link
                      href="/dashboard/profile"
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                    >
                      <User className="w-5 h-5" />
                      {t('dashboard.profile')}
                    </Link>
                    <button
                      onClick={logout}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-destructive hover:bg-destructive/10 transition-colors w-full text-left"
                    >
                      <LogOut className="w-5 h-5" />
                      {t('auth.logout')}
                    </button>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </motion.header>

        {/* Main Content */}
        <main className="pb-24 md:pb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Bottom Navigation (Mobile) */}
        <motion.nav
          className="fixed bottom-0 left-0 right-0 bg-card/80 backdrop-blur-lg border-t border-border md:hidden z-50"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <div className="flex items-center justify-around h-16 px-2">
            {getNavItems().map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex-1"
                >
                  <motion.div
                    className={`flex flex-col items-center gap-1 py-2 rounded-xl transition-colors ${isActive
                      ? 'text-primary'
                      : 'text-muted-foreground'
                      }`}
                    whileTap={{ scale: 0.9 }}
                  >
                    <motion.div
                      className={`p-1.5 rounded-xl ${isActive ? 'bg-primary/10' : ''}`}
                      layoutId="bottomNavIndicator"
                    >
                      <Icon className="w-5 h-5" />
                    </motion.div>
                    <span className="text-[10px] font-medium">{item.label}</span>
                  </motion.div>
                </Link>
              )
            })}
          </div>
        </motion.nav>
      </div>
    </ProtectedRoute>
  )
}
