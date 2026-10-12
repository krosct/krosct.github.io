---
layout: post
title: "Tartaruguinha"
date: 2026-10-09
excerpt: "Coach de postura que roda no navegador e avisa, na hora, quando você começa a se curvar em frente à tela"
project: true
github_rep: "https://github.com/krosct/Tartaruguinha"
image: "/assets/img/projects/tartaruguinha/tartaruguinha.jpg"
---

<div align="center">

  <img src="{{ site.url }}/assets/img/projects/tartaruguinha/tartaruguinha.jpg" alt="Tartaruguinha fazendo joinha na frente do computador" width="360" />

  <p align="center">
    <b>Sua postura agradece. Seu pescoço também.</b>
    <br />
    Um coach de postura que mora no seu navegador e avisa, na hora, quando você começa a se curvar.
  </p>
</div>

---

## 📖 Você só percebe quando já está doendo

Você começa o dia sentado direitinho. Três horas e duas reuniões depois, está dobrado sobre o teclado, com a cabeça projetada para a frente e os ombros caídos. Feito uma tartaruguinha.

Ninguém percebe isso sozinho. Quando o pescoço reclama, o estrago do dia já está feito. **A Tartaruguinha percebe por você.**

<table>
  <tr>
    <th align="center">😩 Antes 🚫</th>
    <th align="center">😎 Depois ✅</th>
  </tr>
  <tr>
    <td><img src="{{ site.url }}/assets/img/projects/tartaruguinha/antes.jpg" alt="Tartaruga com o pescoço esticado em direção ao monitor" width="100%" /></td>
    <td><img src="{{ site.url }}/assets/img/projects/tartaruguinha/depois.jpg" alt="Tartaruga sentada com a coluna reta e a cabeça erguida" width="100%" /></td>
  </tr>
  <tr>
    <td align="center"><em>14h37. Pescoço a meio caminho do monitor. Ninguém avisou.</em></td>
    <td align="center"><em>14h38. Um “ding-dong” depois. Coluna reta, dignidade restaurada.</em></td>
  </tr>
</table>

## 🎬 Como funciona

1. **Ligue a Tartaruguinha** no navegador e clique em **Iniciar**. Não precisa de cadastro.
2. **Trabalhe normalmente.** A webcam observa sua postura em tempo real, em silêncio.
3. **Curvou? Ela avisa.** Um toque suave, um brilho na tela e uma notificação. Endireitou? Ela volta a ficar quietinha.

## ✨ Por que você vai gostar

* **⚡ Feedback na hora:** nada de lembrete de hora em hora. O aviso chega no momento em que você se curva, enquanto ainda é fácil corrigir.
* **🔒 Sua imagem nunca sai do computador:** toda a análise acontece no próprio aparelho. Nenhuma foto ou vídeo é enviado, gravado ou guardado.
* **👀 Você vê o que ela vê:** um esqueleto desenhado sobre a imagem mostra o que está sendo observado. Verde é postura boa, vermelho é curvado, cinza é tronco fora do quadro e amarelo é incerteza.
* **🤫 Gentil, não chata:** depois de um aviso, ela espera um pouco antes de avisar de novo, e um piscar de olhos ou uma sombra não disparam alarme falso.
* **🎛️ Do seu jeito:** rigor, volume e frequência dos avisos ajustáveis em segundos, e ela lembra das suas preferências.
* **🪟 Continua de olho em segundo plano:** troque de aba ou de programa e ela segue avisando, ou acompanhe por uma janelinha flutuante (*Picture-in-Picture*).
* **⏱️ Sessões e histórico:** cronômetro, contador de alertas, pausar e retomar, e um histórico com o tempo em boa postura e a evolução de cada sessão.
* **📱 No computador e no celular:** funciona no navegador e no Android, e pode ser instalada como app.

## 🏗️ Engenharia

* **Visão computacional 100% no cliente:** detecção de pose com **MediaPipe Pose Landmarker** rodando no navegador, sem nenhum servidor envolvido.
* **Classificação de postura por regras sobre os pontos do corpo:** pontos com baixa visibilidade são descartados e os avisos têm intervalo mínimo entre si, evitando alarmes falsos.
* **PWA instalável** com funcionamento offline e ícones gerados a partir do emoji da tartaruga.
* **Privacidade por design:** câmera só liga com ação do usuário, indicador de monitoramento sempre visível e histórico guardado apenas no navegador.
* **Qualidade:** testes automatizados com Vitest, lint, checagem de tipos e pull requests com revisão.

## 🛠️ Tecnologias Utilizadas

* **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
* **Visão computacional:** [MediaPipe Tasks Vision](https://ai.google.dev/edge/mediapipe/solutions/vision/pose_landmarker)
* **Build e PWA:** [Vite](https://vitejs.dev/), [vite-plugin-pwa](https://vite-pwa-org.netlify.app/)
* **Qualidade:** [Vitest](https://vitest.dev/), [ESLint](https://eslint.org/)

> A Tartaruguinha é uma ajuda para criar um hábito melhor, não um aconselhamento médico. Se você sente dores frequentes, procure um profissional de saúde.

---

<div align="center">
  <img src="{{ site.url }}/assets/img/projects/tartaruguinha/perfil.jpg" alt="Tartaruguinha sorrindo e fazendo joinha" width="220" />
  <br />
  <b>Endireita essa coluna. A Tartaruguinha está de olho. 🐢</b>
  <br /><br />
  Desenvolvido por <code>Gabriel Monteiro</code> | Estudante de Ciência da Computação @ <a href="https://portal.cin.ufpe.br/">CIn - UFPE</a>
</div>
