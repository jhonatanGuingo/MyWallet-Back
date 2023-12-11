# MyWallet
Essa é uma maplicação back-end para o aplicativo MyWallet, que é um sistema digital para controle de gastos.

# Tecnologias utilizadas
Para este projeto foram utilizada as seguintes tecnologias:

- Node;
- Express;
- JavaScript;
- Joi;
- MongoDB;
- Vite;

# Como funciona?
Este projeto é uma API REST para atender a aplicação de uma carteira digital.

Foram utilizadas as seguintes rotas:

Rotas de autenticação:
- POST `/cadastro` - utilizada para realizar cadastro do usuário;
- POST `/signIn` - utilizada para realizar login do usuário;

Rotas de transação:
- POST `/nova-transacao/:tipo` - utilizada para registrar uma nova transação, possui um parametro na rota para verificar se a nova transação é do tipo `entrada` ou `saida`;
- GET `/busca-transacao/:userId` - utilizada para ver o histórico de transações do usuario;


## Como rodar o projeto em desenvolvimento

1. Clone o repositorio
2. Instale as dependencias 

```bash
npm i
```

3. Crie um banco no MongoDB com o nome que preferir;
4. Configure o arquivo .env conforme o .env.example;
5. Rode o comando para iniciar o servidor back-end

```bash
npm run dev
```