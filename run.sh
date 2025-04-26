#!/bin/bash

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Running docker-compose...${NC}"

if ! command -v docker-compose &> /dev/null; then
    echo "Docker Compose is not installed. Please install it first."
    exit 1
fi

echo -e "${GREEN} Building and running conainers...${NC}"
docker-compose up --build -d

echo -e "${GREEN}Checking containers...${NC}"
docker-compose ps

echo -e "${GREEN}Application has been opened successfully!${NC}"
echo -e "API: http://localhost:8080"
echo -e "Frontend: http://localhost:3000"
echo -e "${YELLOW}To stop an application, run:${NC} docker-compose down"