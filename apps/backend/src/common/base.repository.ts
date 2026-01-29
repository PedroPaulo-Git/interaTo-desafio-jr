/**
 * Interface for Base Repository
 */
export interface IBaseRepository<T> {
    findAll(params?: any): Promise<T[]>;
    findById(id: string): Promise<T | null>;
    create(data: any): Promise<T>;
    update(id: string, data: any): Promise<T>;
    delete(id: string): Promise<T>;
}

/**
 * Abstract Base Repository Implementation
 * 
 * Patterns used:
 * - Repository Pattern: Decouples business logic from data access.
 * - Template Method: Defines standard CRUD operations.
 * 
 * Note: We type `modelDelegate` as `any` here because Prisma's generated delegates
 * do not share a common interface that exposes findMany/findUnique etc. in a generic way 
 * compatible with TypeScript without complex mapped types.
 */
export abstract class BaseRepository<T, CreateDto, UpdateDto> implements IBaseRepository<T> {
    constructor(protected readonly modelDelegate: any) { }

    async findAll(params?: { skip?: number; take?: number; cursor?: any; where?: any; orderBy?: any }): Promise<T[]> {
        const { skip, take, cursor, where, orderBy } = params || {};
        return this.modelDelegate.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        });
    }

    async findById(id: string): Promise<T | null> {
        return this.modelDelegate.findUnique({
            where: { id },
        });
    }

    async create(data: CreateDto): Promise<T> {
        return this.modelDelegate.create({
            data,
        });
    }

    async update(id: string, data: UpdateDto): Promise<T> {
        return this.modelDelegate.update({
            where: { id },
            data,
        });
    }

    async delete(id: string): Promise<T> {
        return this.modelDelegate.delete({
            where: { id },
        });
    }
}
