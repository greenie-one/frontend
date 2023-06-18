FROM node:alpine3.17 as build

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . ./

ARG MODE
RUN yarn build:$MODE

FROM alpine:3.18.0
COPY --from=build /app/dist /app/dist
COPY lighttpd.conf /app

RUN apk add lighttpd

RUN mkdir -p /tmp/lighttpd/compress/

EXPOSE 3000
WORKDIR /app

CMD ["lighttpd", "-D", "-f", "lighttpd.conf"]