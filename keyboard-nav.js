document.addEventListener('DOMContentLoaded', function() {
    // Mapeamento de teclas de atalho
    const keyboardShortcuts = {
        'h': '#inicio',            // Home
        '1': '#historia-card',     // História
        '2': '#filosofia-card',    // Filosofia
        '3': '#sociologia-card',   // Sociologia
        '4': '#geografia-card',    // Geografia
        'q': '#quiz',              // Quiz
        'f': 'feedback.html',      // Feedback
        '?': null                  // Ajuda
    };

    // Adicionar navegação por teclado
    document.addEventListener('keydown', function(e) {
        // Ignorar se estiver em campo de texto
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            return;
        }

        // Atalhos com Alt
        if (e.altKey) {
            const key = e.key.toLowerCase();
            if (keyboardShortcuts.hasOwnProperty(key)) {
                e.preventDefault();
                navigateToSection(keyboardShortcuts[key]);
            }
        }

        // Mostrar ajuda com ?
        if (e.key === '?' && !e.altKey && !e.ctrlKey && !e.metaKey) {
            e.preventDefault();
            showKeyboardHelp();
        }

        // Navegação por setas
        if (e.key.startsWith('Arrow')) {
            const focusable = 'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])';
            const elements = Array.from(document.querySelectorAll(focusable));
            const currentIndex = elements.indexOf(document.activeElement);

            if (currentIndex > -1) {
                let nextIndex;
                switch (e.key) {
                    case 'ArrowRight':
                    case 'ArrowDown':
                        nextIndex = (currentIndex + 1) % elements.length;
                        break;
                    case 'ArrowLeft':
                    case 'ArrowUp':
                        nextIndex = (currentIndex - 1 + elements.length) % elements.length;
                        break;
                }
                elements[nextIndex].focus();
            }
        }
    });

    // Função para navegar para uma seção
    function navigateToSection(target) {
        if (!target) return;
        if (target.startsWith('#')) {
            const element = document.querySelector(target);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
                element.focus();
            }
        } else {
            window.location.href = target;
        }
    }

    // Função para mostrar ajuda de teclado
    function showKeyboardHelp() {
        const helpDialog = document.createElement('div');
        helpDialog.role = 'dialog';
        helpDialog.ariaLabel = 'Ajuda de Teclado';
        helpDialog.className = 'keyboard-help-dialog';
        
        helpDialog.innerHTML = `
            <div class="help-content">
                <h2>Atalhos de Teclado</h2>
                <button class="close-help" aria-label="Fechar ajuda">×</button>
                <div class="shortcuts-grid">
                    <div class="shortcut-group">
                        <h3>Navegação</h3>
                        <ul>
                            <li><kbd>Alt + H</kbd> Início</li>
                            <li><kbd>Alt + 1</kbd> História</li>
                            <li><kbd>Alt + 2</kbd> Filosofia</li>
                            <li><kbd>Alt + 3</kbd> Sociologia</li>
                            <li><kbd>Alt + 4</kbd> Geografia</li>
                            <li><kbd>Alt + Q</kbd> Quiz</li>
                            <li><kbd>Alt + F</kbd> Feedback</li>
                        </ul>
                    </div>
                    <div class="shortcut-group">
                        <h3>Acessibilidade</h3>
                        <ul>
                            <li><kbd>Alt + A</kbd> Menu de Acessibilidade</li>
                            <li><kbd>Alt + +</kbd> Aumentar Texto</li>
                            <li><kbd>Alt + -</kbd> Diminuir Texto</li>
                            <li><kbd>Alt + C</kbd> Alto Contraste</li>
                            <li><kbd>Alt + R</kbd> Ler Conteúdo</li>
                            <li><kbd>Alt + L</kbd> Ler Seleção</li>
                            <li><kbd>?</kbd> Mostrar Esta Ajuda</li>
                        </ul>
                    </div>
                </div>
            </div>`;
        
        document.body.appendChild(helpDialog);
        
        const closeButton = helpDialog.querySelector('.close-help');
        closeButton.addEventListener('click', () => {
            document.body.removeChild(helpDialog);
        });

        // Fechar com Esc
        document.addEventListener('keydown', function closeHelp(e) {
            if (e.key === 'Escape') {
                document.body.removeChild(helpDialog);
                document.removeEventListener('keydown', closeHelp);
            }
        });
    }

    // Adicionar skip link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Pular para o conteúdo principal';
    document.body.insertBefore(skipLink, document.body.firstChild);

    // Detectar uso de teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('using-keyboard');
        }
    });

    document.addEventListener('mousedown', () => {
        document.body.classList.remove('using-keyboard');
    });

    // Navegação do menu de acessibilidade
    const accessibilityMenu = document.querySelector('.accessibility-menu');
    const menuButtons = accessibilityMenu.querySelectorAll('button');

    menuButtons.forEach((button, index) => {
        button.addEventListener('keydown', (e) => {
            let targetButton;

            switch (e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    targetButton = menuButtons[index + 1] || menuButtons[0];
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    targetButton = menuButtons[index - 1] || menuButtons[menuButtons.length - 1];
                    break;
                case 'Home':
                    e.preventDefault();
                    targetButton = menuButtons[0];
                    break;
                case 'End':
                    e.preventDefault();
                    targetButton = menuButtons[menuButtons.length - 1];
                    break;
                case 'Escape':
                    e.preventDefault();
                    accessibilityMenu.classList.remove('active');
                    document.getElementById('accessibility-btn').focus();
                    return;
            }

            if (targetButton) {
                targetButton.focus();
            }
        });
    });

    // Atalhos de teclado
    document.addEventListener('keydown', (e) => {
        // Alt + A: Abrir menu de acessibilidade
        if (e.altKey && e.key === 'a') {
            e.preventDefault();
            const accessibilityBtn = document.getElementById('accessibility-btn');
            accessibilityBtn.click();
            menuButtons[0].focus();
        }

        // Alt + C: Toggle alto contraste
        if (e.altKey && e.key === 'c') {
            e.preventDefault();
            document.getElementById('toggle-contrast').click();
        }

        // Alt + + : Aumentar texto
        if (e.altKey && e.key === '+') {
            e.preventDefault();
            document.getElementById('increase-text').click();
        }

        // Alt + - : Diminuir texto
        if (e.altKey && e.key === '-') {
            e.preventDefault();
            document.getElementById('decrease-text').click();
        }
    });
});
