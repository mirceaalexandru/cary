FROM node:6
RUN mkdir /src

ADD package.json /src/
WORKDIR /src

RUN npm install
COPY . /src

CMD ["node", "index.js"]
