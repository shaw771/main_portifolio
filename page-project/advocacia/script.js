// ============================================
// LANDING PAGE - ESCRITÓRIO DE ADVOCACIA
// Oliveira & Associados Advogados
// ============================================

// ============================================
// CONFIGURAÇÕES EDITÁVEIS
// ============================================
const CONFIG = {
    // EDITÁVEL: Número do WhatsApp (apenas números, com DDI)
    whatsappNumber: '5511987654321',

    // EDITÁVEL: Mensagem padrão do WhatsApp
    whatsappMessage: 'Olá! Gostaria de agendar uma consulta jurídica.',

    // EDITÁVEL: E-mail para onde enviar o formulário (se integrado com backend)
    contactEmail: 'contato@oliveiraadvogados.com.br',

    // EDITÁVEL: Tempo de animação ao scroll (em milissegundos)
    scrollAnimationDuration: 600,

    // EDITÁVEL: Offset do scroll (pixels do topo)
    scrollOffset: 80
};

// ============================================
// MENU MOBILE - TOGGLE
// ============================================
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

// Abrir menu mobile
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
        document.body.style.overflow = 'hidden'; // Prevenir scroll
    });
}

// Fechar menu mobile
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
        document.body.style.overflow = 'auto'; // Restaurar scroll
    });
}

// ============================================
// FECHAR MENU AO CLICAR EM LINK
// ============================================
const navLinks = document.querySelectorAll('.nav__link');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
        document.body.style.overflow = 'auto';
    });
});

// ============================================
// ACTIVE LINK NO SCROLL
// ============================================
function activeLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink?.classList.add('active-link');
        } else {
            navLink?.classList.remove('active-link');
        }
    });
}

window.addEventListener('scroll', activeLink);

// ============================================
// SCROLL SUAVE PARA ÂNCORAS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');

        if (targetId === '#') return;

        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const offsetTop = targetSection.offsetTop - CONFIG.scrollOffset;

            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// HEADER FIXO COM SHADOW AO SCROLL
// ============================================
function scrollHeader() {
    const header = document.getElementById('header');

    if (window.scrollY >= 50) {
        header.classList.add('scroll-header');
    } else {
        header.classList.remove('scroll-header');
    }
}

window.addEventListener('scroll', scrollHeader);

// ============================================
// BOTÃO SCROLL TO TOP
// ============================================
const scrollTopButton = document.getElementById('scroll-top');

function showScrollTop() {
    if (window.scrollY >= 400) {
        scrollTopButton.classList.add('show');
    } else {
        scrollTopButton.classList.remove('show');
    }
}

window.addEventListener('scroll', showScrollTop);

if (scrollTopButton) {
    scrollTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// FAQ ACORDEÃO
// ============================================
const faqItems = document.querySelectorAll('.faq__item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq__question');

    question.addEventListener('click', () => {
        // Fechar outros itens (opcional - remova para permitir múltiplos abertos)
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });

        // Toggle do item atual
        item.classList.toggle('active');
    });
});


// ============================================
// ANIMAÇÕES AO SCROLL (AOS - Animate On Scroll)
// ============================================
function animateOnScroll() {
    const elements = document.querySelectorAll('[data-aos]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-aos-delay') || 0;

                setTimeout(() => {
                    entry.target.classList.add('aos-animate');
                }, delay);

                // Desconectar após animar (animação única)
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    elements.forEach(element => {
        observer.observe(element);
    });
}

// Inicializar animações ao carregar a página
document.addEventListener('DOMContentLoaded', animateOnScroll);

// ============================================
// COUNTER ANIMADO (NÚMEROS NO HERO)
// ============================================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16); // 60 FPS

    const timer = setInterval(() => {
        start += increment;

        if (start >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + '+';
        }
    }, 16);
}

// Inicializar contadores quando visíveis
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const numbers = entry.target.querySelectorAll('.stat__number');

            numbers.forEach(number => {
                const text = number.textContent;
                const value = parseInt(text.replace(/\D/g, ''));
                const hasPercent = text.includes('%');

                animateCounter(number, value, 2000);

                if (hasPercent) {
                    setTimeout(() => {
                        number.textContent = value + '%';
                    }, 2000);
                }
            });

            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.hero__stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}


// ============================================
// LAZY LOADING DE IMAGENS (se adicionar imagens reais)
// ============================================
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

lazyLoadImages();


// ============================================
// ANALYTICS - RASTREAMENTO DE EVENTOS (Opcional)
// ============================================
function trackEvent(category, action, label) {
    // EDITÁVEL: Integre com Google Analytics, Meta Pixel, etc.
    console.log('Evento rastreado:', { category, action, label });

    // Exemplo com Google Analytics (GA4)
    /*
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
    */
}

// Rastrear cliques no WhatsApp
if (whatsappButton) {
    whatsappButton.addEventListener('click', () => {
        trackEvent('Contato', 'Clique', 'WhatsApp Flutuante');
    });
}


// Rastrear cliques em áreas de atuação
const servicoCards = document.querySelectorAll('.servico__card');
servicoCards.forEach((card, index) => {
    card.addEventListener('click', () => {
        const serviceName = card.querySelector('.servico__title').textContent;
        trackEvent('Serviços', 'Clique', serviceName);
    });
});

// ============================================
// PERFORMANCE - DEBOUNCE PARA SCROLL
// ============================================
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

// Aplicar debounce nas funções de scroll
const debouncedScrollHeader = debounce(scrollHeader, 10);
const debouncedShowScrollTop = debounce(showScrollTop, 10);
const debouncedActiveLink = debounce(activeLink, 10);

window.addEventListener('scroll', debouncedScrollHeader);
window.addEventListener('scroll', debouncedShowScrollTop);
window.addEventListener('scroll', debouncedActiveLink);

// ============================================
// EASTER EGG - CONSOLE MESSAGE
// ============================================
console.log('%c Oliveira & Associados Advogados ', 'background: #1a3a52; color: #d4af37; font-size: 20px; padding: 10px;');
console.log('%c Desenvolvido com dedicação | 2024 ', 'background: #d4af37; color: #1a3a52; font-size: 12px; padding: 5px;');

// ============================================
// INICIALIZAÇÃO FINAL
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('Landing Page carregada com sucesso!');

    // Adicionar classe de carregamento completo
    document.body.classList.add('loaded');

    // EDITÁVEL: Adicione aqui outras inicializações personalizadas
});

// ============================================
// MODO OFFLINE (Service Worker - Opcional)
// ============================================
/*
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then(registration => {
            console.log('Service Worker registrado:', registration);
        })
        .catch(error => {
            console.log('Erro ao registrar Service Worker:', error);
        });
}
*/

// ============================================
// ACESSIBILIDADE - NAVEGAÇÃO POR TECLADO
// ============================================
document.addEventListener('keydown', (e) => {
    // ESC fecha o menu mobile
    if (e.key === 'Escape' && navMenu.classList.contains('show-menu')) {
        navMenu.classList.remove('show-menu');
        document.body.style.overflow = 'auto';
    }

    // ENTER ou ESPAÇO no FAQ
    if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('faq__question')) {
        e.preventDefault();
        e.target.click();
    }
});

// ============================================
// DETECÇÃO DE DARK MODE DO SISTEMA
// ============================================
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    console.log('Modo escuro detectado no sistema');
    // EDITÁVEL: Adicione lógica para modo escuro se desejar
}

// ============================================
// FIM DO SCRIPT
// ============================================