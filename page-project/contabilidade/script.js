/* ========================================
   CONFIGURAÇÕES EDITÁVEIS
   Altere os valores aqui para personalizar
======================================== */

// EDITÁVEL: Número do WhatsApp (formato: 5511987654321)
const WHATSAPP_NUMBER = '5511987654321';

// EDITÁVEL: Mensagem padrão do WhatsApp
const WHATSAPP_MESSAGE = 'Olá! Gostaria de saber mais sobre os serviços de contabilidade.';

// EDITÁVEL: Tempo de animação das seções (em milissegundos)
const ANIMATION_DELAY = 100;

/* ========================================
   NAVEGAÇÃO E MENU MOBILE
======================================== */

// Seleciona elementos do menu
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const navLinks = document.querySelectorAll('.nav__link');

// Abre o menu mobile
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

// Fecha o menu mobile
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

// Fecha o menu ao clicar em um link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
});

/* ========================================
   SCROLL SUAVE PARA ÂNCORAS
======================================== */

// Adiciona comportamento de scroll suave para todos os links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');

        if (targetId === '#') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

/* ========================================
   ACTIVE LINK NO SCROLL
======================================== */

// Adiciona classe active no link do menu conforme a seção visível
function activeMenuLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const link = document.querySelector(`.nav__link[href*="${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            if (link) {
                document.querySelectorAll('.nav__link').forEach(l => l.classList.remove('active-link'));
                link.classList.add('active-link');
            }
        }
    });
}

window.addEventListener('scroll', activeMenuLink);

/* ========================================
   HEADER COM SOMBRA NO SCROLL
======================================== */

function scrollHeader() {
    const header = document.getElementById('header');
    const scrollY = window.pageYOffset;

    if (scrollY >= 50) {
        header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)';
    }
}

window.addEventListener('scroll', scrollHeader);

/* ========================================
   BOTÃO SCROLL TO TOP
======================================== */

const scrollTop = document.getElementById('scroll-top');

function toggleScrollTop() {
    const scrollY = window.pageYOffset;

    if (scrollY >= 400) {
        scrollTop.classList.add('show');
    } else {
        scrollTop.classList.remove('show');
    }
}

window.addEventListener('scroll', toggleScrollTop);

/* ========================================
   FAQ ACORDEÃO
======================================== */

const faqItems = document.querySelectorAll('.faq__item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq__question');

    question.addEventListener('click', () => {
        // Fecha todos os outros itens
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });

        // Toggle no item clicado
        item.classList.toggle('active');
    });
});

/* ========================================
   ANIMAÇÕES DE SCROLL (FADE IN)
======================================== */

// Função para observar elementos e adicionar animação
function animateOnScroll() {
    const elements = document.querySelectorAll(
        '.service__card, .highlight__card, .benefit__item, .testimonial__card, .about__content, .about__image'
    );

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('fade-in', 'visible');
                }, index * ANIMATION_DELAY);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });
}

// Inicializa as animações quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', animateOnScroll);


/* ========================================
   LAZY LOADING DE IMAGENS (SE USAR)
======================================== */

// Se você adicionar imagens reais, descomente este código
/*
document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
});
*/

/* ========================================
   ESTATÍSTICAS ANIMADAS (CONTADOR)
======================================== */

function animateStats() {
    const stats = document.querySelectorAll('.stat__number');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                const numericValue = parseInt(finalValue.replace(/\D/g, ''));
                const suffix = finalValue.replace(/[0-9]/g, '');

                let current = 0;
                const increment = numericValue / 50; // 50 frames
                const duration = 2000; // 2 segundos
                const stepTime = duration / 50;

                const counter = setInterval(() => {
                    current += increment;
                    if (current >= numericValue) {
                        target.textContent = finalValue;
                        clearInterval(counter);
                    } else {
                        target.textContent = Math.floor(current) + suffix;
                    }
                }, stepTime);

                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => observer.observe(stat));
}

document.addEventListener('DOMContentLoaded', animateStats);


/* ========================================
   DETECÇÃO DE SCROLL PARA ANIMAÇÕES
======================================== */

let lastScrollTop = 0;
const scrollThreshold = 100;

window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Detecta direção do scroll
    if (scrollTop > lastScrollTop) {
        // Scrolling down
        document.body.classList.add('scrolling-down');
        document.body.classList.remove('scrolling-up');
    } else {
        // Scrolling up
        document.body.classList.add('scrolling-up');
        document.body.classList.remove('scrolling-down');
    }

    lastScrollTop = scrollTop;
}, false);

/* ========================================
   CONSOLE LOG (REMOVER EM PRODUÇÃO)
======================================== */

console.log('%c ContaPro Contabilidade ', 'background: #1e40af; color: white; font-size: 16px; padding: 10px;');
console.log('%c Landing Page carregada com sucesso! ', 'background: #10b981; color: white; font-size: 12px; padding: 5px;');

/* ========================================
   PERFORMANCE - LAZY LOADING DE SCRIPTS
======================================== */

// Carrega scripts externos apenas quando necessário
function loadScriptLazy(src, callback) {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = callback;
    document.body.appendChild(script);
}

// Exemplo de uso:
// loadScriptLazy('https://example.com/analytics.js', () => console.log('Analytics carregado'));

/* ========================================
   UTILITÁRIOS
======================================== */

// Função para debounce (otimização de performance)
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Exemplo de uso com resize
const debouncedResize = debounce(() => {
    console.log('Window resized');
    // Adicione lógica de resize aqui se necessário
}, 250);

window.addEventListener('resize', debouncedResize);

/* ========================================
   ACESSIBILIDADE
======================================== */

// Adiciona foco visível ao navegar com teclado
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

/* ========================================
   MODO DARK (OPCIONAL - DESCOMENTADO)
======================================== */

/*
// Toggle dark mode
const darkModeToggle = document.getElementById('dark-mode-toggle');
const htmlElement = document.documentElement;

if (darkModeToggle) {
    // Verifica preferência salva
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'enabled') {
        htmlElement.classList.add('dark-mode');
    }

    darkModeToggle.addEventListener('click', () => {
        htmlElement.classList.toggle('dark-mode');

        if (htmlElement.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
        } else {
            localStorage.setItem('darkMode', 'disabled');
        }
    });
}
*/

/* ========================================
   INICIALIZAÇÃO FINAL
======================================== */

// Garante que todas as funções sejam executadas após o DOM carregar
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM completamente carregado e analisado');

    // Adiciona classe para indicar que JS está ativo
    document.documentElement.classList.add('js-enabled');

    // Remove loading class se existir
    document.body.classList.remove('loading');

    // Scroll to top on page load
    window.scrollTo(0, 0);
});

// Previne flash de conteúdo não estilizado
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});