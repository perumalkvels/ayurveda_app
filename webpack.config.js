const path = require('path');

module.exports = {
  // Your other Webpack configuration options...

  resolve: {
    fallback: {
      util: require.resolve('util/'),
    },
  },
};