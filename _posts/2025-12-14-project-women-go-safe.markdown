---
layout: post
title: "Women Go Safe"
date: 2025-12-14
excerpt: "Plataforma de agendamento de intercâmbios focada exclusivamente na segurança e empoderamento feminino"
project: true
github_rep: "https://github.com/krosct/Projetao-SafeJourney"
---

<div align="center">
  <div class="badges">
    <img src="{{ site.url }}/assets/img/projects/women_go_safe/WomenGoSafeLogo.png?v=1" alt="Logo Women Go Safe" class="img img-25" />
    <img src="{{ site.url }}/assets/img/projects/women_go_safe/WomenGoSafeTitle.png?v=1" alt="Título Women Go Safe" class="img img-50" />
    <h3> Explore o mundo com confiança. Feito por mulheres, para mulheres. </h3> <div class="badges break"></div>
    <img src="https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react" alt="https://reactjs.org/">
    <img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript" alt="https://www.typescriptlang.org/">
    <img src="https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite" alt="https://vitejs.dev/">
    <img src="https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC?style=for-the-badge&logo=tailwind-css" alt="https://tailwindcss.com/">
    <img src="https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge" alt="LICENSE">
  </div>
</div>

[Sobre Nós](#-sobre-o-projeto) • [Funcionalidades](#-funcionalidades) • [Tecnologias](#-tecnologias) • [Instalação](#-como-rodar-localmente) • [Estrutura](#-estrutura-do-projeto)

---

## 🌸 Sobre o Projeto

O **Women Go Safe** é uma plataforma de agendamento de intercâmbios focada exclusivamente na segurança e empoderamento feminino. Entendemos que viajar sozinha pode ser desafiador, por isso conectamos mulheres a agências e programas rigorosamente verificados.

Este repositório contém o **MVP (Minimum Viable Product)** da aplicação, simulando um ecossistema completo com busca de programas, avaliações de segurança baseadas em geolocalização e um hub de conhecimento.

## ✨ Funcionalidades

* **🔍 Busca Inteligente de Programas:** Filtros avançados por destino, tipo de intercâmbio (curso, voluntariado, estágio) e agência.
* **🛡️ Selo de Verificação Women Go Safe:** Sistema visual que destaca agências com suporte 24/7, liderança feminina e acomodações seguras.
* **🗺️ Mapa Interativo de Segurança:** Utilizando `Leaflet`, visualizamos cidades com classificações de segurança (Verde, Amarelo, Vermelho) baseadas em feedbacks reais de usuárias.
* **📚 Hub de Conhecimento:** Catálogo de cursos preparatórios e mentorias para auxiliar na adaptação cultural e carreira.
* **💬 Sistema de Avaliação e Feedback:** Transparência total com comentários e notas de quem já viajou.
* **📢 Canal de Denúncia e Suporte:** Fluxos dedicados para reportar problemas com agências ou solicitar informações.

## 🚀 Tecnologias

O projeto foi construído utilizando as melhores práticas de desenvolvimento web moderno:

| Tech | Descrição |
| :--- | :--- |
| **React 19** | Biblioteca principal para construção da interface. |
| **TypeScript** | Tipagem estática para maior segurança e manutenibilidade do código. |
| **Vite** | Build tool de próxima geração, garantindo um ambiente de desenvolvimento ultrarrápido. |
| **Tailwind CSS** | Framework de utilitários para estilização ágil e responsiva. |
| **Leaflet** | Biblioteca open-source para mapas interativos. |
| **React DOM** | Gerenciamento da árvore de elementos do navegador. |

## 📦 Como Rodar Localmente

Siga os passos abaixo para ter o projeto rodando na sua máquina:

### Pré-requisitos

* Node.js (Versão 18 ou superior recomendada)
* npm ou yarn

### Instalação

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/krosct/Projetao-SafeJourney.git](https://github.com/krosct/Projetao-SafeJourney.git)
    cd Projetao-SafeJourney
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    # ou
    yarn install
    ```

3.  **Configure as Variáveis de Ambiente:**
    Crie um arquivo `.env` na raiz do projeto para configurar chaves de API.
    ```env
    VITE_GEMINI_API_KEY=sua_chave_aqui
    ```

4.  **Rode o servidor de desenvolvimento:**
    ```bash
    npm run build
    # e
    
    npm run dev
    # ou
    npm run preview
    ```

5.  **Acesse o projeto:**
    Abra seu navegador em `http://localhost:3000` (ou a porta indicada no terminal).

## 📂 Estrutura do Projeto

A organização de pastas segue um padrão modular para facilitar a escalabilidade:

```
/
├── components/    # Componentes reutilizáveis (Cards, Modais, Botões)
├── data/          # Mock Data (Dados simulados para o MVP)
├── pages/         # Páginas principais (Home, Map, Programs, etc.)
├── types.ts       # Definições de tipos globais (TypeScript)
├── App.tsx        # Componente raiz e Roteamento
└── main.tsx       # Ponto de entrada da aplicação
```

## 🤝 Contribuição

Contribuições são o que fazem a comunidade open source um lugar incrível para aprender, inspirar e criar. Qualquer contribuição que você fizer será **muito apreciada**.

Consulte o arquivo [CONTRIBUTING.md](https://github.com/krosct/Projetao-SafeJourney/blob/main/CONTRIBUTING.md) para mais detalhes sobre como colaborar.

## 📝 Licença

Distribuído sob a licença MIT. Veja `LICENSE` para mais informações.

---
<div align="center">
  Feito com 💜 pela equipe <b>Women Go Safe</b>
</div>