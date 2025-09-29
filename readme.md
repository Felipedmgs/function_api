# 📊 Oracle Data ETL to API (Node.js)

## 📌 Descrição
Este projeto foi desenvolvido para realizar um fluxo completo de **extração, transformação e carga (ETL)** em **Node.js**.  
Ele se conecta a um banco **Oracle**, realiza a leitura e tratamento dos dados, gera um **arquivo JSON estruturado** e, por fim, realiza um **POST para uma API externa** que consome essas informações.

O objetivo é fornecer uma integração simples, automatizada e escalável entre banco de dados Oracle e serviços que consomem dados em formato JSON.

---

## 🚀 Funcionalidades
- Conexão segura com banco **Oracle** (via `oracledb`).
- Execução de queries customizadas.
- Tratamento e normalização dos dados retornados.
- Geração de arquivo **JSON** persistido em disco.
- Envio automático dos dados para uma **API REST** através de requisições `POST`.
- Logs detalhados do processo para auditoria.

---

## 🛠️ Tecnologias Utilizadas
- **Node.js** (runtime principal)
- **OracleDB** (`oracledb` driver para Node)
- **Axios/Fetch** (para chamadas HTTP)
- **Dotenv** (gerenciamento de variáveis de ambiente)
- **FS (File System)** do Node (para manipulação do arquivo JSON)

---

## 📂 Estrutura do Projeto


## 📤 Fluxo de Execução

- Conecta no Oracle e executa query configurada.
- Aplica regras de transformação (tratamento de nulos, conversões normalização).
- Gera arquivo JSON (export.json).
- Realiza um POST na API definida no .env.
