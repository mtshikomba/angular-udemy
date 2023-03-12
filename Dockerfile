# Stage 1
FROM node:9.7.0-alpine as build-step

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN npm run build --prod

CMD ["node", "server.js"]
## Stage 2
#FROM nginx:1.17.1-alpine

#COPY --from=build-step /app/dist /usr/share/nginx/html
