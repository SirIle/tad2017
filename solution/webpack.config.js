module.exports = {
  entry: [
    'babel-polyfill', './handler.js',
  ],
  target: 'node',
  externals: [
    'aws-sdk', // aws-sdk included in Lambda
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      include: __dirname,
      exclude: [/node_modules/],
    }, {
      test: /\.json$/,
      loader: 'json-loader',
    }],
  },
};
