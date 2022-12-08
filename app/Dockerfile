# Node 16.x
ARG NODE_VERSION=19-alpine

FROM node:$NODE_VERSION AS builder
RUN apk add --no-cache python3 make g++
WORKDIR /app
COPY . .
RUN yarn install --force
RUN yarn build

# Run phase
FROM node:$NODE_VERSION
WORKDIR /app
RUN npm install --production -- cache /tmp/empty-cache && rm -rf /tmp/empty-cache
COPY --from=builder /build/dist ./dist
CMD [ "yarn","start" ]