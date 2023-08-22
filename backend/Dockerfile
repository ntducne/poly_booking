FROM php:8.1-fpm-alpine
WORKDIR /var/www/app
RUN apk update && apk add \
    curl \
    libpng-dev \
    libxml2-dev \
    zip \
    unzip \
    openssl-dev \
    oniguruma-dev \
    $PHPIZE_DEPS

RUN docker-php-ext-install pdo pdo_mysql
RUN pecl install mongodb && docker-php-ext-enable mongodb
RUN pecl install redis && docker-php-ext-enable redis
RUN apk --no-cache add nodejs npm
COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer
USER root
RUN chmod 777 -R /var/www/app