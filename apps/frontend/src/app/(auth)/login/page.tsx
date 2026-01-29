'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Eye, EyeOff, LogIn, Mail, Lock, AlertCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { ButtonSpinner } from '@/components/ui/loading-spinner'
import { useAuth } from '@/lib/auth/auth-context'
import { toast } from 'sonner'
import { loginSchema, LoginForm } from '@/lib/schemas'
import { useTranslation } from '@/lib/i18n'

export default function LoginPage() {
  const { login, loginAsDeveloper } = useAuth()
  const { t } = useTranslation()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true)
    try {
      await login(data)
      toast.success('Login realizado com sucesso!')
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao fazer login'
      toast.error(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border-0 shadow-2xl rounded-3xl overflow-hidden">
        <motion.div
          className="h-2 bg-linear-to-r from-primary via-primary/80 to-accent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        />
        <CardHeader className="text-center pb-2 pt-8">
          <motion.div
            className=" rounded-xl py-2 flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Image
              src="/img/LogoHigh.png"
              alt="Logo"
              className="w-48 -my-10"
              width={192}
              height={192}
              unoptimized
            />
          </motion.div>

          <CardTitle className="text-2xl font-bold text-foreground">
            {t('dashboard.welcome')}
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            {t('auth.loginDescription')}
          </CardDescription>
        </CardHeader>

        <CardContent className="px-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-foreground">
                {t('auth.email')}
              </Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  className={`h-12 pl-12 rounded-xl border-border bg-secondary/50 focus:bg-card transition-colors ${errors.email ? 'border-destructive' : ''}`}
                  disabled={isLoading}
                  {...register('email')}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-destructive flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-foreground">
                {t('auth.password')}
              </Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Digite sua senha"
                  className={`h-12 pl-12 rounded-xl border-border bg-secondary/50 focus:bg-card transition-colors pr-12 ${errors.password ? 'border-destructive' : ''}`}
                  disabled={isLoading}
                  {...register('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-destructive flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex items-center justify-end">
              <Link
                href="/forgot-password"
                className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
              >
                {t('auth.forgotPassword')}
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full h-12 rounded-xl text-base font-semibold bg-primary hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/25"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <ButtonSpinner />
                  Entrando...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <LogIn className="w-5 h-5" />
                  {t('auth.login')}
                </span>
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-4 px-8 pb-8">
          <div className="relative w-full">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-10 py-6 text-muted-foreground">{t('common.or')}</span>
            </div>
          </div>

          {/* MOCK: Botão para entrar como desenvolvedor */}
          <Button
            type="button"
            variant="outline"
            className="w-full h-11 rounded-xl text-sm border-dashed border-muted-foreground/30 hover:bg-secondary/50 dark:hover:text-primary/80"
            onClick={loginAsDeveloper}
          >
            🚀 {t('auth.loginDeveloper')}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            {t('auth.noAccount')}{' '}
            <Link
              href="/register"
              className="font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              {t('auth.register')}
            </Link>
          </p>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
