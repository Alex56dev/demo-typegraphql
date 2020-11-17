FROM node:12

RUN npm install tslint typescript -g

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 4000

ENTRYPOINT ["./entrypoint.sh"]
