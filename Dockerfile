FROM node:16.14.2-alpine

LABEL author="cleyxds"

ENV NODE_ENV production

WORKDIR /usr/share/app

COPY package.json .

RUN yarn install --frozen-lockfile --prod

COPY public public

COPY . .

RUN yarn tailwind:css

RUN yarn build

EXPOSE 3333

CMD ["node", "build/index.js"]

# docker build -t cleyxds/energy-app-service:v1.0.0 .
# docker run -dti -p 3333:3333 -e SERVER_PORT=3333 -e REDIS_URL=redis://default:2lhbkbJf0a2lu0m6Uvg9Ct85QZQBkSeY@redis-13661.c1.us-east1-2.gce.cloud.redislabs.com:13661 --name energy-app-service cleyxds/energy-app-service:v1.0.0
