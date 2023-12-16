FROM node:20-alpine3.19  as builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build


FROM node:20-alpine3.19 

WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder  /app/node_modules ./node_modules
CMD [ "node", "/app/dist/main.js" ]