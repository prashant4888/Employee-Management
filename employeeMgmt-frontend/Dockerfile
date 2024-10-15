# Use the official Node.js image as the base
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if it exists), then install dependencies
COPY package*.json ./
RUN npm install

# Copy the remaining source code
COPY . .

# Build the React app for production
RUN npm run build

# Install serve to serve the static files
RUN npm install -g serve

# Expose the port that the app will run on (5173)
EXPOSE 5173

# Start the app using serve on port 5173
CMD ["serve", "-s", "build", "-l", "5173"]
