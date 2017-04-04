# TechArch Day 2017

Helsinki TechArch Day 2017 hands-on for Serverless

## General

This document describes the hands-on session assignment and set-up information

## Prerequisites

* A configured AWS account (set-up information here)
* Installed tooling (set-up information on Mac and Windows)
  * Mac:
    * Log into AWS, from the frontpage's Build a solution box, click "Launch a virtual Machine with EC2", or go to Services and select EC2 and launch it from there
    * Select Amazon Linux 64-bit / t2.micro (free tier)
    * Create key pair and download .pem file. Change the permission of the .pem file to 400 with “chmod 400 'filename'.pem”
    * From your EC2 instance in AWS, click connect and copypaste the ssh command to your Terminal
    * Once connected to your EC2 instance, run ”pip install --upgrade --user awscli” to install aws-cli command line tool.
    * Go to AWS, and select IAM from the Services
      * Create a user with administrator rights
      * Go to the user, and click on security credentials and create an access key
      * Download the access key csv to store the credentials. NOTE! This is the only time you get to do this, if you don't download or write them down, you'll need to create a new one later, if you forget them
    * Log into your EC2 (if not still logged), and run “aws configure”, and then give the previously created access and secret access keys (copy/paste from the .csv)
    * Install nodejs
      * the EC2 instance doesn't have the right repositories for node, so add them by running "curl --silent --location https://rpm.nodesource.com/setup_7.x | sudo bash -"
      * run "sudo yum -y install nodejs" to install nodejs
    * To make sure your EC2 instance is properly set-up, go to AWS and check from the Services that there's a VPC created, and that that VPC has an Internet Gateway set-up as well. AWS should do these automatically when launching the EC2 instance in the first step, but if not, these can be fixed. Just ask for help!
    
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
