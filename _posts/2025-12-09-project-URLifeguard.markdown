---
layout: post
title: "URLifeguard"
date: 2025-12-09
excerpt: "Projeto de cibersegurança e aprendizado profundo que visa detectar URLs maliciosas"
project: true
github_rep: "https://github.com/krosct/URLifeguard"
---
# URLifeguard 🛡️
### Detecção de URLs Maliciosas com Deep Learning (Character-Level)

**URLifeguard** é um projeto de cibersegurança e aprendizado profundo que visa detectar URLs maliciosas (phishing, malware, defacement) de forma proativa. Diferente das abordagens tradicionais baseadas em "listas negras" ou análise de palavras, este modelo atua como um "salva-vidas" digital, analisando a **estrutura sintática e semântica da URL em nível de caractere**, permitindo identificar padrões de ofuscação e ataques de dia zero (*zero-day*).

---

## 🧠 Sobre o Projeto

Este repositório contém a implementação e comparação de duas arquiteturas de redes neurais profundas para a classificação binária de URLs (Benigna vs. Maliciosa):

1.  **1D-CNN (Convolutional Neural Network):** Focada em extrair padrões locais e estruturais da URL (ex: subdomínios suspeitos, extensões de arquivo).
2.  **LSTM (Long Short-Term Memory):** Focada em capturar dependências de longo prazo e o contexto sequencial dos caracteres.

O objetivo é superar as limitações de métodos baseados em dicionários, detectando técnicas comuns de evasão como *typosquatting* (ex: `g0ogle.com` ao invés de `google.com`).

## 🚀 Funcionalidades

* **Pré-processamento Customizado:** Tokenização em nível de caractere e padding de sequências para tratamento de URLs como dados não estruturados.
* **Treinamento Comparativo:** Scripts para treinar e avaliar CNNs e LSTMs lado a lado.
* **Métricas de Segurança:** Avaliação focada em [F1-Score](https://www.google.com/search?q=f1-score) e [Matriz de Confusão](https://www.google.com/search?q=matriz+de+confusao) para minimizar falsos negativos críticos.
* **Inferência em Tempo Real:** Script de demonstração para classificar novas URLs inseridas pelo usuário.

## 🛠️ Tecnologias Utilizadas

* **Linguagem:** [Python 3.x](https://www.python.org/)
* **Framework de DL:** [PyTorch](https://pytorch.org/)
* **Manipulação de Dados:** [Pandas](https://pandas.pydata.org/), [NumPy](https://numpy.org/)
* **Visualização:** [Matplotlib](https://matplotlib.org/), [Seaborn](https://seaborn.pydata.org/)
* **Ambiente de Desenvolvimento:** [Google Colab](https://colab.google/) / [Jupyter Notebook](https://jupyter.org/)

## 📂 Estrutura do Repositório

```bash
URLifeguard/
├── data/                   # Scripts de download e limpeza do dataset
├── models/                 # Definição das arquiteturas (CNN, LSTM)
├── notebooks/              # Jupyter Notebooks (EDA, Treinamento, Avaliação)
├── utils/                  # Funções auxiliares de tokenização e métricas
├── check_url.py            # Script para teste de URLs em tempo real
└── README.md
```

## 📊 Dataset
O projeto utiliza o [Malicious URLs Dataset](https://www.kaggle.com/datasets/furkanfarukyeil/malicius-url-dataset) (disponível no Kaggle), composto por aproximadamente 650.000 URLs classificadas em categorias como benigna, phishing, malware e defacement.

🤝 Autor | `Gabriel Monteiro` | Estudante de Ciência da Computação @ [CIn - UFPE](https://portal.cin.ufpe.br/)

> Este projeto foi desenvolvido como parte da disciplina de Introdução à Aprendizagem Profunda.