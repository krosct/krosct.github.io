---
layout: post
title: "Servissues"
date: 2026-10-16
excerpt: "Agente de IA que resolve as issues do GitHub sozinho e só faz o merge depois do seu clique no Telegram"
project: true
image: "/assets/img/projects/servissues/servissues-logo.png"
---

<div align="center">

  <img src="{{ site.url }}/assets/img/projects/servissues/servissues-logo.png" alt="Servissues" width="150" />

  <p align="center">
    <strong>Issues resolvidas enquanto você toma café.</strong>
    <br />
    Tudo se resolve em alguns minutos e com um clique seu.
  </p>
</div>

---

## 💡 A ideia

A issue está aberta. Você sabe o que precisa ser feito, mas tem que parar tudo, abrir o projeto, entender o código de novo, corrigir, testar e abrir o pull request. E a lista só cresce.

O **Servissues** faz esse trabalho por você. Abriu uma issue? Um agente de IA pega o problema, escreve a correção, roda os testes do próprio projeto e abre o pull request. Você só recebe o resultado no Telegram e decide.

Ele é o parceiro do [TellIssues]({{ site.url }}/project-tellissues/): você **fala** o problema, o TellIssues cria a issue e o Servissues **resolve**. Do áudio ao código pronto, sem abrir o computador.

## 🎬 Como funciona

**1. Abra a issue.** Pelo TellIssues, com um áudio, ou direto no GitHub. O bot confirma na hora que ela entrou na fila.

**2. O agente trabalha.** Ele lê o projeto, entende o problema, faz a correção e testa usando o próprio CI do repositório.

**3. Você recebe o relatório.** No Telegram chega um resumo do que foi feito, com o link do pull request e três botões: **Aprovar merge**, **Pedir alteração** ou **Cancelar**.

**4. Um clique e pronto.** Aprovou, está na branch principal. Pediu alteração, o agente refaz e manda de novo.

## ✨ Por que é diferente

* **☕ Trabalha enquanto você vive:** a fila anda sozinha, uma issue depois da outra.
* **👆 Nada entra sem você:** o merge só acontece com o seu clique, e só da versão exata que você viu no relatório.
* **📱 Tudo pelo Telegram:** veja a fila, o andamento de cada issue, o histórico, os pull requests abertos e quanto a IA custou no dia e no mês.
* **🔁 Conversa até ficar certo:** não gostou? Peça alteração e o agente ajusta na mesma branch.
* **🧩 Troque as peças:** o modelo de IA, o canal e o repositório são encaixes, então dá para mudar sem reescrever o resto.

## 🔒 Feito para confiar

Deixar uma IA mexer no seu código pede cuidado, e a segurança não depende da boa vontade do agente. Só as **suas** issues viram tarefa. O agente trabalha isolado, sem acesso à internet nem às suas chaves, e tudo o que ele devolve é conferido antes de virar commit. No fim, quem decide é sempre você.

## 🚀 Do zero à produção

Um projeto individual, ponta a ponta: do agente de IA à integração com o GitHub, do bot do Telegram ao deploy automático em servidor próprio, rodando leve em uma máquina de 1 GB de memória.

<p align="center">
  <strong>Feito com</strong> Python · GitHub App · Telegram · IA generativa
</p>

---

<div align="center">
  Desenvolvido por <code>Gabriel Monteiro</code> | Estudante de Ciência da Computação @ <a href="https://portal.cin.ufpe.br/">CIn - UFPE</a>
</div>
