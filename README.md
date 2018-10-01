# CSAFE-Chapman-University
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://github.com/UXSoc/CSAFE-Chapman-University/blob/master/LICENSE.txt)

## Introduction

CSAFE is a tool for transporting Chapman students safely.

This project is fully open sourced and licensed under Apache 2.0.

## Development

### Requirements

Boilerplate based on Docker container. To start using them, first, we have to make sure that Docker and docker-compose are installed.

- docker-compose 1.6.0+
- Docker 1.10.0+

### Build

```bash
$ docker-compose build
$ docker-compose run web bundle
$ docker-compose run web rails db:create
$ docker-compose run web rails db:migrate
```

### Getting Started

To start the server, run the following magic command:

```bash
$ docker-compose up
```

Alternatively, you can setup the database using docker-compose and use rails on your machine.

```bash
$ docker-compose up db
$ bin/setup
$ bundle exec rails s
```

### Update Gemset

To avoid installing gems from scratch in each time when Gemfile will be updated, boilerplate has implemented persistent, cross-container dedicated volume for gems. Now in case when new entry to Gemfile is added, just run below command to update state:

```bash
$ docker-compose run web bundle
```

## Maintainers

The current maintainers of this repository are:

- Xavi Ablaza (xlablaza@gmail.com)
