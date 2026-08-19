---
layout: post
title: "SGBD para o Corpo de Bombeiros"
date: 2025-08-11
excerpt: "Um Sistema Básico de Gerenciamento para o Corpo de Bombeiros"
project: true
github_rep: "https://github.com/krosct/IF685-GDI-CC-2025.1-G1"
---

# 🚒 Sistema de Gerenciamento para o Corpo de Bombeiros

Bem-vindo(a) ao repositório do **Grupo 1** da disciplina de GDI (Gerência de Dados e Informação) 2025.1! Este projeto visa demonstrar a aplicação de conceitos de Banco de Dados Relacionais (SGBD).

---

## 🎯 **Sobre o Projeto**

Este repositório contém os esquemas e scripts do sistema de gerenciamento de banco de dados:

### 1️⃣ **Tema SGBD Relacional: 🚒 Corpo de Bombeiros**

Um Sistema de Gerenciamento de Banco de Dados (SGBD) projetado para armazenar, organizar e recuperar informações cruciais relacionadas às operações e recursos do Corpo de Bombeiros. 

**Principais funcionalidades:**
* **Registro e acompanhamento de ocorrências:** Detalhes como protocolo, tipo, data e descrição do chamado. 
* **Gerenciamento de recursos:** Informações sobre quartéis, bombeiros e viaturas. 
* **Atendimentos de emergência:** Relações complexas entre bombeiros, pessoas e ocorrências, incluindo o uso de viaturas. 
* **Emissão de relatórios:** Geração de relatórios operacionais e históricos por bombeiro, quartel ou ocorrência para maior eficiência. 

**Estrutura:**
O esquema relacional é composto por tabelas como `Pessoa`, `Bombeiro`, `Quartel`, `Viatura`, `Ocorrencia`, e tabelas associativas como `Atende`, `UsoViatura`, entre outras, garantindo a integridade e a normalização dos dados. 

---

## 📚 **Tecnologias Utilizadas**

* **Banco de Dados Relacional:** Oracle SQL (para o tema Corpo de Bombeiros)
    * Utiliza `CREATE TABLE`, `CONSTRAINT` (PRIMARY KEY, FOREIGN KEY, CHECK, NOT NULL), `CREATE SEQUENCE` para garantir a integridade e automação.
    * Utiliza `INSERT INTO` para povoar as tabelas e ser possível realizar testes no banco de dados.

---

## 🚀 **Como Rodar o Projeto (Corpo de Bombeiros - Oracle SQL)**

Para configurar e popular o banco de dados do Corpo de Bombeiros, siga os passos abaixo no seu ambiente Oracle (ex: LiveSQL, SQL Developer, SQL*Plus):

1.  **Acesse seu ambiente Oracle.**
2.  **Execute o script de Criação de Tabelas (`Script_Criacao.sql`):**
    Este script contém os comandos `DROP TABLE` para limpar qualquer estrutura anterior e, em seguida, `CREATE TABLE` para construir o esquema do banco de dados, incluindo as `SEQUENCES` necessárias.
3.  **Execute o script de Povoamento de Dados (`Script_Povoamento.sql`):**
    Após a criação das tabelas, este script insere dados de exemplo nas tabelas com o comando`INSERT INTO` , permitindo que você explore o esquema e realize consultas.

---

## 📋 **Tópicos Importantes (Corpo de Bombeiros)**

* **Normalização:** O esquema relacional foi cuidadosamente normalizado para garantir a integridade e minimizar a redundância, seguindo as Formas Normais (1FN, 2FN, 3FN, BCNF, 4FN). 
    * **Atributos Multivalorados:** Tratamento de telefones (Pessoa e Quartel) e áreas de cobertura (Quartel) com tabelas separadas. 
    * **Dependências Transitivas:** Criação de tabela `Cep` para evitar dependências transitivas de `rua` e `cidade` nas tabelas `Quartel` e `Ocorrencia`. 
* **Chaves Primárias (PK):** Identificadores únicos para cada entidade (ex: `cpf` para `Pessoa`, `cnpj` para `Quartel`, `placa` para `Viatura`, `protocolo` para `Ocorrencia`).
* **Chaves Estrangeiras (FK):** Estabelecimento de relacionamentos entre tabelas para manter a integridade referencial (ex: `Bombeiro.cpf` referencia `Pessoa.cpf` ).
* **`SEQUENCE`:** Utilização de uma sequência `ocorrencia_seq` para auto-gerar os números de protocolo das ocorrências.
* **`CHECK CONSTRAINT`:** Regras de validação para garantir a qualidade dos dados (ex: tipo de CNH, tempo de serviço não negativo, grau de risco e estado de viatura válidos).

---

## 👥 **Equipe**

Este projeto foi desenvolvido pelo **Grupo 1** da disciplina de GDI 2025.1.

* 👨‍💻 **Gabriel Monteiro Silva** — gms2 
* 👨‍💻 **Matheus Barney Mara Galindo** — mbmg 
* 👨‍💻 **Luan Alves Rodrigues** — lar2 
* 👨‍💻 **Davi Vicente Magnata** — dvm2 
* 👨‍💻 **Lukas Asael Amorim Pereira Bacelar** — laapb 

---

**Centro de Informática (CIn)**   
**Universidade Federal de Pernambuco (UFPE)**   