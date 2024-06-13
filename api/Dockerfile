FROM node:20-alpine3.18

WORKDIR /api

COPY package*.json ./

RUN npm ci

COPY . .

ARG NODE_ENV=dev

COPY .env.${NODE_ENV} .env

EXPOSE 3000

CMD ["npm", "start"]