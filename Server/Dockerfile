# Use the official Node.js 18 image as a base image
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY ./package.json ./
COPY ./package-lock.json ./

# Install system dependencies required for Puppeteer and Chrome
RUN apt-get update && \
    apt-get install -y wget gnupg ca-certificates fonts-liberation \
    libappindicator3-1 libasound2 libatk-bridge2.0-0 libcups2 libdbus-1-3 \
    libnspr4 libnss3 lsb-release xdg-utils libx11-xcb1 libxcomposite1 \
    libxcursor1 libxi6 libxtst6 libxrandr2 libpangocairo-1.0-0 libatk-bridge2.0-0 \
    libgtk-3-0 --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

# Install Google Chrome
RUN wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | apt-key add - && \
    sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google-chrome.list' && \
    apt-get update && apt-get install -y google-chrome-stable && \
    rm -rf /var/lib/apt/lists/*

# Set environment variable to specify Puppeteer's cache directory
ENV PUPPETEER_CACHE_DIR=/usr/src/app/.cache/puppeteer

# Set environment variable for Puppeteer's executable path
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

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