---
layout: post
title: "O Ar Live"
date: 2026-10-05
excerpt: "Jogo de guerra e conquista transmitido ao vivo, em que até 9 comandantes disputam um globo 3D com ordens digitadas no chat da live"
project: true
---

<div align="center">

  <img src="{{ site.url }}/assets/img/projects/o_ar_live/01-abertura.jpg" alt="O Ar Live — Guerra e Conquista" width="100%" />

  <p align="center">
    <b>Um mundo inteiro em guerra, ao vivo. E você comanda pelo chat.</b>
    <br />
    Projeto individual: game design, simulação, renderização 3D e transmissão.
  </p>
</div>

---

## 📖 Sobre o Jogo

O planeta gira na tela. Oito continentes, 72 territórios e até **9 comandantes** disputando cada pedaço de terra. Cada ordem sai de uma mensagem no chat da live: sem instalar nada, sem baixar nada. Você digita, e o mundo obedece.

Monte sua economia, treine seus soldados, faça aliados (e traia na hora certa), declare guerra e veja seu exército cruzar o globo rumo ao território inimigo. Quem dominar **3 regiões** primeiro vence a rodada. Um minuto depois, um mundo novo nasce e a disputa recomeça.

> ⚔️ **Entre na guerra em 10 segundos:** abra a live e digite `!@entrar seunome` no chat. Você recebe **8 territórios espalhados pelo mundo**, cada um com um milhão de pessoas esperando suas ordens, e sua cor aparece no globo na hora.

<img src="{{ site.url }}/assets/img/projects/o_ar_live/04-globo.jpg" alt="O globo em jogo, com o painel do jogador, o painel do território e o letreiro de eventos" width="100%" />

## 🎬 Do lobby à vitória

Toda partida abre com **1 minuto de espera** para os jogadores entrarem. Vagas que ninguém pegar viram bots, e eles jogam para ganhar.

<img src="{{ site.url }}/assets/img/projects/o_ar_live/02-jogadores.jpg" alt="Jogadores desta partida" width="100%" />

<img src="{{ site.url }}/assets/img/projects/o_ar_live/03-como-jogar.jpg" alt="Tela de como jogar, com ordens, recursos, profissões e construções" width="100%" />

## ✨ O que você vai viver

* **🌍 Um globo vivo:** a Terra gira de verdade e passeia pelos continentes. Cada território ganha a cor de quem manda nele, e as tropas e caravanas cruzam o mapa em tempo real, como rotas táticas na cor de cada exército.
* **⚔️ Guerra de verdade:** ataque vizinhos, ocupe terras vazias e reúna tropas de vários territórios num só golpe. Armas fortalecem o ataque, proteção segura a defesa, e uma defesa preparada pode virar o jogo.
* **🤝 Alianças, doações e traições:** peça aliança, mande soldados para salvar um aliado em apuros... ou rompa o pacto quando ele ficar forte demais. Na diplomacia, todo mundo é amigo até deixar de ser.
* **💰 Uma economia para dominar:** trabalhadores juntam mantimentos, cozinheiros fazem comida, mecânicos fazem transporte, médicos curam e engenheiros erguem proteção. Faltou comida? Seu povo passa fome. Sobrou? Sua população cresce. E dá para negociar recursos com outros jogadores.
* **🏗️ Construa o seu império:** hospitais, quartéis, escolas, restaurantes, oficinas e canteiros de obras, cada um com uma vantagem que cresce junto com a sua população.
* **🌋 A natureza não escolhe lado:** terremotos, erupções, pandemias, ciclones e tsunamis podem atingir a região em destaque a qualquer momento. Quem se espalha pelo mundo e guarda estoques sobrevive; quem bobeia perde tudo.
* **🤖 Bots que jogam para vencer:** eles cuidam da economia, montam exército, fazem pactos, traem e declaram guerra, com as mesmas ordens e os mesmos limites que você.
* **📢 Tudo no letreiro:** ataques, batalhas, alianças, traições, trocas e eliminações. O letreiro conta a história da partida em tempo real, na cor de cada jogador.

## 🏆 Momentos de glória

Conquistou um território? Dominou um continente inteiro? Eliminou um rival? Todo mundo vai ver sua glória!

<img src="{{ site.url }}/assets/img/projects/o_ar_live/05-conquista.jpg" alt="Mini-região conquistada" width="100%" />

<img src="{{ site.url }}/assets/img/projects/o_ar_live/06-dominio.jpg" alt="Nova região conquistada" width="100%" />

<img src="{{ site.url }}/assets/img/projects/o_ar_live/07-desastre.jpg" alt="Erupção vulcânica atingindo uma região" width="100%" />

<img src="{{ site.url }}/assets/img/projects/o_ar_live/08-eliminacao.jpg" alt="Jogador eliminado" width="100%" />

<img src="{{ site.url }}/assets/img/projects/o_ar_live/09-vitoria.jpg" alt="Tela de vitória" width="100%" />

## 🎮 Suas primeiras ordens

| Quero... | Digite no chat |
| --- | --- |
| Entrar no jogo | `!@entrar ana` |
| Mover gente entre territórios meus | `!@mover 50k AN1 AN3` |
| Atacar um território | `!@atacar E2 AN1:20k` |
| Pedir aliança | `!@aliar beto` |
| Mandar soldados para um aliado | `!@doar 10k AN1 E2` |
| Declarar guerra | `!@guerra beto` |
| Preparar a defesa | `!@defender AN3` |
| Propor uma troca | `!@troca beto 50k mantimentos AN3 por 200k comida` |

## 🏗️ Engenharia

* **Simulação e renderização separadas:** o simulador do mundo e o renderizador rodam em processos diferentes. A cada segundo simulado, o simulador publica um retrato do mundo via **Redis**, e o renderizador só desenha esses retratos, interpolando os movimentos para manter tudo fluido.
* **Globo 3D renderizado sem janela (*headless*)** com **Panda3D** e transmitido ao vivo pelo **FFmpeg**.
* **Chat como controle:** ordens lidas do chat da **Twitch** e do **YouTube**, validadas e enfileiradas no Redis até o simulador.
* **Modelo populacional agregado:** nada de um objeto por pessoa. Os contadores escalam até bilhões de habitantes sem perder desempenho.
* **Vários layouts de transmissão** (roteiro, comando, destaque, cenas e clássico), trocados ao vivo por um **painel de administração** web.
* **Qualidade:** testes automatizados com pytest (incluindo testes que garantem a separação entre simulação e renderização), lint, checagem de tipos e CI/CD no GitHub Actions, com *Conventional Commits* e versionamento semântico.

## 🛠️ Tecnologias Utilizadas

* **Linguagem:** [Python](https://www.python.org/)
* **Motor 3D:** [Panda3D](https://www.panda3d.org/)
* **Transmissão:** [FFmpeg](https://ffmpeg.org/) (RTMP para o YouTube)
* **Mensageria:** [Redis](https://redis.io/)
* **Bibliotecas:** [NumPy](https://numpy.org/), [Pillow](https://python-pillow.org/), [Pydantic](https://docs.pydantic.dev/), [pytchat](https://github.com/taizan-hokuto/pytchat)
* **Infraestrutura:** [Docker](https://www.docker.com/), [GitHub Actions](https://github.com/features/actions), [uv](https://docs.astral.sh/uv/)
* **Qualidade:** [pytest](https://pytest.org/), [Ruff](https://docs.astral.sh/ruff/), [Pyright](https://github.com/microsoft/pyright)

---

<div align="center">
  <b>O mundo já está girando. Falta só a sua ordem.</b>
  <br />
  <code>!@entrar seunome</code>
  <br /><br />
  Desenvolvido por <code>Gabriel Monteiro</code> | Estudante de Ciência da Computação @ <a href="https://portal.cin.ufpe.br/">CIn - UFPE</a>
</div>
