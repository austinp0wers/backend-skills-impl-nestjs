FROM node:16.15.0

# Create app directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

#Install npm packages
RUN yarn install

#Bundle app source
COPY . .

#Build app for use
RUN yarn build

#Port
EXPOSE 4000

#Command 
CMD ["yarn", "start:prod"]

# Health Check 
HEALTHCHECK --interval=10s --timeout=5s --start-period=10s --retries=2 CMD wget -qO- localhost:4000/health
