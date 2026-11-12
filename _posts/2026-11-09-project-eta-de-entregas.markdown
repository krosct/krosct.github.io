---
layout: post
title: "ETA de Entregas"
date: 2026-11-09 10:00:00
excerpt: "Modelo que prevê em quantos minutos o pedido chega, com erro médio de 3,4 minutos, servido por uma API pronta para produção"
project: true
github_rep: "https://github.com/krosct/project-nov26-p1-eta"
image: "/assets/img/projects/eta_de_entregas/thumb.png"
---

<div align="center">

  <img src="{{ site.url }}/assets/img/projects/eta_de_entregas/capa.png" alt="ETA de entregas: erro médio de 3,4 minutos" width="100%" />

  <p align="center">
    <strong>Quanto tempo até o pedido chegar?</strong>
    <br />
    Um modelo que responde isso em minutos de erro, não em horas de espera.
  </p>
</div>

---

## 💡 A ideia

Quem pede comida quer saber **quando** ela chega. Quem opera a entrega quer saber se a promessa é realista. Nos dois casos, a resposta é um número: o tempo estimado de entrega, o ETA.

O problema é que esse número depende de muita coisa ao mesmo tempo: a distância, o horário, o clima, o trânsito, o tipo de pedido e o entregador. Chutar a média erra por quase **8 minutos**. E 8 minutos de erro é o suficiente para transformar uma entrega tranquila em reclamação.

**Este projeto pega 45 mil entregas de um dataset público de delivery e aprende o que faz uma entrega demorar.** O resultado é um modelo que erra, em média, **3,4 minutos** — e uma API que devolve esse número em milissegundos.

## 🎬 Como funciona

**1. Os dados chegam bagunçados.** O arquivo original tem ausentes escritos como o texto `"NaN "`, espaços sobrando, o alvo no formato `"(min) 24"`, coordenadas com sinal invertido e notas acima de 5. Tudo isso é corrigido antes de qualquer modelo ver os dados.

**2. As features são calculadas uma vez só.** A distância em linha reta (haversine), a hora e o dia da semana do pedido saem de uma função única, usada tanto no treino quanto na API. Assim, o que o modelo aprendeu é exatamente o que ele recebe em produção.

**3. O modelo aprende.** Um LightGBM, comparado contra dois baselines: a média e uma regressão linear.

**4. A API responde.** `POST /predict` recebe o pedido, valida cada campo e devolve o ETA em minutos. Pedido inválido recebe `422`, com o motivo.

## 📊 Resultados

Validação cruzada em 36.612 pedidos, teste final em 8.981 pedidos de entregadores não vistos no treino e um teste temporal treinando nos primeiros 80% dos dias e testando nos 9 dias seguintes.

| Modelo | MAE (min) | RMSE (min) | R² |
|---|---|---|---|
| Baseline: média | 7,59 | 9,38 | 0,00 |
| Baseline: regressão linear | 5,14 | 6,47 | 0,52 |
| **LightGBM (validação cruzada)** | **3,39 ± 0,02** | **4,23** | **0,80** |
| LightGBM — teste final (entregadores inéditos) | **3,42** (IC95 3,36–3,47) | 4,27 | 0,80 |
| LightGBM — teste temporal (*out-of-time*) | **3,45** | 4,28 | 0,80 |

O erro caiu de 7,6 para 3,4 minutos: **−55% em relação à média** e **−34% em relação ao modelo linear**. E os três testes dão praticamente o mesmo número (3,39 / 3,42 / 3,45), o que mostra que o resultado não depende de um recorte sortudo.

<div align="center">
  <img src="{{ site.url }}/assets/img/projects/eta_de_entregas/tempo_por_transito.png" alt="Tempo de entrega por densidade de trânsito" width="100%" />
  <p align="center"><em>Trânsito congestionado desloca a distribuição inteira para cima — e o modelo aprende isso.</em></p>
</div>

<div align="center">
  <img src="{{ site.url }}/assets/img/projects/eta_de_entregas/distancia_tempo.png" alt="Distância em linha reta por tempo de entrega" width="100%" />
  <p align="center"><em>Distância explica muito, mas não tudo: entregas da mesma distância variam 20 minutos.</em></p>
</div>

## ✨ Por que é diferente

* **🎯 Métrica que se explica sozinha:** MAE em minutos quer dizer "erramos 3,4 minutos em média". Não precisa traduzir nada.
* **🧪 Três formas de testar:** validação cruzada, entregadores inéditos e teste no tempo. Se o número só aparecesse em um deles, seria sorte.
* **📉 Baselines de verdade:** média e regressão linear estão na tabela. Sem eles, "R² de 0,80" não significa nada.
* **🔁 Treino e produção com o mesmo código:** a função de features é a mesma nos dois lados, então não existe aquele clássico "funcionava no notebook".
* **📦 Pronto para rodar:** API com validação, testes automatizados, CI, Docker e experimentos versionados no MLflow.

## 🔍 O que ficou de fora (e por quê)

Essa é a parte que separa um modelo bonito de um modelo confiável.

* **A hora da retirada do pedido foi excluída.** É uma das variáveis mais usadas em notebooks públicos com esse dataset, mas ela só existe **depois** que o pedido sai do restaurante. Usá-la seria prever o futuro com o futuro.
* **A nota do entregador ficou fora do modelo principal.** Ela é a feature de maior ganho (o erro cai de 3,39 para 3,13) e tem correlação de −0,34 com o tempo. Mas ela muda de pedido para pedido dentro do mesmo entregador e ainda explica parte do erro do modelo que não a usa — o que é compatível com uma nota dada **à própria entrega**, que só existe depois dela. Sem garantia de que a nota é conhecida na hora do pedido, ela não entra. O modelo com nota está medido e documentado, para o caso de a plataforma ter esse histórico antes do pedido.
* **Os ausentes foram mantidos.** Cerca de 16% dos pedidos têm algum campo vazio, e são, em média, entregas mais rápidas. Jogar fora enviesaria a base; o LightGBM trata ausentes nativamente.
* **O dataset tem sinais de dado gerado.** Idade e nota variam dentro do mesmo identificador de entregador, e há dias sem nenhum pedido. As métricas valem para este dataset, não para uma operação real.

## 🏗️ Engenharia

* **Dados** (`data.py`): limpeza, tipos, coordenadas e alvo — com o diagnóstico do que foi corrigido registrado em relatório.
* **Features** (`features.py`): haversine, hora, dia da semana e categorias fixas, compartilhadas entre treino e API.
* **API** (`api.py`): FastAPI + Pydantic, faixas de latitude, categorias permitidas e idade entre 15 e 70 anos.
* **Experimentos:** MLflow com banco local, para comparar execuções sem planilha.
* **Qualidade:** `pytest` cobrindo features, validação de schema e endpoint, `ruff` e CI a cada push.

<p align="center">
  <strong>Feito com</strong> Python · LightGBM · scikit-learn · FastAPI · MLflow · Docker
</p>

---

<div align="center">
  <b>Distância, trânsito e horário entram. Um prazo honesto sai. 🛵</b>
  <br /><br />
  Desenvolvido por <code>Gabriel Monteiro</code> | Estudante de Ciência da Computação @ <a href="https://portal.cin.ufpe.br/">CIn - UFPE</a>
</div>
