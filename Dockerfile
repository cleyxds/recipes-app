# DEPRECATED @17/09/2022, using App Engine instead Cloud Run

FROM node:16.14.2-alpine

LABEL author="cleyxds"

ENV NODE_ENV production

WORKDIR /usr/share/app

COPY package.json .

RUN yarn install --frozen-lockfile --prod

COPY public public

COPY src/views build/views

COPY . .

RUN yarn tailwind:css

RUN yarn build

EXPOSE 3333
EXPOSE 4444

CMD ["node", "build/index.js"]

# docker build -t cleyxds/barbosarecipes-api:v1.3.2 .
# docker run -dti -p 3333:3333 -e SERVER_PORT=3333 -e REDIS_URL=redis://default:2lhbkbJf0a2lu0m6Uvg9Ct85QZQBkSeY@redis-13661.c1.us-east1-2.gce.cloud.redislabs.com:13661 --name energy-app-service cleyxds/barbosarecipes-api:v1.3.2
# docker run -dti -p 3333:3333 -p 4444:4444 -v ${PWD}/public/uploads:/usr/share/app/public/uploads --env-file .env.dev --name barbosarecipes-api cleyxds/barbosarecipes-api:v1.3.2

# docker tag cleyxds/barbosarecipes-api:v1.3.2 gcr.io/portfolio-353720/energy-app-service:v1.3.2

# DONT FORGET THE ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, AUTHORIZATION_SERVER_PORT and SERVICE_PORT environment variables
