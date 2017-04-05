# TechArch Day 2017

Helsinki TechArch Day 2017 hands-on for Serverless

## General

This document describes the hands-on session assignment and set-up information

## Prerequisites

* A configured AWS account with a suitable user and access keys
  - Check out the instructions in https://github.com/SirIle/tad2017/blob/master/aws-create-user.md 
* Installed tooling (set-up information on [Mac](https://github.com/SirIle/tad2017/blob/master/mac-setup-guide.md) and Windows)
  * If for some reason the tools don't work locally, you can also [set them up in EC2](https://github.com/SirIle/tad2017/blob/master/ec2-setup-guide.md)
* Configure aws-cli with the downloaded keys by running `aws configure`
  - Use `eu-west-1` as the default region 
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

Edit _serverless.yml_ and change the default region to for example `eu-west-1` (serverless doesn't work in eu-central-1a/b/c, so use eu-west-1 to avoid trouble)

Publish to the configured AWS account (configured through aws-cli)

```bash
sls deploy
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
