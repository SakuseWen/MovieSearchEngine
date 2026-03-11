from flask import Flask, request, jsonify
from elasticsearch import Elasticsearch
from flask_cors import CORS
import config

app = Flask(__name__)
CORS(app)

# 连接 Elasticsearch
es = Elasticsearch(
    [config.ES_HOST],
    basic_auth=(config.ES_USER, config.ES_PASSWORD),
    ca_certs=config.ES_CA_CERT_PATH,
    verify_certs=True
)

INDEX = config.ES_INDEX


@app.route("/")
def home():
    return "Movie search API is running. Try /search?q=castle"


@app.route("/search")
def search_movies():
    q = request.args.get("q", "").strip()

    if q:
        query = {
            "multi_match": {
                "query": q,
                "fields": [
                    "title^5",
                    "original_title^4",
                    "overview^2"
                ]
            }
        }
    else:
        query = {"match_all": {}}

    body = {
        "query": query,
        "size": 20
    }

    resp = es.search(index=INDEX, body=body)

    results = []
    for hit in resp["hits"]["hits"]:
        src = hit["_source"]
        results.append({
            "id": src.get("id"),
            "title": src.get("title"),
            "original_title": src.get("original_title"),
            "overview": src.get("overview"),
            "original_language": src.get("original_language"),
            "release_date": src.get("release_date"),
            "rating": src.get("vote_average"),
            "popularity": src.get("popularity"),
            "genre_ids": src.get("genre_ids"),
            "poster": src.get("poster_path") or src.get("poster_url"),
            "score": hit["_score"],
        })

    return jsonify({
        "total": resp["hits"]["total"]["value"],
        "results": results
    })


if __name__ == "__main__":
    app.run(debug=config.FLASK_DEBUG, port=config.FLASK_PORT)
