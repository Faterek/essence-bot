FROM oven/bun:1-alpine

WORKDIR /app

COPY ../package.json .

COPY package.json ./discord-bot

RUN bun install --production

COPY . ./discord-bot

RUN mkdir /app/modules

EXPOSE 8080

CMD [ "bun", "run", "start:discord-bot" ]