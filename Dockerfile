# Dockerfile
FROM postgres:11.1-alpine

ENV SEED $SEED
ENV POSTGRES_USER=lily
ENV POSTGRES_PASSWORD=Kbkz1993
ENV POSTGRES_DB=main

EXPOSE 5435
