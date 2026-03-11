# Backend Dockerfile
FROM python:3.11-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application files
COPY app.py .
COPY config.py .
COPY fetch_movies.py .
COPY index_movies.py .
COPY movies.json .

# Expose port
EXPOSE 5000

# Run the application
CMD ["python", "app.py"]
