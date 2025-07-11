# Use official Node.js LTS image
FROM node:18

# Set working directory inside the container
WORKDIR /app

# Copy your backend files
COPY Backend/package*.json ./
RUN npm install

COPY Backend/ ./

# Use environment PORT
ENV PORT=4000
EXPOSE 4000

# Start the server
CMD ["node", "server.js"]
