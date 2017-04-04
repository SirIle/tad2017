# TechArch Day 2017

Helsinki TechArch Day 2017 hands-on for Serverless

## General

This document describes the second part of the hands-on session assignment

## Set webpack as the packaging system and take babel into use

Install the required packages

```bash
npm install --save-dev serverless-webpack babel-loader babel-polyfill babel-preset-es2015 babel-preset-es2017
```

Edit _serverless.yml_ and add a custom section (at root level)

```yml
	custom:
	  serverless-offline:
	    babelOptions:
      presets: ["es2017", "es2015"]
```

Also add to the end of the file another plugin definition
```yml
	serverless-webpack
```

Add a new file _.babelrc_ to the project root

```json
{
  "presets": ["es2015", "es2017"]
}
```

Create a new file _.webpack.config.js_ at the project root level

```javascript
module.exports = {
  entry: [
    'babel-polyfill', './handler.js',
  ],
  target: 'node',
  externals: [
    'aws-sdk', // aws-sdk included in Lambda
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      include: __dirname,
      exclude: [/node_modules/],
    }, {
      test: /\.json$/,
      loader: 'json-loader',
    }],
  },
};
```

Then test that the packing works and that the new packaged version deploys correctly with `sls deploy`. To just pack
the function, use `sls webpack`.

Locally the WebPack based version can be run with `sls offline --location .webpack`.
