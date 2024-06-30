FROM node:20-alpine

# Set working directory
WORKDIR /app

# Add `/app/node_modules/.bin` to $PATH
# ENV PATH /app/node_modules/.bin:$PATH

# Install dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# Copy all project files
COPY . ./

# Expose port 6000
EXPOSE 6000

# Start the application
CMD ["npm", "run", "dev"]
