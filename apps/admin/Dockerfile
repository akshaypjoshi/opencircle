# Build stage
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Define build argument for API URL
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# Copy workspace files first
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/ ./packages/
COPY apps/admin/package.json ./apps/admin/

# Install pnpm
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install --no-frozen-lockfile

# Copy UI source and build it first
COPY packages/ui/src ./packages/ui/src/
COPY packages/ui/package.json ./packages/ui/
WORKDIR /app/packages/ui
RUN pnpm build

# Copy admin source code
WORKDIR /app
COPY apps/admin/src ./apps/admin/src/
COPY apps/admin/index.html ./apps/admin/
COPY apps/admin/vite.config.ts ./apps/admin/
COPY apps/admin/tsconfig*.json ./apps/admin/

# Build the application
WORKDIR /app/apps/admin
# Pass the build argument to the build command
ARG VITE_API_URL
RUN VITE_API_URL=$VITE_API_URL pnpm build

# Production stage
FROM nginx:alpine AS production

# Copy custom nginx config
COPY apps/admin/nginx.conf /etc/nginx/nginx.conf

# Copy built assets from builder stage
COPY --from=builder /app/apps/admin/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
