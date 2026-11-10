FROM node:24-bookworm AS base

WORKDIR /app

RUN npm install --global pnpm@12.18.0

FROM base AS builder

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

COPY tsconfig.json ./
# Prisma discovers this filename for both generation and migrations.
COPY prisma7.config.ts ./prisma.config.ts
COPY prisma ./prisma
COPY src ./src

RUN pnpm run build

FROM base AS runner

ENV NODE_ENV=production

COPY --from=builder /app/package.json /app/pnpm-lock.yaml /app/pnpm-workspace.yaml ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.ts ./prisma.config.ts
# The Compose startup command needs the local Prisma CLI and dotenv.
COPY --from=builder /app/node_modules ./node_modules

USER node

EXPOSE 3000

CMD ["pnpm", "start"]
