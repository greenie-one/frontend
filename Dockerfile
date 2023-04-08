FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . ./

RUN npm run build

RUN npm install serve -g

EXPOSE 3000
CMD ["npm", "run", "serve"]