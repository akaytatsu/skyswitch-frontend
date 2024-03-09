# build stage
FROM node:18-alpine AS build_stage
WORKDIR /app
COPY ./*.json ./
COPY ./*.yaml ./
RUN npm install -g pnpm
RUN pnpm i
COPY . .
RUN pnpm run build
ENV NODE_ENV=production

CMD ["npm","run" ,"start"]