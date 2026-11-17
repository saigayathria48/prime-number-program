FROM node:22.23.2-bookworm-slim

WORKDIR /app

COPY package.json prime.js server.js ./

ENV PORT=3000
EXPOSE 3000

USER node

CMD ["node", "server.js"]
