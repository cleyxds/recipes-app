FROM node:16.14.2-alpine

LABEL author="cleyxds"

ENV NODE_ENV production

WORKDIR /usr/share/app

COPY package.json .

RUN yarn install --frozen-lockfile --prod

COPY . .

RUN yarn build

EXPOSE 3333

CMD ["node", "build/index.js"]

# docker build -t cleyxds/blog-service:v1.0.0 .
