FROM node

WORKDIR /GROCERY_MS/customer

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8001

CMD ["npm", "start"]