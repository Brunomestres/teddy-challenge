FROM node:lts-alpine3.17

WORKDIR /app

COPY package*.json ./

RUN npm ci


COPY . .


RUN npm run build


EXPOSE 3000
