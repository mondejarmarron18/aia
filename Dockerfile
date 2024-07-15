FROM node:20.12.0-alpine

WORKDIR /usr/src/app

COPY package*.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build --production

CMD ["yarn", "start"]