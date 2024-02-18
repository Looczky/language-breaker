FROM node:20.1.0-alpine3.17
WORKDIR /.
COPY . .
RUN yarn install --production && npm install
CMD ["npm", "run","start"]
EXPOSE 3000

