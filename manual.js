class Manual {
  constructor() {
    console.log("Inicializando Manual...");

    this.manual = document.querySelector(".manual-ajuda");
    this.helpButton = document.querySelector(".help-button");
    this.closeButton = document.querySelector(".close-manual");

    if (!this.manual) console.error("Elemento manual-ajuda não encontrado");
    if (!this.helpButton) console.error("Elemento help-button não encontrado");
    if (!this.closeButton)
      console.error("Elemento close-manual não encontrado");

    this.init();
  }

  init() {
    if (!this.manual || !this.helpButton || !this.closeButton) {
      console.error(
        "Elementos necessários não encontrados. Manual não inicializado."
      );
      return;
    }

    // Abrir manual
    this.helpButton.addEventListener("click", () => {
      console.log("Botão de ajuda clicado");
      this.manual.style.display = "flex";
      this.manual.hidden = false;
      this.manual.setAttribute("open", "");
      document.body.style.overflow = "hidden";
    });

    // Fechar manual
    this.closeButton.addEventListener("click", () => {
      console.log("Botão fechar clicado");
      this.manual.removeAttribute("open");
      this.manual.style.display = "none";
      this.manual.hidden = true;
      document.body.style.overflow = "";
    });

    // Fechar ao clicar fora
    this.manual.addEventListener("click", (e) => {
      if (e.target === this.manual) {
        this.closeButton.click();
      }
    });

    // Fechar com ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !this.manual.hidden) {
        this.closeButton.click();
      }
    });
  }
}

// Aguardar o DOM estar completamente carregado
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM carregado, inicializando Manual...");
    new Manual();
  });
} else {
  console.log("DOM já carregado, inicializando Manual...");
  new Manual();
}
