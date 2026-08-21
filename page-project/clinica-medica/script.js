/**
 * =====================================================
 * DRA. CAMILA NUTRI - NUTRICIONISTA
 * Script Principal
 * =====================================================
 */

document.addEventListener('DOMContentLoaded', function() {

    /* ========== 1. MENU MOBILE ========== */
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    /* ========== 2. SCROLL SUAVE ========== */
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight;
                    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                }
            }
        });
    });

    /* ========== 3. FAQ ACORDEÃO ========== */
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            faqItems.forEach(otherItem => otherItem.classList.remove('active'));
            if (!isActive) item.classList.add('active');
        });
    });

    /* ========== 4. HEADER SCROLL EFFECT ========== */
    const header = document.getElementById('header');

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 20px rgba(45, 106, 79, 0.2)';
        } else {
            header.style.boxShadow = '0 4px 20px rgba(45, 106, 79, 0.1)';
        }
    });

    /* ========== 5. ANIMAÇÕES DE ENTRADA ========== */
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('in-view');
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll(
        '.servico-card, .destaque-card, .beneficio-card, .depoimento-card, .faq-item, .feature'
    );

    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    document.addEventListener('scroll', function() {
        animateElements.forEach(el => {
            if (el.classList.contains('in-view')) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    });

    setTimeout(() => window.dispatchEvent(new Event('scroll')), 100);

    /* ========== 6. LINK WHATSAPP ========== */
    // EDITÁVEL: Mensagem padrão do WhatsApp
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
    const defaultMessage = encodeURIComponent('Olá! Gostaria de agendar uma consulta nutricional.');

    whatsappLinks.forEach(link => {
        const currentHref = link.getAttribute('href');
        if (!currentHref.includes('text=')) {
            link.setAttribute('href', `${currentHref}?text=${defaultMessage}`);
        }
    });

    /* ========== 7. MAPA PLACEHOLDER ========== */
    const mapaPlaceholder = document.querySelector('.mapa-placeholder');

    if (mapaPlaceholder) {
        mapaPlaceholder.addEventListener('click', function() {
            // EDITÁVEL: Endereço do Google Maps
            const mapsUrl = 'https://www.google.com/maps/search/?api=1&query=Av+Brasil+2000+Jardim+Paulista+São+Paulo+SP';
            window.open(mapsUrl, '_blank');
        });
    }

});
