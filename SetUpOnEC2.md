# Instructions about setting up on EC2

## Launch an EC2 instance

* Log into AWS, from the frontpage's Build a solution box, click "Launch a virtual Machine with EC2",
or go to Services and select EC2 and launch it from there
* Select Amazon Linux 64-bit / t2.micro (free tier)
* Create key pair and download .pem file. Change the permission of the .pem file to 400 with chmod 400 'filename'.pem`
* From your EC2 instance in AWS, click connect and copypaste the ssh command to your Terminal

## Install awscli

* Once connected to your EC2 instance, run `pip install --upgrade --user awscli to install aws-cli command line tool.

## Create a user and access key

* Go to AWS, and select IAM from the Services
* Create a user with administrator rights
* Go to the user, and click on security credentials and create an access key
* Download the access key csv to store the credentials. NOTE! This is the only time you get to do this, if you don't download or write them down, you'll need to create a new one later, if you forget them

## Configure the aws-cli

* Log into your EC2 (if not still logged), and run “aws configure”, and then give the previously created access and secret access keys (copy/paste from the .csv)

## Install nodejs
* run `curl --silent --location https://rpm.nodesource.com/setup_7.x | sudo bash -`
* run `sudo yum -y install nodej` to install nodejs

## Check that everything words

To make sure your EC2 instance is properly set-up, go to AWS and check from the Services that there's a VPC created, and that that VPC has an Internet Gateway set-up as well. AWS should do these automatically when launching the EC2 instance in the first step, but if not, these can be fixed. Just ask for help!
