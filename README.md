# CSAFE-Chapman-University

Chapman University SE320 Project Spring 2018

# Getting started

## Setting up git

Make sure you have Git installed on your local machine. See how to install Git [here](https://help.github.com/articles/set-up-git/). In the Terminal, type the following:

```
$ git clone https://github.com/andreperkins12/CSAFE-Chapman-University
$ git checkout dev
```

### Pushing your changes to GitHub

Always make sure you are on the `dev` branch for active development. Please don't commit and push accidentally to `master`.

```
$ git pull
$ git add .
$ git commit -m "Commit message"
$ git push origin dev
```

## Setting up your rails dev environment

We use [Docker](https://www.docker.com/) to set up our rails dev environment. We referenced instructions from [here](https://blog.codeship.com/running-rails-development-environment-docker/) and [here](https://engineering.adwerx.com/rails-on-docker-compose-7e2cf235fa0e) to build this documentation.

First, the commands in this section are done inside `/csafe-app`. Make sure you're inside that directory. Then, build the container using this command:

`docker-compose build app`

This command opens an interactive shell inside of your container, where you can run `rake` commands. Run this inside `/csafe-app`. This command spins up both the rails and mysql server.

```
docker-compose run --rm --service-ports app bash
rake db:setup
exit
```

To start all the containers:

`docker-compose up`

**To connect to the mysql server,** use DataGrip on `localhost:3306` using `username: root`, `password: root`, `db: csafe_dev`. This should be changed in a production environment.

### OSX

1. Download Docker [here](https://docs.docker.com/docker-for-mac/install/#download-docker-for-mac). Get the stable version and install `Docker.dmg`.

2. Run the Docker app. Make sure you have the whale icon on the top right. This signifies that the docker daemon is running.

3. Install Docker Machine by typing these commands in Terminal:

```
$ curl -L https://github.com/docker/machine/releases/download/v0.13.0/docker-machine-`uname -s`-`uname -m` >/usr/local/bin/docker-machine
$ chmod +x /usr/local/bin/docker-machine
```

4. Check if the installation worked:

`$ docker-machine version`

5. Go to the root of the repoistory. Type the following commands:

```
$ git pull
$ git checkout dev
$ cd csafe-app
$ docker-compose up
```

Keep the terminal running. Then, open another terminal window and type:

`$ docker ps`

You should see the following:

| CONTAINER ID | IMAGE | COMMAND | CREATED | STATUS | PORTS | NAMES |
| --- | --- | --- | --- | --- | --- | --- |
| eb018d2ca6e2 | demo | "bundle exec 'rails | 10 seconds ago | Up 9 seconds | 0.0.0.0:32769->3000/tcp | pensive_ritchie |

Look at the port. In this case it is **32769**.

6. Access the rails app on your browser by navigating to: `localhost:32769`

### Windows

1. Install [Docker Toolbox](https://docs.docker.com/toolbox/overview/) if you're not on Win10 Pro, Enterprise or Education. Otherwise use [Docker for Windows](https://docs.docker.com/docker-for-windows/install/).

2. In the Start Menu (Windows Button), open a Docker Quickstart Terminal.

3. Go to the root of the repoistory. Type the following commands:

```
$ git pull
$ git checkout dev
$ cd csafe-app
$ docker-compose up
```

Keep the terminal running. Then, open another Docker Quickstart Terminal window and type:

`$ docker ps`

You should see the following:

| CONTAINER ID | IMAGE | COMMAND | CREATED | STATUS | PORTS | NAMES |
| --- | --- | --- | --- | --- | --- | --- |
| eb018d2ca6e2 | demo | "bundle exec 'rails | 10 seconds ago | Up 9 seconds | 0.0.0.0:32769->3000/tcp | pensive_ritchie |

Look at the port. In this case it is **32769**.

4. Type `docker-machine ip default` to find the IP that docker is deploying to.

6. Access the rails app on your browser by navigating to: `ipaddress:32769`

## Executing commands in your rails dev environment

http://phase2.github.io/devtools/common-tasks/ssh-into-a-container/
- Use `docker ps` to get the name of the existing container
- Use the command `docker exec -it <container name> /bin/bash` to get a bash shell in the container
- Generically, use `docker exec -it <container name> <command>` to execute whatever command you specify in the container.

If you are running Docker on Linux, the files rails new created are owned by root. This happens because the container runs as the root user. If this is the case, change the ownership of the new files.

`sudo chown -R $USER:$USER .`

How to use docker without using `sudo`: https://docs.docker.com/install/linux/linux-postinstall/

## New Gems & Migrations Instructions

If new gems are added, you would need to rebuild the docker image.

```
$ cd csafe-app
$ docker-compose build app
```

If you get a PendingMigrationsError, that means new models have been added and you will need to run migrations. When your container is running, find its name by doing a `docker ps`

Then, run the migrations using this command: `docker exec -it <container name> rake db:migrate` and replace the container name.
