# koa-elasticsearch-guttenberg-tutorial

Made with ☕️ by [sc0ttwad3](http://www.sc0ttwad3.com)

## Elasticsearch 7

Docker-Compose setup for running elasticsearch, kibana, dejavu with persistent storage.

## Install

### Elasticsearch

First create an index for the books and verify it is listed as one of the indices:

```
λ curl -XPUT http://localhost:9200/books
{"acknowledged":true,"shards_acknowledged":true,"index":"books"}

λ curl -XGET http://localhost:9200/_cat/indices?
green open books  plTl1SD0QUCRTvWOFLOLsw 1 1 0 0   460b   230b
```

Then create field properties/mappings for each book entry and save the file as book-mappings.json\_:

```
{
  "properties": {
    "author": {
      "type": "text",
      "analyzer": "standard"
    },
    "text": {
      "type": "text",
      "analyzer": "english"
    },
    "title": {
      "type": "text",
      "analyzer": "standard",
      "boost": 2
    }
  }
}
```

And use...

```
$ curl -d "@book-mappings.json" -H 'Content-Type: application/json' -X PUT "localhost:9200/books/_mappings"
```

Or in Kibana DevTools use `PUT /books/_mappings` and then the contents of the book-mapping.json

## Running

### Example Operation Queries

## Notes

Anything I want to specifically note.

### Links

## Debug

Built/Installed latest curl 7.65 on SPECTRE360 machine.
