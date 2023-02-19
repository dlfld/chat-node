FROM node

WORKDIR /

COPY . ./

RUN npm config set registry https://registry.npmjs.org/
RUN npm i 
# --registry=https://registry.npmmirror.com/

CMD ["npm", "start"]