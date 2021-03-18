FROM node:14.15-alpine

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

CMD ["node", "./dist/main.js"]
