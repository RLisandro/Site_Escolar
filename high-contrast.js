class HighContrastMode {
    constructor() {
        this.isHighContrast = false;
        this.originalStyles = new Map();
        this.init();
    }

    init() {
        // Carregar preferência salva
        const savedPreference = localStorage.getItem('highContrastMode');
        if (savedPreference === 'true') {
            this.enable();
        }

        // Adicionar atalho de teclado (Alt + C)
        document.addEventListener('keydown', (e) => {
            if (e.altKey && e.key.toLowerCase() === 'c') {
                e.preventDefault();
                this.toggle();
            }
        });
    }

    toggle() {
        if (this.isHighContrast) {
            this.disable();
        } else {
            this.enable();
        }
    }

    enable() {
        this.isHighContrast = true;
        localStorage.setItem('highContrastMode', 'true');
        
        // Salvar estilos originais
        document.querySelectorAll('*').forEach(element => {
            const computedStyle = window.getComputedStyle(element);
            this.originalStyles.set(element, {
                backgroundColor: computedStyle.backgroundColor,
                color: computedStyle.color,
                borderColor: computedStyle.borderColor
            });
        });

        // Aplicar estilos de alto contraste
        document.body.classList.add('high-contrast');
        
        // Estilos específicos
        const style = document.createElement('style');
        style.id = 'high-contrast-styles';
        style.textContent = `
            .high-contrast {
                background-color: black !important;
                color: white !important;
            }
            
            .high-contrast a {
                color: yellow !important;
            }
            
            .high-contrast button {
                background-color: white !important;
                color: black !important;
                border: 2px solid white !important;
            }
            
            .high-contrast input,
            .high-contrast textarea {
                background-color: black !important;
                color: white !important;
                border: 2px solid white !important;
            }
            
            .high-contrast img {
                filter: grayscale(100%) contrast(120%) !important;
            }
            
            .high-contrast header {
                background-color: #000 !important;
                border-bottom: 2px solid white !important;
            }
            
            .high-contrast nav {
                background-color: #000 !important;
            }
            
            .high-contrast .card {
                background-color: #000 !important;
                border: 2px solid white !important;
            }
            
            .high-contrast .btn {
                background-color: white !important;
                color: black !important;
                border: 2px solid white !important;
            }
            
            .high-contrast .btn:hover {
                background-color: yellow !important;
                color: black !important;
            }
            
            .high-contrast footer {
                background-color: #000 !important;
                border-top: 2px solid white !important;
            }
            
            .high-contrast ::placeholder {
                color: #ccc !important;
            }
            
            .high-contrast :focus {
                outline: 3px solid yellow !important;
                outline-offset: 2px !important;
            }
        `;
        document.head.appendChild(style);
    }

    disable() {
        this.isHighContrast = false;
        localStorage.setItem('highContrastMode', 'false');
        
        // Restaurar estilos originais
        this.originalStyles.forEach((styles, element) => {
            if (element) {
                element.style.backgroundColor = styles.backgroundColor;
                element.style.color = styles.color;
                element.style.borderColor = styles.borderColor;
            }
        });
        
        document.body.classList.remove('high-contrast');
        const styleElement = document.getElementById('high-contrast-styles');
        if (styleElement) {
            styleElement.remove();
        }
        
        this.originalStyles.clear();
    }
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    const toggleContrastBtn = document.getElementById('toggle-contrast');
    const html = document.documentElement;
    
    // Estado inicial
    let isHighContrast = localStorage.getItem('highContrast') === 'true';
    if (isHighContrast) {
        html.setAttribute('data-high-contrast', 'true');
    }

    // Toggle alto contraste
    toggleContrastBtn.addEventListener('click', () => {
        isHighContrast = !isHighContrast;
        localStorage.setItem('highContrast', isHighContrast);
        
        if (isHighContrast) {
            html.setAttribute('data-high-contrast', 'true');
            announceContrast('Alto contraste ativado');
        } else {
            html.removeAttribute('data-high-contrast');
            announceContrast('Alto contraste desativado');
        }
    });

    // Anunciar mudança para leitores de tela
    function announceContrast(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('role', 'alert');
        announcement.setAttribute('aria-live', 'polite');
        announcement.className = 'sr-only';
        announcement.textContent = message;
        document.body.appendChild(announcement);
        
        setTimeout(() => announcement.remove(), 1000);
    }

    window.highContrastMode = new HighContrastMode();
});
