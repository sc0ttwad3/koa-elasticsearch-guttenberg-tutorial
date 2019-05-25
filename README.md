# opendistro-es

Opendistro-for-Elasticsearch 0.9.0

Docker-Compose setup for running elasticsearch, kibana, dejavu with persistent storage.

## Install

## Running

### Example Operation Queries


```
c:\projects\docker\opendistro-es (master -> origin)
λ curl -XGET https://localhost:9200 -u admin:admin --insecure
{
  "name" : "6ScgflG",
  "cluster_name" : "odfe-cluster",
  "cluster_uuid" : "Vk1MMjnaQvSzjoj2S54QWw",
  "version" : {
    "number" : "6.7.1",
    "build_flavor" : "oss",
    "build_type" : "tar",
    "build_hash" : "2f32220",
    "build_date" : "2019-04-02T15:59:27.961366Z",
    "build_snapshot" : false,
    "lucene_version" : "7.7.0",
    "minimum_wire_compatibility_version" : "5.6.0",
    "minimum_index_compatibility_version" : "5.0.0"
  },
  "tagline" : "You Know, for Search"
}

c:\projects\docker\opendistro-es (master -> origin)
λ curl -XGET https://localhost:9200/_cat/nodes?v -u admin:admin --insecure
ip         heap.percent ram.percent cpu load_1m load_5m load_15m node.role master name
172.24.0.3           41          97  55    3.43    2.62     1.72 mdi       *      6ScgflG
172.24.0.2           39          97  55    3.43    2.62     1.72 mdi       -      eDsUGlT

c:\projects\docker\opendistro-es (master -> origin)
λ curl -XGET https://localhost:9200/_cat/plugins?v -u admin:admin --insecure
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
λ curl -XGET https://localhost:9200/_cat/health?v -u admin:admin --insecure
epoch      timestamp cluster      status node.total node.data shards pri relo init unassign pending_tasks max_task_wait_time active_shards_percent
1558634629 18:03:49  odfe-cluster green           2         2      4   2    0    0        0             0
             -                100.0%
```

## Notes

Anything I want to specifically note.

### Links

[Open Distro for Elasticsearch](https://opendistro.github.io/for-elasticsearch-docs/)

## Debug

This is the security related portion of the bootup of opendistro-es

```
odfe-node1    | OpenDistro for Elasticsearch Security Demo Installer
odfe-node1    |  ** Warning: Do not use on production or public reachable systems **
odfe-node1    | Basedir: /usr/share/elasticsearch
odfe-node1    | Elasticsearch install type: rpm/deb on CentOS Linux release 7.6.1810 (Core)
odfe-node1    | Elasticsearch config dir: /usr/share/elasticsearch/config
odfe-node1    | Elasticsearch config file: /usr/share/elasticsearch/config/elasticsearch.yml
odfe-node1    | Elasticsearch bin dir: /usr/share/elasticsearch/bin
odfe-node1    | Elasticsearch plugins dir: /usr/share/elasticsearch/plugins
odfe-node1    | Elasticsearch lib dir: /usr/share/elasticsearch/lib
odfe-node1    | Detected Elasticsearch Version: x-content-6.7.1
odfe-node1    | Detected Open Distro Security Version: 0.9.0.0
odfe-node1    |
odfe-node1    | ### Success
odfe-node1    | ### Execute this script now on all your nodes and then start all nodes
odfe-node1    | ### Open Distro Security will be automatically initialized.
odfe-node1    | ### If you like to change the runtime configuration
odfe-node1    | ### change the files in ../securityconfig and execute:
odfe-node1    | "/usr/share/elasticsearch/plugins/opendistro_security/tools/securityadmin.sh" -cd "/usr/share/elasticsearch/plugins/opendistro_security/securityconfig" -icl -key "/usr/share/elasticsearch/config/kirk-key.pem" -cert "/usr/share/elasticsearch/config/kirk.pem" -cacert "/usr/share/elasticsearch/config/root-ca.pem" -nhnv
odfe-node1    | ### or run ./securityadmin_demo.sh
odfe-node1    | ### To use the Security Plugin ConfigurationGUI
odfe-node1    | ### To access your secured cluster open https://<hostname>:<HTTP port> and log in with admin/admin.
odfe-node1    | ### (Ignore the SSL certificate warning because we installed self-signed demo certificates)
```

Other warnings

```
odfe-node1    | [2019-05-24T18:13:31,344][WARN ][c.a.o.s.OpenDistroSecurityPlugin] [V4NIa4L] Directory /usr/share/elasticsearch/config has insecure file permissions (should be 0700)
odfe-node1    | [2019-05-24T18:13:31,344][WARN ][c.a.o.s.OpenDistroSecurityPlugin] [V4NIa4L] File /usr/share/elasticsearch/config/log4j2.properties has insecure file permissions (should be 0600)
odfe-node1    | [2019-05-24T18:13:31,345][WARN ][c.a.o.s.OpenDistroSecurityPlugin] [V4NIa4L] File /usr/share/elasticsearch/config/elasticsearch.yml has insecure file permissions (should be 0600)
odfe-node1    | [2019-05-24T18:13:31,346][WARN ][c.a.o.s.OpenDistroSecurityPlugin] [V4NIa4L] File /usr/share/elasticsearch/config/esnode.pem has insecure file permissions (should be 0600)
odfe-node1    | [2019-05-24T18:13:31,362][WARN ][c.a.o.s.OpenDistroSecurityPlugin] [V4NIa4L] File /usr/share/elasticsearch/config/kirk-key.pem has insecure file permissions (should be 0600)
odfe-node1    | [2019-05-24T18:13:31,364][WARN ][c.a.o.s.OpenDistroSecurityPlugin] [V4NIa4L] File /usr/share/elasticsearch/config/esnode-key.pem has insecure file permissions (should be 0600)
odfe-node1    | [2019-05-24T18:13:31,371][WARN ][c.a.o.s.OpenDistroSecurityPlugin] [V4NIa4L] File /usr/share/elasticsearch/config/kirk.pem has insecure file permissions (should be 0600)
odfe-node1    | [2019-05-24T18:13:31,376][WARN ][c.a.o.s.OpenDistroSecurityPlugin] [V4NIa4L] File /usr/share/elasticsearch/config/root-ca.pem has insecure file permissions (should be 0600)
```

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
------------------------------

curl 7.65.0 (x86_64-pc-linux-gnu) libcurl/7.65.0 OpenSSL/1.1.1 zlib/1.2.11 libidn2/2.0.5 libpsl/0.20.2 (+libidn2/2.0.4) libssh2/1.8.0 nghttp2/1.32.1 librtmp/2.3
Release-Date: 2019-05-22
Protocols: dict file ftp ftps gopher http https imap imaps pop3 pop3s rtmp rtsp scp sftp smb smbs smtp smtps telnet tftp
Features: AsynchDNS HTTP2 HTTPS-proxy IDN IPv6 Largefile libz NTLM NTLM_WB PSL SSL TLS-SRP UnixSockets
```


