FROM node:22.12.0

WORKDIR /app

COPY package*.json /
RUN yarn

COPY . .

EXPOSE 3000