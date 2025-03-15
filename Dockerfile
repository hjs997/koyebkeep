FROM node:18-alpine

WORKDIR /app

RUN apk add --no-cache --update tini openssl

COPY package.json ./
RUN npm install --only=production --no-audit --no-fund

COPY . .

RUN chmod +x run.js

ENTRYPOINT ["/sbin/tini", "--"]

CMD ["node", "--max-old-space-size=128", "run.js"]
