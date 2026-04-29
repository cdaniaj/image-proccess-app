# Estágio 1: Build do React
FROM node:20-alpine AS build
WORKDIR /app

# Copia apenas os arquivos de dependências primeiro (otimiza o cache)
COPY package*.json ./
RUN npm install

# Copia todo o código e gera a versão de produção
COPY . .
RUN npm run build

# Estágio 2: Servindo com Nginx
FROM nginx:stable-alpine

# Copia os arquivos gerados no estágio anterior para a pasta do Nginx
COPY --from=build /app/out /usr/share/nginx/html
# Expõe a porta 80 (padrão do Nginx)
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]