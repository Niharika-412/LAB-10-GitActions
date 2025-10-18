# Stage 1: Build
FROM node:20-alpine AS build
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy all source files and build
COPY . .
RUN npm run build

# Stage 2: Serve production
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Copy build output from previous stage
COPY --from=build /app/dist .

# Expose port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
