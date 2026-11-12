---
layout: post
title: "Extração de Cardápios"
date: 2026-11-09 11:00:00
excerpt: "Pipeline que transforma cardápio bagunçado em JSON validado — prato, preço, categoria e alérgenos — com avaliação campo a campo"
project: true
github_rep: "https://github.com/krosct/project-nov26-p2-cardapios"
image: "/assets/img/projects/extracao_de_cardapios/thumb.png"
---

<div align="center">

  <img src="{{ site.url }}/assets/img/projects/extracao_de_cardapios/capa.png" alt="Extração de cardápios: texto bagunçado vira JSON validado" width="100%" />

  <p align="center">
    <strong>Do cardápio bagunçado ao JSON confiável.</strong>
    <br />
    Prato, preço, categoria e alérgenos — cada campo conferido contra o gabarito.
  </p>
</div>

---

## 💡 A ideia

Todo cardápio de restaurante chega do jeito que o restaurante quis: PDF com duas colunas, print de WhatsApp, foto transcrita, preço como `R$32`, `32,9`, `32.90` ou `32 reais`, abreviação no meio (`c/`, `qj`), seção com nome diferente em cada lugar.

Para um sistema, isso é texto solto. Para responder "quanto custa?" ou "isso tem glúten?", alguém precisa transformar esse texto em **dados com formato** — e é exatamente aí que a IA generativa ajuda.

**Este projeto faz essa tradução e, mais importante, mede o quanto ela acerta.** Não é "o modelo respondeu bonito": é cada campo comparado com o gabarito, item por item.

## 🎬 Como funciona

**1. O gabarito vem primeiro.** Cada cardápio existe como JSON válido. Só depois um gerador de ruído transforma esse JSON em texto bagunçado, com formatos de preço variados, abreviações, seções renomeadas e alérgenos escritos por sinônimos ("trigo", "derivados de leite", "crustáceos").

**2. O modelo extrai.** O texto vai para o LLM junto com um esquema fechado: categorias e alérgenos são listas fixas, preço não pode ser negativo.

**3. A resposta é validada.** Se o JSON não passa no Pydantic, o **erro volta para o modelo** e ele tenta de novo — até 3 vezes. Nada de confiar que o modelo "vai lembrar" do formato.

**4. Tudo é comparado com o gabarito.** Nomes casados por similaridade (para tolerar "X Tudo" × "X-Tudo"), preço e categoria por acerto exato, alérgenos por precisão e recall.

## 📊 Resultados

20 cardápios, 153 itens, temperatura 0, modelos gratuitos. Métricas por item, calculadas só sobre os itens casados com o gabarito.

| Configuração | Itens casados | F1 nomes | Preço | Categoria | Alérgenos (P / R) | Status de alérgenos | Latência |
|---|---|---|---|---|---|---|---|
| Nemotron Ultra 550B, zero-shot | 153/153 | 1,00 | 1,00 | 0,98 | 1,00 / 1,00 | 1,00 | 21,3 s |
| Nemotron Ultra 550B, few-shot | 153/153 | 1,00 | 1,00 | 0,92 | 1,00 / 1,00 | 1,00 | 18,6 s |
| LFM 2.5 (2,6B), zero-shot | 144/153 | 0,94 | 1,00 | 0,61 | 0,88 / 0,97 | 0,73 | 6,5 s |

<div align="center">
  <img src="{{ site.url }}/assets/img/projects/extracao_de_cardapios/metricas.png" alt="Qualidade por configuração: F1 de nomes, categoria e status de alérgenos" width="100%" />
  <p align="center"><em>O modelo grande acerta nomes e preço; o pequeno desaba justamente onde o erro é perigoso.</em></p>
</div>

* **100% dos JSONs foram válidos** nas três configurações. Com o modelo pequeno, 15% só ficaram válidos na segunda tentativa — o retry com o erro do Pydantic salvou o resultado.
* **Few-shot ficou abaixo do zero-shot em categoria** nas três execuções (0,98 × 0,92 na primeira; 0,95 × 0,94 na terceira) e custou **+58% de tokens de entrada**. É um efeito pequeno e instável, não uma regra.
* **O modelo pequeno é 3× mais rápido e inseguro.** Em 39 dos 144 itens ele errou o status dos alérgenos: preencheu a lista em cardápios que **não informam** nada, deduzindo pelos ingredientes. Para alergia, esse é o erro que não pode acontecer.

<div align="center">
  <img src="{{ site.url }}/assets/img/projects/extracao_de_cardapios/latencia.png" alt="Latência média por cardápio em cada configuração" width="100%" />
  <p align="center"><em>Três vezes mais rápido não vale nada se a resposta pode induzir alguém a comer o que não pode.</em></p>
</div>

## ✨ Por que é diferente

* **🧾 Validação com retry, não "JSON mode":** muitos modelos gratuitos não têm saída estruturada nativa. O laço com Pydantic funciona com qualquer modelo e mostra quantas tentativas cada um precisou.
* **📏 Métrica determinística, sem juiz:** com gabarito estruturado, comparar campo a campo é mais barato, reproduzível e não erra.
* **🚫 `null` é diferente de lista vazia:** "o cardápio não informa alérgenos" não é a mesma coisa que "o cardápio diz que não tem". Essa distinção é o que permite um sistema recusar responder "isso tem glúten?" quando o restaurante não informou — e é exatamente o que o modelo pequeno quebra.
* **💾 Cache em disco:** reexecutar a avaliação não gasta requisição, e os números do post são reproduzíveis.
* **🔁 Troca de modelo por variável de ambiente:** comparar provedores é uma linha, não um refactor.

## 🔍 O que este benchmark não prova

* **Os cardápios são sintéticos.** O texto bagunçado é gerado a partir do próprio gabarito, então tudo está dedutível do texto por construção. O modelo grande satura o benchmark: os 1,00 medem o gerador de ruído, não a extração de cardápios reais. O que o benchmark separa bem é **modelo grande × pequeno** e a regra "não deduzir alérgenos".
* **Os mesmos 20 cardápios serviram para escrever o prompt e para avaliar.** O próximo teste é óbvio: 5 a 10 cardápios reais, rotulados à mão e usados só para avaliar.
* **Categoria tem ambiguidade real.** Pizza doce é `pizza` ou `sobremesa`? Parte do "erro" não é erro — é falta de uma taxonomia com definições.
* **20 cardápios é pouco** para diferenças pequenas: em categoria, zero-shot e few-shot variam 0,95–0,98 e 0,92–0,94 entre execuções.

## 🏗️ Engenharia

* **Esquema** (`schema.py`): categorias e alérgenos como listas fechadas, preço não negativo, `alergenos=None` ≠ `[]`.
* **Extrator** (`extrator.py`): laço de validação com o erro do Pydantic devolvido ao modelo.
* **Cliente LLM** (`llm.py`): API compatível com OpenAI, troca de provedor por variável de ambiente, cache em disco e retry com espera exponencial.
* **Métricas** (`metricas.py`): casamento de itens por similaridade de nome, F1, acurácia por campo e precisão/recall de alérgenos.
* **Qualidade:** `pytest` cobrindo schema, ruído e métricas, `ruff` e CI a cada push.

<p align="center">
  <strong>Feito com</strong> Python · LLM via OpenRouter · Pydantic · pytest
</p>

---

<div align="center">
  <b>Texto solto entra. Dado com formato sai. 🍽️</b>
  <br /><br />
  Desenvolvido por <code>Gabriel Monteiro</code> | Estudante de Ciência da Computação @ <a href="https://portal.cin.ufpe.br/">CIn - UFPE</a>
</div>
