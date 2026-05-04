# Estágio 1: Build do React
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
# Usamos o 'ci' para instalações mais limpas em ambientes de build
RUN npm ci

COPY . .
RUN npm run build

# Estágio 2: Servindo com Nginx
FROM nginx:stable-alpine

# IMPORTANTE: Verifique se sua pasta de build é 'dist', 'build' ou 'out'
# Vou usar 'dist' como exemplo (padrão do Vite)
COPY --from=build /app/out /usr/share/nginx/html

# Opcional: Copiar uma config do Nginx para suportar React Router
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]