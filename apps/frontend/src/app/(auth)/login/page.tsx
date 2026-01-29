'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Cat, Eye, EyeOff, LogIn, Mail, Lock, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { ButtonSpinner } from '@/components/ui/loading-spinner'
import { useAuth } from '@/lib/auth/auth-context'
import { toast } from 'sonner'

export default function LoginPage() {
  const { login } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)
    
    try {
      await login(formData)
      toast.success('Login realizado com sucesso!')
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao fazer login'
      setError(message)
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
          className="h-2 bg-gradient-to-r from-primary via-primary/80 to-accent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        />
        <CardHeader className="text-center pb-2 pt-8">
          <motion.div 
            className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.3 }}
          >
            <Cat className="w-8 h-8 text-primary" />
          </motion.div>
          <CardTitle className="text-2xl font-bold text-foreground">
            Bem-vindo de volta!
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Entre na sua conta para gerenciar o petshop
          </CardDescription>
        </CardHeader>
        
        <CardContent className="px-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <motion.div
                className="flex items-center gap-2 p-3 rounded-xl bg-destructive/10 text-destructive text-sm"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </motion.div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-foreground">
                E-mail
              </Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="h-12 pl-12 rounded-xl border-border bg-secondary/50 focus:bg-card transition-colors"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-foreground">
                Senha
              </Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Digite sua senha"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="h-12 pl-12 rounded-xl border-border bg-secondary/50 focus:bg-card transition-colors pr-12"
                  required
                  disabled={isLoading}
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
            </div>

            <div className="flex items-center justify-end">
              <Link 
                href="/forgot-password" 
                className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
              >
                Esqueceu a senha?
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
                  Entrar
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
              <span className="bg-card px-4 text-muted-foreground">ou</span>
            </div>
          </div>
          
          <p className="text-center text-sm text-muted-foreground">
            Ainda nao tem uma conta?{' '}
            <Link 
              href="/register" 
              className="font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              Cadastre-se
            </Link>
          </p>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
