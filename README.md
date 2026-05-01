# Image Process App

Uma aplicação Next.js para processamento e manipulação de imagens com interface interativa.

## 📋 Sobre o Projeto

**Image Process App** é uma aplicação web moderna construída com Next.js que permite aos usuários processar e manipular imagens de forma fácil e intuitiva. A aplicação é desenvolvida com TypeScript, React 19 e Tailwind CSS, oferecendo uma experiência de usuário responsiva e de alta performance.

### Tecnologias Utilizadas

- **Next.js 16.2.2** - Framework React com SSR e otimizações
- **React 19.2.4** - Biblioteca de interface de usuário
- **TypeScript** - Tipagem estática para maior segurança
- **Tailwind CSS** - Framework CSS utility-first
- **React Image Crop** - Ferramenta de corte de imagens
- **React Icons** - Ícones SVG reutilizáveis

## 🚀 Como Funciona

A aplicação permite que você:

1. **Carregue imagens** - Selecione imagens do seu computador
2. **Processe imagens** - Aplique várias operações de processamento
3. **Recorte imagens** - Use a ferramenta de corte interativa
4. **Exporte resultados** - Baixe as imagens processadas

A arquitetura utiliza componentes React reutilizáveis e otimizados para performance, com hot-reload em desenvolvimento para melhor experiência de desenvolvimento.

## 💻 Como Executar Localmente

### Pré-requisitos

- Node.js 20+ instalado
- npm, yarn, pnpm ou bun como gerenciador de pacotes

### Instalação e Execução

1. **Clone o repositório:**
```bash
git clone https://github.com/cdaniaj/image-proccess-app.git
cd image-proccess-app
```

2. **Instale as dependências:**
```bash
npm install
# ou
yarn install
# ou
pnpm install
# ou
bun install
```

3. **Inicie o servidor de desenvolvimento:**
```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
```

4. **Acesse a aplicação:**
Abra seu navegador e acesse [http://localhost:3000](http://localhost:3000)

A aplicação será recarregada automaticamente quando você modificar os arquivos.

### Comandos Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria a build otimizada para produção
- `npm start` - Inicia o servidor de produção
- `npm run lint` - Executa o linter ESLint

## 🐳 Como Executar com Docker

### Pré-requisitos

- Docker instalado e em execução

### Instruções de Execução

1. **Build da imagem Docker:**
```bash
docker build -t image-process-app:latest .
```

2. **Execute o container:**
```bash
docker run -p 80:80 image-process-app:latest
```

3. **Acesse a aplicação:**
Abra seu navegador e acesse [http://localhost](http://localhost)

### Detalhes do Dockerfile

O Dockerfile utiliza um **build multi-stage** otimizado para produção:

**Estágio 1 - Build:**
- Usa `node:20-alpine` como imagem base
- Instala as dependências
- Faz o build da aplicação Next.js
- Gera os arquivos estáticos em `/app/out`

**Estágio 2 - Produção:**
- Usa `nginx:stable-alpine` como servidor
- Copia os arquivos compilados do estágio anterior
- Expõe a porta 80
- Serve a aplicação com Nginx

### Variações de Execução do Docker

**Com nome customizado:**
```bash
docker run -p 8080:80 --name my-image-app image-process-app:latest
```

**Em modo detached (background):**
```bash
docker run -d -p 80:80 image-process-app:latest
```

**Com rebuild sem cache:**
```bash
docker build --no-cache -t image-process-app:latest .
```

## 📁 Estrutura do Projeto

```
image-proccess-app/
├── app/               # Pasta principal da aplicação Next.js
│   └── page.tsx       # Página principal
├── components/        # Componentes React reutilizáveis
├── public/            # Arquivos estáticos
├── Dockerfile         # Configuração Docker multi-stage
├── package.json       # Dependências do projeto
├── tailwind.config.js # Configuração Tailwind CSS
└── tsconfig.json      # Configuração TypeScript
```

## 📚 Saiba Mais

Para aprender mais sobre as tecnologias utilizadas:

- [Documentação Next.js](https://nextjs.org/docs) - Recursos e guias do Next.js
- [Tutorial Next.js](https://nextjs.org/learn) - Tutorial interativo
- [Documentação React](https://react.dev) - Guia completo do React
- [Documentação Tailwind CSS](https://tailwindcss.com/docs) - Referência de classes CSS
- [Docker Documentation](https://docs.docker.com/) - Guia de Docker

## 🚀 Deploy

### Deploy em Vercel

A forma mais fácil de fazer deploy de uma aplicação Next.js é usar a [Vercel Platform](https://vercel.com):

1. Faça push do seu código para um repositório GitHub
2. Conecte seu repositório à Vercel
3. Vercel detectará automaticamente que é um projeto Next.js
4. O deploy será feito automaticamente a cada push

Confira a [documentação de deployment do Next.js](https://nextjs.org/docs/app/building-your-application/deploying) para mais detalhes.

## 📝 Licença

Este projeto está disponível sob a licença especificada no repositório.

## 👤 Autor

[cdaniaj](https://github.com/cdaniaj)