
import { createZodDto } from 'nestjs-zod';
import { CreateAnimalSchema } from '@repo/shared';
import { ApiProperty } from '@nestjs/swagger';

enum AnimalType {
    CAT = 'CAT',
    DOG = 'DOG',
}

export class CreateAnimalDto extends createZodDto(CreateAnimalSchema) {
    @ApiProperty({ example: 'Rex', description: 'Name of the animal' })
    name: string;

    @ApiProperty({ example: 5, description: 'Age of the animal' })
    age: number;

    @ApiProperty({ enum: AnimalType, example: 'DOG', description: 'Type of the animal' })
    type: AnimalType;

    @ApiProperty({ example: 'Golden Retriever', description: 'Breed of the animal' })
    breed: string;

    @ApiProperty({ example: 'John Doe', description: 'Name of the owner' })
    ownerName: string;

    @ApiProperty({ example: '+5581987730575', description: 'Contact info of the owner' })
    ownerContact: string;
}

export class UpdateAnimalDto extends CreateAnimalDto { }
