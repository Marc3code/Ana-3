document.addEventListener("DOMContentLoaded", () => {
  const loginContainer = document.getElementById("login-container");
  const senhaInput = document.getElementById("senha-input");
  const btnAcessar = document.getElementById("btn-acessar");
  const mensagemErro = document.getElementById("mensagem-erro");
  const conteudoPrincipal = document.querySelectorAll(
    "header, section, footer"
  );

  // Função para mostrar ou esconder o conteúdo principal
  function toggleConteudoPrincipal(mostrar) {
    conteudoPrincipal.forEach((el) => {
      el.style.display = mostrar ? "" : "none";
    });
  }

  // Inicialmente esconde o conteúdo principal
  toggleConteudoPrincipal(false);

  function verificarSenha() {
    fetch("https://ana-3-production.up.railway.app/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ senha: senhaInput.value }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Senha incorreta");
        }
        return res.json();
      })
      .then((data) => {
        loginContainer.style.display = "none";
        toggleConteudoPrincipal(true);
        mensagemErro.textContent = "";
      })
      .catch((error) => {
        mensagemErro.textContent = "Senha incorreta! Tente novamente.";
        senhaInput.value = "";
        senhaInput.focus();
      });
  }

  btnAcessar.addEventListener("click", verificarSenha);
  senhaInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      verificarSenha();
    }
  });

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
      src: "./assets/foto1.jpg",
      alt: "",
      legenda: "Últma vez que fomos na tabuleiria. Amei esse dia",
    },
    {
      tipo: "imagem",
      src: "./assets/foto2.jpg",
      alt: "",
      legenda: "sai quando a proxima? hihi",
    },
    {
      tipo: "imagem",
      src: "./assets/foto3.jpg",
      alt: "",
      legenda: "dia da massinhaaa",
    },
    {
      tipo: "imagem",
      src: "./assets/foto4.jpg",
      alt: "",
      legenda: "huuumm dia que casamos aí",
    },
    {
      tipo: "imagem",
      src: "./assets/foto5.jpg",
      alt: "",
      legenda: "saudade dos treininhos together",
    },
    {
      tipo: "imagem",
      src: "./assets/foto6.jpg",
      alt: "",
      legenda: "Ja teve foto dos artistas, agora das artes neh",
    },
    {
      tipo: "imagem",
      src: "./assets/foto7.jpg",
      alt: "",
      legenda: "Bem tumblrs",
    },
    { tipo: "imagem", src: "./assets/foto8.jpg", alt: "", legenda: "Só love" },
    {
      tipo: "imagem",
      src: "./assets/foto9.jpg",
      alt: "",
      legenda: "Linda modeusooooooo",
    },
    {
      tipo: "imagem",
      src: "./assets/foto11.jpg",
      alt: "",
      legenda: "Tão fofinha com o buquê",
    },
    {
      tipo: "imagem",
      src: "./assets/foto12.jpg",
      alt: "",
      legenda: "a gente ensaiando pra quando formos na Itália",
    },
    {
      tipo: "imagem",
      src: "./assets/foto14.jpg",
      alt: "",
      legenda: "Dei valor a esse dia KKKKKKKK",
    },

    { tipo: "video", src: "./assets/video1.mp4", alt: "", legenda: "" },
    { tipo: "video", src: "./assets/video2.mp4", alt: "", legenda: "" },
    { tipo: "video", src: "./assets/video3.mp4", alt: "", legenda: "" },
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
  setInterval(() => moverCarrossel(1), 10000);

  // Referências aos elementos
  const listaMetas = document.getElementById("lista-metas");
  const inputNovaMeta = document.getElementById("nova-meta");
  const botaoAdicionar = document.getElementById("adicionar-meta");

  // Carregar metas do localStorage - agora retorna array vazio se não houver metas salvas
  function carregarMetas() {
    const metasSalvas = localStorage.getItem("metasAmor");
    return metasSalvas ? JSON.parse(metasSalvas) : [];
  }

  // Salvar metas no localStorage
  function salvarMetas(metas) {
    localStorage.setItem("metasAmor", JSON.stringify(metas));
  }

  // Renderizar lista de metas
  function renderizarMetas() {
    const metas = carregarMetas();
    listaMetas.innerHTML = "";

    if (metas.length === 0) {
      // Mostra mensagem quando não há metas
      const li = document.createElement("li");
      li.textContent = "Nenhuma meta adicionada ainda...";
      li.style.textAlign = "center";
      li.style.color = "#888";
      listaMetas.appendChild(li);
      return;
    }

    metas.forEach((meta, index) => {
      const li = document.createElement("li");
      li.className = "meta-item";

      const label = document.createElement("label");
      const input = document.createElement("input");
      input.type = "checkbox";
      input.checked = meta.concluida;
      input.addEventListener("change", () => {
        metas[index].concluida = input.checked;
        salvarMetas(metas);
        renderizarMetas();
      });

      const span = document.createElement("span");
      span.textContent = meta.texto;
      if (meta.concluida) {
        span.classList.add("concluida");
      }

      const botaoRemover = document.createElement("button");
      botaoRemover.textContent = "×";
      botaoRemover.className = "remover-meta";
      botaoRemover.addEventListener("click", (e) => {
        e.stopPropagation();
        metas.splice(index, 1);
        salvarMetas(metas);
        renderizarMetas();
      });

      label.appendChild(input);
      label.appendChild(span);
      li.appendChild(label);
      li.appendChild(botaoRemover);
      listaMetas.appendChild(li);
    });
  }

  // Adicionar nova meta
  botaoAdicionar.addEventListener("click", () => {
    const textoMeta = inputNovaMeta.value.trim();
    if (textoMeta) {
      const metas = carregarMetas();
      metas.push({ texto: textoMeta, concluida: false });
      salvarMetas(metas);
      inputNovaMeta.value = "";
      renderizarMetas();
    }
  });

  // Permitir adicionar com Enter
  inputNovaMeta.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      botaoAdicionar.click();
    }
  });

  // Inicializar a lista de metas
  renderizarMetas();
});
