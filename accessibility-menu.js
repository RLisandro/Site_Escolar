// Configurações do menu de acessibilidade
document.addEventListener('DOMContentLoaded', function() {
    const accessibilityBtn = document.getElementById('accessibility-btn');
    const accessibilityMenu = document.querySelector('.accessibility-menu');
    let menuVisible = false;

    // Função para mostrar/esconder o menu
    function toggleMenu() {
        menuVisible = !menuVisible;
        accessibilityMenu.style.display = menuVisible ? 'block' : 'none';
        accessibilityBtn.setAttribute('aria-expanded', menuVisible);
        
        // Atualiza o ícone e a cor do botão
        if (menuVisible) {
            accessibilityBtn.classList.add('active');
        } else {
            accessibilityBtn.classList.remove('active');
        }
    }

    // Adiciona evento de clique ao botão
    accessibilityBtn.addEventListener('click', function(e) {
        e.preventDefault();
        toggleMenu();
    });

    // Fecha o menu quando clicar fora dele
    document.addEventListener('click', function(e) {
        if (!accessibilityMenu.contains(e.target) && !accessibilityBtn.contains(e.target)) {
            if (menuVisible) {
                toggleMenu();
            }
        }
    });

    // Fecha o menu com a tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && menuVisible) {
            toggleMenu();
        }
    });

    // Previne que cliques dentro do menu o fechem
    accessibilityMenu.addEventListener('click', function(e) {
        e.stopPropagation();
    });
});
