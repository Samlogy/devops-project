FROM node:20-alpine3.18

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

ARG NODE_ENV=dev

COPY .env.${NODE_ENV} .env

EXPOSE 3002

CMD ["npm", "run", "dev"]