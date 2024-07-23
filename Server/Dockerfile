FROM node:16

WORKDIR /usr/src/app

COPY ./package.json ./
COPY ./package-lock.json ./

RUN apt-get update && \
    apt-get install -y wget gnupg ca-certificates fonts-liberation libappindicator3-1 \
    libasound2 libatk-bridge2.0-0 libcups2 libdbus-1-3 libnspr4 libnss3 lsb-release xdg-utils && \
    rm -rf /var/lib/apt/lists/*

# Install Google Chrome
RUN wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | apt-key add - && \
    sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google-chrome.list' && \
    apt-get update && apt-get install -y google-chrome-stable

RUN npm install
RUN npm install dotenv

COPY ./src ./src
COPY .env ./

EXPOSE 3000

CMD ["npm", "start"]
