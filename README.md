# Image Process App

Uma aplicação Next.js para processamento e manipulação de imagens com interface interativa.

## 📋 Sobre o Projeto

**Image Process App** é uma aplicação web moderna construída com Next.js que permite aos usuários processar e manipular imagens mamograficas de forma fácil e intuitiva afim de levar maior precisao e eficiencia na analise mamografica. A aplicação é desenvolvida com TypeScript, React 19 e Tailwind CSS, oferecendo uma experiência de usuário responsiva e de alta performance.

### Tecnologias Utilizadas

- **Next.js 16.2.2** - Framework React com SSR e otimizações
- **React 19.2.4** - Biblioteca de interface de usuário
- **TypeScript** - Tipagem estática para maior segurança
- **Tailwind CSS** - Framework CSS utility-first
- **React Image Crop** - Ferramenta de corte de imagens
- **React Icons** - Ícones SVG reutilizáveis

## 🚀 Como Funciona

A aplicação permite que você:

1. **Carregue imagens** - Selecione imagens PNG ou JPEG de mamografias
2. **Recorte imagens** - Use a ferramenta de corte interativa para maior precisao de analise
4. **Processamento e analise da amostra** - Solicita analise de amostra e extracao de dados baseado na amostra selecionada

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
Abra seu navegador e acesse [http://localhost](http://localhost:3000)

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
├── app/                    # Pasta principal da aplicação Next.js
│   └── page.tsx            # Página principal
│   └── components/         # Pasta de componentes
│     └── CropImage         # Componente para recorte de imagens
│     └── DiagnosticButton  # Botao personalizado para disparar funcao para analise de amostra
│     └── Form              # Componente de formulario para dados de pacientes
│     └── Header            # Header da pagina
│     └── Result            # Container para demonstracao de resultados obtidos pela analise de amostra
│     └── Title             # Titulo da pagina

│   └── services/            # Pasta com servicos essenciais
│     └── patientService.ts  # Integracao com APIs para extracao de dados via amostra e confirmacao dos dados via humano (exporta amostra           analisada e nova linha no csv)

├── out/               # Arquivos buildados
├── public/            # Arquivos estáticos
├── Dockerfile         # Configuração Docker multi-stage
├── package.json       # Dependências do projeto
├── tailwind.config.js # Configuração Tailwind CSS
└── tsconfig.json      # Configuração TypeScript
```

## 👤 Autor

[cdaniaj](https://github.com/cdaniaj)
