# koa-elasticsearch-guttenberg-tutorial

Made with ☕️ by [sc0ttwad3](http://www.sc0ttwad3.com)

## Elasticsearch 7

Docker-Compose setup for running elasticsearch, kibana, dejavu with persistent storage.

## Install

### Elasticsearch

First create an index for the books and verify it is listed as one of the indices:

```
λ curl -XPUT http://localhost:9200/library                             
{"acknowledged":true,"shards_acknowledged":true,"index":"library"}     

λ curl -XGET http://localhost:9200/_cat/indices?                     
green open library  plTl1SD0QUCRTvWOFLOLsw 1 1 0 0   460b   230b
```

Then create field properties/mappings for each book entry and save the file as *book-mapping.json*:

```
{
  "properties": {
    "title": {"type": "keyword"},
    "author": {"type": "keyword"},
    "location": {"type": "integer"},
    "text": {"type": "text"}
  }
}
```


Then apply the mapping to the library index:

```
$ curl -d "@book-mapping.json" -H 'Content-Type: application/json' -X PUT "localhost:9200/library/_mapping"
```




## Running

### Example Operation Queries

## Notes

Anything I want to specifically note.

### Links

[Open Distro for Elasticsearch](http://opendistro.github.io/for-elasticsearch-docs/)

## Debug

Built/Installed latest curl 7.65 on SPECTRE360 machine.
