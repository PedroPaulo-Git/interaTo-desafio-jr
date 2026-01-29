FROM node:20-alpine

WORKDIR /app

# We assume volume mounting of the whole monorepo for dev

CMD ["npm", "run", "dev", "--workspace=apps/frontend"]
