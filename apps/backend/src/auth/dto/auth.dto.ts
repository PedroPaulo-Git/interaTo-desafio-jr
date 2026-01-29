
import { createZodDto } from 'nestjs-zod';
import { LoginSchema, RegisterSchema } from '@repo/shared';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto extends createZodDto(LoginSchema) {
    @ApiProperty({ example: 'user@example.com', description: 'User email' })
    email: string;

    @ApiProperty({ example: 'password123', description: 'User password' })
    password: string;
}

export class RegisterDto extends createZodDto(RegisterSchema) {
    @ApiProperty({ example: 'John Doe', description: 'User full name' })
    name: string;

    @ApiProperty({ example: 'user@example.com', description: 'User email' })
    email: string;

    @ApiProperty({ example: 'password123', description: 'User password' })
    password: string;

    @ApiProperty({ example: '+5581987730575', description: 'User contact info (Brazilian format)' })
    contact: string;
}
