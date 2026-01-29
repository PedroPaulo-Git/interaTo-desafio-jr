
import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    Query,
    Req,
} from '@nestjs/common';
import { AnimalsService } from './animals.service';
import { CreateAnimalDto, UpdateAnimalDto } from './dto/animal.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';

interface AuthenticatedRequest extends Request {
    user: {
        userId: string;
        email: string;
    };
}

@ApiTags('animals')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('animals')
export class AnimalsController {
    constructor(private readonly animalsService: AnimalsService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new animal' })
    @ApiResponse({ status: 201, description: 'Animal successfully created' })
    create(@Body() createAnimalDto: CreateAnimalDto, @Req() req: AuthenticatedRequest) {
        return this.animalsService.create(createAnimalDto, req.user.userId);
    }

    @Get()
    @ApiOperation({ summary: 'Get all animals' })
    @ApiQuery({ name: 'q', required: false, description: 'Search by animal name or owner name' })
    @ApiResponse({ status: 200, description: 'List of all animals' })
    findAll(@Query('q') query: string) {
        return this.animalsService.findAll(query);
    }

    @Get('stats')
    @ApiOperation({ summary: 'Get animal statistics' })
    @ApiResponse({ status: 200, description: 'Return statistics about the animals' })
    getStats() {
        return this.animalsService.getStats();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a specific animal' })
    @ApiResponse({ status: 200, description: 'The animal details' })
    @ApiResponse({ status: 404, description: 'Animal not found' })
    findOne(@Param('id') id: string) {
        return this.animalsService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update an animal' })
    @ApiResponse({ status: 200, description: 'Animal successfully updated' })
    @ApiResponse({ status: 403, description: 'Forbidden: You do not own this animal' })
    @ApiResponse({ status: 404, description: 'Animal not found' })
    update(@Param('id') id: string, @Body() updateAnimalDto: UpdateAnimalDto, @Req() req: AuthenticatedRequest) {
        return this.animalsService.update(id, updateAnimalDto, req.user.userId);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete an animal' })
    @ApiResponse({ status: 200, description: 'Animal successfully deleted' })
    @ApiResponse({ status: 403, description: 'Forbidden: You do not own this animal' })
    @ApiResponse({ status: 404, description: 'Animal not found' })
    remove(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
        return this.animalsService.remove(id, req.user.userId);
    }
}
