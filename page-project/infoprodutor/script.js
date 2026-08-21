// ============================================
// Mobile Navigation Toggle
// ============================================
const mobileToggle = document.getElementById('mobileToggle');
const nav = document.getElementById('nav');
const navLinks = document.querySelectorAll('.nav-link');

mobileToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    mobileToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        mobileToggle.classList.remove('active');
    });
});

// ============================================
// Header Scroll Effect
// ============================================
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.15)';
    }

    lastScroll = currentScroll;
});

// ============================================
// Smooth Scroll with Offset
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');

        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            const headerHeight = header.offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// FAQ Accordion
// ============================================
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
        // Close other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
            }
        });

        // Toggle current item
        item.classList.toggle('active');
    });
});

// ============================================
// Scroll to Top Button
// ============================================
const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ============================================
// Animate on Scroll (Simple Fade In)
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Elements to animate
const animateElements = document.querySelectorAll(
    '.service-card, .highlight-card, .benefit-item, .testimonial-card, .gallery-item, .about-text, .about-image'
);

animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ============================================
// Stats Counter Animation
// ============================================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const isMoney = element.textContent.includes('R$');

    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            clearInterval(timer);
            start = target;
        }

        if (isMoney) {
            element.textContent = `R$ ${Math.floor(start)}M+`;
        } else {
            element.textContent = `${Math.floor(start)}+`;
        }
    }, 16);
}

// Trigger counter animation when hero section is visible
const heroSection = document.querySelector('.hero');
const statNumbers = document.querySelectorAll('.stat-number');

const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            statNumbers.forEach((stat, index) => {
                const text = stat.textContent;
                let target;

                if (text.includes('10.000')) {
                    target = 10000;
                    animateCounter(stat, target);
                } else if (text.includes('50')) {
                    target = 50;
                    animateCounter(stat, target);
                } else if (text.includes('5M')) {
                    target = 5;
                    animateCounter(stat, target);
                }
            });

            heroObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

heroObserver.observe(heroSection);

// ============================================
// Active Navigation Link on Scroll
// ============================================
const sections = document.querySelectorAll('section[id]');

function updateActiveNavLink() {
    const scrollPosition = window.pageYOffset + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.style.color = '#7c3aed';
                } else {
                    link.style.color = '';
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// ============================================
// Gallery Image Lazy Loading
// ============================================
const galleryImages = document.querySelectorAll('.gallery-item img');

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.src; // Trigger load if not loaded
            imageObserver.unobserve(img);
        }
    });
});

galleryImages.forEach(img => {
    imageObserver.observe(img);
});

// ============================================
// Service Card Hover Effect Enhancement
// ============================================
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.borderTop = '4px solid #7c3aed';
    });

    card.addEventListener('mouseleave', () => {
        card.style.borderTop = '';
    });
});

// ============================================
// Testimonial Card Animation
// ============================================
const testimonialCards = document.querySelectorAll('.testimonial-card');

testimonialCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`;
});

// ============================================
// Parallax Effect for Hero Background
// ============================================
const heroBackground = document.querySelector('.hero-background');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxSpeed = 0.5;

    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    }
});

// ============================================
// Dynamic Year in Footer
// ============================================
const currentYear = new Date().getFullYear();
const copyrightElement = document.querySelector('.footer-copyright');

if (copyrightElement) {
    copyrightElement.textContent = copyrightElement.textContent.replace('2024', currentYear);
}

// ============================================
// Prevent Right Click on Images (Optional Protection)
// ============================================
const allImages = document.querySelectorAll('img');

allImages.forEach(img => {
    img.addEventListener('contextmenu', (e) => {
        // Uncomment the line below to prevent right-click on images
        // e.preventDefault();
    });
});

// ============================================
// Loading Animation (Fade in on page load)
// ============================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// ============================================
// Console Message
// ============================================
console.log('%c🚀 Lucas Ferreira - Infoprodutor & Mentor Digital', 'color: #7c3aed; font-size: 20px; font-weight: bold;');
console.log('%cDesenvolvido com dedicação para transformar negócios digitais', 'color: #2563eb; font-size: 14px;');

// ============================================
// Performance Optimization - Debounce Function
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

// Apply debounce to scroll events
const debouncedScroll = debounce(() => {
    updateActiveNavLink();
}, 50);

window.addEventListener('scroll', debouncedScroll);

// ============================================
// Accessibility Improvements
// ============================================

// Add ARIA labels to interactive elements
document.addEventListener('DOMContentLoaded', () => {
    // Mobile toggle
    if (mobileToggle) {
        mobileToggle.setAttribute('aria-label', 'Toggle navigation menu');
        mobileToggle.setAttribute('aria-expanded', 'false');
    }

    // FAQ items
    faqItems.forEach((item, index) => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        if (question && answer) {
            question.setAttribute('aria-expanded', 'false');
            question.setAttribute('aria-controls', `faq-answer-${index}`);
            answer.setAttribute('id', `faq-answer-${index}`);
        }
    });

    // Update aria-expanded when FAQ is toggled
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            const isExpanded = item.classList.contains('active');
            question.setAttribute('aria-expanded', isExpanded);

            if (mobileToggle) {
                mobileToggle.setAttribute('aria-expanded', nav.classList.contains('active'));
            }
        });
    });

    // Scroll to top button
    if (scrollToTopBtn) {
        scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
    }
});

// ============================================
// Keyboard Navigation for Accessibility
// ============================================
document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu
    if (e.key === 'Escape' && nav.classList.contains('active')) {
        nav.classList.remove('active');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
    }
});

// ============================================
// Email and Phone Click Tracking (Analytics Ready)
// ============================================
const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
const phoneLinks = document.querySelectorAll('a[href^="tel:"]');

emailLinks.forEach(link => {
    link.addEventListener('click', () => {
        console.log('Email link clicked:', link.href);
        // Add your analytics tracking code here
        // Example: gtag('event', 'email_click', { method: link.href });
    });
});

phoneLinks.forEach(link => {
    link.addEventListener('click', () => {
        console.log('Phone link clicked:', link.href);
        // Add your analytics tracking code here
        // Example: gtag('event', 'phone_click', { method: link.href });
    });
});

// ============================================
// Social Media Links Click Tracking
// ============================================
const socialLinks = document.querySelectorAll('.social-link, .contact-info-link');

socialLinks.forEach(link => {
    link.addEventListener('click', () => {
        console.log('Social link clicked:', link.href);
        // Add your analytics tracking code here
        // Example: gtag('event', 'social_click', { platform: link.href });
    });
});

// ============================================
// Service Card CTA Tracking
// ============================================
const serviceButtons = document.querySelectorAll('.service-card .btn');

serviceButtons.forEach(button => {
    button.addEventListener('click', () => {
        const serviceTitle = button.closest('.service-card').querySelector('.service-title').textContent;
        console.log('Service CTA clicked:', serviceTitle);
        // Add your analytics tracking code here
        // Example: gtag('event', 'service_cta_click', { service: serviceTitle });
    });
});

// ============================================
// Initialize Everything
// ============================================
function init() {
    console.log('Website initialized successfully!');

    // Add any initialization code here
    updateActiveNavLink();
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}