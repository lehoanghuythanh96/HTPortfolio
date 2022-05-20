FROM node:18

WORKDIR /ht-portfolio-app

COPY package.json package-lock.json ./

RUN npm i -g npm@latest

COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm","start"]