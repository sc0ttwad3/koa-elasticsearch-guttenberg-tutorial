<h1 align="center">koa-elasticsearch-guttenberg-tutorial 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.0.1-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/sc0ttwad3/koa-elasticsearch-guttenberg-tutorial#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/sc0ttwad3/koa-elasticsearch-guttenberg-tutorial/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/sc0ttwad3/koa-elasticsearch-guttenberg-tutorial/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/sc0ttwad3/koa-elasticsearch-guttenberg-tutorial" />
  </a>
</p>

### 🏠 [Homepage](https://github.com/sc0ttwad3/koa-elasticsearch-guttenberg-tutorial#readme)

> Vue portal to node/koa service for full-text searching elasticsearch/kibana indexed Gutenberg Project literary works.

> Made with lots of ☕️ by sc0ttwad3

### Install

```sh
npm install
```

### elasticsearch/kibana

Use `docker-compose.yaml` to spin up elasticsearch/kibanan with persistent storage and node app.

```sh
docker-compose up # down to tear down
```

First create an index for the books and verify it is listed as one of the indices:

```sh
λ curl -XPUT http://localhost:9200/books
{"acknowledged":true,"shards_acknowledged":true,"index":"books"}

λ curl -XGET http://localhost:9200/_cat/indices?
green open books  plTl1SD0QUCRTvWOFLOLsw 1 1 0 0   460b   230b
```

The field mappings for book entries in `book-mappings.json`:

```json
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

To create the elasticsearch index mappings:

```
$ curl -d "@book-mappings.json" -H 'Content-Type: application/json' -X PUT "localhost:9200/books/_mappings"
```

(or use kibana devtools to `PUT /books/_mappings` and paste contents of book-mappings.json

### Usage

```sh
npm run start
```

### Run tests

```sh
npm run test
```

### Author

👤 **Scott Wade <<sc0ttwad3@gmail.com>> (http://sc0ttwad3.com)**

- Website: sc0ttwad3.com
- Github: [@sc0ttwad3](https://github.com/sc0ttwad3)

### 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/sc0ttwad3/koa-elasticsearch-guttenberg-tutorial/issues). You can also take a look at the [contributing guide](https://github.com/sc0ttwad3/koa-elasticsearch-guttenberg-tutorial/blob/master/CONTRIBUTING.md).

### Show your support

Give a ⭐️ if this project helped you!

### 📝 License

Copyright © 2020 [Scott Wade <sc0ttwad3@gmail.com> (http://sc0ttwad3.com)](https://github.com/sc0ttwad3).<br />
This project is [MIT](https://github.com/sc0ttwad3/koa-elasticsearch-guttenberg-tutorial/blob/master/LICENSE) licensed.

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
