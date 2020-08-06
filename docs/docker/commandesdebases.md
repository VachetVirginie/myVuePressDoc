---
sidebar: auto
---
# commandesdebases

> An image is a read-only template with instructions for creating a Docker container.docs.docker.com/engine/docker-overview/#docker-objects

> A Dockerfile is a text document that contains all the commands a user could call on the command line to assemble an image.docs.docker.com/engine/reference/builder/

> A container is a runnable instance of an image. You can create, start, stop, move, or delete a container. A container is a process which runs on a host. ...the container process that runs is isolated in that it has its own file system, its own networking, and its own isolated process tree separate from the host.docs.docker.com/engine/docker-overview/#docker-objects, docs.docker.com/engine/reference/run/

## Listing

- List images:\
`[docker image ls](https://docs.docker.com/engine/reference/commandline/image_ls/)`\
--- OR ---\
`[docker images](https://docs.docker.com/engine/reference/commandline/images/)`
- List containers:\
`[docker container ls -a](https://docs.docker.com/engine/reference/commandline/container_ls/)`\
--- OR ---\
`[docker ps -a](https://docs.docker.com/engine/reference/commandline/ps/)`
- List volumes:\
`[docker volume ls](https://docs.docker.com/engine/reference/commandline/volume_ls/)`
- List networks:\
`[docker network ls](https://docs.docker.com/engine/reference/commandline/network_ls/)`
- List all containers (Compose):\
`[docker-compose ps](https://www.saltycrane.com/cheat-sheets/docker/)`

## Removing

- Remove a container:\
`[docker rm my_container](https://docs.docker.com/engine/reference/commandline/rm/)`
- Remove all stopped containers:\
`[docker container prune](https://docs.docker.com/engine/reference/commandline/container_prune/)`
- Remove an image:\
`[docker image rm my-image](https://docs.docker.com/engine/reference/commandline/image_rm/)`\
--- OR ---\
`[docker rmi my-image](https://docs.docker.com/engine/reference/commandline/rmi/)`
- Remove dangling images:\
`[docker image prune](https://docs.docker.com/engine/reference/commandline/image_prune/)`
- Remove all images:\
`[docker image prune -a](https://docs.docker.com/engine/reference/commandline/image_prune/)`
- Remove a volume:\
`[docker volume rm my_volume](https://docs.docker.com/engine/reference/commandline/volume_rm/)`
- Remove all volumes:\
`[docker volume prune](https://docs.docker.com/engine/reference/commandline/volume_prune/)`
- Stop and remove containers and networks in `docker-compose.yml`. (This does not remove volumes.)\
`[docker-compose down](https://docs.docker.com/compose/reference/down/)`
- Remove everything:\
**Preferences -> Uninstall / Reset -> Reset to factory defaults**

## Pulling images

- Pull and image from the Docker registry ([hub.docker.com](https://hub.docker.com/)):\
`[docker pull my-image](https://docs.docker.com/engine/reference/commandline/pull/)`

## Publishing images

See also: [Get started with Docker - Share you image](https://docs.docker.com/get-started/part2/#share-your-image)

- Login to the Docker registry ([hub.docker.com](https://hub.docker.com/)):\
`[docker login](https://docs.docker.com/engine/reference/commandline/login/)`
- Tag an image:\
`[docker tag my-image my-username/my-repo:my-tag](https://docs.docker.com/engine/reference/commandline/tag/)`
- Push an image to the Docker registry:\
`[docker push my-username/my-repo:my-tag](https://docs.docker.com/engine/reference/commandline/push/)`

## Building images from Dockerfiles

- Build an image from a Dockerfile in the current directory:\
`[docker build -t my-image .](https://docs.docker.com/engine/reference/commandline/build/)`
- Build an image using a differently-named Dockerfile:\
`[docker build -f Dockerfile-other -t my-image .](https://docs.docker.com/engine/reference/commandline/build/)`
- Rebuild all images (Compose):\
`[docker-compose build](https://docs.docker.com/compose/reference/build/)`
- Rebuild a specific image (Compose):\
`[docker-compose build my_service](https://docs.docker.com/compose/reference/build/)`
    - where `my_service` is one of the services listed in the `docker-compose.yml` file

## Creating containers

- Create a new container from an image:\
`[docker create my-image](https://docs.docker.com/engine/reference/commandline/create/)`
- Build new images and create all containers (Compose). (This will not rebuild images if a Dockerfile changes.) `[docker-compose up --no-start](https://docs.docker.com/compose/reference/up/)`

## Starting / stopping containers

- Start a container:\
`[docker start my_container](https://docs.docker.com/engine/reference/commandline/start/)`
- Stop a container:\
`[docker stop my_container](https://docs.docker.com/engine/reference/commandline/stop/)`
- Start all containers (Compose):\
`[docker-compose start](https://docs.docker.com/compose/reference/start/)`
- Stop all containers (Compose):\
`[docker-compose stop](https://docs.docker.com/compose/reference/stop/)`

## Running containers

`docker run` is a combination of (optionally) `docker pull`, `docker create`, and `docker start`. See also [Docker run reference](https://docs.docker.com/engine/reference/run/).

- Create a container from `my-image`, and run the default command:\
`[docker run my-image](https://docs.docker.com/engine/reference/commandline/run/)`
- Run the `echo` command in the container instead of the default command:\
`[docker run my-image echo "hello"](https://docs.docker.com/engine/reference/commandline/run/)`
- Run container in the background:\
`[docker run -d my-image](https://docs.docker.com/engine/reference/commandline/run/)`
- Run and remove the container after it exits:\
`[docker run --rm my-image](https://docs.docker.com/engine/reference/commandline/run/)`
- Create a container from `my-image`, named `my_container`, and start it:\
`[docker run --name my_container my-image](https://docs.docker.com/engine/reference/commandline/run/)`
- Run a container, setting an environment variable in the container:\
`[docker run --env MY_ENVIRONMENT_VAR=myvalue my-image](https://docs.docker.com/engine/reference/commandline/run/)`
- Build new images, create all containers, and start all containers (Compose). (This will not rebuild images if a Dockerfile changes.)\
`[docker-compose up](https://docs.docker.com/compose/reference/up/)`
- Build, create, and start all in the background (Compose):\
`[docker-compose up -d](https://docs.docker.com/compose/reference/up/)`
- *Rebuild all images*, create all containers, and start all containers (Compose):\
`[docker-compose up --build](https://docs.docker.com/compose/reference/up/)`
- Create a new container for `my_service` in `docker-compose.yml` and run the `echo` command instead of the specified command:\
`[docker-compose run my_service echo "hello"](https://docs.docker.com/compose/reference/run/)`

## volumes

- Run a container with a volume named `my_volume` mounted at `/my/path` in the Docker container. (The volume will be created if it doesn't already exist.) See the [Volumes documentation](https://docs.docker.com/storage/volumes/) for more information.\
`[docker run --mount source=my_volume,target=/my/path my-image](https://docs.docker.com/engine/reference/commandline/run/)`\
--- OR ---\
`[docker run -v my_volume:/my/path my-image](https://docs.docker.com/engine/reference/commandline/run/)`
- Copy all data from a volume named `my_volume_1` to a volume named `my_volume_2` by running the `cp` command in a temporary container created from a `debian` image^[1](https://www.saltycrane.com/cheat-sheets/docker/#footnote-1)^:\
`[docker run --rm -it -v my_volume_1:/from -v my_volume_2:/to debian bash -c "cp -av /from/. /to"](https://docs.docker.com/engine/reference/commandline/run/)`\
--- OR ---\
using `rsync` (after installing it first):\
`[docker run --rm -it -v my_volume_1:/from -v my_volume_2:/to debian bash -c "apt update && apt install -y rsync && rsync -avz /from/ /to/"](https://docs.docker.com/engine/reference/commandline/run/)`

## ports & networking

- Run and bind port 80 inside Docker to port 9090 on the host (outside Docker):\
`[docker run -p 9090:80 my-image](https://docs.docker.com/engine/reference/commandline/run/)`
- Run and access `localhost` on the host (outside Docker) using the special DNS name `host.docker.internal`. Requires Docker 18.03 or greater. (Before 18.03, `docker.for.mac.localhost` was available on Mac only.) See [https://docs.docker.com/docker-for-mac/networking/#use-cases-and-workarounds](https://docs.docker.com/docker-for-mac/networking/#use-cases-and-workarounds)\
`[docker run my-image ping host.docker.internal](https://docs.docker.com/engine/reference/commandline/run/)`
- Create a network:\
`[docker network create my_network](https://docs.docker.com/engine/reference/commandline/network_create/)`\
Run a container using a network:\
`[docker run --network=my_network my-image](https://docs.docker.com/engine/reference/commandline/run/)`

## Interacting with containers

- Interact with a running container using bash:\
`[docker exec -it my_container bash](https://docs.docker.com/engine/reference/commandline/exec/)`
- Show logs for a container:\
`[docker logs -f my_container](https://docs.docker.com/engine/reference/commandline/logs/)`
- Copy `my-file.txt` from the host current directory to the `/tmp` directory in `my_container`:\
`[docker cp ./my-file.txt my_container:/tmp/my-file.txt](https://docs.docker.com/engine/reference/commandline/cp/)`
- Interact with a running container using bash (Compose):\
`[docker-compose exec my_service bash](https://docs.docker.com/compose/reference/logs/)`
- Show all logs (Compose):\
`[docker-compose logs -f](https://docs.docker.com/compose/reference/logs/)`

## Getting information

- Show the Docker version:\
`[docker version](https://docs.docker.com/engine/reference/commandline/version/)`
- Show the commands used to build an image:\
`[docker history my-image](https://docs.docker.com/engine/reference/commandline/history/)`
- Show I/O, CPU, and Memory usage for a container:\
`[docker stats my_container](https://docs.docker.com/engine/reference/commandline/container_stats/)`
- Show files that have changed in a container:\
`[docker diff my_container](https://docs.docker.com/engine/reference/commandline/container_diff/)`
- Show running processes in a container:\
`[docker top my_container](https://docs.docker.com/engine/reference/commandline/top/)`
- Show a JSON blob of information about a image, container, volume, etc:\
`[docker inspect my-image`\
`docker inspect my_container`](https://docs.docker.com/engine/reference/commandline/inspect/)\
etc.
- Show all running processes (Compose):\
`[docker-compose top](https://docs.docker.com/compose/reference/top/)`
- `docker-compose` commands are shaded in gray. They assume a `docker-compose.yml` file in the current directory.