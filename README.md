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
