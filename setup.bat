@echo off
echo ========================================
echo Movie Search Engine - Quick Setup
echo ========================================
echo.

REM Check if .env exists
if not exist .env (
    echo [1/5] Creating .env file from template...
    copy .env.example .env
    echo.
    echo IMPORTANT: Please edit .env file and fill in your credentials:
    echo   - ES_PASSWORD: Your Elasticsearch password
    echo   - ES_CA_CERT_PATH: Path to your http_ca.crt file
    echo   - TMDB_API_KEY: Your TMDB API key
    echo.
    pause
) else (
    echo [1/5] .env file already exists, skipping...
)

echo.
echo [2/5] Installing Python dependencies...
pip install -r requirements.txt

echo.
echo [3/5] Fetching movie data from TMDB...
python fetch_movies.py

echo.
echo [4/5] Indexing movies to Elasticsearch...
echo Make sure Elasticsearch is running on https://localhost:9200
pause
python index_movies.py

echo.
echo [5/5] Installing frontend dependencies...
cd "电影搜索引擎网页 (1)"
if not exist .env (
    copy .env.example .env
)
npm install

echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo To start the application:
echo   1. Start Elasticsearch: start_elasticsearch.bat
echo   2. Start Backend: start_flask.bat
echo   3. Start Frontend: cd "电影搜索引擎网页 (1)" && npm run dev
echo.
echo Or use Docker: docker-compose up
echo.
pause
