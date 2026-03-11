from elasticsearch import Elasticsearch
from elasticsearch.helpers import bulk
import json
import config

es = Elasticsearch(
    [config.ES_HOST],
    basic_auth=(config.ES_USER, config.ES_PASSWORD),
    ca_certs=config.ES_CA_CERT_PATH,
    verify_certs=True
)

print(es.info())

INDEX = config.ES_INDEX

with open("movies.json", "r", encoding="utf-8") as f:
    data = json.load(f)

actions = [
    {"_index": INDEX, "_id": m["id"], "_source": m}
    for m in data
]

bulk(es, actions)
print("Indexed", len(actions), "movies.")
