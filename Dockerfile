# You should always specify a full version here to ensure all of your developers
# are running the same version of Node.
# FROM node:7.8.0
FROM node:11.15.0 as base

# Create app directory
RUN mkdir -p /src/app
WORKDIR /src/app

# Install app dependencies
COPY package.json /src/app/

# RUN npm install
RUN rm /usr/local/bin/yarn && rm /usr/local/bin/yarnpkg
RUN npm install -g yarn
RUN yarn install --ignore-engines
# RUN yarn add react-pdf

# Bundle app source
COPY . /src/app

ENV NODE_PATH="./src"

EXPOSE 3000

FROM base as production
#start prod server
RUN echo "*** paycruiser server will start in PRODUCTION mode with yarn start ***"
ENV REACT_APP_HOST_ENV=production
CMD [ "yarn", "start" ]
# CMD [ "npm", "run", "start-prod" ]

FROM base as staging
#start prod server
RUN echo "*** paycruiser server will start in staging mode with yarn start ***"
ENV REACT_APP_HOST_ENV=staging
CMD [ "yarn", "start" ]

FROM base as sandbox
#start prod server
RUN echo "*** paycruiser server will start in Quality Analysis mode with yarn start ***"
ENV REACT_APP_HOST_ENV=sandbox
CMD [ "yarn", "start" ]

FROM base as develop
#start prod server
RUN echo "*** paycruiser server will start in development mode with yarn start-dev ***"
ENV REACT_APP_HOST_ENV=development
CMD [ "yarn", "start-dev" ]
