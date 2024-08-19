FROM node:20-alpine

EXPOSE 3000

RUN mkdir -p /app

WORKDIR /app

ENTRYPOINT [ "node", "/app/index.js" ]

COPY ./dist/index.js /app/index.js
