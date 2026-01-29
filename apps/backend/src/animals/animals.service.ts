
import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAnimalDto, UpdateAnimalDto } from './dto/animal.dto';
import { AnimalType } from '@prisma/client';

@Injectable()
export class AnimalsService {
    constructor(private prisma: PrismaService) { }

    async create(createAnimalDto: CreateAnimalDto, userId: string) {
        return this.prisma.animal.create({
            data: {
                ...createAnimalDto,
                type: createAnimalDto.type as AnimalType,
                ownerId: userId,
            },
        });
    }

    /**
     * Retrieves all animals, optionally filtering by a search query.
     *
     * @param query - The search string to filter animals by name or owner name (case-insensitive).
     * @returns A list of animals matching the criteria.
     *
     * **Security Note:**
     * This method returns ALL animals, visible to any authenticated user.
     * This aligns with the "Read: Authenticated users see ALL animals" requirement.
     *
     * **Performance Note:**
     * The search uses `mode: 'insensitive'`, which may have performance implications on very large datasets
     * if the database column is not properly indexed for case-insensitive search (e.g., using pg_trgm in PostgreSQL).
     * For the scope of this project, this tradeoff is acceptable for better UX.
     */
    async findAll(query?: string) {
        if (query) {
            return this.prisma.animal.findMany({
                where: {
                    OR: [
                        { name: { contains: query, mode: 'insensitive' } },
                        { ownerName: { contains: query, mode: 'insensitive' } },
                    ],
                },
            });
        }
        return this.prisma.animal.findMany();
    }

    async findOne(id: string) {
        const animal = await this.prisma.animal.findUnique({ where: { id } });
        if (!animal) {
            throw new NotFoundException(`Animal with ID ${id} not found`);
        }
        return animal;
    }

    /**
     * Updates an animal's details securely.
     *
     * @param id - The ID of the animal to update.
     * @param updateAnimalDto - The data to update.
     * @param userId - The ID of the authenticated user attempting the update.
     * @returns The updated animal record.
     * @throws ForbiddenException - If the authenticated user is NOT the owner of the animal.
     * @throws NotFoundException - If the animal does not exist.
     *
     * **Security Analysis:**
     * This method enforces the "Write-Own" policy. By checking `animal.ownerId !== userId` BEFORE
     * performing the update, we ensure that users cannot modify data they do not own.
     * This check is performed at the Service layer to centralize business rules and prevent
     * accidental bypass logic in Controllers.
     */
    async update(id: string, updateAnimalDto: UpdateAnimalDto, userId: string) {
        const animal = await this.findOne(id);

        if (animal.ownerId !== userId) {
            throw new ForbiddenException('You can only update animals that you own');
        }

        return this.prisma.animal.update({
            where: { id },
            data: {
                ...updateAnimalDto,
                type: updateAnimalDto.type as AnimalType,
            },
        });
    }

    /**
     * Deletes an animal securely.
     *
     * @param id - The ID of the animal to delete.
     * @param userId - The ID of the authenticated user attempting the deletion.
     * @returns The deleted animal record.
     * @throws ForbiddenException - If the authenticated user is NOT the owner of the animal.
     * @throws NotFoundException - If the animal does not exist.
     *
     * **Security Analysis:**
     * Similar to `update`, this enforces the "Delete-Own" policy.
     * The ownership check prevents unauthorized deletion of resources.
     */
    async remove(id: string, userId: string) {
        const animal = await this.findOne(id);

        if (animal.ownerId !== userId) {
            throw new ForbiddenException('You can only delete animals that you own');
        }

        return this.prisma.animal.delete({ where: { id } });
    }

    async getStats() {
        const [total, byType, avgAge] = await Promise.all([
            this.prisma.animal.count(),
            this.prisma.animal.groupBy({
                by: ['type'],
                _count: {
                    type: true,
                },
            }),
            this.prisma.animal.aggregate({
                _avg: {
                    age: true,
                },
            }),
        ]);

        const statsByType = byType.reduce((acc, curr) => {
            acc[curr.type] = curr._count.type;
            return acc;
        }, { DOG: 0, CAT: 0 });

        return {
            total,
            dogs: statsByType.DOG,
            cats: statsByType.CAT,
            avgAge: Math.round((avgAge._avg.age || 0) * 10) / 10,
        };
    }
}
