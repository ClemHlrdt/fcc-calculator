FROM "node:alpine"

WORKDIR /code

COPY package.json .

RUN npm install 

RUN npm build

COPY . .

CMD ["npm","start"]