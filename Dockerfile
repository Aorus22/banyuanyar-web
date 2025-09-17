# 1. Install Stage
FROM oven/bun:alpine AS deps
WORKDIR /app

COPY package.json bun.lock* ./
RUN bun install --frozen-lockfile

# 2. Build Stage
FROM oven/bun:alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN bunx prisma generate
RUN bun run build

# 3. Runner Stage
FROM oven/bun:alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
EXPOSE 3000

RUN bun add @prisma/client

COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/package.json ./
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma

CMD ["bun", "start"]

# 3. Runner Stage - Standalone Deployment
# Uncomment this section if you want to use standalone mode
# Remember to also uncomment `output: 'standalone'` in next.config.ts

# FROM oven/bun:alpine AS runner-standalone
# WORKDIR /app
# 
# ENV NODE_ENV=production
# EXPOSE 3000
# 
# RUN bun add @prisma/client
# 
# COPY --from=builder /app/.next/standalone ./
# COPY --from=builder /app/node_modules/next ./node_modules/next
# COPY --from=builder /app/public ./public
# COPY --from=builder /app/.next/static ./.next/static
# COPY --from=builder /app/prisma ./prisma
# 
# CMD ["bun", "start"]