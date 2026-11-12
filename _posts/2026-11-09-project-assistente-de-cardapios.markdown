---
layout: post
title: "Assistente de Cardápios"
date: 2026-11-09 12:00:00
excerpt: "Assistente que responde sobre cardápios e pedidos com busca híbrida, citação da fonte e um guardrail que se recusa a chutar quando o restaurante não informa os alérgenos"
project: true
github_rep: "https://github.com/krosct/project-nov26-p3-rag"
image: "/assets/img/projects/assistente_de_cardapios/thumb.png"
---

<div align="center">

  <img src="{{ site.url }}/assets/img/projects/assistente_de_cardapios/capa.png" alt="Assistente de cardápios com RAG híbrido e guardrail de alérgenos" width="100%" />

  <p align="center">
    <strong>Pergunta em português, resposta com fonte.</strong>
    <br />
    E quando o cardápio não informa, ele prefere dizer "não sei" a arriscar.
  </p>
</div>

---

## 💡 A ideia

"Quanto custa o Hot Roll do Sushi Kento?" "Quais combos saem por até R$ 50?" "O X-Tudo tem glúten?"

Um assistente de delivery precisa responder isso em segundos, com o preço certo e sem inventar. E existe uma pergunta em que errar é inaceitável: **"esse prato é seguro para quem tem alergia?"**

**Este projeto é um assistente que responde sobre cardápios e pedidos — e que sabe a hora de não responder.** Ele busca nos cardápios, cita de onde tirou cada informação, usa ferramentas para filtros exatos e tem uma regra em código: se o restaurante não informa os alérgenos, ele **não afirma** que o prato é seguro.

## 🎬 Como funciona

**1. A pergunta entra.** Texto livre, do jeito que a pessoa fala.

**2. A busca é híbrida.** Embeddings (que entendem sinônimo e erro de digitação) somados a BM25 (que acerta nome e código exato), fundidos por posição de ranking. Cada item de cardápio é um trecho próprio, com restaurante, preço e alérgenos juntos — cortar por tamanho fixo separaria o nome do preço.

**3. O guardrail entra antes do modelo.** Se a pergunta é sobre alergia a um item cujo cardápio não informa nada, a resposta é fixa e pronta: "não consigo confirmar, confirme com o restaurante". Sem chamar o LLM, em ~0,04 s.

**4. O modelo responde com contexto numerado.** E pode chamar ferramentas: `filtrar_pratos` para "até R$ 40 sem glúten" (consulta exata, não semântica) e `consultar_pedido` para o status de um pedido.

**5. A resposta sai com citação.** Cada afirmação aponta para o trecho que a sustenta.

## 📊 Resultados

**Assistente completo** — 50 perguntas: 20 de fato, 10 de filtro, 5 de política, 5 de pedido e **10 armadilhas** que devem ser recusadas (alérgenico não informado, item inexistente, fora do domínio).

| Métrica | Automática (juiz LLM) | Revisão humana |
|---|---|---|
| Acerto nas 40 perguntas normais | 40/40 | **39/40** (IC95 0,87–1,00) |
| Fidelidade ao contexto (nada inventado) | 40/40 | **39/40** |
| Armadilhas recusadas | 10/10 | **10/10** (IC95 0,72–1,00) |
| Recusas indevidas | 0/40 | **0/40** |
| Latência p50 / p95 | 3,7 s / 18,7 s | |

<div align="center">
  <img src="{{ site.url }}/assets/img/projects/assistente_de_cardapios/avaliacao.png" alt="Resultado da avaliação: 39 de 40 respostas corretas, 10 de 10 armadilhas recusadas, nenhuma recusa indevida" width="100%" />
  <p align="center"><em>Com 40 e 10 casos, os intervalos são largos: leia as contagens, não as porcentagens.</em></p>
</div>

* **6 das 10 armadilhas foram barradas pelo guardrail em código**, sem chamar o modelo — mais rápido e mais confiável do que pedir no prompt "por favor, não invente".
* **O juiz automático é otimista.** Os 40 julgamentos foram conferidos à mão contra o texto-fonte e houve concordância em 39. No caso divergente, o assistente não chamou a ferramenta, respondeu só com os trechos recuperados e afirmou algo falso sobre o cardápio inteiro — e o juiz aprovou. Lição: juiz de LLM precisa ser auditado.

**Busca** — 20 consultas difíceis, com erro de digitação ("xtudo"), sinônimo ("sanduba"), descrição sem o nome do prato ("doce japonês de arroz") e paráfrase de política.

| Busca | Acerto@1 | Acerto@5 | MRR |
|---|---|---|---|
| Lexical (BM25) | 0,55 | 0,80 | 0,62 |
| Densa (`multilingual-e5-small`) | 0,65 | 0,95 | 0,78 |
| Híbrida (RRF) | 0,70 | 0,95 | 0,78 |

<div align="center">
  <img src="{{ site.url }}/assets/img/projects/assistente_de_cardapios/busca.png" alt="Acerto@1 e Acerto@5 por tipo de busca: BM25, densa e híbrida" width="100%" />
  <p align="center"><em>Densa e híbrida empatam: a diferença no Acerto@1 é de uma consulta em 20.</em></p>
</div>

## 💬 Respostas reais da avaliação

**Quanto custa o Hot Roll de Salmão do Sushi Kento?**
> O Hot Roll de Salmão do Sushi Kento custa **R$ 32,90** [1].

**Quais combos custam até R$ 50?**
> Encontrei 2 combos até R$ 50: **Combo Feira** – Pastelaria Ponto Certo – R$ 16,00 e **Combo Brasa** – Burger Brasa – R$ 49,90. (Alérgenos não informados para ambos os itens.)

**O X-Tudo do Burger Brasa tem glúten?**
> O cardápio do Burger Brasa não informa os alérgenos de "X-Tudo". Por segurança, não consigo confirmar se ele é adequado para sua restrição: confirme os ingredientes diretamente com o restaurante antes de pedir.

<div align="center">
  <img src="{{ site.url }}/assets/img/projects/assistente_de_cardapios/demo.gif" alt="Demonstração do assistente: filtro por preço com ferramenta, recusa pelo guardrail e resposta com citação" width="100%" />
  <p align="center"><em>Demo local: filtro por preço usando ferramenta, recusa do guardrail e resposta com citação.</em></p>
</div>

## ✨ Por que é diferente

* **🛡️ Guardrail em código, não no prompt:** em segurança, "funciona quase sempre" não basta. A regra é testável e roda antes do modelo.
* **🔍 Busca e geração avaliadas separadamente:** quando uma resposta erra, dá para saber se a falha foi da recuperação ou do gerador.
* **🧰 Ferramenta para o que é exato:** "pratos até R$ 40 sem glúten" é consulta, não semântica. O filtro por alérgenico **exclui** itens sem informação e diz quantos excluiu.
* **🪶 Sem framework de agente:** o laço busca → guardrail → LLM → ferramentas tem poucas peças. Escrito à mão (~40 linhas, no máximo 3 voltas), cada decisão fica visível e testável.
* **⏱️ p95, não só a média:** a mediana é 3,7 s, mas perguntas com ferramenta chegam a ~19 s no modelo gratuito. Esconder isso seria vender facilidade.

## 🔍 O que ainda não está resolvido

* **A suíte de avaliação foi escrita pelo autor do sistema, depois dele.** As perguntas citam o nome exato do prato, então medem o caso feliz melhor do que perguntas de usuários reais. Próximo passo: 10 perguntas escritas por outra pessoa, sem ver o sistema.
* **Em 2 das 15 perguntas de filtro/pedido o modelo respondeu sem chamar a ferramenta** — uma delas gerou o erro que o juiz aprovou. Próximo passo: forçar a ferramenta quando a intenção de filtro for detectada.
* **O juiz de LLM aprovou uma resposta errada.** Vale um conjunto maior de julgamentos revisados para estimar a taxa de falso positivo do juiz.
* **Escala:** com 167 trechos, busca exata por força bruta é o certo. Com 380 mil restaurantes, entram índice aproximado, atualização incremental e cache de perguntas frequentes.

## 🏗️ Engenharia

* **Trechos** (`chunks.py`): um por item de cardápio e um por seção de política — 167 no total.
* **Busca** (`busca.py`): embeddings normalizados em matriz numpy + BM25, fundidos por Reciprocal Rank Fusion, que usa só as posições e não precisa calibrar escalas diferentes.
* **Ferramentas** (`ferramentas.py`): filtro por preço e por alérgenico, consulta de pedido.
* **Guardrail** (`guardrail.py`): regra em código, com detector de recusa que reconhece respostas com outras palavras.
* **Agente** (`assistente.py`): laço escrito à mão, com limite de voltas.
* **Qualidade:** testes com LLM e busca falsos, `ruff` e CI a cada push.

<p align="center">
  <strong>Feito com</strong> Python · sentence-transformers · BM25 · OpenRouter · Gradio
</p>

---

<div align="center">
  <b>Responde com fonte. E cala quando não sabe. 🍽️</b>
  <br /><br />
  Desenvolvido por <code>Gabriel Monteiro</code> | Estudante de Ciência da Computação @ <a href="https://portal.cin.ufpe.br/">CIn - UFPE</a>
</div>
