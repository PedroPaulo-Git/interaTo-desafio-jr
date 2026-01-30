
import { createZodDto } from 'nestjs-zod';
import { CreateAnimalSchema, AnimalType as AnimalTypeEnum } from '../../common/schemas';
import { ApiProperty } from '@nestjs/swagger';

enum AnimalType {
    CAT = 'CAT',
    DOG = 'DOG',
}

export class CreateAnimalDto extends createZodDto(CreateAnimalSchema) {
    @ApiProperty({ example: 'Rex', description: 'Name of the animal' })
    declare name: string;

    @ApiProperty({ example: 5, description: 'Age of the animal' })
    declare age: number;

    @ApiProperty({ enum: AnimalType, example: 'DOG', description: 'Type of the animal' })
    declare type: AnimalType;

    @ApiProperty({ example: 'Golden Retriever', description: 'Breed of the animal' })
    declare breed: string;

    @ApiProperty({ example: 'John Doe', description: 'Name of the owner' })
    declare ownerName: string;

    @ApiProperty({ example: '+5581987730575', description: 'Contact info of the owner' })
    declare ownerContact: string;
}

export class UpdateAnimalDto extends CreateAnimalDto { }
