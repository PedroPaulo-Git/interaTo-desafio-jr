# Petshop Challenge - Running Instructions

## Prerequisites

- Node.js 20+
- Docker & Docker Compose (optional, for containerized deployment)
- NPM 10+

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

### Full Stack (All Services)

**With Docker (Recommended for production-like environment):**
```bash
npm run docker:up
```

**Without Docker (Local development):**
```bash
npm run dev
```

### Individual Services

Run only frontend:
```bash
npm run dev:frontend
```

Run only backend:
```bash
npm run dev:backend
```

### Access Points

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:3333
- **Swagger Docs**: http://localhost:3333/api
- **Database**: localhost:5432 (user: user, pass: password)

## 🚀 Mock Mode (Frontend-Only Deployment)

The frontend includes a **Developer Mode** that works without a backend:

1. Click **"🚀 Entrar como Desenvolvedor (Mock)"** on the login page
2. All data is stored in localStorage
3. Perfect for demos and frontend-only deployments (e.g., Vercel)
4. **Logout** clears all mock data

📖 See [`apps/frontend/MOCK_MODE.md`](apps/frontend/MOCK_MODE.md) for more details.

## 🌍 Internationalization (i18n)

The app supports **Portuguese (pt-BR)** and **English (en-US)**:

- Language selector available in the UI (coming soon in menu)
- Translations are stored in `apps/frontend/src/lib/i18n.ts`
- Uses lightweight custom implementation (no heavy libraries)
- Persists language preference in localStorage

## 🐳 Docker Commands

```bash
# Start all services
npm run docker:up

# Stop all services
npm run docker:down

# View logs
npm run docker:logs
```

## Authentication (Swagger)

To test protected routes (like Creating or Updating Animals) on Swagger:

1.  **Register/Login**: Use the `Auth` endpoints (`/auth/register` or `/auth/login`).
2.  **Get Token**: Copy the `access_token` from the response.
3.  **Authorize**:
    - Click the green **Authorize** button at the top of the Swagger page.
    - Paste the token (just the code, e.g., `eyJhbG...`).
    - Click **Authorize** and then **Close**.
4.  **Test**: Now you can execute protected requests!

## Development Info

- **Monorepo**: This project uses NPM Workspaces + Turborepo.
- **Backend**: NestJS with Prisma, implementing DDD and Repository Pattern.
- **Frontend**: Next.js 15+ with App Router, Shadcn/UI, TailwindCSS, and Framer Motion.
- **Shared**: Zod schemas and TypeScript interfaces shared between apps.
- **Validation**: Zod schemas for both frontend (react-hook-form) and backend (nestjs-zod).
- **Theme**: Dark mode support with optimized transitions (no flicker).

## Database Migrations

During development, if you change `schema.prisma`, run:

```bash
npx prisma migrate dev --schema=apps/backend/prisma/schema.prisma
```

## Build for Production

```bash
# Build all apps
npm run build

# Build specific app
npm run build:frontend
npm run build:backend
```

## Deployment

### Frontend (Vercel - Recommended)
- Deploy `apps/frontend` directly to Vercel
- Works standalone with **Mock Mode**
- No backend required for demonstrations

### Backend (Docker)
```bash
docker build -f apps/backend/Dockerfile -t petshop-backend .
docker run -p 3333:3333 petshop-backend
```

### Full Stack
```bash
docker compose up --build
```

## Scripts Reference

| Command | Description |
|---------|-------------|
| `npm run dev` | Run all services (frontend + backend) |
| `npm run dev:frontend` | Run only frontend |
| `npm run dev:backend` | Run only backend |
| `npm run build` | Build all apps |
| `npm run build:frontend` | Build frontend |
| `npm run build:backend` | Build backend |
| `npm run docker:up` | Start Docker services |
| `npm run docker:down` | Stop Docker services |
| `npm run docker:logs` | View Docker logs |

## Tech Stack

**Frontend:**
- Next.js 15+
- React 19
- TypeScript
- TailwindCSS
- Shadcn/UI
- Framer Motion
- Zod + React Hook Form

**Backend:**
- NestJS
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Swagger/OpenAPI
- Zod Validation

**Infra:**
- Docker & Docker Compose
- Turborepo
- NPM Workspaces
