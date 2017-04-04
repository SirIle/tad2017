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
  - serverless-webpack
```

Add a new file _.babelrc_ to the project root

```json
{
  "presets": ["es2015", "es2017"]
}
```

Create a new file _webpack.config.js_ at the project root level

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

## Adding linting and AirBnB rules

Install the packages

```bash
npm install --save-dev eslint eslint-config-airbnb eslint-plugin-jsx-a11y babel-eslint eslint-plugin-react eslint-plugin-import
```

Create a new _.eslint_ file at the project root level

```json
{
  "env": {
    "mocha": true
  },
  "extends": "airbnb",
  "rules": {
    "space-before-function-paren": ["error", { "asyncArrow": "ignore", "named": "never"}]
  }
}
```

The exception to the rules has been added because JSBeautify doesn't add space after async keyword correctly.

In the _package.json_ scripts section add

```json
    "lint": "eslint --fix ."
```

Now you can test running the linting with `npm run lint` and it should also work in Visual Studio for Code if the ESLint plugin has been installed.

## Adding JSBeautify configuration

Create a new file _.jsbeautifyrc_ at the project root level

```json
{
  "indent_size": 2,
  "indent_char": " ",
  "indent_level": 0,
  "indent_with_tabs": false,
  "preserve_newlines": true,
  "max_preserve_newlines": 10,
  "jslint_happy": false,
  "space_after_anon_function": false,
  "brace_style": "collapse,preserve-inline",
  "keep_array_indentation": false,
  "keep_function_indentation": false,
  "space_before_conditional": true,
  "break_chained_methods": false,
  "eval_code": false,
  "unescape_strings": false,
  "operator_position": "before-newline",
  "end_with_newline": true
}
```

Then the code can be formatted in the editor by running format from the context menu and the formatted code should be compatible with the AirBnB linting rules.

You can also configure the editor to format-on-save.

## Setting up Mocha, Chai and test

Install the required packages

```bash
npm install --save-dev mocha chai babel-core babel-polyfill request-json
```

Create a new folder _test_ and create a new file _test/mocha.opts_

```bash
--compilers js:babel-core/register,babel-polyfill
--timeout 0
``` 

In _package.json_ under scripts section add

```json
    "start": "sls offline",
    "test": "mocha"
```

Create a new file for the tests, for example _test/test.js_

```javascript
import chai from 'chai';
import rest from 'request-json';
import cp from 'child_process';

/* eslint-disable no-await-in-loop */

chai.should();
const client = rest.createClient('http://localhost:3000/');
const URL = 'hello';

describe('Test the function', () => {
  let server;

  before(async() => {
    server = cp.exec('npm start');
    while (await new Promise(resolve => client.head('/', err => resolve(err)))) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  });

  it('Hello-method returns http status code 200', (done) => {
    client.get(`${URL}`, (err, res) => {
      res.statusCode.should.equal(200);
      done();
    });
  });

  after(() => server.kill());
});
```

Then you can run the tests against the offline-server with `npm test`.
