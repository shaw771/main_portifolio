// ==================== NAVIGATION MENU ====================
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const navLinks = document.querySelectorAll('.nav__link');

// Show menu
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

// Hide menu
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

// Close menu when clicking on nav links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
});

// ==================== ACTIVE LINK ON SCROLL ====================
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');
        const link = document.querySelector('.nav__link[href*=' + sectionId + ']');

        if (link) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                link.classList.add('active-link');
            } else {
                link.classList.remove('active-link');
            }
        }
    });
}

window.addEventListener('scroll', scrollActive);

// ==================== HEADER SHADOW ON SCROLL ====================
function scrollHeader() {
    const header = document.getElementById('header');
    if (this.scrollY >= 50) {
        header.style.boxShadow = '0 4px 12px rgba(190, 24, 93, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 8px rgba(190, 24, 93, 0.08)';
    }
}

window.addEventListener('scroll', scrollHeader);

// ==================== FAQ ACCORDION ====================
const faqItems = document.querySelectorAll('.faq__item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq__question');

    question.addEventListener('click', () => {
        // Close all other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });

        // Toggle current item
        item.classList.toggle('active');
    });
});

// ==================== SCROLL TO TOP BUTTON ====================
const scrollTop = document.getElementById('scroll-top');

function toggleScrollTop() {
    if (this.scrollY >= 400) {
        scrollTop.classList.add('show');
    } else {
        scrollTop.classList.remove('show');
    }
}

window.addEventListener('scroll', toggleScrollTop);

scrollTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ==================== SMOOTH SCROLL FOR ALL LINKS ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const headerOffset = 70;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==================== ANIMATION ON SCROLL ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
        }
    });
}, observerOptions);

// Observe all elements with data-aos attribute
const animatedElements = document.querySelectorAll('[data-aos]');
animatedElements.forEach(el => observer.observe(el));

// ==================== GALLERY MODAL ====================
const galleryItems = document.querySelectorAll('.galeria__item');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('.galeria__img');
        if (img) {
            // Create modal
            const modal = document.createElement('div');
            modal.className = 'gallery-modal';
            modal.innerHTML = `
                <div class="gallery-modal__overlay"></div>
                <div class="gallery-modal__content">
                    <button class="gallery-modal__close">
                        <i class="fas fa-times"></i>
                    </button>
                    <img src="${img.src}" alt="${img.alt}" class="gallery-modal__img">
                </div>
            `;

            document.body.appendChild(modal);
            document.body.style.overflow = 'hidden';

            // Add styles
            const style = document.createElement('style');
            style.textContent = `
                .gallery-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 1000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: fadeIn 0.3s ease;
                }

                .gallery-modal__overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.9);
                    cursor: pointer;
                }

                .gallery-modal__content {
                    position: relative;
                    max-width: 90%;
                    max-height: 90%;
                    z-index: 1001;
                }

                .gallery-modal__img {
                    max-width: 100%;
                    max-height: 90vh;
                    border-radius: 8px;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
                }

                .gallery-modal__close {
                    position: absolute;
                    top: -40px;
                    right: 0;
                    width: 40px;
                    height: 40px;
                    background: rgba(255, 255, 255, 0.1);
                    border: 2px solid white;
                    border-radius: 50%;
                    color: white;
                    font-size: 1.5rem;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .gallery-modal__close:hover {
                    background: #be185d;
                    transform: rotate(90deg);
                }

                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }
            `;
            document.head.appendChild(style);

            // Close modal handlers
            const closeModal = () => {
                modal.remove();
                style.remove();
                document.body.style.overflow = '';
            };

            modal.querySelector('.gallery-modal__overlay').addEventListener('click', closeModal);
            modal.querySelector('.gallery-modal__close').addEventListener('click', closeModal);

            // Close on ESC key
            const escHandler = (e) => {
                if (e.key === 'Escape') {
                    closeModal();
                    document.removeEventListener('keydown', escHandler);
                }
            };
            document.addEventListener('keydown', escHandler);
        }
    });
});

// ==================== COUNTER ANIMATION ====================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    const updateCounter = () => {
        start += increment;
        if (start < target) {
            element.textContent = Math.ceil(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };

    updateCounter();
}

// Animate stats when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.hero__stat-number');
            const text = statNumber.textContent;
            const number = parseInt(text.replace(/\D/g, ''));

            if (number && !entry.target.dataset.animated) {
                entry.target.dataset.animated = 'true';
                const suffix = text.includes('+') ? '+' : (text.includes('%') ? '%' : '');

                let counter = 0;
                const duration = 2000;
                const increment = number / (duration / 16);

                const updateCounter = () => {
                    counter += increment;
                    if (counter < number) {
                        statNumber.textContent = Math.ceil(counter) + suffix;
                        requestAnimationFrame(updateCounter);
                    } else {
                        statNumber.textContent = number + suffix;
                    }
                };

                updateCounter();
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.hero__stat').forEach(stat => {
    statsObserver.observe(stat);
});

// ==================== LOADING ANIMATION ====================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ==================== CATEGORY CARD TILT EFFECT ====================
const categoryCards = document.querySelectorAll('.categoria__card');

categoryCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'transform 0.1s ease';
    });

    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', function() {
        this.style.transition = 'transform 0.3s ease';
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ==================== TESTIMONIAL CARDS HOVER EFFECT ====================
const testimonialCards = document.querySelectorAll('.depoimento__card');

testimonialCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        testimonialCards.forEach(otherCard => {
            if (otherCard !== card) {
                otherCard.style.opacity = '0.7';
                otherCard.style.transform = 'scale(0.95)';
            }
        });
    });

    card.addEventListener('mouseleave', function() {
        testimonialCards.forEach(otherCard => {
            otherCard.style.opacity = '1';
            otherCard.style.transform = 'scale(1)';
        });
    });
});

// ==================== PARALLAX EFFECT ON HERO ====================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');

    if (hero && scrolled < window.innerHeight) {
        hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
    }
});

// ==================== ADD HOVER SOUND EFFECT (OPTIONAL) ====================
function addHoverEffect() {
    const interactiveElements = document.querySelectorAll('.btn, .categoria__card, .diferencial__card, .nav__link');

    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });
}

addHoverEffect();

// ==================== PREVENT ORPHAN WORDS IN TITLES ====================
function preventOrphans() {
    const titles = document.querySelectorAll('h1, h2, h3, .hero__title, .section__title');

    titles.forEach(title => {
        const words = title.innerHTML.split(' ');
        if (words.length > 2) {
            const lastTwoWords = words.slice(-2).join('&nbsp;');
            const firstWords = words.slice(0, -2).join(' ');
            title.innerHTML = firstWords + ' ' + lastTwoWords;
        }
    });
}

preventOrphans();

// ==================== LAZY LOADING OPTIMIZATION ====================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.5s ease';

                if (img.complete) {
                    img.style.opacity = '1';
                } else {
                    img.addEventListener('load', () => {
                        img.style.opacity = '1';
                    });
                }

                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img').forEach(img => {
        imageObserver.observe(img);
    });
}

// ==================== CONSOLE MESSAGE ====================
console.log('%c✨ Bella Moda - Boutique de Moda Feminina ✨', 'color: #be185d; font-size: 20px; font-weight: bold;');
console.log('%cSite desenvolvido com carinho e atenção aos detalhes.', 'color: #6b7280; font-size: 12px;');

// ==================== ACCESSIBILITY IMPROVEMENTS ====================
// Add keyboard navigation for FAQ
faqItems.forEach((item, index) => {
    const question = item.querySelector('.faq__question');
    question.setAttribute('role', 'button');
    question.setAttribute('aria-expanded', 'false');
    question.setAttribute('tabindex', '0');

    question.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            question.click();
            question.setAttribute('aria-expanded', item.classList.contains('active'));
        }
    });
});

// Add aria labels to social links
document.querySelectorAll('.footer__social-link, .contato__social-link').forEach(link => {
    const icon = link.querySelector('i');
    if (icon) {
        const platform = icon.className.split('fa-')[1];
        link.setAttribute('aria-label', `Visite nosso ${platform}`);
    }
});

// ==================== PERFORMANCE MONITORING ====================
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('⚡ Performance:', {
                'Tempo de carregamento': (perfData.loadEventEnd - perfData.fetchStart).toFixed(0) + 'ms',
                'DOM pronto': (perfData.domContentLoadedEventEnd - perfData.fetchStart).toFixed(0) + 'ms'
            });
        }, 0);
    });
}