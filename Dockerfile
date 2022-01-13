FROM node:14.18.3-alpine3.15

WORKDIR /app

COPY package.json /app/package.json
RUN yarn

CMD ["yarn", "dev"]
