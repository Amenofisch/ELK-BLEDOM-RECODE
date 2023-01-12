FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN npm install --quiet

RUN apt-get install bluetooth bluez libbluetooth-dev libudev-dev

COPY . .