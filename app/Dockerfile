FROM node:20-alpine3.18

WORKDIR /app

COPY package-lock.json package.json ./

RUN npm ci

COPY . .

CMD ["npm", "start"]