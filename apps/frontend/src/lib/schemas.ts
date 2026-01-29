import { z } from 'zod'

export const loginSchema = z.object({
    email: z.string().email('E-mail inválido'),
    password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
})

export const registerSchema = z.object({
    name: z.string().min(2, 'O nome deve ter no mínimo 2 caracteres'),
    email: z.string().email('E-mail inválido'),
    phone: z.string()
        .min(10, 'O telefone deve ter no mínimo 10 dígitos')
        .max(15, 'O telefone deve ter no máximo 15 dígitos')
        // Regex for Brazilian phone: (XX) XXXXX-XXXX or XXXXXXXXXXX or +55...
        .regex(/^(\+55|55)?\s?(\(?[1-9]{2}\)?)?\s?(9?\d{4})[-.\s]?(\d{4})$/, 'Formato de telefone inválido (Ex: 11 99999-9999)'),
    password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
})

export const animalSchema = z.object({
    name: z.string().min(1, 'Nome é obrigatório'),
    type: z.enum(['DOG', 'CAT'], {
        errorMap: () => ({ message: 'Selecione o tipo do animal' })
    }),
    age: z.coerce.number().min(0, 'A idade deve ser um número positivo').max(30, 'Idade inválida'),
    breed: z.string().min(1, 'Raça é obrigatória'),
    ownerName: z.string().min(1, 'Nome do tutor é obrigatório'),
    ownerContact: z.string()
        .min(10, 'Contato inválido')
        .max(15, 'Contato inválido')
        .regex(/^(\+55|55)?\s?(\(?[1-9]{2}\)?)?\s?(9?\d{4})[-.\s]?(\d{4})$/, 'Formato de telefone inválido'),
})

export type LoginForm = z.infer<typeof loginSchema>
export type RegisterForm = z.infer<typeof registerSchema>
export type AnimalForm = z.infer<typeof animalSchema>
