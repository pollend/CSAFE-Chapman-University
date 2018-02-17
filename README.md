# CSAFE-Chapman-University

Description: Chapman University SE320 Project

## Getting started

Instructions for starting the rails server

```sh
$ cd csafe-app
$ bin/rails server
```

## Docker Setup

Instructions to Setup and Connect to Docker

Install Docker for you machine Link: (https://docs.docker.com/install/)

```sh
$ git pull
$ git checkout docker-setup
$ cd csafe-app
$ docker build -t demo .
$ docker run -it --rm demo bundle exec rake test
$ docker run -itP demo
$ 
``
