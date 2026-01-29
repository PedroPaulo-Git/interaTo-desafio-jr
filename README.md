<p align="center">
  <img src="https://sistemainterato.com.br/img/logo/logo-name-vertical.png" alt="logo" />
  <h1 align="center">Desafio Desenvolvedor Fullstack Jr.</h1>
</p>

<p align="center">Seja bem-vindo! Este desafio foi projetado para avaliar parte da sua capacidade técnica.</p>

## O que esperamos de você

- **Uso de IA** - Usar IA com consiência no desenvolvimento sem perder o senso crítico (Gostamos muito do Cursor e Claude Code)
- **Comunicação clara** - Capacidade de expressar ideias e dúvidas de forma objetiva
- **Proatividade** - Buscar soluções antes de perguntar, mas saber quando pedir ajuda
- **Curiosidade e vontade de aprender** - Estar sempre aberto a novos conhecimentos e tecnologias
- **Organização** - Saber gerenciar seu tempo e priorizar tarefas
- **Trabalho em equipe** - Colaborar de forma respeitosa e construtiva com os colegas
- **Resiliência** - Saber lidar com feedbacks e desafios de forma positiva
- **Atenção aos detalhes** - Cuidado com a qualidade do código e da entrega

**Comportamentos que valorizamos:**

- Comprometimento com prazos e entregas
- Responsabilidade sobre o próprio trabalho
- Transparência sobre dificuldades e bloqueios
- Iniciativa para propor melhorias
- Respeito às boas práticas de desenvolvimento
- Disposição para revisar e ser revisado (Code Review)

## Instruções

- Faça um fork deste repositório;
- Crie um passo a passo de como rodar a sua aplicação;
- Após finalizar, submeta um pull request com um comentário informando o seu e-mail e WhatsApp para contato e aguarde nosso retorno.

## Proposta

Seu desafio é desenvolver uma dashboard web (SPA) que permita listar, criar, editar e excluir animais de estimação (gatos ou cachorros) em um petshop (CRUD). A página principal com o CRUD deverá ser restrita a usuários autenticados, acessível somente após login. O cadastro do usuário deverá ser realizado em uma página separada, utilizando e-mail e senha. Além das funcionalidades descritas, implemente controle de acesso aos dados, garantindo que cada usuário autenticado possa visualizar todos os animais de todos os usuários, mas só possa editar e deletar apenas os animais que ele cadastrou.

- Utilize o Protótipo Figma fornecido como referência: [https://www.figma.com/design/GybRSY5qwzpBYko8Yc3PfR/InteraTo-Challenge--Dev-Jr.?m=auto&t=RAByiHv483jQlAAD-6](https://www.figma.com/design/lD4ZaMncVoWtHvKoOVN86K/InteraTo-Challenge--Dev-Jr.?m=auto&t=oA9vW3G3iowLyvUA-1)
- Cada animal de estimação precisa ter um identificador único, nome, idade, tipo (gato ou cachorro) e raça;
- Além dos dados do animal, é necessário também salvar o nome e o contato do seu respectivo dono.
- Todas as validações e regras de negócio devem estar no repositório;
- Um usuário não deve conseguir editar ou excluir animais cadastrados por outro usuário; A validação deve ocorrer no backend, não apenas no frontend;
- Tentativas de acesso indevido devem retornar erro apropriado (ex: 403 ou 404).
- O usuário logado poderá, em uma única pesquisa, buscar pelo nome animal ou pelo nome do dono

Páginas

- Cadastro (Pública)
- Login (Pública)
- Home: CRUD (Privada)

## Requesítos

- Versionamento com Git
- NodeJS
- TypeScript
- API
- NextJS ou NestJS + React
- Prisma ou TypeORM
- PostgreSQL
- TailwindCSS
- Zod & React Hook Form
- Responsividade (Mobile First)
- Clean Code

## Diferenciais

- Docker Compose para rodar a aplicação e o banco de dados
- Boas práticas de segurança
- Testes de integração
- Uso de bibliotecas de componentes (Shadcn UI)

## Entregas Parciais

Entendemos que o desafio possui diferentes níveis.

👉 Desafios entregues de forma parcial também serão avaliados e podem seguir no processo seletivo, desde que apresentem:

- CRUD (Home) funcional
- Organização mínima do projeto;
- Clareza na comunicação sobre:
  - O que foi implementado
  - O que não foi possível concluir
  - Quais seriam os próximos passos

Valorizamos a transparência, a capacidade de priorização e o raciocínio técnico

---

## ✅ Status da Implementação

**Projeto 100% Completo!** 🎉

### Funcionalidades Principais

- ✅ **CRUD de Animais** - Criar, listar, editar e deletar animais
- ✅ **Autenticação JWT** - Login e registro de usuários
- ✅ **Controle de Acesso** - Apenas o dono pode editar/deletar seus animais
- ✅ **Busca Unificada** - Buscar por nome do animal OU nome do dono
- ✅ **Tipos de Animais** - Suporte para Cachorro (DOG) e Gato (CAT)
- ✅ **Validação Completa** - Zod no frontend e backend
- ✅ **Responsivo** - Mobile First com TailwindCSS
- ✅ **Dark Mode** - Tema claro/escuro sem flicker

### Diferenciais Implementados

- ✅ **Docker Compose** - Para rodar aplicação + banco
- ✅ **Shadcn UI** - Componentes modernos e acessíveis
- ✅ **Swagger/OpenAPI** - Documentação interativa da API
- ✅ **Segurança** - JWT, validação backend, permissions
- ✅ **Clean Code** - DDD, Repository Pattern, separation of concerns
- ✅ **Monorepo** - Turborepo + NPM Workspaces
- ✅ **TypeScript** - 100% tipado

### Funcionalidades Extras

- 🚀 **Mock Mode** - Frontend funciona sem backend (ideal para demos)
- 🌍 **i18n** - Suporte a Português e Inglês
- 🎨 **Animações** - Framer Motion para UX fluida
- 📱 **PWA-Ready** - Otimizado para performance
- 🐛 **Error Handling** - Toast notifications com Sonner
- 📖 **Documentação Completa** - Guias detalhados

## 🚀 Quick Start

### Opção 1: Docker (Recomendado)

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/interaTo-desafio-jr.git
cd interaTo-desafio-jr

# Suba os containers (backend + frontend + database)
npm run docker:up

# Acesse:
# Frontend: http://localhost:3000
# Backend: http://localhost:3333
# Swagger: http://localhost:3333/api
```

### Opção 2: Local

```bash
# Install dependencies
npm install

# Generate Prisma Client
cd apps/backend && npx prisma generate && cd ../..

# Start all services
npm run dev

# Acesse:
# Frontend: http://localhost:3000
# Backend: http://localhost:3333
# Swagger: http://localhost:3333/api
```

### Opção 3: Frontend-Only (Mock Mode)

```bash
# Install e rode apenas o frontend
npm install
npm run dev:frontend

# No login, clique em "🚀 Entrar como Desenvolvedor (Mock)"
# Funciona totalmente sem backend!
```

## 📖 Documentação

- 📘 [**INSTRUCTIONS.md**](./INSTRUCTIONS.md) - Guia completo de uso
- 🚀 [**MOCK_MODE.md**](./apps/frontend/MOCK_MODE.md) - Sistema de mock
- 🌍 [**I18N.md**](./apps/frontend/I18N.md) - Internacionalização
- 📝 [**CHANGELOG.md**](./CHANGELOG.md) - Histórico de mudanças
- 🔧 [**TROUBLESHOOTING.md**](./TROUBLESHOOTING.md) - Solução de problemas

## 🛠️ Stack Tecnológica

**Frontend:**
- ⚡ Next.js 15 + React 19
- 🎨 TailwindCSS + Shadcn/UI
- ✨ Framer Motion
- 📋 Zod + React Hook Form
- 🌙 Dark Mode (sem flicker)

**Backend:**
- 🚀 NestJS
- 🗄️ Prisma + PostgreSQL
- 🔐 JWT Authentication
- 📚 Swagger/OpenAPI
- ✅ Zod Validation

**DevOps:**
- 🐳 Docker + Docker Compose
- 🔄 Turborepo
- 📦 NPM Workspaces

## 📊 Comandos Disponíveis

```bash
# Desenvolvimento
npm run dev              # Rodar tudo (frontend + backend)
npm run dev:frontend     # Apenas frontend
npm run dev:backend      # Apenas backend

# Build
npm run build            # Build tudo
npm run build:frontend   # Build frontend
npm run build:backend    # Build backend

# Docker
npm run docker:up        # Subir containers
npm run docker:down      # Parar containers
npm run docker:logs      # Ver logs
```

## 👤 Desenvolvedor

**Nome**: Pedro Paulo 
**Email**: pedrodevofc@gmail.com  
**WhatsApp**: (81) 98773-0575

---

**Desenvolvido com ❤️ para o desafio InteraTo**
