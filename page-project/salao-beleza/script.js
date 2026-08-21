/**
 * =====================================================
 * STUDIO HAIR & BEAUTY - SALÃO DE BELEZA / BARBER SHOP
 * Script Principal
 * =====================================================
 *
 * Este arquivo contém todas as funcionalidades JavaScript
 * da landing page, incluindo:
 * - Menu mobile (hambúrguer)
 * - Scroll suave para âncoras
 * - Acordeão do FAQ
 * - Animações de scroll
 * - Integração com WhatsApp
 *
 * ÍNDICE:
 * 1. Menu Mobile
 * 2. Scroll Suave
 * 3. FAQ Acordeão
 * 4. Header Scroll Effect
 * 5. Animações de Entrada
 * 6. Link WhatsApp
 * 7. Mapa Placeholder
 *
 * =====================================================
 */

// Aguarda o DOM estar completamente carregado
document.addEventListener('DOMContentLoaded', function() {

    /* =====================================================
       1. MENU MOBILE (HAMBÚRGUER)
       =====================================================
       Controla a abertura e fechamento do menu em dispositivos móveis.
       O menu é ativado ao clicar no botão hambúrguer.
    */

    // Seleciona os elementos do menu
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    // Verifica se os elementos existem antes de adicionar eventos
    if (navToggle && navMenu) {

        // Toggle do menu ao clicar no hambúrguer
        navToggle.addEventListener('click', function() {
            // Adiciona/remove a classe 'active' em ambos os elementos
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Fecha o menu ao clicar em qualquer link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Fecha o menu ao clicar fora dele
        document.addEventListener('click', function(e) {
            // Verifica se o clique foi fora do menu e do botão
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    /* =====================================================
       2. SCROLL SUAVE
       =====================================================
       Implementa rolagem suave ao clicar em links de âncora.
       Leva em conta a altura do header fixo.
    */

    // Seleciona todos os links que começam com #
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Ignora links que são apenas "#"
            if (href !== '#') {
                e.preventDefault();

                // Encontra o elemento alvo
                const target = document.querySelector(href);

                if (target) {
                    // Calcula a altura do header para compensar
                    const headerHeight = document.querySelector('.header').offsetHeight;

                    // Calcula a posição final (posição do elemento - altura do header)
                    const targetPosition = target.offsetTop - headerHeight;

                    // Executa o scroll suave
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    /* =====================================================
       3. FAQ ACORDEÃO
       =====================================================
       Controla a expansão/colapso das perguntas frequentes.
       Apenas uma pergunta pode estar aberta por vez.
    */

    // Seleciona todos os itens do FAQ
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        // Seleciona o botão da pergunta dentro do item
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', function() {
            // Verifica se este item já está ativo
            const isActive = item.classList.contains('active');

            // Fecha todos os outros itens primeiro
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });

            // Se não estava ativo, abre este item
            // Se já estava ativo, fica fechado (pois foi removido acima)
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    /* =====================================================
       4. HEADER SCROLL EFFECT
       =====================================================
       Adiciona efeito de sombra no header ao rolar a página.
       Cria sensação de profundidade e destaca o header.
    */

    const header = document.getElementById('header');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        // Aumenta a sombra quando rola mais de 100px
        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 20px rgba(212, 175, 55, 0.25)';
        } else {
            header.style.boxShadow = '0 4px 20px rgba(212, 175, 55, 0.15)';
        }

        lastScroll = currentScroll;
    });

    /* =====================================================
       5. ANIMAÇÕES DE ENTRADA (SCROLL)
       =====================================================
       Anima elementos quando entram na viewport durante o scroll.
       Usa Intersection Observer para performance otimizada.
    */

    // Configurações do Intersection Observer
    const observerOptions = {
        root: null,           // Usa a viewport como root
        rootMargin: '0px',    // Sem margem adicional
        threshold: 0.1        // Dispara quando 10% do elemento está visível
    };

    // Cria o observer
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            // Adiciona classe quando o elemento entra na viewport
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, observerOptions);

    // Seleciona todos os elementos que devem ser animados
    const animateElements = document.querySelectorAll(
        '.servico-card, .destaque-card, .beneficio-card, .depoimento-card, .faq-item, .feature'
    );

    // Configura os estilos iniciais e observa cada elemento
    animateElements.forEach(el => {
        // Estado inicial: invisível e deslocado para baixo
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

        // Registra o elemento no observer
        observer.observe(el);
    });

    // Aplica a animação quando o elemento recebe a classe 'in-view'
    document.addEventListener('scroll', function() {
        animateElements.forEach(el => {
            if (el.classList.contains('in-view')) {
                // Estado final: visível e na posição correta
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    });

    // Dispara um scroll inicial para animar elementos já visíveis
    setTimeout(() => {
        window.dispatchEvent(new Event('scroll'));
    }, 100);

    /* =====================================================
       6. LINK WHATSAPP COM MENSAGEM PADRÃO
       =====================================================
       Adiciona automaticamente uma mensagem padrão aos links
       do WhatsApp, facilitando o primeiro contato.
    */

    // EDITÁVEL: Altere a mensagem padrão aqui
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
    const defaultMessage = encodeURIComponent(
        'Olá! Gostaria de agendar um horário no Studio Hair & Beauty.'
    );

    // Adiciona a mensagem padrão se não houver uma
    whatsappLinks.forEach(link => {
        const currentHref = link.getAttribute('href');
        if (!currentHref.includes('text=')) {
            link.setAttribute('href', `${currentHref}?text=${defaultMessage}`);
        }
    });

    /* =====================================================
       7. MAPA PLACEHOLDER CLICK
       =====================================================
       Abre o Google Maps ao clicar no placeholder do mapa.
       EDITÁVEL: Altere o endereço na URL abaixo.
    */

    const mapaPlaceholder = document.querySelector('.mapa-placeholder');

    if (mapaPlaceholder) {
        mapaPlaceholder.addEventListener('click', function() {
            // EDITÁVEL: Altere o endereço aqui
            const mapsUrl = 'https://www.google.com/maps/search/?api=1&query=Rua+das+Flores+456+Jardim+Paulista+São+Paulo+SP';
            window.open(mapsUrl, '_blank');
        });
    }

});

/* =====================================================
   FIM DO SCRIPT
   =====================================================

   DICAS PARA EDIÇÃO:

   1. Para alterar o número do WhatsApp, edite no HTML
      os links que contêm "wa.me/55..."

   2. Para alterar a mensagem padrão do WhatsApp,
      modifique a variável 'defaultMessage' na seção 6

   3. Para alterar o endereço do mapa, modifique
      a variável 'mapsUrl' na seção 7

   4. Para adicionar mais animações, adicione
      seletores na seção 5 (animateElements)

   ===================================================== */
