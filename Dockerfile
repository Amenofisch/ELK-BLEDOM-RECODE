FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN npm install --quiet

RUN apk add bluetooth bluez bluez-utils libbluetooth-dev libudev-dev

COPY . .