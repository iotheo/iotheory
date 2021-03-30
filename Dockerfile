FROM node:10-alpine

COPY ./package.json .
RUN yarn

EXPOSE 3000
COPY . .
RUN yarn build


CMD ["yarn", "start"]