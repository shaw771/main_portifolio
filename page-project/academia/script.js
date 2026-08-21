/**
 * ELITE FITNESS - ACADEMIA
 * Script Principal
 */

document.addEventListener('DOMContentLoaded', function() {

    // Menu Mobile
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // Scroll Suave
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    window.scrollTo({ top: target.offsetTop - headerHeight, behavior: 'smooth' });
                }
            }
        });
    });

    // FAQ Acordeão
    document.querySelectorAll('.faq-item').forEach(item => {
        item.querySelector('.faq-question').addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
            if (!isActive) item.classList.add('active');
        });
    });

    // Header Scroll
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        header.style.boxShadow = window.pageYOffset > 100
            ? '0 4px 20px rgba(255, 45, 45, 0.3)'
            : '0 4px 20px rgba(255, 45, 45, 0.2)';
    });

    // Animações de Entrada
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('in-view');
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.servico-card, .destaque-card, .beneficio-card, .depoimento-card, .faq-item, .feature').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    document.addEventListener('scroll', () => {
        document.querySelectorAll('.in-view').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    });

    setTimeout(() => window.dispatchEvent(new Event('scroll')), 100);

    // WhatsApp
    const defaultMessage = encodeURIComponent('Olá! Quero agendar minha aula experimental grátis.');
    document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
        if (!link.getAttribute('href').includes('text=')) {
            link.setAttribute('href', `${link.getAttribute('href')}?text=${defaultMessage}`);
        }
    });

    // Mapa
    const mapa = document.querySelector('.mapa-placeholder');
    if (mapa) {
        mapa.addEventListener('click', () => {
            window.open('https://www.google.com/maps/search/?api=1&query=Av+Fitness+1000+Centro+São+Paulo+SP', '_blank');
        });
    }
});
