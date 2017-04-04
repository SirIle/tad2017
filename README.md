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

´´´bash
sudo npm install -g serverless
mkdir tad
cd tad
sls create --template aws-nodejs
npm init
´´´

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
