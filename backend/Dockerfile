FROM node:16.14

EXPOSE 3001

WORKDIR /app

COPY package*.json ./

RUN ["npm", "i"] 

COPY . .

RUN chown node:node /app

USER node

CMD ["npm", "run", "dev"]