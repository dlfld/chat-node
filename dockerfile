FROM node

WORKDIR /app

COPY . ./
EXPOSE 3000
RUN npm config set registry https://registry.npmjs.org/
RUN npm install -g cnpm -registry=https://registry.npm.taobao.org
RUN cnpm i
# RUN npm i
# --registry=https://registry.npmmirror.com/

CMD ["cnpm", "start"]
