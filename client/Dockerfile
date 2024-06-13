FROM node:20-alpine3.18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ARG NODE_ENV=dev

COPY .env.${NODE_ENV} .env

EXPOSE 3002

CMD ["npm", "run", "dev"]