# Use a smaller base image
FROM node:lts-slim AS build

# Set the working directory
WORKDIR /usr/src/app

# Copy package files first for better caching
COPY package.json package-lock.json ./

# Install dependencies (including devDependencies to get Vite)
RUN npm install

# Copy the rest of the frontend files
COPY . .

# Expose the Vite port
EXPOSE 5173

# Start Vite with explicit npx usage to avoid 'vite not found' issues
CMD ["npx", "vite", "--host"]
