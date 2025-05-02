# Development stage
FROM node:20.9.0-alpine AS development
WORKDIR /app
ENV NODE_OPTIONS="--max-old-space-size=4096 --max-http-header-size=81920"
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "dev"]

# Builder stage
FROM node:20.9.0-alpine AS builder
WORKDIR /app
ENV NODE_OPTIONS="--max-old-space-size=4096 --max-http-header-size=81920"
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine AS production
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 7000
CMD ["nginx", "-g", "daemon off;"]