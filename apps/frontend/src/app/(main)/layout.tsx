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

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/dashboard/animals', label: 'Meus Animais', icon: PawPrint },
  { href: '/dashboard/animals/new', label: 'Cadastrar', icon: Plus },
  { href: '/dashboard/all-animals', label: 'Todos', icon: List },
]

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
          <div className="flex items-center justify-between px-10 h-16">
            <Link href="/dashboard" className="flex items-center gap-2">
              <motion.div
                className=" rounded-xl py-2 flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image src="/img/LogoHigh.png" alt="Logo" className="w-24 h-24" width={100} height={100} />
                {/* <PawPrint className="w-5 h-5 text-primary-foreground" /> */}
              </motion.div>

            </Link>

            <div className="flex items-center gap-1">
              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="relative overflow-hidden"
              >
                <div className="relative w-5 h-5">
                  <AnimatePresence mode="popLayout" initial={false}>
                    {mounted && (
                      <motion.div
                        key={theme}
                        className="absolute inset-0"
                        initial={{ rotate: -90, scale: 0, opacity: 0 }}
                        animate={{ rotate: 0, scale: 1, opacity: 1 }}
                        exit={{ rotate: 90, scale: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                      >
                        {theme === 'dark' ? (
                          <Sun className="w-5 h-5 text-yellow-500" />
                        ) : (
                          <Moon className="w-5 h-5 text-muted-foreground" />
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Button>

              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5 text-muted-foreground" />
                <motion.span
                  className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </Button>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar className="w-8 h-8 border-2 border-primary/20">
                      <AvatarImage src={user?.avatarUrl || undefined} alt={user?.name} />
                      <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
                        {userInitials}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-3 py-2 border-b border-border">
                    <p className="font-medium text-foreground">{user?.name}</p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                  </div>
                  <Link href="/dashboard/profile">
                    <DropdownMenuItem className="gap-2 cursor-pointer">
                      <User className="w-4 h-4" />
                      Meu Perfil
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem className="gap-2 cursor-pointer">
                    <Settings className="w-4 h-4" />
                    Configuracoes
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={logout}
                    className="gap-2 text-destructive focus:text-destructive cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    Sair
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
                    {navItems.map((item) => {
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
                      Meu Perfil
                    </Link>
                    <button
                      onClick={logout}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-destructive hover:bg-destructive/10 transition-colors w-full text-left"
                    >
                      <LogOut className="w-5 h-5" />
                      Sair
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
            {navItems.map((item) => {
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
