FROM php:8.0-apache

WORKDIR /var/www/html/

COPY ./scripts/serverside /var/www/html/