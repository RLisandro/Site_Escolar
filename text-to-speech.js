class LeitorDeTela {
  constructor() {
    this.synthesis = window.speechSynthesis;
    this.voiceSelect = null;
    this.isReading = false;
    this.currentUtterance = null;
    this.currentVoice = null;
    this.voices = [];

    const voicesAvailable = this.synthesis.getVoices();
    if (voicesAvailable.length > 0) {
      this.voices = voicesAvailable.filter((voice) =>
        voice.lang.startsWith("pt")
      );
    }

    this.synthesis.addEventListener("voiceschanged", () => {
      this.voices = this.synthesis
        .getVoices()
        .filter((voice) => voice.lang.startsWith("pt"));
      this.atualizarVozes();
    });
  }

  inicializar() {
    this.criarControlesLeitor();
    this.marcarElementosLegiveis();
    this.adicionarEventosLeitura();
  }

  criarControlesLeitor() {
    const controleExistente = document.querySelector(".controles-leitor");
    if (controleExistente) {
      controleExistente.remove();
    }

    const controles = document.createElement("div");
    controles.className = "controles-leitor";

    const container = document.createElement("div");
    container.className = "leitor-container";

    const botao = document.createElement("button");
    botao.className = "btn-leitor";
    botao.id = "toggleLeitor";
    botao.setAttribute("aria-label", "Ativar leitor de tela");

    const icone = document.createElement("i");
    icone.className = "fas fa-headphones-alt";

    botao.appendChild(icone);
    container.appendChild(botao);

    const opcoesDiv = document.createElement("div");
    opcoesDiv.className = "leitor-opcoes";
    opcoesDiv.id = "leitorOpcoes";
    opcoesDiv.hidden = true;

    opcoesDiv.innerHTML = `
        <select id="voiceSelect" aria-label="Selecionar voz">
            <option value="">Selecione uma voz</option>
        </select>
        <div class="leitor-botoes">
            <button id="playPause" aria-label="Iniciar ou pausar leitura">
                <i class="fas fa-play"></i>
            </button>
            <button id="stopReading" aria-label="Parar leitura">
                <i class="fas fa-stop"></i>
            </button>
        </div>
    `;

    container.appendChild(opcoesDiv);
    controles.appendChild(container);

    document.body.appendChild(controles);

    const botaoCriado = document.getElementById("toggleLeitor");
    if (botaoCriado) {
      botaoCriado.addEventListener("click", () => {
        this.testarLeitor();
      });
    }

    this.atualizarVozes();
  }

  testarLeitor() {
    const textoTeste =
      "Teste do leitor de tela. Se você está ouvindo esta mensagem, o leitor está funcionando.";
    this.lerTexto(textoTeste);
  }

  atualizarVozes() {
    const voiceSelect = document.getElementById("voiceSelect");
    if (!voiceSelect) return;

    voiceSelect.innerHTML = '<option value="">Selecione uma voz</option>';

    this.voices.forEach((voice) => {
      const option = document.createElement("option");
      option.value = voice.name;
      option.textContent = `${voice.name} (${voice.lang})`;
      voiceSelect.appendChild(option);
    });

    if (this.voices.length > 0) {
      this.currentVoice = this.voices[0];
      voiceSelect.value = this.currentVoice.name;
    }
  }

  lerTexto(texto) {
    if (!texto) return;

    try {
      if (this.isReading) {
        this.pararLeitura();
      }

      this.currentUtterance = new SpeechSynthesisUtterance(texto);

      if (this.currentVoice) {
        this.currentUtterance.voice = this.currentVoice;
      } else if (this.voices.length > 0) {
        this.currentVoice = this.voices[0];
        this.currentUtterance.voice = this.currentVoice;
      }

      this.currentUtterance.lang = "pt-BR";
      this.currentUtterance.rate = 1;
      this.currentUtterance.pitch = 1;
      this.currentUtterance.volume = 1;

      this.currentUtterance.onstart = () => {
        this.isReading = true;
        this.atualizarBotaoPlayPause();
      };

      this.currentUtterance.onend = () => {
        this.isReading = false;
        this.atualizarBotaoPlayPause();
      };

      this.currentUtterance.onerror = (evento) => {
        this.isReading = false;
        this.atualizarBotaoPlayPause();
      };

      window.speechSynthesis.speak(this.currentUtterance);
    } catch (erro) {
      this.isReading = false;
      this.atualizarBotaoPlayPause();
    }
  }

  adicionarEventosLeitura() {
    const toggleLeitor = document.getElementById("toggleLeitor");
    const leitorOpcoes = document.getElementById("leitorOpcoes");
    const playPause = document.getElementById("playPause");
    const stopReading = document.getElementById("stopReading");
    const voiceSelect = document.getElementById("voiceSelect");

    if (toggleLeitor) {
      toggleLeitor.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const isHidden = leitorOpcoes.hidden;
        leitorOpcoes.hidden = !isHidden;
        toggleLeitor.setAttribute("aria-expanded", !isHidden);
      });
    }

    document.addEventListener("click", (e) => {
      const elemento = e.target.closest("[data-readable]");
      if (elemento && !this.isReading) {
        e.preventDefault();
        e.stopPropagation();

        let texto = elemento.textContent || elemento.innerText;
        texto = texto.trim().replace(/\s+/g, " ");

        if (texto) {
          this.lerTexto(texto);
        }
      }
    });

    if (playPause) {
      playPause.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (this.isReading) {
          this.pausarLeitura();
        } else {
          this.continuarLeitura();
        }
      });
    }

    if (stopReading) {
      stopReading.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.pararLeitura();
      });
    }

    if (voiceSelect) {
      voiceSelect.addEventListener("change", (e) => {
        const selectedVoice = this.voices.find(
          (voice) => voice.name === e.target.value
        );
        if (selectedVoice) {
          this.currentVoice = selectedVoice;
          this.lerTexto("Voz selecionada com sucesso");
        }
      });
    }
  }

  pausarLeitura() {
    this.synthesis.pause();
    this.isReading = false;
    this.atualizarBotaoPlayPause();
  }

  continuarLeitura() {
    this.synthesis.resume();
    this.isReading = true;
    this.atualizarBotaoPlayPause();
  }

  pararLeitura() {
    this.synthesis.cancel();
    this.isReading = false;
    this.atualizarBotaoPlayPause();
  }

  atualizarBotaoPlayPause() {
    const playPause = document.getElementById("playPause");
    const icon = playPause.querySelector("i");

    if (this.isReading) {
      icon.className = "fas fa-pause";
      playPause.setAttribute("aria-label", "Pausar leitura");
    } else {
      icon.className = "fas fa-play";
      playPause.setAttribute("aria-label", "Iniciar leitura");
    }
  }

  marcarElementosLegiveis() {
    const elementosLegiveis = document.querySelectorAll(
      "p, h1, h2, h3, h4, h5, h6, li, .card"
    );
    elementosLegiveis.forEach((elemento) => {
      if (!elemento.hasAttribute("data-readable")) {
        elemento.setAttribute("data-readable", "true");
        elemento.setAttribute("tabindex", "0");
        elemento.style.cursor = "pointer";
      }
    });
  }
}
