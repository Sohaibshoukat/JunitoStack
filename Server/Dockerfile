# Use the official Node.js image as a base image
FROM node:latest

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY ./package.json ./
COPY ./package-lock.json ./

# Install system dependencies required for Puppeteer and Chrome
RUN apt-get update && \
    apt-get install -y wget gnupg ca-certificates fonts-liberation libappindicator3-1 \
    libasound2 libatk-bridge2.0-0 libcups2 libdbus-1-3 libnspr4 libnss3 libx11-xcb1 \
    libxcomposite1 libxdamage1 libxrandr2 xdg-utils && \
    rm -rf /var/lib/apt/lists/*

# Install Google Chrome
RUN wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | apt-key add - && \
    sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google-chrome.list' && \
    apt-get update && apt-get install -y google-chrome-stable

# Set environment variable to specify Puppeteer's cache directory
ENV PUPPETEER_CACHE_DIR=/usr/src/app/.cache/puppeteer

# Create Puppeteer's cache directory with correct permissions
RUN mkdir -p $PUPPETEER_CACHE_DIR && \
    chown -R node:node $PUPPETEER_CACHE_DIR

# Install Node.js dependencies
RUN npm install
RUN npm install dotenv

# Copy application source code to the working directory
COPY ./src ./src
COPY .env ./

# Expose port 3000
EXPOSE 3000

# Switch to the node user to avoid running as root
USER node

# Start the application
CMD ["npm", "start"]
