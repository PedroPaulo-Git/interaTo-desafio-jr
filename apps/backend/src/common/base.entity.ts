/**
 * Base Entity
 * 
 * Ideally, Domain Entities should be decoupled from Database Entities (Prisma).
 * This class serves as the root for Domain Entities.
 */
export abstract class BaseEntity {
    id: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(props: Partial<BaseEntity>) {
        Object.assign(this, props);
    }
}
