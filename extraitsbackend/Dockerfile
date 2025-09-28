# Étape 1 : builder les dépendances Laravel
FROM php:8.2-fpm

# Installer les dépendances système
RUN apt-get update && apt-get install -y \
    git curl libpng-dev libjpeg-dev libfreetype6-dev zip unzip libonig-dev libxml2-dev \
    && docker-php-ext-install pdo pdo_mysql mbstring exif pcntl bcmath gd

# Installer Composer
COPY --from=composer:2.7 /usr/bin/composer /usr/bin/composer

# Copier les fichiers
WORKDIR /var/www
COPY . .

# Installer les dépendances Laravel
RUN composer install --no-dev --optimize-autoloader

# Installer Node.js (pour build Vite si nécessaire)
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && npm install && npm run build

# Donner les permissions (important pour storage et bootstrap/cache)
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

# Exposer le port 8000
EXPOSE 8000

# Lancer Laravel avec Artisan
CMD php artisan migrate --force && php artisan serve --host=0.0.0.0 --port=8000
