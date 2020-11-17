FROM node:12 as base

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 4000

ENTRYPOINT ["./entrypoint.sh"]

FROM base as dev

RUN npm install tslint typescript -g
