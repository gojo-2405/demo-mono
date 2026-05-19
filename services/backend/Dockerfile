FROM node:22-alpine

WORKDIR /app

COPY server.js .

RUN npm init -y
RUN npm install express

EXPOSE 3000

CMD ["node", "server.js"]
