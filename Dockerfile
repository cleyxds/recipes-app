
# Build: Stage 1
FROM node:16.14.2-alpine as build

LABEL author="cleyxds"

WORKDIR /usr/share/app

COPY package.json .

RUN yarn --frozen-lockfile

COPY . .

RUN yarn tailwind:css

RUN yarn build

# Runner: Stage 2
FROM node:16.14.2-alpine

WORKDIR /usr/share/app

COPY --from=build /usr/share/app/build .

RUN yarn --frozen-lockfile --prod

EXPOSE 3333
EXPOSE 4444

CMD yarn start

# docker build -t cleyxds/barbosarecipes-api:v1.4.2.1 .

# docker run -dti -p 3333:3333 -p 4444:4444 -v ${PWD}/public/uploads:/usr/share/app/public/uploads --env-file dev.env --name barbosarecipes-api cleyxds/barbosarecipes-api:v1.4.2.1
#🌟 docker run -dti -p 3333:3333 -p 4444:4444 --env-file prod.env --name barbosarecipes-api cleyxds/barbosarecipes-api:v1.4.2.1

# docker tag cleyxds/barbosarecipes-api:v1.4.2.1 gcr.io/recipes-app-360601/barbosarecipes-api:v1.4.2.1

# 🌟NEW🌟 docker tag cleyxds/barbosarecipes-api:v1.4.2.1 us-central1-docker.pkg.dev/recipes-app-360601/barbosarecipes-api/barbosarecipes-api:v1.4.2.1

# DONT FORGET THE ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, AUTHORIZATION_SERVER_PORT, API_SERVER_URL and SERVICE_PORT environment variables

# PUSH
# docker push us-central1-docker.pkg.dev/recipes-app-360601/barbosarecipes-api/barbosarecipes-api:v1.4.2.1