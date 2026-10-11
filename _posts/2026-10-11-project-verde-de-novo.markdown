---
layout: post
title: "Verde de Novo"
date: 2026-10-11
excerpt: "App que analisa a foto de uma planta inteira, reconhece a espécie, observa cada parte e sugere cuidados para ela voltar a crescer"
project: true
github_rep: "https://github.com/krosct/Verde-de-Novo"
image: "/assets/img/projects/verde_de_novo/verde-de-novo.webp"
---

<div align="center">

  <img src="{{ site.url }}/assets/img/projects/verde_de_novo/verde-de-novo.webp" alt="Verde de Novo" width="200" />

  <p align="center">
    <b>Sua planta não fala. Mas ela mostra.</b>
    <br />
    Tire uma foto da planta inteira e descubra quem ela é, o que merece atenção e o que fazer para ela voltar a crescer.
  </p>
</div>

---

## 📖 Ela está triste e você não sabe por quê

A folha amarelou. O caule ficou fino e comprido. A terra parece sempre molhada, ou sempre seca. Você pesquisa na internet e encontra dez respostas diferentes, cada uma mais confiante que a outra.

Aí você chuta. Rega mais. Ou rega menos. Muda de lugar. E às vezes piora. **O Verde de Novo olha com calma antes de responder.**

> 🚧 **Em construção:** a interface e o fluxo de análise estão prontos, mas o reconhecimento de verdade ainda está sendo conectado. Por enquanto as respostas são de demonstração.

## 🎬 Como funciona

1. **Fotografe a planta inteira.** Folhas, caule e terra aparecendo, com boa luz. Pela câmera ou pela galeria.
2. **Ele olha parte por parte.** Primeiro confere se a foto está boa, depois tenta reconhecer a espécie e então observa cada parte visível: folhas, caule, terra e raízes.
3. **Você recebe o que fazer.** Os pontos de atenção, o que levou a cada um e sugestões simples de cuidado para aquela planta.

## ✨ Por que você vai gostar

* **🌿 Descobre quem ela é:** costela-de-adão? Jiboia? Espada-de-são-jorge? Ele mostra a espécie mais provável e até duas alternativas.
* **🔍 Olha cada parte, não só a folha:** folha manchada conta uma história, terra encharcada conta outra. Juntando as pistas de cada parte, ele chega a respostas mais certeiras.
* **🧾 Mostra o porquê:** cada ponto de atenção vem com o que foi visto na foto, para você conferir com os próprios olhos.
* **💧 Dicas para ela crescer melhor:** luz, rega e umidade, com sugestões práticas pensadas para a espécie e sem produto nenhum.
* **🤝 Honesto quando não sabe:** foto ruim? Ele pede outra. Não reconheceu a espécie com segurança? Ele diz, e dá cuidados gerais.
* **📱 No computador e no celular:** funciona no navegador e no Android, e pode ser instalado como app.

## 🔒 Feito com respeito à sua privacidade

* A câmera só liga quando você toca no botão, e um aviso de privacidade aparece antes de qualquer envio.
* Nenhuma foto é guardada, nem no aparelho, nem no servidor.
* Metadados da foto, como localização, são apagados antes da análise.
* Sem contas, sem cadastro, sem histórico na nuvem.

## 🏗️ Engenharia

* **Pipeline de análise em etapas:** checagem de qualidade da foto, reconhecimento da espécie e observação de cada parte da planta, cada etapa com seu próprio limiar de confiança. Uma camada de decisão combina as observações em pontos de atenção e cuidados.
* **Proxy em FastAPI:** a chave do serviço de visão fica só no backend, que também valida e limita o tamanho das imagens e aplica limite de requisições por cliente.
* **Fornecedor de visão plugável:** a interface do fornecedor é isolada, com um *stub* offline para desenvolvimento e testes enquanto o serviço real é integrado.
* **Preparo da imagem no cliente:** a foto é redimensionada e recodificada antes do envio.
* **PWA instalável**, com testes automatizados no frontend (Vitest) e no backend (pytest).

## 🛠️ Tecnologias Utilizadas

* **Frontend:** [TypeScript](https://www.typescriptlang.org/), [Vite](https://vitejs.dev/), [vite-plugin-pwa](https://vite-pwa-org.netlify.app/)
* **Backend:** [Python](https://www.python.org/), [FastAPI](https://fastapi.tiangolo.com/), [Pillow](https://python-pillow.org/)
* **Qualidade:** [Vitest](https://vitest.dev/), [pytest](https://pytest.org/), [ESLint](https://eslint.org/), [Ruff](https://docs.astral.sh/ruff/)

> O Verde de Novo dá pistas para você observar e cuidar melhor. **Não é diagnóstico.** Ele não indica produtos nem venenos. Se a planta estiver muito mal, procure uma loja de jardinagem ou um especialista.

---

<div align="center">
  <b>Uma foto. Um olhar atento. Uma planta verde de novo. 🌱</b>
  <br /><br />
  Desenvolvido por <code>Gabriel Monteiro</code> | Estudante de Ciência da Computação @ <a href="https://portal.cin.ufpe.br/">CIn - UFPE</a>
</div>
