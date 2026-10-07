---
layout: post
title: "Saqueador de Marmitas - Agente autônomo de busca de melhor caminho"
date: 2025-10-20
excerpt: "Implementação visual e interativa de algoritmos de busca clássicos da Inteligência Artificial"
project: true
github_rep: "https://github.com/krosct/Saqueador_de_Marmitas"
image: "/assets/img/projects/saqueador_de_marmitas/saqueador.png"
---

# 🤖 Saqueador de Marmitas

<div class="badges">
   <img src="https://img.shields.io/badge/status-desenvolvimento%20conclu%C3%ADdo-green" alt="Badge de Status">
   <img src="https://img.shields.io/github/license/krosct/Saqueador_de_Marmitas" alt="Badge de Licença">
   <img src="https://img.shields.io/github/last-commit/krosct/Saqueador_de_Marmitas" alt="Badge de Ultimo Commit">
   <img src="https://img.shields.io/github/contributors/krosct/Saqueador_de_Marmitas" alt="Badge de Contribuidores">
   <img src="https://img.shields.io/github/languages/top/krosct/Saqueador_de_Marmitas" alt="Linguagem">
   <img src="https://img.shields.io/badge/p5.js-ED225D?style=for-the-badge&logo=p5.js&logoColor=white" alt="p5js">
   <img src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E" alt="JavaScript">
</div>

## 📌 Sumário
- 👉 [Descrição Geral](#-descrição-geral)
- 👉 [Objetivo Detalhado](#-objetivo-detalhado)
- 👉 [Nossa Equipe](#-nossa-equipe)
- 👉 [Estrutura do Projeto](#-estrutura-do-projeto)
- 👉 [Guia de Execução](#-guia-de-execução)
- 👉 [Como Contribuir](#-como-contribuir)
- 👉 [Links Importantes](#-links-importantes)

## 📜 Descrição Geral

Este projeto é uma implementação visual e interativa de algoritmos de busca clássicos da Inteligência Artificial. Um agente autônomo deve encontrar o caminho mais eficiente para coletar comidas em um mapa gerado aleatoriamente, que contém terrenos com diferentes custos de travessia.

## 🎯 Objetivo Detalhado

O objetivo é simular e visualizar o funcionamento dos seguintes algoritmos de busca em um ambiente de grade (grid) 2D:

-   **Busca em Largura (BFS)**
-   **Busca em Profundidade (DFS)**
-   **Busca de Custo Uniforme (UCS)**
-   **Busca Gulosa (Greedy Best-First Search)**
-   **A\* (A-Star)**

O programa demonstra visualmente a "inteligência" do algoritmo, destacando os nós visitados, a fronteira de exploração e, finalmente, o caminho ótimo encontrado.

## 👥 Nossa Equipe

| Nome do Integrante | Atividade | GitHub |
| :---: | :---: | :---: |
| <img src="https://avatars.githubusercontent.com/u/135074052?v=4" class="team-avatar">Davi Brilhante | Grid e Node | [<img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" height="50">](https://github.com/Davi-SB) |
| <img src="https://avatars.githubusercontent.com/u/140334417?v=4" class="team-avatar">Gabriel Monteiro | Animação e Lógica | [<img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" height="50">](https://github.com/krosct) |
| <img src="https://avatars.githubusercontent.com/u/131478981?v=4" class="team-avatar">Heitor Higino | Algoritmo A* e Menu | [<img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" height="50">](https://github.com/HeitorCordeiro) |
| <img src="https://avatars.githubusercontent.com/u/129231720?v=4" class="team-avatar">Henrique César | Algoritmos de Busca Gulosos e Uniformes | [<img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" height="50">](https://github.com/SapoSopa) |
| <img src="https://avatars.githubusercontent.com/u/89039575?v=4" class="team-avatar">João Pedro | BFS, DFS e Heurísticas | [<img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" height="50">](https://github.com/jpcm2) |

## 📂 Estrutura do Projeto

O projeto está organizado na seguinte estrutura de pastas:

```
─>📁Saqueador_de_Marmitas/
   ├──📁docs/
   |   └──📄DOCUMENTATION.md
   ├──📁src/
   |   ├──📁algorithms/
   |   |   ├──📄heuristics.js
   |   |   ├──📄PriorityQueue.js
   |   |   └──📄search.js
   |   ├──📁img/
   |   |   └──📄several_imgs.png [...]
   |   ├──📁modules/
   |   |   ├──📄Agent.js
   |   |   ├──📄Food.js
   |   |   ├──📄Grid.js
   |   |   ├──📄Node.js
   |   |   ├──📄terrain.js
   |   ├──📄sketch.js
   |   └──📄style.css
   ├──📁tests/
   |   └──📄several_tests.* [...]
   ├──📄.gitignore
   ├──📄checklist.md
   ├──📄CONTRIBUTING.md
   ├──📄index.html
   ├──📄INSTRUCTIONS.md
   ├──📄jsconfig.json
   ├──📄LICENCE
   ├──📄README.md
   └──📄teamManagement.md
```

## 🚀 Guia de Execução

Para executar o projeto, siga as instruções detalhadas em nosso guia de execução.

➡️ **[Acesse o Guia de Execução](https://github.com/krosct/Saqueador_de_Marmitas/blob/main/INSTRUCTIONS.md)**

## 🤝 Como Contribuir

Interessado em contribuir? Ótimo! Leia nosso guia de contribuição para saber como.

➡️ **[Acesse o Guia de Contribuição](https://github.com/krosct/Saqueador_de_Marmitas/blob/main/CONTRIBUTING.md)**

## 🔗 Links Importantes

- **Projeto no p5js:** [Link](https://editor.p5js.org/gms2/sketches/4lGDnxKc8N)

---
---
> 2025.