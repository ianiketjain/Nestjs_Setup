# Use the official Node.js image as the base image
FROM node:20-alpine3.17 as build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY ./package.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the Nest.js application
RUN npm run build

# Expose the port the app runs on
EXPOSE 5000

# Define the command to run the application
CMD ["npm", "run", "start"]**