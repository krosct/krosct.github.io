---
layout: post
title: "Destilação de LLM"
date: 2026-11-09 13:00:00
excerpt: "Um LLM de 550B rotula reclamações e um BERTimbau de 110M aprende com ele: 92% da qualidade, 100× mais rápido e 170× mais barato"
project: true
github_rep: "https://github.com/krosct/project-nov26-p4-destilacao"
image: "/assets/img/projects/destilacao_de_llm/thumb.png"
---

<div align="center">

  <img src="{{ site.url }}/assets/img/projects/destilacao_de_llm/capa.png" alt="Destilação de LLM: 92% da qualidade, 100 vezes mais rápido" width="100%" />

  <p align="center">
    <strong>O professor caro ensina. O aluno pequeno trabalha.</strong>
    <br />
    Um BERTimbau de 110M que classifica reclamações em 38 ms, na CPU.
  </p>
</div>

---

## 💡 A ideia

Uma plataforma de delivery recebe um volume enorme de reclamações, e cada uma precisa ir para a fila certa: logística, qualidade, financeiro, atendimento. Um LLM grande faz isso muito bem — mas cobra por chamada e leva segundos. Multiplique por milhões de pedidos.

**A pergunta deste projeto é simples: dá para trocar o LLM por um modelo pequeno, rodando em CPU, sem perder muita qualidade?**

A resposta: **sim, com 92% da qualidade, ~100× mais rápido e ~170× mais barato.** O truque é usar o LLM como **professor** — ele rotula os dados — e treinar um modelo pequeno para imitá-lo.

## 🎬 Como funciona

**1. A taxonomia vem primeiro.** Sete categorias de problema, cada uma com definição, exemplo e ordem de desempate. O mesmo documento guia a rotulação de referência **e** é o prompt do LLM: os dois seguem a mesma régua.

**2. O professor rotula.** 6.450 reclamações reais passam pelo LLM em lotes de 20. A saída é validada com Pydantic e precisa devolver **exatamente os mesmos números enviados** — em lote, o modelo às vezes pula ou repete itens, e os rótulos ficariam desalinhados sem erro aparente.

**3. O aluno aprende.** Um BERTimbau (110M) é treinado nesses rótulos, com o melhor checkpoint escolhido pelo F1 na validação.

**4. Tudo é comparado numa referência separada.** 450 reclamações rotuladas à mão, guardadas antes de qualquer treino, validação ou ajuste de prompt.

## 📊 Resultados

| Modelo | F1 macro | Acurácia | Kappa | Latência p50 | Custo / 1M reclamações |
|---|---|---|---|---|---|
| LLM professor — 550B (API) | 0,942 | 0,951 | 0,941 | 3.742 ms | US$ 1.086 (1 por chamada) · US$ 308 (lotes de 20) |
| **BERTimbau aluno — 110M (CPU)** | **0,869** | **0,891** | **0,869** | **38 ms** | **US$ 1,80** |
| TF-IDF + regressão logística (CPU) | 0,763 | 0,798 | 0,757 | 0,4 ms | — |

<div align="center">
  <img src="{{ site.url }}/assets/img/projects/destilacao_de_llm/modelos.png" alt="F1 macro do LLM professor, do BERTimbau aluno e do baseline TF-IDF" width="100%" />
  <p align="center"><em>O aluno fica 11 pontos acima do baseline clássico e a 7 pontos do professor.</em></p>
</div>

<div align="center">
  <img src="{{ site.url }}/assets/img/projects/destilacao_de_llm/custo.png" alt="Custo por 1 milhão de reclamações em escala logarítmica" width="100%" />
  <p align="center"><em>Três ordens de grandeza separam o aluno do professor.</em></p>
</div>

* **A incerteza está medida, não escondida.** Bootstrap pareado com 2.000 reamostragens: F1 do aluno com IC95 de **0,83–0,90**; aluno − TF-IDF entre **+0,07 e +0,15**; professor − aluno entre **+0,04 e +0,11**. Nenhum intervalo cruza zero, então a ordem professor > aluno > TF-IDF se sustenta — a distância exata, não.
* **O aluno recupera ~92% do F1 do professor** (0,869 / 0,942; IC95 da razão 0,89–0,96).
* **Reavaliado em CPU fp32**, o cenário de produção, o aluno dá o mesmo F1: 0,869.
* **Quase duplicatas fora do treino:** 14 das 450 reclamações de referência tinham texto igual a algum do treino depois de normalizar caixa e pontuação. Foram retiradas do treino (29 linhas) e os modelos foram retreinados; a auditoria confirma **0** quase duplicatas.

<div align="center">
  <img src="{{ site.url }}/assets/img/projects/destilacao_de_llm/matriz_confusao.png" alt="Matriz de confusão do BERTimbau nas 450 reclamações de referência" width="100%" />
  <p align="center"><em>Os erros se concentram nas classes menores e mais vagas.</em></p>
</div>

Os erros ficam em `atendimento_ou_cobranca` (recall 0,80), `outro` (0,83) e `atraso_ou_entrega` (0,85). Nas quatro classes principais o recall fica entre 0,85 e 0,96. A confusão mais comum é `defeito_ou_qualidade` → `produto_errado` (7 de 81): "material fino, diferente da foto" fica na fronteira das duas — e o próprio professor erra 7 delas do mesmo jeito.

## ✨ Por que é diferente

* **🧪 Referência intocada:** o prompt do professor nunca foi iterado contra a referência. Se fosse, ela deixaria de ser teste.
* **📐 Kappa e F1 macro, não só acurácia:** uma classe sozinha é 26% da referência. O kappa desconta o acerto por acaso e o F1 macro dá o mesmo peso às classes pequenas.
* **🔍 O que o aluno herda:** ele aprende os erros do professor. Na referência, o professor erra 22 de 450 — e isso está documentado, não escondido.
* **📦 Modelo publicado:** o aluno está no Hugging Face e roda com três linhas de `transformers`.
* **⚙️ Pipeline reprodutível:** amostragem com seed, cache das respostas do LLM e cada etapa rodando sozinha.

## 🔍 O que não deu certo (e o que isso ensina)

* **Mais épocas não melhoraram.** A época 7 foi escolhida na validação (F1 0,862), mas é um pico isolado: depois dela o F1 oscila entre 0,83 e 0,85, e com 598 exemplos de validação essa oscilação é do tamanho do ruído. Na referência, 5 épocas deram 0,859 e 15 deram 0,869 — diferença dentro do intervalo de confiança. Um treino anterior de 30 épocas também não mostrou ganho.

<div align="center">
  <img src="{{ site.url }}/assets/img/projects/destilacao_de_llm/epocas.png" alt="Loss de treino e validação por época, e F1 de validação oscilando" width="100%" />
  <p align="center"><em>O treino decora (loss vai a zero) e a validação piora: a época 7 é um pico isolado, não uma tendência.</em></p>
</div>

* **O domínio é de e-commerce.** Em delivery de comida, entrega e qualidade têm outros padrões (comida fria, item trocado). Seria preciso reavaliar e, provavelmente, criar novos rótulos.
* **Uma classe por texto.** Reclamações com vários problemas recebem só o principal; multirrótulo é o passo natural.
* **O teto da referência é desconhecido.** Foram 450 exemplos, no mínimo 30 por classe, rotulados em duas rodadas. Não foi medida a consistência da rotulação entre rodadas, então não se sabe o quanto a própria referência erra.

## 🏗️ Engenharia

* **Taxonomia** (`data/taxonomia.md`): 7 classes com definição, exemplo e ordem de desempate.
* **Professor** (`rotular.py`): lotes de 20, saída validada com Pydantic, cache em disco e 5 lotes em paralelo.
* **Aluno** (`scripts/finetune.py`): BERTimbau base, lr 2e-5, lote 16, 128 tokens, fp16 numa GPU de 4 GB (pico de 2,2 GB).
* **Baseline** (`scripts/baseline.py`): TF-IDF com unigramas e bigramas ("não chegou", "veio errado") e `class_weight="balanced"`.
* **Qualidade:** `pytest`, `ruff` e CI a cada push.

<p align="center">
  <strong>Feito com</strong> Python · PyTorch · Transformers · BERTimbau · Hugging Face
</p>

---

<div align="center">
  <b>Um modelo 100× menor, no mesmo trabalho. 🧠</b>
  <br /><br />
  Desenvolvido por <code>Gabriel Monteiro</code> | Estudante de Ciência da Computação @ <a href="https://portal.cin.ufpe.br/">CIn - UFPE</a>
</div>
