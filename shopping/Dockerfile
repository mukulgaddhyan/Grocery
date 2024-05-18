FROM node

WORKDIR /GROCERY_MS/shopping

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8003

CMD ["npm", "start"]