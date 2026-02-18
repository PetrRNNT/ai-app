# Build stage
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY prisma ./prisma
COPY . .
RUN npm run build

# Production stage
FROM node:22-alpine AS production

WORKDIR /app

RUN apk add --no-cache openssl

COPY package*.json ./
RUN npm ci --only=production

COPY --from=builder /app/.output ./.output
COPY prisma ./prisma

RUN mkdir -p /app/prisma

EXPOSE 3000

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000
ENV DATABASE_URL=file:/app/prisma/prod.db

# Generate Prisma Client and copy to .output/server
CMD ["sh", "-c", "npx prisma generate && cp -r node_modules/.prisma .output/server/node_modules/ && cp -r node_modules/@prisma .output/server/node_modules/ && npx prisma db push --accept-data-loss && node .output/server/index.mjs"]
