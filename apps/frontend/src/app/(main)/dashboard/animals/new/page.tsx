'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, PawPrint, Camera, Dog, Cat, User, Phone, Save, X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
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
import { animalSchema, AnimalForm } from '@/lib/schemas'
import Image from 'next/image'

export default function NewAnimalPage() {
    const router = useRouter()
    const { token, user } = useAuth()
    const [isLoading, setIsLoading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    // Image state is separate from form because it's not in the schema (yet)
    const [imageUrl, setImageUrl] = useState('')

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
        reset
    } = useForm<AnimalForm>({
        resolver: zodResolver(animalSchema),
        defaultValues: {
            name: '',
            age: 1,
            breed: '',
            ownerName: user?.name || '',
            ownerContact: user?.phone || '',
        }
    })

    // Update default values when user loads
    useEffect(() => {
        if (user) {
            reset({
                name: '',
                age: 1,
                breed: '',
                ownerName: user.name,
                ownerContact: user.phone || '',
            })
        }
    }, [user, reset])

    const watchedType = watch('type')

    // Handle Image Selection
    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                toast.error('A imagem deve ter no maximo 5MB')
                return
            }

            const objectUrl = URL.createObjectURL(file)
            setImageUrl(objectUrl)
        }
    }

    const handleRemoveImage = (e: React.MouseEvent) => {
        e.stopPropagation()
        setImageUrl('')
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
    }

    const onSubmit = async (data: AnimalForm) => {
        if (!token) return

        setIsLoading(true)

        try {
            await animalsApi.create(token, {
                name: data.name,
                age: Number(data.age),
                type: data.type as AnimalType,
                breed: data.breed,
                ownerName: data.ownerName,
                ownerContact: data.ownerContact,
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

    const PetIcon = watchedType === 'DOG' ? Dog : watchedType === 'CAT' ? Cat : PawPrint

    return (
        <div className="min-h-full">
            <motion.div
                className="px-6 md:px-10 py-6 bg-linear-to-br from-accent/5 via-secondary to-primary/5 dark:from-background dark:via-background dark:to-background border-b border-transparent dark:border-border/50 text-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                <div className="flex items-center gap-3">
                    <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-xl">
                        <ArrowLeft className="w-5 h-5" />
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
                className="px-6 md:px-10 py-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                <Card className="border-0 shadow-lg rounded-3xl overflow-hidden">
                    <CardHeader className="pb-4 bg-card/50">
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
                    <CardContent className="pt-6">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

                            {/* Pet Info & Image Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                                {/* Left Column: Form Fields */}
                                <div className="space-y-5">
                                    <div className="space-y-2">
                                        <Label htmlFor="name" className="flex items-center gap-2">
                                            <PawPrint className="w-4 h-4 text-muted-foreground" />
                                            Nome do Animal
                                        </Label>
                                        <Input
                                            id="name"
                                            placeholder="Ex: Rex, Mimi..."
                                            className={`h-12 rounded-xl ${errors.name ? 'border-destructive' : ''}`}
                                            disabled={isLoading}
                                            {...register('name')}
                                        />
                                        {errors.name && <p className="text-xs text-destructive ml-1">{errors.name.message}</p>}
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="type">Tipo</Label>
                                            <Select
                                                onValueChange={(value: AnimalType) => setValue('type', value, { shouldValidate: true })}
                                                disabled={isLoading}
                                            >
                                                <SelectTrigger className={`h-12 rounded-xl ${errors.type ? 'border-destructive' : ''}`}>
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
                                            {errors.type && <p className="text-xs text-destructive ml-1">{errors.type.message}</p>}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="age">Idade (anos)</Label>
                                            <Input
                                                id="age"
                                                type="number"
                                                min="0"
                                                max="30"
                                                placeholder="Ex: 3"
                                                className={`h-12 rounded-xl ${errors.age ? 'border-destructive' : ''}`}
                                                disabled={isLoading}
                                                {...register('age')}
                                            />
                                            {errors.age && <p className="text-xs text-destructive ml-1">{errors.age.message}</p>}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="breed">Raca</Label>
                                        <Input
                                            id="breed"
                                            placeholder="Ex: Golden Retriever"
                                            className={`h-12 rounded-xl ${errors.breed ? 'border-destructive' : ''}`}
                                            disabled={isLoading}
                                            {...register('breed')}
                                        />
                                        {errors.breed && <p className="text-xs text-destructive ml-1">{errors.breed.message}</p>}
                                    </div>
                                </div>

                                {/* Right Column: Image Upload */}
                                <div className="flex flex-col gap-2">
                                    <Label>Foto do Pet</Label>
                                    <div
                                        onClick={() => fileInputRef.current?.click()}
                                        className={`
                      relative w-full aspect-square md:aspect-auto md:h-full min-h-[250px] 
                      rounded-2xl border-2 border-dashed transition-all cursor-pointer overflow-hidden group
                      ${imageUrl
                                                ? 'border-primary/50 bg-secondary/30'
                                                : 'border-border bg-secondary/20 hover:bg-secondary/40 hover:border-primary/50'
                                            }
                    `}
                                    >
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            className="hidden"
                                            accept="image/*"
                                            onChange={handleImageSelect}
                                        />

                                        {imageUrl ? (
                                            <>
                                                <Image
                                                    src={imageUrl}
                                                    alt="Preview"
                                                    fill
                                                    className="object-cover"
                                                />
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                    <p className="text-white font-medium flex items-center gap-2">
                                                        <Camera className="w-5 h-5" />
                                                        Alterar foto
                                                    </p>
                                                </div>
                                                <Button
                                                    type="button"
                                                    variant="destructive"
                                                    size="icon"
                                                    className="absolute top-2 right-2 rounded-full w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity"
                                                    onClick={handleRemoveImage}
                                                >
                                                    <X className="w-4 h-4" />
                                                </Button>
                                            </>
                                        ) : (
                                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-muted-foreground">
                                                <div className="w-16 h-16 rounded-full bg-background/80 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                                                    <Camera className="w-8 h-8 text-primary/80" />
                                                </div>
                                                <div className="text-center px-4">
                                                    <p className="font-medium text-foreground">Clique para adicionar foto</p>
                                                    <p className="text-xs mt-1">JPG, PNG ate 5MB</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                            </div>

                            {/* Owner Section */}
                            <div className="pt-6 border-t border-border">
                                <h3 className="font-semibold text-foreground mb-4">Dados do Tutor</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="ownerName" className="flex items-center gap-2">
                                            <User className="w-4 h-4 text-muted-foreground" />
                                            Nome do Tutor
                                        </Label>
                                        <Input
                                            id="ownerName"
                                            placeholder="Nome completo"
                                            className={`h-12 rounded-xl ${errors.ownerName ? 'border-destructive' : ''}`}
                                            disabled={isLoading}
                                            {...register('ownerName')}
                                        />
                                        {errors.ownerName && <p className="text-xs text-destructive ml-1">{errors.ownerName.message}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="ownerContact" className="flex items-center gap-2">
                                            <Phone className="w-4 h-4 text-muted-foreground" />
                                            Contato do Tutor
                                        </Label>
                                        <Input
                                            id="ownerContact"
                                            placeholder="(11) 99999-9999"
                                            className={`h-12 rounded-xl ${errors.ownerContact ? 'border-destructive' : ''}`}
                                            disabled={isLoading}
                                            {...register('ownerContact')}
                                        />
                                        {errors.ownerContact && <p className="text-xs text-destructive ml-1">{errors.ownerContact.message}</p>}
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end pt-4">
                                <Button
                                    type="submit"
                                    size="lg"
                                    className="w-full md:w-auto min-w-[200px] h-12 rounded-xl text-base font-semibold gap-2"
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
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    )
}
