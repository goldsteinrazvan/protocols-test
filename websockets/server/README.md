# TemplateBackend
Backend template that uses 
* express
* knex
* bookshelf
* cors
* multer

## What's in the box
Template that has API needed deps installed and also a project structure that can help you bootstrap new projects faster.

## How to use it
* Git clone this repo
* Remove .git from cloned repo
* Remove this README.md :)
* Add local_env.sh file (this file is already ignored in .gitignore)

## Run local
* Need to have nodemod installed 
    * To install it run **npm --global install nodemon** 
* Create file **local_env.sh**, more details about the content of the file later on
* Run locally with **./run_local.sh**
* This will start **nodemon** and watch for changes to the filesystem and restart the local server as changes happen

### Env vars
There are a few env vars that need to be added for this to work. They are all related to connecting to the database.
* RDS_HOSTNAME
* RDS_USERNAME
* RDS_PASSWORD
* RDS_DB_NAME

Example of **local_env.sh**:
```
#!/bin/sh

RDS_HOSTNAME=localhost
RDS_USERNAME=root
RDS_PASSWORD=password
RDS_DB_NAME=name

export RDS_HOSTNAME
export RDS_USERNAME
export RDS_PASSWORD
export RDS_DB_NAME
```

