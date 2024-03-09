FROM node:alpine

WORKDIR /app

COPY package*.json ./
COPY . .

RUN npm install --silent

CMD [ "npm", "start" ]