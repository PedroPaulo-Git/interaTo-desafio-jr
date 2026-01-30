# InteraTo Backend

Backend API for the InteraTo Petshop Challenge, built with NestJS, Prisma, and PostgreSQL.

## 🚀 Quick Start

### Local Development

```bash
# From the root of the monorepo
npm install

# Generate Prisma Client
cd apps/backend && npx prisma generate && cd ../..

# Run in development mode
npm run dev:backend

# Access: http://localhost:3333
# Swagger: http://localhost:3333/api
```

### Docker

```bash
# From the root of the monorepo
npm run docker:up

# Access: http://localhost:3333
# Swagger: http://localhost:3333/api
```

## 📁 Project Structure

```
apps/backend/
├── src/
│   ├── animals/           # Animals module (CRUD)
│   │   ├── dto/           # Data Transfer Objects
│   │   ├── animals.controller.ts
│   │   ├── animals.service.ts
│   │   └── animals.module.ts
│   ├── auth/              # Authentication module
│   │   ├── dto/           # Login/Register DTOs
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── jwt.strategy.ts
│   │   └── auth.module.ts
│   ├── common/            # Shared utilities
│   │   ├── schemas.ts     # Zod validation schemas
│   │   ├── base.entity.ts
│   │   └── base.repository.ts
│   ├── prisma/            # Prisma module
│   ├── app.module.ts      # Root module
│   └── main.ts            # Entry point
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── migrations/        # Database migrations
├── Dockerfile             # Docker build configuration
└── tsconfig.json          # TypeScript configuration
```

## 🔧 Configuration

Environment variables (see `.env.example`):

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/interato"
JWT_SECRET="your-secret-key"
PORT=3333
```

## 📚 API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login and get JWT token

### Animals (Protected - requires JWT)
- `GET /animals` - List all animals
- `GET /animals/:id` - Get animal by ID
- `GET /animals/stats` - Get animal statistics
- `POST /animals` - Create a new animal
- `PATCH /animals/:id` - Update animal (owner only)
- `DELETE /animals/:id` - Delete animal (owner only)

## 🛡️ Validation

All validation schemas are centralized in `src/common/schemas.ts` using Zod:

- `LoginSchema` - Email and password validation
- `RegisterSchema` - User registration validation
- `CreateAnimalSchema` - Animal creation validation
- `UpdateAnimalSchema` - Animal update validation

## 🐳 Docker

The backend uses a multi-stage Docker build for optimized image size:

1. **Base** - Node.js Alpine with Turbo
2. **Builder** - Prunes the monorepo for the backend
3. **Installer** - Installs dependencies and builds
4. **Runner** - Minimal production image

The entrypoint is: `CMD ["node", "apps/backend/dist/src/main"]`

## 📝 Available Scripts

```bash
npm run dev          # Start in watch mode
npm run build        # Build for production
npm run start:prod   # Run production build
npm run lint         # Run ESLint
npm run test         # Run unit tests
npm run test:e2e     # Run E2E tests
npm run prisma:generate  # Generate Prisma Client
npm run prisma:migrate   # Run database migrations
```

## 🔐 Security

- JWT-based authentication
- Password hashing with bcrypt
- Owner-only access control for edit/delete operations
- Zod validation on all inputs
- CORS enabled

## License

MIT
