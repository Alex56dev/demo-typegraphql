FROM node:12

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 4000

VOLUME [ "/app/node_modules", "/app/dist" ]

ENTRYPOINT ["./entrypoint.sh"]
