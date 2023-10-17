module.exports = {
    moduleNameMapper: {
      "\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|svg)$": "identity-obj-proxy",
      "\\.(css|less|scss)$": "identity-obj-proxy",
    },
    testEnvironment: 'jsdom',
  };