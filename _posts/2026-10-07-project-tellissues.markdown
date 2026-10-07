---
layout: post
title: "TellIssues"
date: 2026-10-07
excerpt: "Bot do Telegram que transforma um texto ou áudio em uma issue completa no GitHub, criada com a conta de quem mandou"
project: true
github_rep: "https://github.com/krosct/tellissues"
image: "/assets/img/projects/tellissues/tellissues-logo.png"
---

<div align="center">

  <img src="{{ site.url }}/assets/img/projects/tellissues/tellissues-logo.png" alt="TellIssues" width="150" />

  <p align="center">
    Mande um texto ou um áudio no Telegram e receba uma issue pronta no GitHub.
    <br />
    Projeto individual, do bot à infraestrutura de deploy.
  </p>
</div>

---

## 📖 Sobre o Projeto

O **TellIssues** é um bot do Telegram que transforma um relato em linguagem natural — texto ou áudio — numa issue completa no GitHub. O repositório é identificado pela própria descrição e a issue é criada **com a conta de quem mandou**: o bot escreve o título, o corpo em Markdown e escolhe as labels do próprio repositório.

Se o repositório não ficar claro, o bot mostra botões com os candidatos. Se faltar o essencial sobre a issue, ele pergunta no chat. Depois de criada, dá para desfazer (fechar a issue) com um toque.

## ✨ Funcionalidades

* **Entrada por texto ou áudio:** o áudio é transcrito localmente, sem depender de serviços externos.
* **Identificação do repositório:** o bot escolhe o projeto mais provável a partir da descrição; se houver dúvida, oferece os candidatos em botões.
* **Redação automática:** título, corpo em Markdown e labels do próprio repositório.
* **Desfazer:** fecha a issue recém-criada com um toque.
* **Várias contas:** cada pessoa usa a sua própria conta do GitHub.
* **`/config`:** tempo de retenção da conta (1 vez, 1, 7, 30, 90, 365 dias ou sempre) e histórico das últimas 100 issues, com opção de desligar e apagar.

## 🏗️ Engenharia

* **Login com um clique:** OAuth do GitHub com `state` de uso único e vínculo ao navegador por cookie; login por código (Device Flow) para desenvolvimento.
* **Segurança:** tokens criptografados em repouso (Fernet) e revogados no GitHub no `/logout`; uma conta do GitHub só pode estar ligada a um usuário do Telegram.
* **Controle de acesso:** lista de usuários autorizados; o bot só responde em chats privados.
* **Deploy em um comando:** `./deploy.sh` roda local, em container ou instala na VPS via SSH, com versões e rollback automático.
* **CI/CD:** cada push na `main` que passa nos testes é publicado na VPS.

## 🛠️ Tecnologias Utilizadas

* **Linguagem:** [Python](https://www.python.org/)
* **Bot:** [python-telegram-bot](https://python-telegram-bot.org/)
* **IA:** [Claude](https://www.anthropic.com/) (Anthropic), com suporte a [OpenRouter](https://openrouter.ai/)
* **Transcrição:** [faster-whisper](https://github.com/SYSTRAN/faster-whisper)
* **Dados:** [SQLite](https://www.sqlite.org/), criptografia com [Fernet](https://cryptography.io/en/latest/fernet/)
* **Infraestrutura:** [Docker](https://www.docker.com/), systemd, [Caddy](https://caddyserver.com/), [GitHub Actions](https://github.com/features/actions), [uv](https://docs.astral.sh/uv/)
* **Qualidade:** [pytest](https://pytest.org/), [Ruff](https://docs.astral.sh/ruff/)

---

<div align="center">
  Desenvolvido por <code>Gabriel Monteiro</code> | Estudante de Ciência da Computação @ <a href="https://portal.cin.ufpe.br/">CIn - UFPE</a>
</div>
