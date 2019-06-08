# koa-elasticsearch-guttenberg-tutorial

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


c:\projects\docker\opendistro-es (master -> origin)
λ curl -XGET https://localhost:9200/_cat/nodes?v
ip         heap.percent ram.percent cpu load_1m load_5m load_15m node.role master name
172.24.0.3           41          97  55    3.43    2.62     1.72 mdi       *      6ScgflG
172.24.0.2           39          97  55    3.43    2.62     1.72 mdi       -      eDsUGlT

c:\projects\docker\opendistro-es (master -> origin)
λ curl -XGET http://localhost:9200/_cat/plugins?v
name    component                       version
6ScgflG opendistro_alerting             0.9.0.0
6ScgflG opendistro_performance_analyzer 0.9.0.0
6ScgflG opendistro_security             0.9.0.0
6ScgflG opendistro_sql                  0.9.0.0
eDsUGlT opendistro_alerting             0.9.0.0
eDsUGlT opendistro_performance_analyzer 0.9.0.0
eDsUGlT opendistro_security             0.9.0.0
eDsUGlT opendistro_sql                  0.9.0.0

c:\projects\docker\opendistro-es (master -> origin)
λ curl -XGET http://localhost:9200/_cat/health?v
epoch      timestamp cluster      status node.total node.data shards pri relo init unassign pending_tasks max_task_wait_time active_shards_percent
1558634629 18:03:49  odfe-cluster green           2         2      4   2    0    0        0             0
             -                100.0%
```

## Notes

Anything I want to specifically note.

### Links


[Open Distro for Elasticsearch](http://opendistro.github.io/for-elasticsearch-docs/)

## Debug

Built/Installed latest curl 7.65 on SPECTRE360 machine.

```
7.61.x
(stock apt pkg pre-installed)
------------------------------

curl 7.61.0 (x86_64-pc-linux-gnu) libcurl/7.61.0 OpenSSL/1.1.1 zlib/1.2.11 libidn2/2.0.5 libpsl/0.20.2 (+libidn2/2.0.4) nghttp2/1.32.1 librtmp/2.3
Release-Date: 2018-07-11
Protocols: dict file ftp ftps gopher http https imap imaps ldap ldaps pop3 pop3s rtmp rtsp smb smbs smtp smtps telnet tftp
Features: AsynchDNS IDN IPv6 Largefile GSS-API Kerberos SPNEGO NTLM NTLM_WB SSL libz TLS-SRP HTTP2 UnixSockets HTTPS-proxy PSL


7.65.x
(latest source locally compiled)
------------------------------

curl 7.65.0 (x86_64-pc-linux-gnu) libcurl/7.65.0 OpenSSL/1.1.1 zlib/1.2.11 libidn2/2.0.5 libpsl/0.20.2 (+libidn2/2.0.4) libssh2/1.8.0 nghttp2/1.32.1 librtmp/2.3
Release-Date: 2019-05-22
Protocols: dict file ftp ftps gopher http https imap imaps pop3 pop3s rtmp rtsp scp sftp smb smbs smtp smtps telnet tftp
Features: AsynchDNS HTTP2 HTTPS-proxy IDN IPv6 Largefile libz NTLM NTLM_WB PSL SSL TLS-SRP UnixSockets
```
