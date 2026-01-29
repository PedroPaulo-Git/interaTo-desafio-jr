# Petshop Challenge - Running Instructions

## Prerequisites

- Node.js 18+
- Docker & Docker Compose

## Setup

1. **Install Dependencies**
   Run the following command in the root directory to install all dependencies for backend, frontend, and shared packages:

   ```bash
   npm install
   ```

2. **Environment Variables**
   The project is configured to work with default Docker values.
   If you need to customize, look at `docker-compose.yml`.

3. **Generate Prisma Client**
   Initialize the Prisma Client for the backend:
   ```bash
   npm run prisma:generate -w apps/backend
   ```

## Running the Application

To start the Database, Backend, and Frontend:

```bash
docker compose up
```

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:3333
- **Database**: localhost:5432 (user: user, pass: password)

## Development Info

- **Monorepo**: This project uses NPM Workspaces.
- **Backend**: NestJS with Prisma, implementing DDD and Repository Pattern.
- **Frontend**: Next.js 14+ with App Router, Shadcn/UI, and TailwindCSS.
- **Shared**: Zod schemas and TypeScript interfaces shared between apps.

## Database Migrations

During development, if you change `schema.prisma`, run:

```bash
npx prisma migrate dev --schema=apps/backend/prisma/schema.prisma
```
