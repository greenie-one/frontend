FROM node:alpine3.17 as build

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . ./

RUN yarn build

FROM alpine:3.18.0
COPY --from=build /app/dist /app
COPY lighttpd.conf /app

RUN apk add lighttpd

EXPOSE 3000
WORKDIR /app

CMD ["lighttpd", "-D", "-f", "lighttpd.conf"]