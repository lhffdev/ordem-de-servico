#!/bin/bash
docker-compose up -d backend
docker-compose exec backend  rm -f tmp/pids/server.pid
docker-compose exec backend  bundle exec bin/rails s -b 0.0.0.0