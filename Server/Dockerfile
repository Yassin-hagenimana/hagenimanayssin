FROM node:16.4-alpine
#specifying the working directory
WORKDIR /usr/app
#copy package.json to the working directory
COPY ./package.json .

RUN npm install

COPY . .

EXPOSE 4000
CMD [ "npm", "start" ]