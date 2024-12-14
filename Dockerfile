FROM node:20.10-alpine AS build

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm i -g pnpm && pnpm i

COPY . .

RUN pnpm build

FROM nginx:1.25.2-alpine

WORKDIR /usr/share/nginx/

RUN rm -rf html

RUN mkdir html

WORKDIR /

COPY --from=build /app/dist /usr/share/nginx/html

COPY ./config/nginx/nginx.conf /etc/nginx

CMD ["nginx", "-g", "daemon off;"]