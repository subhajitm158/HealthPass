FROM node:14
RUN mkdir /app
# COPY package.json /app
WORKDIR /app

COPY package.json /app
RUN npm install
COPY . /app
EXPOSE 3000
# RUN npm start
CMD ["npm","run","server"]
