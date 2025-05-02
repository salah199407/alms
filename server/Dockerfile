# Development stage
FROM node:20.9.0-alpine AS development
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "run", "dev"]

# Production stage
FROM node:20.9.0-alpine AS production
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm install --only=production
COPY . .
COPY .env.docker ./.env
EXPOSE 5000
CMD ["npm", "start"]