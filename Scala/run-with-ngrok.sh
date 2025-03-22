#!/bin/bash

set -e

echo "Setting up Docker container and ngrok tunnel for Scala-Play-Commerce application..."

if ! command -v ngrok &> /dev/null; then
    echo "ngrok is not installed. Please install it first:"
    echo "Visit https://ngrok.com/download and follow instructions"
    exit 1
fi

if ! command -v docker &> /dev/null; then
    echo "Docker is not installed. Please install it first."
    exit 1
fi

if [ ! -f Dockerfile ]; then
    echo "Dockerfile not found. Please run this script from the root of the project."
    exit 1
fi

echo "Building Docker image..."
docker build -t play-scala-commerce .

echo "Running Docker container..."
docker run -d --name play-scala-commerce -p 9000:9000 play-scala-commerce

echo "Waiting for the application to start..."
sleep 10

if ! command -v ngrok &> /dev/null
then
    echo "Error: ngrok is not installed. Please install ngrok first."
    exit 1
fi

echo "Starting ngrok tunnel..."
ngrok http 9000 &

echo "Setup complete!"
echo "Your Scala application should now be accessible via the ngrok URL"
echo "To see the ngrok URL, check the ngrok dashboard at http://localhost:4040"
echo ""
echo "To stop the container and tunnel:"
echo "1. Kill the ngrok process (Ctrl+C if running in foreground)"
echo "2. Run 'docker stop scala-app-container && docker rm scala-app-container'"