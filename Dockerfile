ARG NODE_VERSION=20.13.1
FROM node:${NODE_VERSION}-alpine AS builder

WORKDIR /server

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm
RUN pnpm install

COPY . .

RUN pnpm run build

FROM node:${NODE_VERSION}-alpine AS production
WORKDIR /server

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --prod

COPY --from=builder /server/.env ./
COPY --from=builder /server/dist ./dist

EXPOSE 8000

CMD ["pnpm", "run", "start:prod"]