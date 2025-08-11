# Use official Node.js image
FROM node:18-alpine

# Accept build argument
ARG ENVIRONMENT=dev
ENV ENVIRONMENT=$ENVIRONMENT

# Also allow NODE_ENV to be set at runtime
ENV NODE_ENV=development

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy rest of the app
COPY . .

# Expose app port
EXPOSE 3000

# Start app
CMD ["npm", "start"]
