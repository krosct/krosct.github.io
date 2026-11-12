---
layout: post
title: "Guardrails em Tempo Real"
date: 2026-11-09 14:00:00
excerpt: "Moderação em cascata para chats e avaliações: regras, classificador em CPU e juiz LLM, com PII mascarado antes de qualquer chamada externa"
project: true
github_rep: "https://github.com/krosct/project-nov26-p5-guardrails"
image: "/assets/img/projects/guardrails/thumb.png"
---

<div align="center">

  <img src="{{ site.url }}/assets/img/projects/guardrails/capa.png" alt="Guardrails em tempo real: F1 0,969 com 82% das mensagens decididas na CPU" width="100%" />

  <p align="center">
    <strong>Barato no caso comum, cuidadoso no caso difícil.</strong>
    <br />
    Regras em microssegundos, classificador em 1 ms e o LLM só quando vale a pena.
  </p>
</div>

---

## 💡 A ideia

Todo chat de entrega, avaliação de loja e assistente de IA tem três riscos ao mesmo tempo: alguém tentando **manipular o modelo** (*prompt injection*), alguém aplicando **golpe ou ofendendo**, e alguém digitando **dados pessoais** que não podem vazar (LGPD).

Chamar um LLM grande para cada mensagem resolve parte disso — e cria dois problemas novos: custo e latência. Só regras, por outro lado, deixam passar quase tudo que não usa palavra-chave óbvia.

**Este projeto combina os dois em cascata:** regras determinísticas, um classificador estatístico em CPU e o LLM apenas como juiz final do que ficou ambíguo. E, antes de qualquer chamada externa, **o dado pessoal já foi mascarado**.

## 🎬 Como funciona

**1. L1 — regras e redação de PII (~0,05 ms).** Valida CPF pelos dígitos verificadores e cartão pelo algoritmo de Luhn, mascara telefone, e-mail e chave Pix, e barra assinaturas inequívocas de injeção, golpe e ameaça. Relato de golpe sofrido **não** bloqueia.

**2. L2 — classificador em CPU (~1 ms).** TF-IDF de palavras e de caracteres com regressão logística. Se prevê "PII exposto" sem que a L1 tenha confirmado PII, descarta e escolhe a segunda classe.

**3. L3 — juiz LLM, só quando precisa.** Chamado apenas quando a confiança do L2 fica abaixo do limiar — e sempre com o texto **já redigido pela L1**. O provedor externo recebe `[CPF]`, não o CPF.

**4. A decisão vira ação.** Cinco categorias mapeadas para três ações: `permitir`, `mascarar` ou `bloquear`.

## 📊 Resultados

450 mensagens de referência (90 por classe), que não participam de treino nem de nenhuma escolha. O limiar da cascata (**0,65**) foi escolhido **só na validação**, por um critério fixado antes: o maior limiar com até 15% de escalonamento ao LLM.

| Abordagem | F1 macro (IC95) | Recall de bloqueio | Falso bloqueio | Latência p50 | Custo / 1M msgs |
|---|---|---|---|---|---|
| L1: regras (regex + checksum) | 0,395 (0,36–0,43) | 13,3% | 0,0% | 0,05 ms | US$ 0,01 |
| L2: TF-IDF + regressão logística | 0,945 (0,92–0,96) | 100,0% | 8,3% | — | — |
| Cascata só CPU (L1 + L2) | 0,937 (0,91–0,96) | 100,0% | 10,0% | 1,32 ms | US$ 0,05 |
| **Cascata completa (L1 + L2 + L3)** | **0,969 (0,95–0,98)** | **97,4%** | **2,8%** | **1,54 ms** | **US$ 188,25** |
| LLM juiz em 100% do tráfego | 0,867 (0,84–0,90) | 95,9% | 0,6% | 5.095 ms | US$ 1.072 |

<div align="center">
  <img src="{{ site.url }}/assets/img/projects/guardrails/abordagens.png" alt="F1 macro por abordagem: regras, TF-IDF, cascata em CPU, cascata completa e LLM em 100%" width="100%" />
  <p align="center"><em>A cascata completa supera o LLM sozinho — e custa 5,7× menos.</em></p>
</div>

<div align="center">
  <img src="{{ site.url }}/assets/img/projects/guardrails/custo.png" alt="Custo por 1 milhão de mensagens em escala logarítmica" width="100%" />
  <p align="center"><em>82% das mensagens são decididas na CPU, e é isso que segura a conta.</em></p>
</div>

* **A cascata supera o LLM sozinho** (0,969 contra 0,867), sobretudo por causa de PII: o LLM em 100% recebe o texto já mascarado e acerta só 50% dos exemplos de PII (ele não vê o dado), enquanto a L1 resolve 88% deles por checksum e formato. Isso é consequência do desenho — redigir antes de enviar —, não defeito do modelo.
* **82% das mensagens não chegam ao LLM.** Na referência, 116 foram resolvidas na L1, 255 na L2 e só 79 escalaram para o juiz.
* **A L1 sozinha quase não bloqueia ataques** (recall de 13%), mas tem **0% de falso bloqueio** e resolve 88% do PII. Cada camada faz o que sabe fazer melhor.

<div align="center">
  <img src="{{ site.url }}/assets/img/projects/guardrails/matriz_confusao.png" alt="Matriz de confusão da cascata completa nas 450 mensagens de referência" width="100%" />
  <p align="center"><em>Os 6 casos de "ofensa ameaça" classificados como "seguro" são o principal erro da cascata.</em></p>
</div>

## ⚠️ O número que importa de verdade

A referência tem 20% de cada classe. **O tráfego real não é assim:** em produção, quase tudo é seguro. E aí a precisão do bloqueio despenca.

Com uma prevalência ilustrativa de 97% de tráfego seguro (uma suposição, não uma medida):

| Abordagem | Falso bloqueio | Precisão do bloqueio |
|---|---|---|
| Cascata só CPU | 16,5% | 11,0% |
| Cascata completa | 5,5% | 26,3% |
| LLM em 100% | 1,1% | 63,8% |

Ou seja: na cascata completa, **cerca de 3 de cada 4 bloqueios seriam indevidos**. O LLM em 100% é o melhor nesse eixo — ao custo de ~5,7× mais caro, ~5 s de latência e de perder o PII mascarado. A cascata entrega um meio-termo; para depender dela em tráfego real é preciso baixar o falso bloqueio do L2 ou manter revisão humana nos bloqueios.

## ✨ Por que é diferente

* **🛡️ Privacidade por construção:** o texto chega ao provedor externo já redigido. Não é uma promessa no prompt, é a ordem das operações.
* **🎚️ Limiar escolhido por orçamento, não por F1:** o critério é "maior limiar com até 15% de escalonamento na validação". A curva de limiar da referência é só análise — usá-la para escolher seria ajustar no teste.
* **🔍 Teste de atalho de fonte:** um classificador que só prevê a **fonte** do texto acerta 99,8%, e um baseline que ignora o conteúdo e chuta a classe mais comum de cada fonte chega a 80,0%. O L2 faz 94,7%: o ganho real sobre esse piso é de ~15 pontos, não os 94,7 absolutos.
* **🧾 Auditoria dos rótulos:** um juiz LLM independente concorda com 96,4% da referência (kappa 0,956). Os 16 desacordos estão listados — e **não alteram nenhum rótulo**.
* **⚡ API pronta:** FastAPI com `/health` e `/moderate`, contratos Pydantic e Docker.

## 🔍 O que ainda não está resolvido

* **Parte dos dados é sintética:** golpe, injeção e PII foram gerados. Os números dessas classes medem a detecção **desses padrões**, não de golpes reais.
* **Precisão do bloqueio em tráfego realista é baixa** (26% na cascata completa). Calibrar o L2 com mais exemplos seguros difíceis e medir numa amostra de tráfego real são os próximos passos.
* **Latência de cauda:** o p95 da cascata completa é de segundos, porque depende do juiz. Em fluxo síncrono, o certo é usar só a cascata de CPU no caminho crítico e o juiz de forma assíncrona.
* **Turno único:** golpes divididos em várias mensagens exigem janela de contexto.
* **Próximo passo natural:** trocar o TF-IDF por um encoder pequeno destilado — como o BERTimbau do [projeto de destilação]({{ site.url }}/project-destilacao-de-llm/) — para reduzir a fração que escala ao LLM.

## 🏗️ Engenharia

* **Taxonomia orientada a ação** (`dominio.py`): 5 categorias mapeadas para 3 ações, e o mesmo documento é o prompt do juiz.
* **L1** (`regras.py`): CPF com dígitos verificadores, cartão com Luhn, máscara de telefone, e-mail e Pix, e assinaturas de injeção, golpe e ameaça.
* **L2** (`classificador.py`): TF-IDF de palavras (1–2) e caracteres (3–5) com regressão logística.
* **L3** (`llm.py`, `cascata.py`): juiz LLM com saída validada por Pydantic, sempre sobre o texto redigido.
* **API** (`api.py`): `/health` e `/moderate`, com Docker.
* **Qualidade:** `pytest`, `ruff` e CI a cada push.

<p align="center">
  <strong>Feito com</strong> Python · scikit-learn · FastAPI · OpenRouter · Docker
</p>

---

<div align="center">
  <b>Rápido no comum. Cuidadoso no difícil. 🛡️</b>
  <br /><br />
  Desenvolvido por <code>Gabriel Monteiro</code> | Estudante de Ciência da Computação @ <a href="https://portal.cin.ufpe.br/">CIn - UFPE</a>
</div>
