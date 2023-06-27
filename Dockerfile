# Estágio de compilação
FROM node:18.16.0 AS node

WORKDIR /app

COPY . .

RUN npm install --quiet --no-optional --no-fund --loglevel=error

RUN npm run build --prod

# Estágio de produção
FROM nginx:alpine
VOLUME /var/cache/nginx
COPY --from=node /app/dist/hi-interface /usr/share/nginx/html
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf
