FROM node:18-alpine
WORKDIR /app
RUN apk update && apk add --no-cache g++ \
    openjdk11-jdk \
    python3 \
    py3-pip \
    gcc 
COPY package.json .
RUN npm i
COPY . .
CMD ["node","index.js"]

