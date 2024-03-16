FROM oven/bun:1-alpine as build

WORKDIR /tmp/app

COPY package.json /tmp/app/package.json

RUN bun install

COPY . /tmp/app

RUN bun run build



FROM oven/bun:1-alpine as prod

WORKDIR /app

COPY ../package.json .

COPY --from=build /tmp/app/package.json /app/dashboard

RUN bun install --production

COPY --from=build /tmp/app/.output /app/dashboard/.output

RUN mkdir /app/modules

EXPOSE 80

CMD [ "bun", "run",  "start:dashboard"]