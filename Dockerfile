###################
# BASE
###################
FROM node:lts-alpine3.21 AS base

RUN apk add --no-cache libc6-compat

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Create app directory
WORKDIR /app

###################
# BUILD STAGE
###################
FROM base AS build

# Copy package files
COPY --chown=node:node package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc* ./
COPY --chown=node:node apps/web/package.json apps/web/package.json
COPY --chown=node:node packages/types/package.json packages/types/package.json


ENV NEXT_TELEMETRY_DISABLED=1

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm add sharp --filter diu-cgpa-web
COPY --chown=node:node . .

RUN pnpm build:types
RUN pnpm build:web

###################
# PRODUCTION STAGE
###################
FROM node:lts-alpine3.21 AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Copy only necessary files for production
COPY --from=build /app/apps/web/public ./apps/web/public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=build --chown=node:node /app/apps/web/.next/standalone ./
COPY --from=build --chown=node:node /app/apps/web/.next/static ./apps/web/.next/static
# COPY --from=build --chown=node:node /app/apps/web/.next/static ./static

COPY --chown=node:node .npmrc* ./

# Use a non-root user for security
USER node

ENV HOSTNAME="0.0.0.0"

# Start the application
CMD ["node", "/app/apps/web/server.js"]