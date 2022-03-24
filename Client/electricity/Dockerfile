FROM node:17-alpine as builder
WORKDIR /app
COPY ./package.json /app/
RUN npm install --force
COPY . /app
RUN npm run build
FROM nginx:stable-alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000