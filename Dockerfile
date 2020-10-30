FROM node:10-alpine

COPY . .

RUN yarn
RUN yarn build


CMD ["yarn", "start", "-p", "3000"]