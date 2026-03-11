# 🌐 API Documentation

## Base URL

```
http://localhost:5000
```

## Endpoints

### 1. Health Check

Check if the API is running.

**Endpoint:** `GET /`

**Response:**
```
Movie search API is running. Try /search?q=castle
```

**Status Code:** `200 OK`

---

### 2. Search Movies

Search for movies using Elasticsearch full-text search.

**Endpoint:** `GET /search`

**Query Parameters:**

| Parameter | Type   | Required | Description                          |
|-----------|--------|----------|--------------------------------------|
| `q`       | string | No       | Search query (title, overview, etc.) |

**Example Requests:**

```bash
# Search for movies with "castle" in title or overview
GET /search?q=castle

# Get all movies (no search query)
GET /search
```

**Response Format:**

```json
{
  "total": 100,
  "results": [
    {
      "id": 550,
      "title": "Fight Club",
      "original_title": "Fight Club",
      "overview": "A ticking-time-bomb insomniac and a slippery soap salesman...",
      "original_language": "en",
      "release_date": "1999-10-15",
      "rating": 8.4,
      "popularity": 61.416,
      "genre_ids": [18, 53, 35],
      "poster": "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
      "score": 12.5
    }
  ]
}
```

**Response Fields:**

| Field              | Type     | Description                                    |
|--------------------|----------|------------------------------------------------|
| `total`            | integer  | Total number of matching movies                |
| `results`          | array    | Array of movie objects                         |
| `results[].id`     | integer  | Unique movie ID (TMDB ID)                      |
| `results[].title`  | string   | Movie title                                    |
| `results[].original_title` | string | Original title (may differ from title) |
| `results[].overview` | string | Movie description/synopsis                    |
| `results[].original_language` | string | ISO 639-1 language code          |
| `results[].release_date` | string | Release date (YYYY-MM-DD)              |
| `results[].rating` | float    | Average rating (0-10)                          |
| `results[].popularity` | float | Popularity score                            |
| `results[].genre_ids` | array | Array of genre IDs                          |
| `results[].poster` | string   | Poster image path or URL                       |
| `results[].score`  | float    | Elasticsearch relevance score                  |

**Status Codes:**

| Code | Description                          |
|------|--------------------------------------|
| 200  | Success                              |
| 500  | Internal server error                |

---

## Search Algorithm

The search uses Elasticsearch's `multi_match` query with weighted fields:

```python
{
  "multi_match": {
    "query": "search_term",
    "fields": [
      "title^5",           # Title weight: 5
      "original_title^4",  # Original title weight: 4
      "overview^2"         # Overview weight: 2
    ]
  }
}
```

**Field Weights Explained:**
- **Title (^5)**: Highest priority - exact title matches score highest
- **Original Title (^4)**: Second priority - for international films
- **Overview (^2)**: Lower priority - matches in description

**Example:**
- Searching "inception" will prioritize movies with "Inception" in the title
- Movies with "inception" only in the overview will score lower

---

## Genre IDs

TMDB uses numeric genre IDs. Here's the mapping:

| ID    | Genre        |
|-------|--------------|
| 28    | Action       |
| 12    | Adventure    |
| 16    | Animation    |
| 35    | Comedy       |
| 80    | Crime        |
| 99    | Documentary  |
| 18    | Drama        |
| 10751 | Family       |
| 14    | Fantasy      |
| 36    | History      |
| 27    | Horror       |
| 10402 | Music        |
| 9648  | Mystery      |
| 10749 | Romance      |
| 878   | Sci-Fi       |
| 10770 | TV Movie     |
| 53    | Thriller     |
| 10752 | War          |
| 37    | Western      |

---

## Error Handling

### Connection Errors

If Elasticsearch is not running:

```json
{
  "error": "Failed to connect to Elasticsearch",
  "message": "Connection refused"
}
```

### Invalid Queries

The API is lenient with queries. Empty or invalid queries return all movies (up to the limit).

---

## Rate Limiting

Currently, there is no rate limiting implemented. For production use, consider adding:
- Request throttling
- API key authentication
- Rate limits per IP/user

---

## CORS

CORS is enabled for all origins:

```python
from flask_cors import CORS
CORS(app)
```

For production, restrict to specific origins:

```python
CORS(app, origins=["https://yourdomain.com"])
```

---

## Example Usage

### cURL

```bash
# Search for movies
curl "http://localhost:5000/search?q=matrix"

# Get all movies
curl "http://localhost:5000/search"
```

### JavaScript (Fetch API)

```javascript
// Search movies
const searchMovies = async (query) => {
  const response = await fetch(
    `http://localhost:5000/search?q=${encodeURIComponent(query)}`
  );
  const data = await response.json();
  return data;
};

// Usage
searchMovies('inception').then(data => {
  console.log(`Found ${data.total} movies`);
  console.log(data.results);
});
```

### Python (requests)

```python
import requests

# Search movies
response = requests.get('http://localhost:5000/search', params={'q': 'avatar'})
data = response.json()

print(f"Found {data['total']} movies")
for movie in data['results']:
    print(f"{movie['title']} ({movie['rating']}/10)")
```

---

## Future API Endpoints

Planned endpoints for future versions:

### Get Movie by ID
```
GET /movies/{id}
```

### Get Genres
```
GET /genres
```

### Advanced Search
```
POST /search/advanced
Body: {
  "query": "string",
  "genres": [18, 28],
  "year_min": 2000,
  "year_max": 2020,
  "rating_min": 7.0
}
```

### Get Similar Movies
```
GET /movies/{id}/similar
```

---

## Testing the API

### Using Postman

1. Create a new GET request
2. URL: `http://localhost:5000/search?q=test`
3. Send request
4. View JSON response

### Using Browser

Simply navigate to:
```
http://localhost:5000/search?q=inception
```

### Using Python Script

```python
import requests
import json

def test_api():
    # Test health check
    response = requests.get('http://localhost:5000/')
    print("Health Check:", response.text)
    
    # Test search
    response = requests.get('http://localhost:5000/search', params={'q': 'matrix'})
    data = response.json()
    
    print(f"\nSearch Results: {data['total']} movies found")
    print(json.dumps(data['results'][0], indent=2))

if __name__ == '__main__':
    test_api()
```

---

## Performance Considerations

- **Response Time**: Typically 50-200ms for searches
- **Result Limit**: Currently returns up to 20 results per query
- **Caching**: No caching implemented (consider Redis for production)
- **Pagination**: Not yet implemented

---

## Security Notes

⚠️ **Important for Production:**

1. **Authentication**: Add API key or OAuth
2. **Rate Limiting**: Prevent abuse
3. **Input Validation**: Sanitize search queries
4. **HTTPS**: Use SSL/TLS in production
5. **CORS**: Restrict to specific domains
6. **Error Messages**: Don't expose internal details

---

## Support

For issues or questions:
- GitHub Issues: https://github.com/SakuseWen/MovieSearchEngine/issues
- Documentation: See README.md
