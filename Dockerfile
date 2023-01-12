FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN npm install --quiet && apk add bluez-deprecated bluez

COPY . .