#!/usr/bin/env bash
export POSTGRES_PORT=5435
export POSTGRES_HOST=localhost
export POSTGRES_USER=lily
export POSTGRES_PASSWORD=Kbkz1993
export POSTGRES_DB=main
export POSTGRES_DB_SEED=true
export PG_CONNECTION_STRING=postgres://lily:Kbkz1993@localhost:5435

echo "Starting postgres"
docker rm -f postgres-petproject
docker build . -t postgres:petproject
docker run -d -p 5435:5432 --name postgres-petproject postgres:petproject