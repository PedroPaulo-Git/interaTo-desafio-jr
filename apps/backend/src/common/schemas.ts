import { z } from 'zod';

const phoneRegex = /^(\+55|55)?\s?(\(?[1-9]{2}\)?)?\s?(9?\d{4})[-.\\s]?(\d{4})$/;

/**
 * User Role Enum
 * Currently only 'USER' is needed, but designed for extensibility (e.g. ADMIN).
 */
export const RoleSchema = z.enum(['USER', 'ADMIN']);

/**
 * User Schema
 * Represents the authenticated user (Owner of the pet).
 */
export const UserSchema = z.object({
    id: z.string().uuid().optional(),
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters").optional(), // Optional on reads/listings
    contact: z.string().regex(phoneRegex, "Contact must be in valid Brazilian format (e.g. 11 99999-9999)"),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
});

export type User = z.infer<typeof UserSchema>;

export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});
export type LoginDTO = z.infer<typeof LoginSchema>;

export const RegisterSchema = UserSchema.omit({ id: true, createdAt: true, updatedAt: true });
export type RegisterDTO = z.infer<typeof RegisterSchema>;

/**
 * Animal Type Enum
 */
export const AnimalTypeSchema = z.enum(['CAT', 'DOG']);
export type AnimalType = z.infer<typeof AnimalTypeSchema>;

/**
 * Animal Schema
 */
export const AnimalSchema = z.object({
    id: z.string().uuid().optional(),
    name: z.string().min(1, "Name is required"),
    age: z.coerce.number().int().nonnegative("Age must be a positive integer"),
    type: AnimalTypeSchema,
    breed: z.string().min(1, "Breed is required"),
    ownerId: z.string().uuid().optional(),

    // These fields might be populated from the User relation, or stored if denormalized validation is needed.
    // For the DTO/Response, we often include them.
    ownerName: z.string().min(1, "Owner name is required"),
    ownerContact: z.string().regex(phoneRegex, "Owner contact must be in valid Brazilian format (e.g. 11 99999-9999)"),

    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
});

export type Animal = z.infer<typeof AnimalSchema>;

export const CreateAnimalSchema = AnimalSchema.omit({
    id: true,
    ownerId: true,
    createdAt: true,
    updatedAt: true
});
export type CreateAnimalDTO = z.infer<typeof CreateAnimalSchema>;

export const UpdateAnimalSchema = CreateAnimalSchema.partial();
export type UpdateAnimalDTO = z.infer<typeof UpdateAnimalSchema>;
