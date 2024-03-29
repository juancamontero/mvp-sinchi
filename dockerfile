FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app


# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
# ENV PNPM_HOME=/usr/local/bin
RUN corepack enable pnpm && pnpm i --frozen-lockfile --prefer-offline

# Install sharp version which works on alpine
RUN pnpm install sharp@0.32.6

#


# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
# https://github.com/vercel/next.js/discussions/36935
# Uncomment the following line if there are permission issues with .next/cache directory
# RUN mkdir -p /app/.next/cache && chown nextjs:nodejs /app/.next/cache
RUN mkdir -p /app/.next/cache
# Persist the next cache in a volume
VOLUME ["/app/.next/cache"]
COPY . .
COPY --from=deps /app/node_modules ./node_modules


# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED 1


# RUN npx prisma migrate deploy
RUN npx prisma generate
RUN npx prisma migrate dev 
RUN corepack enable pnpm && pnpm run build:simple

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
# ENV NEXT_SHARP_PATH=/app/node_modules/sharp

# Uncomment the following line in case you want to disable telemetry during runtime.
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# COPY --chown=nextjs:nodejs prisma ./prisma/ 

USER nextjs

EXPOSE 3000
ENV PORT 3000

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
# CMD HOSTNAME="0.0.0.0" node server.js
CMD ["node", "server.js"]