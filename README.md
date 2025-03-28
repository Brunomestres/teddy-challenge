# 📌 API de Encurtador de URL

Esta API permite encurtar URLs, gerenciar usuários e autenticação.

## 🚀 Tecnologias

- **NestJS**  
- **PostgreSQL**  
- **Docker**  
- **Swagger**  
- **JWT (Autenticação)**  
- **Prisma (ORM)**  
- **Class Validator (Validação de dados)**  

## 🛠️ Como rodar localmente

### 🔹 Usando Docker

```sh
# Clone o repositório
git clone https://github.com/seu-usuario/url-shortener.git
cd url-shortener

# Suba os containers
docker-compose up -d
```
A API estará disponível em `http://localhost:3333`

### 🔹 Sem Docker

```sh
# Clone o repositório
git clone https://github.com/seu-usuario/url-shortener.git
cd url-shortener

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env

# Rode as migrações do banco
yarn prisma migrate dev

# Inicie a API
npm run start
```

## 📖 Documentação da API

A documentação está disponível via **Swagger** em:

🔗 [`http://localhost:3000/api/docs`](http://localhost:3000/api/docs)

## 🔐 Autenticação

A API utiliza **JWT**. Para acessar endpoints protegidos:

1. Autentique-se na rota `/auth/login`
2. Copie o token JWT
3. No Swagger, clique em "Authorize" e cole o token

## 📌 Endpoints principais

### 🔹 Criar um usuário

**POST** `/auth/register`

```json
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "123456"
}
```

### 🔹 Autenticar usuário

**POST** `/auth/login`

```json
{
  "email": "johndoe@example.com",
  "password": "123456"
}
```

Resposta:

```json
{
  "access_token": "eyJhbGciOiJI..."
}
```

### 🔹 Encurtar uma URL

**POST** `/short`

```json
{
  "url": "https://example.com"
}
```

Resposta:

```json
{
  "url": "http://short.ly/abc123"
}
```

## 📜 Licença

Este projeto está sob a licença MIT.
