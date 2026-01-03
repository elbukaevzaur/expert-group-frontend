FROM node:18-alpine AS builder

WORKDIR /app

# Set default environment variables (can be overridden by .env.production)
ENV NEXT_PUBLIC_API_URL=https://api.proeg.ru
ENV API_PROEG_KEY=e918d16ef6d889317a5fec791450d12784330e445f9a29628033e60e66aadcf0

COPY package*.json ./
RUN npm install
COPY . .

# Copy .env.production if it exists (will override defaults)
COPY .env.production* ./

RUN npm run build

FROM node:18-alpine AS runner

WORKDIR /app

# Set default environment variables for runtime
ENV NODE_ENV=production
ENV NEXT_PUBLIC_API_URL=https://api.proeg.ru
ENV API_PROEG_KEY=e918d16ef6d889317a5fec791450d12784330e445f9a29628033e60e66aadcf0

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

COPY --from=builder /app/next.config.ts ./next.config.ts

# Copy .env.production if it exists (will be used by Next.js at runtime)
COPY --from=builder /app/.env.production* ./

EXPOSE 3000

CMD ["npm", "start"]