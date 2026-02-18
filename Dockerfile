# Build stage
FROM node:22-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy prisma schema and generate client
COPY prisma ./prisma
RUN npx prisma generate

# Copy source and build
COPY . .
RUN npm run build

# Production stage
FROM node:22-alpine AS production

WORKDIR /app

# Install OpenSSL for Prisma
RUN apk add --no-cache openssl

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy Prisma schema and generate client
COPY prisma ./prisma
RUN npx prisma generate

# Copy built application from builder
COPY --from=builder /app/.output ./.output

# Create directory for database
RUN mkdir -p /app/prisma

EXPOSE 3000

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

CMD ["node", ".output/server/index.mjs"]
