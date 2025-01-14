# CRUD de Tarefas

Este repositório é um monorepo contendo um projeto de CRUD de tarefas com backend em NestJS e frontend em ReactJS. Ele utiliza Prisma como ORM e é totalmente configurado para rodar localmente com Docker Compose.

## Tecnologias Utilizadas

### Backend

- **NestJS**: Framework Node.js para a construção de aplicações server-side.
- **Prisma**: ORM para gerenciar o banco de dados.

### Frontend

- **ReactJS**: Biblioteca para construção de interfaces de usuário.

### Infraestrutura

- **Docker Compose**: Para orquestrar os containers do backend, frontend e banco de dados.

## Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas:

- **Docker** e **Docker Compose**

## Como Rodar o Projeto

1. Clone o repositório:

   ```bash
   git clone https://github.com/MikaelMarceniuk/crud-tarefas-upbet.git
   cd crud-tarefas-upbet
   ```

2. Execute o comando para subir todos os serviços:

   ```bash
   docker-compose up
   ```

3. Acesse os serviços:

   - **Frontend**: [http://localhost:3001](http://localhost:3000)
   - **Backend**: [http://localhost:3000](http://localhost:3001)

4. (Opcional) Para rodar migrações do banco de dados Prisma:

   ```bash
   docker-compose exec backend npx prisma migrate dev
   ```

## Estrutura do Monorepo

```
.
├── packages/backend    # Código do backend em NestJS
├── packages/frontend   # Código do frontend em ReactJS
├── docker-compose.yml  # Configuração para Docker Compose
└── README.md  # Documentação do projeto
```

## Funcionalidades

- **Criar tarefas**
- **Visualizar tarefas**
- **Atualizar tarefas**
- **Deletar tarefas**
