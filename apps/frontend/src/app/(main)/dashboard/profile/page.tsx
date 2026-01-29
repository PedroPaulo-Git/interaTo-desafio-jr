'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  Camera, 
  Save,
  Shield,
  Bell,
  Palette,
  ChevronRight,
  LogOut,
} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { ButtonSpinner } from '@/components/ui/loading-spinner'
import { useAuth } from '@/lib/auth/auth-context'
import { toast } from 'sonner'

export default function ProfilePage() {
  const { user, logout, updateUser } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  })

  const userInitials = user?.name
    ?.split(' ')
    .map(n => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase() || 'US'

  const memberSince = user?.createdAt 
    ? new Date(user.createdAt).toLocaleDateString('pt-BR', {
        month: 'long',
        year: 'numeric',
      })
    : 'Janeiro 2024'

  const handleSave = async () => {
    setIsSaving(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    if (user) {
      updateUser({
        ...user,
        name: formData.name,
        phone: formData.phone,
      })
    }
    
    setIsSaving(false)
    setIsEditing(false)
    toast.success('Perfil atualizado com sucesso!')
  }

  const settingsItems = [
    { icon: Bell, label: 'Notificacoes', description: 'Configurar alertas e lembretes' },
    { icon: Shield, label: 'Seguranca', description: 'Senha e autenticacao' },
    { icon: Palette, label: 'Aparencia', description: 'Tema e personalizacao' },
  ]

  return (
    <div className="min-h-full pb-8">
      {/* Header */}
      <motion.div 
        className="relative  from-primary/20 via-primary/10 to-accent/10 px-4 sm:pl-14 sm:py-4 py-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h1 className="text-xl font-bold text-foreground">Meu Perfil</h1>
        <p className="text-sm text-muted-foreground">Gerencie suas informacoes</p>
      </motion.div>

      {/* Profile Card */}
      <motion.div 
        className="px-10 "
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="rounded-3xl shadow-lg">
          <CardContent className="pt-6">
            {/* Avatar Section */}
            <div className="flex flex-col items-center -mt-16 mb-6">
              <div className="relative">
                <Avatar className="w-24 h-24 border-4 border-card shadow-lg">
                  <AvatarImage src={user?.avatarUrl || undefined} alt={user?.name} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">
                    {userInitials}
                  </AvatarFallback>
                </Avatar>
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <h2 className="mt-4 text-xl font-bold text-foreground">{user?.name}</h2>
              <p className="text-sm text-muted-foreground">Membro desde {memberSince}</p>
            </div>

            <Separator className="my-6" />

            {/* Form */}
            <div className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium flex items-center gap-2">
                  <User className="w-4 h-4 text-muted-foreground" />
                  Nome completo
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="h-12 rounded-xl"
                  disabled={!isEditing}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  E-mail
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  className="h-12 rounded-xl bg-secondary/50"
                  disabled
                />
                <p className="text-xs text-muted-foreground">O e-mail nao pode ser alterado</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium flex items-center gap-2">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  Telefone
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="h-12 rounded-xl"
                  disabled={!isEditing}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  Membro desde
                </Label>
                <Input
                  value={memberSince}
                  className="h-12 rounded-xl bg-secondary/50"
                  disabled
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                {isEditing ? (
                  <>
                    <Button
                      variant="outline"
                      className="flex-1 h-12 rounded-xl bg-transparent"
                      onClick={() => {
                        setIsEditing(false)
                        setFormData({
                          name: user?.name || '',
                          email: user?.email || '',
                          phone: user?.phone || '',
                        })
                      }}
                      disabled={isSaving}
                    >
                      Cancelar
                    </Button>
                    <Button
                      className="flex-1 h-12 rounded-xl gap-2"
                      onClick={handleSave}
                      disabled={isSaving}
                    >
                      {isSaving ? (
                        <>
                          <ButtonSpinner />
                          Salvando...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4" />
                          Salvar
                        </>
                      )}
                    </Button>
                  </>
                ) : (
                  <Button
                    className="w-full h-12 rounded-xl"
                    onClick={() => setIsEditing(true)}
                  >
                    Editar Perfil
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Settings */}
      <motion.div 
        className="px-10 mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="rounded-3xl">
          <CardHeader>
            <CardTitle className="text-lg">Configuracoes</CardTitle>
            <CardDescription>Gerencie suas preferencias</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {settingsItems.map((item) => {
              const Icon = item.icon
              return (
                <motion.button
                  key={item.label}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-secondary/50 transition-colors text-left"
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{item.label}</p>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </motion.button>
              )
            })}
          </CardContent>
        </Card>
      </motion.div>

      {/* Push Notifications Toggle */}
      <motion.div 
        className="px-10 mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="rounded-3xl">
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Bell className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Notificacoes Push</p>
                  <p className="text-sm text-muted-foreground">Receber alertas no dispositivo</p>
                </div>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Logout */}
      <motion.div 
        className="px-10 mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Button
          variant="destructive"
          className="w-full h-12 rounded-xl gap-2"
          onClick={logout}
        >
          <LogOut className="w-5 h-5" />
          Sair da conta
        </Button>
      </motion.div>
    </div>
  )
}
