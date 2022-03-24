# Setup and build the client

FROM node:16

WORKDIR /usr/app/Client/

COPY Client/package*.json ./

RUN npm install 

COPY Client/ ./

RUN npm run build


# Setup the server

FROM node:16


WORKDIR /usr/app/Server/

COPY Server/package*.json ./

RUN npm install 

COPY Server/ ./

ENV PORT 8000

EXPOSE 8000

CMD ["npm", "start"]