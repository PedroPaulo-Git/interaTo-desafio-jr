
import { createZodDto } from 'nestjs-zod';
import { LoginSchema, RegisterSchema } from '../../common/schemas';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto extends createZodDto(LoginSchema) {
    @ApiProperty({ example: 'user@example.com', description: 'User email' })
    declare email: string;

    @ApiProperty({ example: 'password123', description: 'User password' })
    declare password: string;
}

export class RegisterDto extends createZodDto(RegisterSchema) {
    @ApiProperty({ example: 'John Doe', description: 'User full name' })
    declare name: string;

    @ApiProperty({ example: 'user@example.com', description: 'User email' })
    declare email: string;

    @ApiProperty({ example: 'password123', description: 'User password' })
    declare password: string;

    @ApiProperty({ example: '+5581987730575', description: 'User contact info (Brazilian format)' })
    declare contact: string;
}
