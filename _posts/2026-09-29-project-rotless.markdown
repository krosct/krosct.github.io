---
layout: post
title: "Rotless"
date: 2026-09-29
excerpt: "Web app de despensa inteligente que controla a validade dos alimentos da casa e avisa pelo Telegram antes que estraguem"
project: true
github_rep: "https://github.com/krosct/rotless"
live_url: "https://rotless.gms.xyz.br"
---

<div align="center">

  <img src="{{ site.url }}/assets/img/projects/rotless/rotless-logo.png" alt="Rotless — Smart Pantry, Reduce Waste" width="150" />

  <p align="center">
    Despensa inteligente para reduzir o desperdício de alimentos (<i>"rot less"</i>).
    <br />
    Projeto individual full stack, do banco de dados à publicação em produção.
  </p>
</div>

---

## 📖 Sobre o Projeto

O **Rotless** é um web app em que os moradores de uma casa registram os alimentos da despensa, com quantidade e data de validade. Todo dia o sistema confere o que está perto de vencer e avisa cada membro pelo **Telegram**, para que o alimento seja consumido antes de estragar.

A aplicação é composta por uma **API REST em Laravel** e uma **SPA em React + TypeScript**, e está em produção com deploy contínuo.

> 🌐 **Acesse em [rotless.gms.xyz.br](https://rotless.gms.xyz.br).** Para explorar sem criar conta, toque três vezes no escudo da tela de login e o app abre o modo demonstração.

## ✨ Funcionalidades

* **Casas compartilhadas:** vários moradores dividem a mesma despensa, com convites e diferentes níveis de permissão.
* **Cadastro por código de barras:** o scanner usa a câmera do celular e preenche os dados do produto a partir do [OpenFoodFacts](https://world.openfoodfacts.org/). Também dá para cadastrar produtos manualmente, com foto.
* **Dashboard de validade:** os alimentos aparecem ordenados pela data de vencimento, com cores de urgência.
* **Alertas pelo Telegram:** avisos diários sobre o que está perto de vencer.
* **Histórico da casa:** uma linha do tempo com o que foi adicionado, consumido, descartado ou editado, e por quem.
* **Relatórios:** consumo vs. desperdício ao longo do tempo, produtos mais desperdiçados e dicas de onde agir.
* **Modo demonstração:** uma casa fictícia com histórico, para conhecer o app sem criar conta.

## 🏗️ Engenharia

* **Processamento assíncrono:** os alertas são enviados por filas e tarefas agendadas.
* **Testes automatizados** no backend e no frontend, além de lint e análise estática.
* **CI/CD:** cada alteração passa por testes automatizados antes de ser publicada, e a publicação volta sozinha para a versão anterior em caso de falha.
* **Processo:** pull requests, *Conventional Commits*, versionamento semântico e `CHANGELOG`.

## 🛠️ Tecnologias Utilizadas

* **Backend:** [PHP](https://www.php.net/), [Laravel](https://laravel.com/)
* **Frontend:** [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vitejs.dev/), [Tailwind CSS](https://tailwindcss.com/), [TanStack Query](https://tanstack.com/query)
* **Banco de dados:** [PostgreSQL](https://www.postgresql.org/)
* **Infraestrutura:** [Docker](https://www.docker.com/), [GitHub Actions](https://github.com/features/actions)
* **Testes:** [Pest](https://pestphp.com/), [Vitest](https://vitest.dev/)
* **APIs externas:** [OpenFoodFacts](https://world.openfoodfacts.org/data), [Telegram Bot API](https://core.telegram.org/bots/api)

---

<div align="center">
  Desenvolvido por <code>Gabriel Monteiro</code> | Estudante de Ciência da Computação @ <a href="https://portal.cin.ufpe.br/">CIn - UFPE</a>
</div>
