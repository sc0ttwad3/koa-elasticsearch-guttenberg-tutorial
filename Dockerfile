FROM node:12.2

ENV NODE_VERSION 12.2.0

EXPOSE 3000

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "npm", "start" ]
