# koa-elasticsearch-guttenberg-tutorial

Based on [Docker and
Elasticsearch](https://blog.patricktriest.com/text-search-docker-elasticsearch/)

📚 Some important links:

[New elasticsearch client](https://www.elastic.co/blog/new-elasticsearch-javascript-client-released)

[Promise Essential Utils](https://github.com/blend/promise-utils)

[GUI for elasticsearch alerting](https://github.com/ServerCentral/praeco)



## Building the container

Update the version number to match package.json entry

```
docker build -t koa-node:v0.0.1 .
```

## Starting the container/app

Run container detached and optionally, limit the memory it can consume (the default is all the hardware CPU/RAM).

Is there a --loglevel setting to be used. None set.

```
docker-compose up -d -m "300M" --memory-swap "1G"
```

### Docker commands cheat sheet

```
# Basic Docker Commands
docker container --help
docker --version
docker version
docker info
docker run hello-world
docker images # better way to get locally available images on your host/computer
docker image ls

## List Docker containers (running, all, all in quiet mode)
docker container ls
docker container ls --all
docker container ls -aq

# Advanced Docker Commands
docker build -t friendlyhello .    # Create image using this directory's Dockerfile
docker run -p 4000:80 friendlyhello   # Run "friendlyhello" mapping port 4000 to 80
docker run -d -p 4000:80 friendlyhello           # Same thing, but in detached mode
docker container ls                                   # List all running containers
docker container ls -a                # List all containers, even those not running
docker container ls -q                                      # List container IDs
docker container stop <hash>           # Gracefully stop the specified container
docker container kill <hash>         # Force shutdown of the specified container
docker container rm <hash>        # Remove specified container from this machine
docker container rm $(docker container ls -a -q)         # Remove all containers
docker image ls -a                             # List all images on this machine
docker image rm <image id>            # Remove specified image from this machine
docker image rm $(docker image ls -a -q)   # Remove all images from this machine
docker image prune                                  # remove all dangling images
docker login             # Log in this CLI session using your Docker credentials
docker tag <image> username/repository:tag  # Tag <image> for upload to registry
docker push username/repository:tag            # Upload tagged image to registry
docker run username/repository:tag                   # Run image from a registry

docker inspect <task or container>                   # Inspect task or container
docker system prune -f       # forcibly remove dangling, stopped, cache and more
```
