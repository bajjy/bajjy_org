# bajjy.org — multi-stage build for Coolify
# Stage 1: install deps + build Vite frontend
# Stage 2: tiny prod image — node + dist + server

# ---------- builder ----------
FROM node:20-alpine AS builder

WORKDIR /app

# install deps (incl. dev — Vite is a devDependency)
COPY package.json package-lock.json* ./
RUN npm ci --no-audit --no-fund

# copy sources and build
COPY index.html vite.config.js ./
COPY client ./client
COPY public ./public
COPY src ./src
COPY content ./content
RUN npm run build

# prune dev deps so node_modules is small for the runtime stage
RUN npm prune --production

# ---------- runtime ----------
FROM node:20-alpine AS runtime

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

# tini for proper signal handling under Coolify
RUN apk add --no-cache tini wget

# bring over only what we need to serve
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/src ./src
COPY --from=builder /app/content ./content

EXPOSE 3000

# Coolify health probe will hit /health
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:3000/health || exit 1

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "src/app.js"]
