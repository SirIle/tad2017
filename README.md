# TechArch Day 2017

Helsinki TechArch Day 2017 hands-on for Serverless

## General

This document describes the hands-on session assignment and set-up information

## Prerequisites

* A configured AWS account (set-up information here)
* Installed tooling (set-up information on Mac and Windows)
* Configured aws-cli
* (Optional) Visual Studio for Code with Beautify and ESLint plugins installed

## Creating the project

Create the directory and initialize the Serverless project

```bash
sudo npm install -g serverless
mkdir tad
cd tad
sls create --template aws-nodejs
npm init
```

## Add route to the example to enable http-calls

Edit _serverless.yml_ and add under the line `handler: handler.hello` on the same indentation level

```yml
    events:
      - http:
          path: hello
          method: get
```

## Publish and test that it works from outside

Edit _serverless.yml_ and change the default region to for example `eu-west-1`.

Publish to the configured AWS account (configured through aws-cli)

```bash
npm deploy
```

The example should deploy and display the URL that can be used to call it. Open your browser and try calling the method.

If there's an error, contact one of the presenters.

## Offline-capability

Install offline-plugin

```bash
npm install --save-dev serverless serverless-offline
```



Edit _serverless.yml_ and add to the end of the file

```yml
plugins:
  - serverless-offline
```

The offline-version can be started by running

```bash
sls offline
```

This command should be added into the _package.json_ under scripts so that it can be run more easily. Add the line

```json
    "start": "sls offline"
```

and then the offline-server can be started with `npm start`.

Try calling the method running on localhost through the browser.
