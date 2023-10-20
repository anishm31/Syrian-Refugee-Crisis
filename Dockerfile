# Fetch the latest node image on alpine linux
FROM node:alpine

# Set up the working directory
WORKDIR /react-app

# Copy necessary frontend files into the container
COPY ./public /react-app/public
COPY ./src /react-app/src
COPY ./package*.json /react-app

# Install the necessary dependencies/packages
RUN npm install

# Expose the port that our react app is running on
EXPOSE 3000

# Start the react app
CMD ["npm", "start"]