FROM php:8.0-apache
WORKDIR /var/www/html/

COPY ./scripts/serverside /var/www/html/

# PHP extensions
RUN apt-get update

# Install MySQL Client and PDO for MySQL
RUN apt-get install -y default-mysql-client \
    && docker-php-ext-install pdo pdo_mysql

# Enable Rewrite Module
RUN a2enmod rewrite
