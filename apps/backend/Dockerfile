FROM node:20-alpine

WORKDIR /app

# We assume volume mounting of the whole monorepo for dev
# So we just define the command.
# Dependencies should be installed on host or via a startup script.

CMD ["npm", "run", "dev", "--workspace=apps/backend"]
