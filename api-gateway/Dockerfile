FROM node:alpine

WORKDIR /app

EXPOSE 8000

COPY package*.json ./

RUN npm i

COPY . .

CMD ["npm", "run", "dev"]