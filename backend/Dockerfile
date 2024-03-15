FROM oven/bun:1-alpine as build

WORKDIR /tmp/app

COPY package.json .

RUN bun install

COPY src ./src
COPY tsconfig.json .

RUN bun run build



FROM oven/bun:1-alpine as prod

WORKDIR /app

COPY --from=build /tmp/app/package.json /app/package.json

RUN bun install --production

COPY --from=build /tmp/app/build /app/build

CMD [ "bun", "run", "start" ]