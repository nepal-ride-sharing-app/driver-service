# Use a node image as the base
FROM node:20 as base

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

COPY . .
EXPOSE 3000

# dev Stage
FROM base as local
CMD ["npm", "run", "dev"]

# dev Stage
FROM base as dev
CMD ["npm", "run", "dev"]

# preprod Stage
FROM base as preprod
CMD ["npm", "run", "preprod"]

# prod Stage
FROM base as prod
CMD ["npm", "run", "prod"]
