#!/bin/bash
docker-compose up -d frontend
docker-compose exec frontend yarn run ng serve --host 0.0.0.0
