FROM node:14.15-alpine

WORKDIR /app

COPY ./package.json ./package-lock.json ./
RUN npm install
RUN npm run build

COPY ./dist .

CMD ["node", "main.js"]
