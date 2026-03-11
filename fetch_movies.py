import requests
import json
import time
import config

API_KEY = config.TMDB_API_KEY
BASE_URL = config.TMDB_BASE_URL

def fetch_movies(endpoint, pages=3):
    movies = []
    for page in range(1, pages + 1):
        url = f"{BASE_URL}{endpoint}?api_key={API_KEY}&language=en-US&page={page}"
        resp = requests.get(url).json()
        if "results" in resp:
            movies.extend(resp["results"])
        time.sleep(0.5)   # 防止过快访问
    return movies

all_movies = []
all_movies += fetch_movies("/movie/popular", pages=5)
all_movies += fetch_movies("/movie/top_rated", pages=5)
all_movies += fetch_movies("/trending/movie/week", pages=3)

# 去重（根据 id 去重）
unique = {m["id"]: m for m in all_movies}

# 简化字段
dataset = []
for m in unique.values():
    dataset.append({
        "id": m["id"],
        "title": m.get("title"),
        "overview": m.get("overview"),
        "rating": m.get("vote_average"),
        "popularity": m.get("popularity"),
        "release_date": m.get("release_date"),
        "genre_ids": m.get("genre_ids"),
        "poster_url": "https://image.tmdb.org/t/p/w500" + m["poster_path"] if m.get("poster_path") else None
    })

# 输出 movies.json
with open("movies.json", "w", encoding="utf-8") as f:
    json.dump(dataset, f, ensure_ascii=False, indent=2)

print("Done! Total movies =", len(dataset))
