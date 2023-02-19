FROM node

WORKDIR /app

COPY . ./

RUN npm i --registry=https://registry.npmmirror.com/

CMD ["npm", "start"]