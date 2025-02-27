# Use a smaller base image
FROM node:lts-slim AS build

# Set the working directory
WORKDIR /usr/src/app/backend

# Copy package files first for better caching
COPY package.json package-lock.json ./

# Install only production dependencies

RUN npm install

#Copy the remaining files
COPY . .

# Expose the port used by Vite
EXPOSE 5000

# Start the application
CMD ["npm", "start"]
