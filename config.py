import os
from dotenv import load_dotenv

load_dotenv()

# Elasticsearch Configuration
ES_HOST = os.getenv('ES_HOST', 'https://localhost:9200')
ES_USER = os.getenv('ES_USER', 'elastic')
ES_PASSWORD = os.getenv('ES_PASSWORD', '')
ES_CA_CERT_PATH = os.getenv('ES_CA_CERT_PATH', '')
ES_INDEX = 'movies'

# TMDB API Configuration
TMDB_API_KEY = os.getenv('TMDB_API_KEY', '')
TMDB_BASE_URL = 'https://api.themoviedb.org/3'

# Flask Configuration
FLASK_DEBUG = os.getenv('FLASK_DEBUG', 'True') == 'True'
FLASK_PORT = int(os.getenv('FLASK_PORT', 5000))
