// ==========================================
// CONFIGURAÇÕES GERAIS
// ==========================================

// ========== NÚMERO DO WHATSAPP (EDITÁVEL) ==========
// Formato: código do país + DDD + número (apenas números)
const WHATSAPP_NUMBER = '5511987654321';

// ========== MENSAGEM PADRÃO WHATSAPP (EDITÁVEL) ==========
const WHATSAPP_MESSAGE = 'Olá! Gostaria de agendar um serviço para meu pet.';

// ==========================================
// MENU MOBILE - TOGGLE
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Abrir/fechar menu mobile
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
    }

    // Fechar menu ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Fechar menu ao clicar fora
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target);
        const isClickOnToggle = menuToggle.contains(event.target);

        if (!isClickInsideNav && !isClickOnToggle && navMenu.classList.contains('active')) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// ==========================================
// SCROLL SUAVE PARA ÂNCORAS
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');

        // Ignora links vazios ou apenas "#"
        if (href === '#' || href === '') {
            e.preventDefault();
            return;
        }

        const targetElement = document.querySelector(href);

        if (targetElement) {
            e.preventDefault();

            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// HEADER - MUDANÇA DE ESTILO NO SCROLL
// ==========================================
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');

    if (window.scrollY > 100) {
        header.style.padding = '0.5rem 0';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.12)';
    } else {
        header.style.padding = '1rem 0';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
    }
});

// ==========================================
// FAQ - ACORDEÃO (EXPANDIR/RECOLHER)
// ==========================================
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', function() {
        // Fecha todos os outros itens
        faqItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
            }
        });

        // Toggle no item clicado
        item.classList.toggle('active');
    });
});

// ==========================================
// ANIMAÇÕES DE SCROLL (FADE IN)
// ==========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Elementos para animar
const animatedElements = document.querySelectorAll(`
    .servico-card,
    .destaque-card,
    .beneficio-item,
    .depoimento-card,
    .faq-item,
    .info-item
`);

animatedElements.forEach(element => {
    element.classList.add('fade-in');
    observer.observe(element);
});


// ==========================================
// ACTIVE LINK NO MENU (DESTAQUE SEÇÃO ATUAL)
// ==========================================
const sections = document.querySelectorAll('section[id]');
const navLinksForActive = document.querySelectorAll('.nav-link');

function activateMenuLink() {
    const scrollY = window.scrollY;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinksForActive.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', activateMenuLink);

// ==========================================
// PREVENÇÃO DE LINKS VAZIOS
// ==========================================
document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        // Se o link não tiver uma função específica, previne o comportamento padrão
        if (!this.getAttribute('onclick')) {
            e.preventDefault();
        }
    });
});

// ==========================================
// ANIMAÇÃO DOS CARDS DE SERVIÇOS (HOVER)
// ==========================================
const servicoCards = document.querySelectorAll('.servico-card');

servicoCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ==========================================
// CONTADOR DE ESTATÍSTICAS (ANIMAÇÃO NUMÉRICA)
// ==========================================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16); // 60 FPS

    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Observa os badges do hero para animar quando visíveis
const badgeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            // Aqui você pode adicionar animações específicas para os badges
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.badge').forEach(badge => {
    badgeObserver.observe(badge);
});

// ==========================================
// LAZY LOADING PARA IMAGENS (SE ADICIONAR)
// ==========================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ==========================================
// CONSOLE LOG - INFORMAÇÕES DO SITE
// ==========================================
console.log('%c🐾 Patinhas Pet Shop & Vet ', 'background: #4A90E2; color: white; font-size: 20px; padding: 10px;');
console.log('%cSite desenvolvido com amor para pets e tutores!', 'color: #FF8C42; font-size: 14px;');
console.log('%c💙 Cuidando do seu melhor amigo 💙', 'color: #66BB6A; font-size: 12px;');

// ==========================================
// PERFORMANCE - MARCA QUANDO A PÁGINA TERMINA DE CARREGAR
// ==========================================
window.addEventListener('load', function() {
    console.log('%c✓ Página totalmente carregada!', 'color: #66BB6A; font-weight: bold;');

    // Remove qualquer classe de loading se houver
    document.body.classList.remove('loading');
});

// ==========================================
// ACESSIBILIDADE - ESC PARA FECHAR MENU MOBILE
// ==========================================
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const menuToggle = document.getElementById('menu-toggle');
        const navMenu = document.getElementById('nav-menu');

        if (navMenu.classList.contains('active')) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

// ==========================================
// SCROLL TO TOP - FUNÇÃO AUXILIAR
// ==========================================
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Você pode adicionar um botão "Voltar ao topo" se desejar
// Exemplo: <button onclick="scrollToTop()" class="scroll-top-btn">↑</button>
