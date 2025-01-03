# Use a node image as the base
FROM node:20 as base

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# dev Stage
FROM base as local
COPY ./ /app/
EXPOSE 3000
CMD ["npm", "run", "dev"]

# dev Stage
FROM base as dev
COPY ./ /app/
EXPOSE 3000
CMD ["npm", "run", "dev"]

# preprod Stage
FROM base as preprod
COPY ./ /app/
EXPOSE 3000
CMD ["npm", "run", "preprod"]

# prod Stage
FROM base as prod
COPY ./ /app/
EXPOSE 3000
CMD ["npm", "run", "prod"]
