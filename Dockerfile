ARG STAGE

# build stage
FROM node:18-alpine AS build_stage
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY ./ .
RUN npm run build
ENV NODE_ENV=production

CMD ["npm","run" ,"start"]