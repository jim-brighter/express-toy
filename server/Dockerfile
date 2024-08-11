FROM node:20-alpine

EXPOSE 3000

RUN mkdir -p /app

WORKDIR /app

COPY ./dist /app
COPY ./node_modules /app/node_modules

ENTRYPOINT [ "node", "/app/index.js" ]
