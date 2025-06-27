FROM node:22-alpine
WORKDIR /usr/src/app
COPY authentication/package*.json ./
RUN npm install
COPY authentication/. .
EXPOSE 5000
CMD ["node", "auth.js"]
