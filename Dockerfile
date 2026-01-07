# syntax=docker.io/docker/dockerfile:1

FROM node:lts-alpine AS base

FROM base AS builder

WORKDIR /app

COPY package.json package-lock.json*  ./

RUN npm ci

COPY src ./src

COPY public ./public

COPY env.d.ts .

COPY ymaps.d.ts .

COPY next.config.ts .

COPY tsconfig.json .

ARG SERVER_URL

ARG Y_MAP_API

ENV SERVER_URL=$SERVER_URL

ENV NEXT_PUBLIC_SERVER_URL=$SERVER_URL 

ENV NEXT_PUBLIC_Y_MAP_API_KEY=$Y_MAP_API

RUN npm run build

FROM base AS runner

WORKDIR /app

RUN addgroup --system --gid 1001 nodejs

RUN adduser --system --uid 1001 nextjs

USER nextjs

COPY --from=builder /app/public ./public

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./

COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

CMD ["node", "server.js"]