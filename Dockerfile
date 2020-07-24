FROM node:10.19.0

WORKDIR /app
COPY . .
RUN yarn install

WORKDIR /app/client
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent

WORKDIR /app/server
RUN npm install --silent

EXPOSE 3000

WORKDIR /app
CMD ["yarn", "dev"]
