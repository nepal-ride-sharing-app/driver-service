# Use a node image as the base
FROM node:20 as base

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

COPY . .
EXPOSE 3000

# command to install serverless globally
RUN npm install -g serverless

# dev Stage
FROM base as development
CMD ["npm", "run", "start:dev"]

# preprod Stage
FROM base as test
CMD ["npm", "run", "start:test"]

# prod Stage
FROM base as production
CMD ["npm", "run", "start:prod"]
