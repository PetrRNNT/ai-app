#!/bin/bash

# Deploy script for Enterprise TodoList
# Usage: ./deploy.sh

set -e

echo "🚀 Starting deployment..."

# Stop and remove containers
echo "📦 Stopping containers..."
docker compose down

# Clean up Docker cache
echo "🧹 Cleaning Docker cache..."
docker system prune -af --volumes --all

# Rebuild and start
echo "🔨 Building image..."
docker compose build --no-cache

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
