# koa-elasticsearch-guttenberg-tutorial

Based on [Docker and
Elasticsearch](https://blog.patricktriest.com/text-search-docker-elasticsearch/)

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
