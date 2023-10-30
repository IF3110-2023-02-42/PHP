# FROM php:8.0-apache

# # PHP extensions

# RUN apt-get update

# # Install Postgre PDO
# RUN apt-get install -y libpq-dev \
#     && docker-php-ext-configure pgsql -with-pgsql=/usr/local/pgsql \
#     && docker-php-ext-install pdo pdo_mysql pdo_pgsql pgsql 
# RUN a2enmod rewrite

FROM php:8.0-apache

# PHP extensions
RUN apt-get update

# Install MySQL Client and PDO for MySQL
RUN apt-get install -y default-mysql-client \
    && docker-php-ext-install pdo pdo_mysql

# Enable Rewrite Module
RUN a2enmod rewrite
