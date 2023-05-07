FROM node:18-alpine

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . ./

RUN yarn build
RUN yarn build

RUN yarn global add serve
RUN yarn global add serve

EXPOSE 3000
CMD ["yarn", "serve"]
CMD ["yarn", "serve"]