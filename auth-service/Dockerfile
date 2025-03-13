FROM node:20.15.0

LABEL authors="Chamika"

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

EXPOSE 5003

CMD ["node", "server.js"]