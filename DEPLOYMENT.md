# 🚀 Deployment Guide

This guide covers different deployment options for the Movie Search Engine.

## Table of Contents

- [Local Development](#local-development)
- [Docker Deployment](#docker-deployment)
- [Production Deployment](#production-deployment)
- [Cloud Deployment](#cloud-deployment)
- [Troubleshooting](#troubleshooting)

---

## Local Development

### Prerequisites

- Python 3.8+
- Node.js 16+
- Elasticsearch 9.x running locally

### Quick Start

```bash
# 1. Clone and setup
git clone https://github.com/SakuseWen/MovieSearchEngine.git
cd MovieSearchEngine

# 2. Run automated setup (Windows)
setup.bat

# 3. Start services
# Terminal 1: Backend
python app.py

# Terminal 2: Frontend
cd "电影搜索引擎网页 (1)"
npm run dev
```

### Manual Setup

```bash
# Backend
cp .env.example .env
# Edit .env with your credentials
pip install -r requirements.txt
python fetch_movies.py
python index_movies.py
python app.py

# Frontend
cd "电影搜索引擎网页 (1)"
cp .env.example .env
npm install
npm run dev
```

---

## Docker Deployment

### Using Docker Compose (Recommended)

```bash
# 1. Create environment file
cp .env.example .env
# Edit .env with your credentials

# 2. Start all services
docker-compose up -d

# 3. Check logs
docker-compose logs -f

# 4. Stop services
docker-compose down
```

### Individual Docker Containers

```bash
# Build backend
docker build -t movie-search-backend .

# Run backend
docker run -d \
  --name backend \
  -p 5000:5000 \
  --env-file .env \
  movie-search-backend

# Build frontend
docker build -t movie-search-frontend ./电影搜索引擎网页\ \(1\)

# Run frontend
docker run -d \
  --name frontend \
  -p 3000:3000 \
  -e VITE_API_URL=http://localhost:5000 \
  movie-search-frontend
```

---

## Production Deployment

### Backend (Flask)

#### Option 1: Gunicorn (Recommended)

```bash
# Install Gunicorn
pip install gunicorn

# Run with Gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

#### Option 2: uWSGI

```bash
# Install uWSGI
pip install uwsgi

# Run with uWSGI
uwsgi --http :5000 --wsgi-file app.py --callable app --processes 4
```

#### Nginx Configuration

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

### Frontend (React)

```bash
# Build for production
cd "电影搜索引擎网页 (1)"
npm run build

# Serve with nginx
# Copy build/ folder to /var/www/html
```

#### Nginx Configuration for Frontend

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://backend:5000;
    }
}
```

### Elasticsearch

For production, use Elasticsearch Cloud or self-hosted cluster:

```yaml
# elasticsearch.yml
cluster.name: movie-search-cluster
network.host: 0.0.0.0
discovery.type: single-node
xpack.security.enabled: true
xpack.security.http.ssl.enabled: true
```

---

## Cloud Deployment

### AWS

#### Using EC2

```bash
# 1. Launch EC2 instance (Ubuntu 20.04)
# 2. Install dependencies
sudo apt update
sudo apt install python3-pip nodejs npm

# 3. Install Elasticsearch
wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-9.2.1-linux-x86_64.tar.gz
tar -xzf elasticsearch-9.2.1-linux-x86_64.tar.gz
cd elasticsearch-9.2.1/
./bin/elasticsearch -d

# 4. Clone and setup project
git clone https://github.com/SakuseWen/MovieSearchEngine.git
cd MovieSearchEngine
# Follow production deployment steps
```

#### Using ECS (Docker)

```bash
# 1. Push images to ECR
aws ecr create-repository --repository-name movie-search-backend
docker tag movie-search-backend:latest <account-id>.dkr.ecr.<region>.amazonaws.com/movie-search-backend:latest
docker push <account-id>.dkr.ecr.<region>.amazonaws.com/movie-search-backend:latest

# 2. Create ECS task definition
# 3. Create ECS service
# 4. Configure load balancer
```

### Google Cloud Platform

#### Using Compute Engine

```bash
# Similar to AWS EC2 deployment
gcloud compute instances create movie-search \
  --image-family=ubuntu-2004-lts \
  --image-project=ubuntu-os-cloud \
  --machine-type=e2-medium
```

#### Using Cloud Run

```bash
# Build and push to Container Registry
gcloud builds submit --tag gcr.io/PROJECT_ID/movie-search-backend
gcloud builds submit --tag gcr.io/PROJECT_ID/movie-search-frontend

# Deploy to Cloud Run
gcloud run deploy backend --image gcr.io/PROJECT_ID/movie-search-backend
gcloud run deploy frontend --image gcr.io/PROJECT_ID/movie-search-frontend
```

### Heroku

```bash
# Backend
heroku create movie-search-backend
heroku addons:create bonsai:sandbox-10  # Elasticsearch addon
git push heroku main

# Frontend
cd "电影搜索引擎网页 (1)"
heroku create movie-search-frontend
heroku buildpacks:set heroku/nodejs
git push heroku main
```

### Vercel (Frontend Only)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd "电影搜索引擎网页 (1)"
vercel --prod
```

---

## Environment Variables

### Backend (.env)

```env
# Required
ES_HOST=https://your-elasticsearch-host:9200
ES_USER=elastic
ES_PASSWORD=your-password
ES_CA_CERT_PATH=/path/to/cert.crt
TMDB_API_KEY=your-api-key

# Optional
FLASK_DEBUG=False
FLASK_PORT=5000
```

### Frontend (.env)

```env
VITE_API_URL=https://your-api-domain.com
```

---

## Security Checklist

- [ ] Change default Elasticsearch password
- [ ] Use HTTPS for all connections
- [ ] Enable CORS only for specific domains
- [ ] Add rate limiting to API
- [ ] Implement API authentication
- [ ] Use environment variables for secrets
- [ ] Enable firewall rules
- [ ] Regular security updates
- [ ] Monitor logs for suspicious activity
- [ ] Backup Elasticsearch data regularly

---

## Performance Optimization

### Backend

```python
# Add caching
from flask_caching import Cache

cache = Cache(app, config={'CACHE_TYPE': 'redis'})

@app.route("/search")
@cache.cached(timeout=300, query_string=True)
def search_movies():
    # ...
```

### Frontend

```javascript
// Code splitting
const MovieDetail = lazy(() => import('./components/MovieDetail'));

// Image optimization
<img loading="lazy" src={poster} alt={title} />
```

### Elasticsearch

```python
# Increase result size
body = {
    "query": query,
    "size": 50,  # Increase from 20
    "from": offset  # For pagination
}
```

---

## Monitoring

### Backend Monitoring

```python
# Add logging
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@app.route("/search")
def search_movies():
    logger.info(f"Search query: {request.args.get('q')}")
    # ...
```

### Health Checks

```python
@app.route("/health")
def health():
    try:
        es.ping()
        return {"status": "healthy", "elasticsearch": "connected"}
    except:
        return {"status": "unhealthy", "elasticsearch": "disconnected"}, 503
```

---

## Troubleshooting

### Common Issues

#### Elasticsearch Connection Failed

```bash
# Check if Elasticsearch is running
curl -k -u elastic:password https://localhost:9200

# Check certificate path
ls -la /path/to/http_ca.crt

# Verify credentials in .env
```

#### Frontend Can't Connect to Backend

```bash
# Check CORS settings
# Verify VITE_API_URL in frontend .env
# Check if backend is running: curl http://localhost:5000
```

#### Docker Issues

```bash
# Check container logs
docker-compose logs backend
docker-compose logs frontend

# Restart services
docker-compose restart

# Rebuild images
docker-compose build --no-cache
```

---

## Backup and Recovery

### Elasticsearch Backup

```bash
# Create snapshot repository
curl -X PUT "localhost:9200/_snapshot/my_backup" -H 'Content-Type: application/json' -d'
{
  "type": "fs",
  "settings": {
    "location": "/mount/backups/my_backup"
  }
}'

# Create snapshot
curl -X PUT "localhost:9200/_snapshot/my_backup/snapshot_1?wait_for_completion=true"

# Restore snapshot
curl -X POST "localhost:9200/_snapshot/my_backup/snapshot_1/_restore"
```

---

## Scaling

### Horizontal Scaling

```yaml
# docker-compose.yml
services:
  backend:
    deploy:
      replicas: 3
    
  nginx:
    image: nginx
    volumes:
      - ./nginx-lb.conf:/etc/nginx/nginx.conf
```

### Load Balancer Configuration

```nginx
upstream backend {
    server backend1:5000;
    server backend2:5000;
    server backend3:5000;
}

server {
    location / {
        proxy_pass http://backend;
    }
}
```

---

## Support

For deployment issues:
- Check [Troubleshooting](#troubleshooting) section
- Review logs: `docker-compose logs` or application logs
- Open an issue: https://github.com/SakuseWen/MovieSearchEngine/issues

---

**Last Updated**: March 11, 2026
