/**
 * =====================================================
 * SABOR DA VILA - PIZZARIA ARTESANAL
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

// Aguarda o DOM estar completamente carregado antes de executar
document.addEventListener('DOMContentLoaded', function() {

    /* =====================================================
       1. MENU MOBILE (HAMBÚRGUER)
       =====================================================
       Controla a abertura e fechamento do menu em dispositivos móveis.
       O menu aparece como um overlay quando o botão hambúrguer é clicado.

       Funcionamento:
       - Clicar no hambúrguer: abre/fecha o menu
       - Clicar em um link: fecha o menu
       - Clicar fora do menu: fecha o menu
    */

    // Seleciona o botão hambúrguer e o menu de navegação
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    // Verifica se os elementos existem na página
    if (navToggle && navMenu) {

        // Evento de clique no botão hambúrguer
        navToggle.addEventListener('click', function() {
            // Toggle adiciona a classe se não tiver, remove se tiver
            navToggle.classList.toggle('active'); // Anima o hambúrguer para X
            navMenu.classList.toggle('active');    // Mostra/esconde o menu
        });

        // Seleciona todos os links dentro do menu
        const navLinks = navMenu.querySelectorAll('a');

        // Para cada link, adiciona evento de clique
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                // Remove as classes 'active' para fechar o menu
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Fecha o menu ao clicar em qualquer lugar fora dele
        document.addEventListener('click', function(e) {
            // Verifica se o clique NÃO foi no menu NEM no botão
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    /* =====================================================
       2. SCROLL SUAVE
       =====================================================
       Implementa rolagem suave quando o usuário clica em
       links de âncora (ex: href="#sobre").

       Compensa a altura do header fixo para que o elemento
       não fique escondido atrás dele.
    */

    // Seleciona todos os links que apontam para âncoras internas
    const links = document.querySelectorAll('a[href^="#"]');

    // Adiciona evento de clique para cada link
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            // Obtém o valor do atributo href (ex: "#sobre")
            const href = this.getAttribute('href');

            // Ignora se for apenas "#" (link vazio)
            if (href !== '#') {
                e.preventDefault(); // Previne o comportamento padrão do navegador

                // Encontra o elemento alvo usando o seletor CSS
                const target = document.querySelector(href);

                if (target) {
                    // Obtém a altura do header para compensar
                    const headerHeight = document.querySelector('.header').offsetHeight;

                    // Calcula a posição Y do elemento menos a altura do header
                    const targetPosition = target.offsetTop - headerHeight;

                    // Executa o scroll suave usando a API nativa
                    window.scrollTo({
                        top: targetPosition,  // Posição vertical
                        behavior: 'smooth'    // Tipo de scroll: suave
                    });
                }
            }
        });
    });

    /* =====================================================
       3. FAQ ACORDEÃO
       =====================================================
       Implementa o comportamento de acordeão nas perguntas
       frequentes. Apenas uma pergunta fica aberta por vez.

       Funcionamento:
       - Clique em uma pergunta fechada: abre ela, fecha as outras
       - Clique em uma pergunta aberta: fecha ela
    */

    // Seleciona todos os itens do FAQ
    const faqItems = document.querySelectorAll('.faq-item');

    // Adiciona evento de clique para cada item
    faqItems.forEach(item => {
        // Seleciona o botão da pergunta dentro do item
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', function() {
            // Verifica se este item já está aberto
            const isActive = item.classList.contains('active');

            // Primeiro, fecha TODOS os itens
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });

            // Se o item clicado NÃO estava aberto, abre ele
            // (se estava aberto, já foi fechado acima)
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    /* =====================================================
       4. HEADER SCROLL EFFECT
       =====================================================
       Adiciona um efeito visual no header quando o usuário
       rola a página para baixo.

       Quando rola mais de 100px, aumenta a sombra do header
       para criar uma sensação de elevação.
    */

    // Seleciona o elemento header
    const header = document.getElementById('header');

    // Variável para armazenar a última posição do scroll
    let lastScroll = 0;

    // Adiciona listener de scroll na janela
    window.addEventListener('scroll', function() {
        // Obtém a posição atual do scroll vertical
        const currentScroll = window.pageYOffset;

        // Se rolou mais de 100 pixels
        if (currentScroll > 100) {
            // Aplica sombra mais forte
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        } else {
            // Volta para sombra normal
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        }

        // Atualiza a última posição do scroll
        lastScroll = currentScroll;
    });

    /* =====================================================
       5. ANIMAÇÕES DE ENTRADA (SCROLL)
       =====================================================
       Anima os elementos quando eles entram na área visível
       da tela (viewport) durante o scroll.

       Usa a API Intersection Observer para detectar quando
       os elementos ficam visíveis. É mais performático que
       calcular posições manualmente no evento scroll.
    */

    // Configurações do Intersection Observer
    const observerOptions = {
        root: null,           // null = usa a viewport como referência
        rootMargin: '0px',    // Margem ao redor do root (pode ser negativa)
        threshold: 0.1        // 0.1 = dispara quando 10% do elemento está visível
    };

    // Cria o observer com uma função callback
    const observer = new IntersectionObserver(function(entries) {
        // entries é um array de elementos que mudaram de estado
        entries.forEach(entry => {
            // Se o elemento está entrando na viewport
            if (entry.isIntersecting) {
                // Adiciona a classe 'in-view' para ativar a animação
                entry.target.classList.add('in-view');
            }
        });
    }, observerOptions);

    // Define quais elementos devem ser animados
    // EDITÁVEL: Adicione ou remova seletores conforme necessário
    const animateElements = document.querySelectorAll(
        '.servico-card, .destaque-card, .beneficio-card, .depoimento-card, .faq-item, .feature'
    );

    // Configura cada elemento para ser animado
    animateElements.forEach(el => {
        // Estado inicial: invisível e deslocado 30px para baixo
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';

        // Define a transição suave (0.6 segundos)
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

        // Registra o elemento para ser observado
        observer.observe(el);
    });

    // Listener de scroll para aplicar a animação
    document.addEventListener('scroll', function() {
        animateElements.forEach(el => {
            // Se o elemento tem a classe 'in-view' (está visível)
            if (el.classList.contains('in-view')) {
                // Estado final: visível e na posição original
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    });

    // Dispara um evento de scroll após 100ms
    // Isso garante que elementos já visíveis sejam animados
    setTimeout(() => {
        window.dispatchEvent(new Event('scroll'));
    }, 100);

    /* =====================================================
       6. LINK WHATSAPP COM MENSAGEM PADRÃO
       =====================================================
       Adiciona automaticamente uma mensagem padrão aos links
       do WhatsApp. Assim, quando o cliente clica, já vai com
       uma mensagem pré-preenchida.

       EDITÁVEL: Altere a variável defaultMessage para
       personalizar a mensagem inicial.
    */

    // Seleciona todos os links que contêm "wa.me" na URL
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');

    // Define a mensagem padrão (deve ser URL encoded)
    // EDITÁVEL: Altere esta mensagem conforme necessário
    const defaultMessage = encodeURIComponent('Olá! Gostaria de fazer um pedido.');

    // Adiciona a mensagem a cada link do WhatsApp
    whatsappLinks.forEach(link => {
        const currentHref = link.getAttribute('href');

        // Só adiciona se ainda não tiver o parâmetro text=
        if (!currentHref.includes('text=')) {
            link.setAttribute('href', `${currentHref}?text=${defaultMessage}`);
        }
    });

    /* =====================================================
       7. MAPA PLACEHOLDER CLICK
       =====================================================
       Quando o usuário clica no placeholder do mapa, abre
       o Google Maps em uma nova aba com o endereço.

       EDITÁVEL: Altere a URL do mapsUrl para o endereço
       correto do negócio.
    */

    // Seleciona o elemento placeholder do mapa
    const mapaPlaceholder = document.querySelector('.mapa-placeholder');

    if (mapaPlaceholder) {
        mapaPlaceholder.addEventListener('click', function() {
            // EDITÁVEL: Altere o endereço na URL abaixo
            // Use o formato: Rua+Nome+Numero+Cidade+Estado
            const mapsUrl = 'https://www.google.com/maps/search/?api=1&query=Rua+das+Palmeiras+1234+Vila+Nova+São+Paulo+SP';

            // Abre em uma nova aba
            window.open(mapsUrl, '_blank');
        });
    }

});

/* =====================================================
   FIM DO SCRIPT
   =====================================================

   DICAS PARA PERSONALIZAÇÃO:

   1. WHATSAPP:
      - Para alterar o número, edite os links no HTML
        que contêm "wa.me/5511..."
      - Para alterar a mensagem padrão, modifique a
        variável 'defaultMessage' na seção 6

   2. MAPA:
      - Para alterar o endereço que abre no Google Maps,
        modifique a variável 'mapsUrl' na seção 7

   3. ANIMAÇÕES:
      - Para animar outros elementos, adicione os
        seletores CSS na seção 5 (animateElements)
      - Para alterar a velocidade da animação, modifique
        o valor "0.6s" nas propriedades transition

   4. FAQ:
      - O comportamento padrão é "acordeão" (uma de cada vez)
      - Para permitir múltiplas abertas, remova o forEach
        que fecha os outros itens na seção 3

   ===================================================== */
