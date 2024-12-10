class TextResizer {
    constructor() {
        this.currentSize = 100; // Tamanho base em porcentagem
        this.minSize = 90;      // Tamanho mínimo
        this.maxSize = 150;     // Tamanho máximo
        this.step = 10;         // Incremento/decremento
        this.init();
    }

    init() {
        // Carregar preferência salva
        const savedSize = localStorage.getItem('textSize');
        if (savedSize) {
            this.setSize(parseInt(savedSize));
        }

        // Adicionar atalhos de teclado
        document.addEventListener('keydown', (e) => {
            if (e.altKey) {
                switch (e.key) {
                    case '+':
                        e.preventDefault();
                        this.increase();
                        break;
                    case '-':
                        e.preventDefault();
                        this.decrease();
                        break;
                }
            }
        });

        // Criar e adicionar estilo dinâmico
        const style = document.createElement('style');
        style.id = 'text-resize-style';
        document.head.appendChild(style);
    }

    setSize(size) {
        // Validar limites
        if (size < this.minSize || size > this.maxSize) {
            return;
        }

        this.currentSize = size;
        localStorage.setItem('textSize', size.toString());

        // Atualizar estilo
        const style = document.getElementById('text-resize-style');
        if (style) {
            style.textContent = `
                body {
                    font-size: ${size}% !important;
                }
                
                h1 { font-size: calc(2.5em * ${size/100}) !important; }
                h2 { font-size: calc(2em * ${size/100}) !important; }
                h3 { font-size: calc(1.75em * ${size/100}) !important; }
                h4 { font-size: calc(1.5em * ${size/100}) !important; }
                h5 { font-size: calc(1.25em * ${size/100}) !important; }
                h6 { font-size: calc(1em * ${size/100}) !important; }
                
                p, span, a, li, button, input, textarea {
                    font-size: calc(1em * ${size/100}) !important;
                }
                
                .small-text {
                    font-size: calc(0.875em * ${size/100}) !important;
                }
                
                .large-text {
                    font-size: calc(1.25em * ${size/100}) !important;
                }
            `;
        }

        // Disparar evento personalizado
        const event = new CustomEvent('textSizeChanged', { 
            detail: { size: this.currentSize } 
        });
        document.dispatchEvent(event);
    }

    increase() {
        this.setSize(this.currentSize + this.step);
    }

    decrease() {
        this.setSize(this.currentSize - this.step);
    }

    reset() {
        this.setSize(100);
    }

    getCurrentSize() {
        return this.currentSize;
    }
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    const textResizer = new TextResizer();
    const increaseBtn = document.getElementById('increase-text');
    const decreaseBtn = document.getElementById('decrease-text');
    const html = document.documentElement;

    // Aumentar texto
    increaseBtn.addEventListener('click', () => {
        textResizer.increase();
        announceTextSize(textResizer.getCurrentSize());
    });

    // Diminuir texto
    decreaseBtn.addEventListener('click', () => {
        textResizer.decrease();
        announceTextSize(textResizer.getCurrentSize());
    });

    // Anunciar mudança para leitores de tela
    function announceTextSize(size) {
        const announcement = document.createElement('div');
        announcement.setAttribute('role', 'alert');
        announcement.setAttribute('aria-live', 'polite');
        announcement.className = 'sr-only';
        announcement.textContent = `Tamanho do texto alterado para ${size}%`;
        document.body.appendChild(announcement);
        
        setTimeout(() => announcement.remove(), 1000);
    }
});
