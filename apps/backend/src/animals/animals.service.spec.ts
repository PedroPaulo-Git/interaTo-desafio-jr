
import { Test, TestingModule } from '@nestjs/testing';
import { AnimalsService } from './animals.service';
import { PrismaService } from '../prisma/prisma.service';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { AnimalType } from '@prisma/client';

const mockPrismaService = {
    animal: {
        create: jest.fn(),
        findMany: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    },
};

describe('AnimalsService', () => {
    let service: AnimalsService;
    let prisma: PrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AnimalsService,
                { provide: PrismaService, useValue: mockPrismaService },
            ],
        }).compile();

        service = module.get<AnimalsService>(AnimalsService);
        prisma = module.get<PrismaService>(PrismaService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('findAll', () => {
        it('should return all animals (Read-All Security Rule)', async () => {
            const result = [{ id: '1', name: 'Rex' }];
            mockPrismaService.animal.findMany.mockResolvedValue(result);

            expect(await service.findAll()).toBe(result);
        });
    });

    describe('update', () => {
        it('should update animal if owner matches (Write-Own Security Rule)', async () => {
            const animal = { id: '1', ownerId: 'user1' };
            mockPrismaService.animal.findUnique.mockResolvedValue(animal);
            mockPrismaService.animal.update.mockResolvedValue({ ...animal, name: 'Updated' });

            const dto = {
                name: 'Updated',
                age: 5,
                type: AnimalType.DOG,
                breed: 'Lab',
                ownerName: 'John',
                ownerContact: '123',
            };

            expect(await service.update('1', dto, 'user1')).toEqual({ ...animal, name: 'Updated' });
        });

        it('should throw ForbiddenException if owner does not match', async () => {
            const animal = { id: '1', ownerId: 'user1' };
            mockPrismaService.animal.findUnique.mockResolvedValue(animal);

            const dto = {
                name: 'Updated',
                age: 5,
                type: AnimalType.DOG,
                breed: 'Lab',
                ownerName: 'John',
                ownerContact: '123',
            };

            await expect(service.update('1', dto, 'user2')).rejects.toThrow(ForbiddenException);
        });

        it('should throw NotFoundException if animal not found', async () => {
            mockPrismaService.animal.findUnique.mockResolvedValue(null);

            const dto = {
                name: 'Updated',
                age: 5,
                type: AnimalType.DOG,
                breed: 'Lab',
                ownerName: 'John',
                ownerContact: '123',
            };

            await expect(service.update('999', dto, 'user1')).rejects.toThrow(NotFoundException);
        });
    });
});
