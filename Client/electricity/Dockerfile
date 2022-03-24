
FROM node:17-alpine as builder
WORKDIR /usr/app
COPY ./package.json /usr/app
RUN yarn install 
COPY ./ /usr/app

RUN yarn build

FROM nginx:stable-alpine
COPY --from=builder /usr/app /usr/share/nginx/html
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 4000

CMD ["npm","start"]