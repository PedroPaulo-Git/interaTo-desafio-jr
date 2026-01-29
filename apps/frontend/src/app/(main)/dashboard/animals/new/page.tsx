'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, PawPrint, Camera, Dog, Cat, User, Phone, Save } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ButtonSpinner } from '@/components/ui/loading-spinner'
import { useAuth } from '@/lib/auth/auth-context'
import { animalsApi } from '@/lib/api/animals-api'
import type { AnimalType } from '@/lib/types'
import { toast } from 'sonner'

export default function NewAnimalPage() {
  const router = useRouter()
  const { token, user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    age: 1,
    type: '' as AnimalType | '',
    breed: '',
    ownerName: user?.name || '',
    ownerContact: user?.phone || '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!token || !formData.type) {
      toast.error('Preencha todos os campos')
      return
    }

    setIsLoading(true)
    
    try {
      await animalsApi.create(token, {
        name: formData.name,
        age: formData.age,
        type: formData.type as AnimalType,
        breed: formData.breed,
        ownerName: formData.ownerName,
        ownerContact: formData.ownerContact,
      })
      
      toast.success('Animal cadastrado com sucesso!')
      router.push('/dashboard/animals')
    } catch (error) {
      toast.error('Erro ao cadastrar animal')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const PetIcon = formData.type === 'DOG' ? Dog : formData.type === 'CAT' ? Cat : PawPrint

  return (
    <div className="min-h-full">
      <motion.div 
        className="px-4 py-6 bg-gradient-to-br from-accent/5 via-secondary to-primary/5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" asChild className="rounded-xl">
            <Link href="/dashboard/animals">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-xl font-bold text-foreground">Cadastrar Animal</h1>
            <p className="text-sm text-muted-foreground">
              Adicione um novo pet ao sistema
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div 
        className="px-4 py-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="border-0 shadow-lg rounded-3xl">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <motion.div 
                className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
              >
                <PetIcon className="w-6 h-6 text-accent" />
              </motion.div>
              <div>
                <CardTitle className="text-lg">Dados do Animal</CardTitle>
                <CardDescription>Preencha as informacoes do pet</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Image Upload Placeholder */}
              <div className="relative w-full aspect-video rounded-2xl bg-secondary/50 border-2 border-dashed border-border overflow-hidden flex items-center justify-center cursor-pointer hover:bg-secondary/70 transition-colors">
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <Camera className="w-8 h-8" />
                  <p className="text-sm">Clique para adicionar foto</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="name" className="flex items-center gap-2">
                    <PawPrint className="w-4 h-4 text-muted-foreground" />
                    Nome do Animal
                  </Label>
                  <Input
                    id="name"
                    placeholder="Ex: Rex, Mimi..."
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="h-12 rounded-xl"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Tipo</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value: AnimalType) => setFormData({ ...formData, type: value })}
                    disabled={isLoading}
                  >
                    <SelectTrigger className="h-12 rounded-xl">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DOG">
                        <span className="flex items-center gap-2">
                          <Dog className="w-4 h-4" />
                          Cachorro
                        </span>
                      </SelectItem>
                      <SelectItem value="CAT">
                        <span className="flex items-center gap-2">
                          <Cat className="w-4 h-4" />
                          Gato
                        </span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="age">Idade (anos)</Label>
                  <Input
                    id="age"
                    type="number"
                    min="0"
                    max="30"
                    placeholder="Ex: 3"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                    className="h-12 rounded-xl"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="col-span-2 space-y-2">
                  <Label htmlFor="breed">Raca</Label>
                  <Input
                    id="breed"
                    placeholder="Ex: Golden Retriever"
                    value={formData.breed}
                    onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
                    className="h-12 rounded-xl"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <h3 className="font-semibold text-foreground mb-4">Dados do Tutor</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="ownerName" className="flex items-center gap-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      Nome do Tutor
                    </Label>
                    <Input
                      id="ownerName"
                      placeholder="Nome completo"
                      value={formData.ownerName}
                      onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                      className="h-12 rounded-xl"
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ownerContact" className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      Contato do Tutor
                    </Label>
                    <Input
                      id="ownerContact"
                      placeholder="(11) 99999-9999"
                      value={formData.ownerContact}
                      onChange={(e) => setFormData({ ...formData, ownerContact: e.target.value })}
                      className="h-12 rounded-xl"
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 rounded-xl text-base font-semibold gap-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <ButtonSpinner />
                    Cadastrando...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Cadastrar Animal
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
