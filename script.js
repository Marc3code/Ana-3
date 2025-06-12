document.addEventListener("DOMContentLoaded", () => {
  // Carrossel de frases
  const frases = [
    "❤️ Seu cuidado comigo, apesar das vezes vir em forma de batido hihi, mas mesmo assim amo ❤️",
    "❤️ Abracinho de recepção todo sabadinho depois de cada década chamada semana que a gente fica longe ❤️",
    "❤️ Todo esforço que você já fez e faz pra cuidar da nossa relação ❤️",
    "❤️ Sua vontade de crescermos juntos ❤️",
    "❤️ O sinalzinho no nariz KKKKKKKK ❤️",
    "❤️ Como você me incentiva em todas as ideias de projeto que tenho, apesar de eu nao ter concluído quase nenhuma KKKKKKKK (vai mudar isso aeee hum) ❤️",
    "❤️ Seu cheirinho ❤️",
    "❤️ Nossas tardes de risadas, morgação, açaízin, filminhos, xadras, peripecinhas hihi e muito carinho ❤️",
    "❤️ Que você leva em consideração o que eu digo, mesmo quando minhas colocações não são as melhores. Isso faz eu me sentir importante, ouvido e respeitado por você. ❤️",
  ];

  let indexFrase = 0;
  const elementoFrase = document.getElementById("frase-atual");

  setInterval(() => {
    elementoFrase.style.opacity = 0;
    setTimeout(() => {
      indexFrase = (indexFrase + 1) % frases.length;
      elementoFrase.textContent = frases[indexFrase];
      elementoFrase.style.opacity = 1;
    }, 1000);
  }, 5000);

  // Carrossel de Momentos Especiais
  const carrosselSlides = document.querySelector(".carrossel-slides");
  const carrosselIndicadores = document.querySelector(".carrossel-indicadores");
  let slideAtual = 0;

  const momentos = [
    {
      tipo: "imagem",
      src: "./assets/mulher-bonita-olhando-para-o-namorado.jpg",
      alt: "Nossa foto juntos",
      legenda: "Nosso primeiro encontro 💖",
    },
    {
      tipo: "video",
      src: "https://www.w3schools.com/html/mov_bbb.mp4",
      legenda: "Um momento especial",
    },
    {
      tipo: "imagem",
      src: "https://via.placeholder.com/600x400?text=Nossa+viagem",
      alt: "Nossa viagem",
      legenda: "Quando fomos viajar juntos ✈️",
    },
    {
      tipo: "imagem",
      src: "https://via.placeholder.com/600x400?text=Aniversário",
      alt: "Meu aniversário",
      legenda: "Meu aniversário com você 🎂",
    },
  ];

  // Inicializa o carrossel de momentos
  function inicializarCarrossel() {
    momentos.forEach((momento, index) => {
      const slide = document.createElement("div");
      slide.className = "carrossel-item";

      if (momento.tipo === "imagem") {
        slide.innerHTML = `
          <img src="${momento.src}" alt="${momento.alt || "Nosso momento"}">
          <p class="legenda">${momento.legenda}</p>
        `;
      } else {
        slide.innerHTML = `
          <video controls>
            <source src="${momento.src}" type="video/mp4">
            Seu navegador não suporta vídeo.
          </video>
          <p class="legenda">${momento.legenda}</p>
        `;
      }

      carrosselSlides.appendChild(slide);

      // Criar indicadores
      const indicador = document.createElement("div");
      indicador.className = "indicador";
      indicador.addEventListener("click", () => irParaSlide(index));
      carrosselIndicadores.appendChild(indicador);
    });

    atualizarIndicadores();
  }

  function moverCarrossel(direcao) {
    slideAtual += direcao;

    if (slideAtual < 0) {
      slideAtual = momentos.length - 1;
    } else if (slideAtual >= momentos.length) {
      slideAtual = 0;
    }

    atualizarCarrossel();
  }

  function irParaSlide(index) {
    slideAtual = index;
    atualizarCarrossel();
  }

  function atualizarCarrossel() {
    carrosselSlides.style.transform = `translateX(-${slideAtual * 100}%)`;
    atualizarIndicadores();
  }

  function atualizarIndicadores() {
    const indicadores = document.querySelectorAll(".indicador");
    indicadores.forEach((ind, index) => {
      ind.classList.toggle("ativo", index === slideAtual);
    });
  }

  // Adiciona os event listeners para as setas
  document
    .querySelector(".prev")
    .addEventListener("click", () => moverCarrossel(-1));
  document
    .querySelector(".next")
    .addEventListener("click", () => moverCarrossel(1));

  // Iniciar carrossel de momentos
  inicializarCarrossel();

  // Auto-play do carrossel (opcional)
  setInterval(() => moverCarrossel(1), 5000);

  // Quiz do Amor
  const quizPerguntas = [
    {
      pergunta: "Qual é o meu apelido favorito que você me chama?",
      nivel: "Fácil",
      opcoes: ["Mozin", "Amor", "Gatinho", "Neném"],
      correta: "Mozin",
    },
    {
      pergunta: "Onde foi nosso primeiro encontro?",
      nivel: "Média",
      opcoes: ["Shopping", "Praça", "Colégio", "Casa de um amigo"],
      correta: "Shopping",
    },
    {
      pergunta: "Qual dessas comidas a gente ama comer juntinhos?",
      nivel: "Difícil",
      opcoes: ["Pizza", "Cuscuz", "Sorvete", "Hambúrguer"],
      correta: "Cuscuz",
    },
  ];

  let indiceAtual = 0;
  let acertos = 0;

  function mostrarPergunta() {
    const perguntaAtual = quizPerguntas[indiceAtual];
    document.getElementById("quiz-pergunta").textContent =
      perguntaAtual.pergunta;

    const opcoesContainer = document.getElementById("quiz-opcoes");
    opcoesContainer.innerHTML = "";

    const nivelContainer = document.getElementById("nivel");
    nivelContainer.innerHTML = `Nível: ${perguntaAtual.nivel}`;

    perguntaAtual.opcoes.forEach((opcao) => {
      const botao = document.createElement("button");
      botao.textContent = opcao;

      botao.onclick = () => {
        // Adiciona feedback visual
        if (opcao === perguntaAtual.correta) {
          botao.style.backgroundColor = "#4CAF50"; // Verde
          acertos++;
        } else {
          botao.style.backgroundColor = "#f44336"; // Vermelho
        }

        setTimeout(() => {
          indiceAtual++;
          if (indiceAtual < quizPerguntas.length) {
            mostrarPergunta();
          } else {
            mostrarResultadoFinal();
          }
        }, 1000); // Delay de 1 segundo para ver o feedback
      };

      opcoesContainer.appendChild(botao);
    });
  }

  function mostrarResultadoFinal() {
    let mensagemFinal = "";

    if (acertos === quizPerguntas.length) {
      mensagemFinal = "Você é uma gênia do amor! 💘 Sabia tudo!";
    } else if (acertos >= 2) {
      mensagemFinal = "Mandou bem! Só esqueceu um detalhezinho 😅";
    } else {
      mensagemFinal =
        "Hmm... acho que vamos ter que conversar isso com cuscuz na próxima vez 😂";
    }

    document.getElementById("quiz-container").innerHTML = `
      <h3>Resultado do Quiz 💞</h3>
      <p>Você acertou <strong>${acertos}</strong> de <strong>${quizPerguntas.length}</strong> perguntas!</p>
      <p>${mensagemFinal}</p>
    `;
  }

  // Iniciar o quiz
  mostrarPergunta();
});
