# 1. Build
FROM node:alpine as builder

WORKDIR /app
COPY package.json ./
RUN npm i

COPY . .
RUN npm run build
RUN ls
# 2. Deploy our app to NGINX
FROM nginx:alpine

## Replace the default nginx index page with our Angular app
RUN rm -rf /usr/share/nginx/html/*
COPY /dist /usr/share/nginx/html
RUN ls

COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf

ENTRYPOINT ["nginx", "-g", "daemon off;"]