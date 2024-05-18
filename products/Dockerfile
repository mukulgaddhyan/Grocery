FROM node

WORKDIR /GROCERY_MS/products

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8002

CMD ["npm", "start"]