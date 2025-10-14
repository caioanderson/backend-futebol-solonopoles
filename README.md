# 🚀 Projeto Node.js com TypeScript e Knex

Este projeto é uma API desenvolvida em **Node.js**, utilizando **TypeScript** e **Knex.js** para manipulação e versionamento de banco de dados (migrations).

---

## 🧩 Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Knex.js](https://knexjs.org/)
- [SQLite3](https://www.sqlite.org/) *(pode ser substituído por PostgreSQL, MySQL, etc.)*
- [ts-node](https://typestrong.org/ts-node/)
- [dotenv](https://github.com/motdotla/dotenv)

---

## ⚙️ Configuração do Ambiente

### 1. Clonar o repositório
```bash
git clone https://github.com/seu-usuario/backend-futebol-solonopoles.git
cd seu-repositorio
```

### 2. Instalar dependencias
```bash
npm install
```

## 🧱 Configuração do Banco de Dados

### 🧬 Criação das migrations

```bash
npm run knex -- migrate:latest
```