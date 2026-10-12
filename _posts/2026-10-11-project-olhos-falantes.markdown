---
layout: post
title: "Olhos Falantes"
date: 2026-10-11
excerpt: "App acessível que fotografa uma cena e descreve em voz alta, em português, o que está na frente de quem não enxerga a tela"
project: true
github_rep: "https://github.com/krosct/Olhos-Falantes"
image: "/assets/img/projects/olhos_falantes/olho_wide.jpg"
---

<div align="center">

  <img src="{{ site.url }}/assets/img/projects/olhos_falantes/olho_wide.jpg" alt="Broche de um olho roxo e azul com uma boca aberta, como se estivesse falando" width="100%" />

  <p align="center">
    <b>Aponte. Fotografe. Ouça.</b>
    <br />
    Um app que olha por você e conta, em voz alta, o que está na sua frente.
  </p>
</div>

---

## 📖 O que tem aqui na minha frente?

Uma mesa cheia de coisas. Um cômodo desconhecido. Um papel que chegou pelo correio. Para quem não enxerga, ou enxerga pouco, perguntas simples como essas viram um obstáculo do dia a dia.

Muitos aplicativos até tentam ajudar, mas escondem o botão certo atrás de menus, enchem a tela de anúncios ou respondem com um textão que ninguém tem paciência de ouvir. **O Olhos Falantes responde em segundos, em português claro, e sem precisar enxergar a tela.**

## 🎬 Como funciona

1. **Toque em Começar.** Sem cadastro.
2. **Tire uma foto.** Um botão grande, fácil de achar com o leitor de tela. Ou escolha uma foto que já está no celular.
3. **Ouça a cena.** Em poucos segundos chega uma descrição curta: o que tem ali, onde as coisas estão e os textos que aparecem. Quer ouvir de novo? É só tocar outra vez.

## ✨ Por que você vai gostar

* **🦮 Feito para quem não vê a tela:** funciona do começo ao fim com o TalkBack. Botões enormes, alto contraste e cada controle com nome claro. Nada depende de cor, de mouse ou de olhar para a tela.
* **🗣️ Nunca te deixa no silêncio:** enquanto a foto é analisada, o app avisa o que está acontecendo: "Analisando...", "Pronto".
* **✂️ Direto ao ponto:** a descrição fala primeiro do que importa. Quer mais detalhes? Escolha entre **Curta**, **Média**, **Longa** ou **Total**.
* **🤔 Honesto quando não tem certeza:** foto escura, tremida ou cortada? Em vez de inventar, ele pede outra foto.
* **🎙️ A voz que você preferir:** a voz do próprio celular ou uma das vozes em português do app, com o texto sempre na tela também.
* **📱 No celular e no computador:** funciona no Chrome do Android e no navegador do computador, e pode ser instalado como app.

## 🔒 Feito com respeito a você

* A câmera só liga quando você toca no botão.
* A foto é usada para a descrição e descartada, e os metadados (como localização) são removidos antes do envio.
* Nunca diz quem é uma pessoa, nem idade, gênero ou emoção. No máximo, conta onde ela está e o que está fazendo, se você permitir.
* Nada de contas, cadastro, anúncios ou histórico na nuvem.

## 🏗️ Engenharia

* **Proxy de visão em FastAPI:** a chave da API fica só no backend. O proxy recebe a foto, remove metadados, aplica limite de requisições e envia a imagem a um modelo de visão-linguagem compatível com a API da OpenAI, com *prompt* fixo e níveis de detalhe.
* **Limiar de confiança:** abaixo de um valor configurável, o app responde "não sei" em vez de inventar.
* **Texto para fala em três camadas:** voz do aparelho (Web Speech API), vozes neurais locais com **Piper** geradas no servidor, ou vozes na nuvem, com cache de áudio para as frases fixas.
* **Acessibilidade como requisito:** regiões *aria-live* para anunciar o estado, foco gerenciado e controles grandes pensados para leitores de tela.
* **PWA instalável**, com testes automatizados no frontend (Vitest) e no backend (pytest).

## 🛠️ Tecnologias Utilizadas

* **Frontend:** [TypeScript](https://www.typescriptlang.org/), [Vite](https://vitejs.dev/), [vite-plugin-pwa](https://vite-pwa-org.netlify.app/)
* **Backend:** [Python](https://www.python.org/), [FastAPI](https://fastapi.tiangolo.com/), [HTTPX](https://www.python-httpx.org/), [Pydantic](https://docs.pydantic.dev/)
* **IA:** modelo de visão-linguagem via API compatível com OpenAI, [Piper TTS](https://github.com/rhasspy/piper)
* **Qualidade:** [Vitest](https://vitest.dev/), [pytest](https://pytest.org/), [ESLint](https://eslint.org/), [Ruff](https://docs.astral.sh/ruff/)

> O Olhos Falantes é uma ajuda para o dia a dia, não substitui a orientação de um profissional. Não use para ler documentos confidenciais, cartões ou dados bancários, nem para decisões de saúde ou segurança.

---

<div align="center">
  <img src="{{ site.url }}/assets/img/projects/olhos_falantes/olho_closed.jpg" alt="O olho falante sorrindo, de boca aberta" width="220" />
  <br />
  <b>Aponte a câmera. O Olhos Falantes conta o resto. 👁️🗣️</b>
  <br /><br />
  Desenvolvido por <code>Gabriel Monteiro</code> | Estudante de Ciência da Computação @ <a href="https://portal.cin.ufpe.br/">CIn - UFPE</a>
</div>
