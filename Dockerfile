FROM node:lts AS build

WORKDIR /build

COPY . .

RUN yarn install && yarn build

FROM node:lts AS stage

WORKDIR /stage

ENV NODE_ENV production

COPY . .

RUN yarn install

FROM node:lts-alpine

WORKDIR /app
USER node

COPY --from=build /build/dist dist
COPY --from=stage /stage/node_modules node_modules
COPY --from=stage /stage/package.json .

CMD ["yarn", "start"]
