FROM node:20.10.0
WORKDIR /usr/src/app
COPY app .
RUN npm ci
EXPOSE 3000
CMD ["node", "index.js"]