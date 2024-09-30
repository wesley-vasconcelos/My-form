# Projeto de Formulário Multi-Step

Este é um projeto de formulário de várias etapas desenvolvido com Vue.js no front-end e Express no back-end. O objetivo é mostrar o processo de construção de um formulário que recebe informações dos usuários e envia para um servidor.

## Estrutura do Projeto

```
my-form/
├── client/
│    └── src
└── server/
    └── server.js
```

## Pré-requisitos

- Node.js (v14 ou superior)
- npm ou yarn

## Instalação

1. Clone o repositório:

   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd my-form
   ```

2. Instale as dependências do cliente (Vue.js):

   ```bash
   cd client
   npm install
   # ou
   yarn install
   ```

3. Instale as dependências do servidor (Express):

   ```bash
   cd ../server
   npm install
   # ou
   yarn install
   ```

## Como Rodar o Frontend

1. Navegue até a pasta do cliente:

   ```bash
   cd client
   ```

2. Para iniciar o servidor de desenvolvimento do Vue.js:

   ```bash
   npm run serve
   # ou
   yarn serve
   ```

3. Acesse o aplicativo no navegador em `http://localhost:5173`.

## Como Rodar o Servidor

1. Primeiro, você precisa criar o build do frontend. Navegue até a pasta do cliente:

   ```bash
   cd client
   ```

2. Execute o comando de build:

   ```bash
   npm run build
   # ou
   yarn build
   ```

   Isso criará uma pasta `dist` dentro da pasta `client`, contendo os arquivos prontos para produção.

3. Agora, navegue até a pasta do servidor:

   ```bash
   cd server
   ```

4. Inicie o servidor Express:

   ```bash
   npm start
   ```

5. Acesse o aplicativo no navegador em `http://localhost:3000`.
