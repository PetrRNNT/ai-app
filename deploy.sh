#!/bin/bash

# Deploy script for Enterprise TodoList
# Usage: ./deploy.sh

set -e

echo "🚀 Starting deployment..."

# Force stop and remove containers (even if hanging)
echo "📦 Stopping containers..."
docker compose down --timeout 10 || docker compose kill || true
docker rm -f todo-app todo-caddy 2>/dev/null || true

# Clean up old images (optional, comment out to keep cache)
echo "🧹 Cleaning old images..."
docker image rm todo-app:latest 2>/dev/null || true

# Load pre-built image if exists
if [ -f "todo-app.tar" ]; then
    echo "📥 Loading image from todo-app.tar..."
    docker load -i todo-app.tar
fi

# Start containers
echo "🏃 Starting containers..."
docker compose up -d

# Wait for app to be ready
echo "⏳ Waiting for app to start..."
sleep 30

# Show logs
echo "📋 Showing logs..."
docker compose logs --tail=50

echo "✅ Deployment complete!"
echo ""
echo "📝 Register user:"
echo "curl -X POST http://localhost:3000/api/auth -H 'Content-Type: application/json' -d '{\"email\":\"admin@example.com\",\"name\":\"Admin\",\"password\":\"admin123\"}'"
echo ""
echo "🌐 Or open in browser: http://localhost:3000"
