#!/bin/sh
docker compose -f docker-compose.dev.yaml up -d --build
docker compose -f docker-compose.dev.yaml logs -f