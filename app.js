/* =========================
   PREMIUM APPLE-STYLE ANIMATIONS
========================= */

// Page Loader Class
class PageLoader {
    constructor() {
        this.loader = document.getElementById('pageLoader');
        this.isLoaded = false;
    }

    init() {
        // Show loader immediately
        this.show();

        // Hide loader when page fully loads
        if (document.readyState === 'loading') {
            window.addEventListener('load', () => this.hide());
        } else {
            // Already loaded
            setTimeout(() => this.hide(), 1000);
        }
    }

    show() {
        if (this.loader) {
            this.loader.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }
    }

    hide() {
        if (this.loader && !this.isLoaded) {
            this.isLoaded = true;
            this.loader.classList.add('hidden');
            document.body.style.overflow = '';

            // Remove loader after fade-out transition
            setTimeout(() => {
                if (this.loader && this.loader.parentNode) {
                    this.loader.remove();
                }
            }, 500);
        }
    }
}

/* =========================
   PREMIUM ANIMATIONS
========================= */
class PremiumAnimations {
    constructor() {
        this.init();
        this.setupObservers();
        this.bindEvents();
    }

    init() {
        this.setInitialStates();
        this.animateHero();
        this.setupNavigation();
        this.setupSmoothScroll();
        this.setupParallax();
    }

    setInitialStates() {
        const elementsToHide = [
            '.About .abouttxt',
            '.About .aboutimg',
            '.Skills h1',
            '.skill',
            '.Contact h1',
            '.Contact > p',
            '.form',
            '.connect',
            '.getinTouch',
            '.socials'
        ];

        elementsToHide.forEach(selector => {
            document.querySelectorAll(selector).forEach(el => {
                if (el) el.classList.add('fade-in-element');
            });
        });

        const aboutTxt = document.querySelector('.About .abouttxt');
        if (aboutTxt) aboutTxt.classList.add('about-content');

        const aboutImg = document.querySelector('.About .aboutimg');
        if (aboutImg) aboutImg.classList.add('about-image');

        document.querySelectorAll('.skill').forEach(skill => {
            skill.classList.add('skill-card');
        });

        document.querySelectorAll('.form > *').forEach((el, index) => {
            el.classList.add('form-element');
            el.style.transitionDelay = `${index * 0.1}s`;
        });

        const contactForm = document.querySelector('.form');
        if (contactForm) contactForm.classList.add('contact-form');

        const footer = document.querySelector('.footer');
        if (footer) footer.classList.add('fade-in-element');
    }

    animateHero() {
        const navBar = document.querySelector('.nav');
        if (navBar) {
            navBar.style.opacity = '0';
            navBar.style.transform = 'translateX(-50%) translateY(-20px)';
            setTimeout(() => {
                navBar.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
                navBar.style.opacity = '1';
                navBar.style.transform = 'translateX(-50%) translateY(0)';
            }, 300);
        }

        const heroTitle = document.querySelector('.herotxt h1');
        const heroSubtitle = document.querySelector('.herotxt h2');
        const heroButtons = document.querySelector('.herobtns');
        const heroScroll = document.querySelector('.scrollanimation');
        const loader = document.querySelector('.loader');

        if (heroTitle) this.animateTextReveal(heroTitle, 0.1);
        if (heroSubtitle) heroSubtitle.classList.add('hero-subtitle');
        if (heroButtons) heroButtons.classList.add('hero-buttons');
        if (heroScroll) heroScroll.classList.add('hero-scroll');
        if (loader) loader.classList.add('loader-container');
    }

    animateTextReveal(element, staggerDelay = 0.05) {
        const words = element.innerText.split(' ');
        element.innerHTML = '';
        element.classList.add('hero-line');
        words.forEach((word, index) => {
            const span = document.createElement('span');
            span.innerText = word + (index < words.length - 1 ? ' ' : '');
            span.style.animationDelay = `${index * staggerDelay}s`;
            element.appendChild(span);
        });
    }

    setupObservers() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -10% 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) this.animateElement(entry.target);
            });
        }, observerOptions);

        const elementsToObserve = document.querySelectorAll(
            '.fade-in-element, .skill-card, .contact-form, .footer'
        );

        elementsToObserve.forEach(el => {
            if (el) observer.observe(el);
        });
    }

    animateElement(element) {
        if (element.classList.contains('skill-card')) {
            const skillCards = document.querySelectorAll('.skill');
            const currentIndex = Array.from(skillCards).indexOf(element);
            setTimeout(() => {
                element.classList.add('animate', 'animated');
            }, currentIndex * 150);
        } else if (element.classList.contains('about-content')) {
            element.classList.add('slide-in');
            setTimeout(() => {
                const aboutImage = document.querySelector('.about-image');
                if (aboutImage) aboutImage.classList.add('slide-in');
            }, 300);
        } else if (element.classList.contains('contact-form') || element.classList.contains('form')) {
            element.classList.add('animated');
            const formElements = element.querySelectorAll('.form-element');
            formElements.forEach((el, index) => {
                setTimeout(() => el.classList.add('show'), index * 100);
            });
            setTimeout(() => {
                const getInTouch = document.querySelector('.getinTouch');
                const socials = document.querySelector('.socials');
                if (getInTouch) {
                    getInTouch.classList.add('animated');
                    getInTouch.style.opacity = '1';
                    getInTouch.style.transform = 'translateY(0)';
                }
                setTimeout(() => {
                    if (socials) {
                        socials.classList.add('animated');
                        socials.style.opacity = '1';
                        socials.style.transform = 'translateY(0)';
                    }
                }, 200);
            }, formElements.length * 100 + 200);
        } else {
            element.classList.add('animated');
        }
    }

    setupNavigation() {
        const nav = document.querySelector('.nav');
        if (!nav) return;

        let lastScrollY = window.scrollY;
        let isScrolling = false;

        document.querySelectorAll('.navLinks a').forEach(link => {
            link.classList.add('nav-link');
        });

        window.addEventListener('scroll', () => {
            if (!isScrolling) {
                requestAnimationFrame(() => {
                    if (window.scrollY > 100) nav.classList.add("scrolled");
                    else nav.classList.remove("scrolled");
                    lastScrollY = window.scrollY;
                    isScrolling = false;
                });
            }
            isScrolling = true;
        });
    }

    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    const offset = target.getBoundingClientRect().top + window.scrollY - 100;
                    window.scrollTo({ top: offset, behavior: 'smooth' });
                }
            });
        });
    }

    setupParallax() {
        let ticking = false;
        const updateParallax = () => {
            const scrolled = window.scrollY;
            const rate = scrolled * -0.5;

            const loader = document.querySelector('.loader');
            const blob = document.querySelector('.blob');

            if (loader) {
                const baseTransform = window.innerWidth <= 768 ? 'translate(-50%, -50%)' : 'translate(0, 0)';
                loader.style.transform = `${baseTransform} translateY(${rate * 0.3}px)`;
            }

            if (blob) blob.style.transform = `translateY(${rate * 0.2}px)`;

            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        });
    }

    bindEvents() {
        // Button animations
        document.querySelectorAll('.primary, .secondary').forEach(button => {
            button.addEventListener('mouseenter', () => {
                if (window.innerWidth > 768) button.style.transform = 'translateY(-2px) scale(1.02)';
            });
            button.addEventListener('mouseleave', () => button.style.transform = 'translateY(0) scale(1)');
            button.addEventListener('mousedown', () => button.style.transform = 'translateY(0) scale(0.98)');
            button.addEventListener('mouseup', () => {
                if (window.innerWidth > 768) button.style.transform = 'translateY(-2px) scale(1.02)';
            });
        });

        // Skill card hover
        document.querySelectorAll('.skill').forEach(skill => {
            skill.addEventListener('mouseenter', () => {
                if (window.innerWidth > 768) {
                    skill.style.transform = 'translateY(-8px) scale(1.03)';
                    skill.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.3)';
                }
            });
            skill.addEventListener('mouseleave', () => {
                skill.style.transform = 'translateY(0) scale(1)';
                skill.style.boxShadow = '0px 0px 15px 10px #1e1e1e20';
            });
        });

        // Form focus
        document.querySelectorAll('.form input, .form textarea').forEach(field => {
            field.addEventListener('focus', e => e.target.parentElement && (e.target.parentElement.style.transform = 'translateY(-2px)'));
            field.addEventListener('blur', e => e.target.parentElement && (e.target.parentElement.style.transform = 'translateY(0)'));
        });

        // Social links
        document.querySelectorAll('.social-link').forEach(link => {
            link.addEventListener('mouseenter', () => link.style.transform = 'translateY(-3px) scale(1.15) rotate(5deg)');
            link.addEventListener('mouseleave', () => link.style.transform = 'translateY(0) scale(1) rotate(0deg)');
        });

        // Contact item hover
        document.querySelectorAll('.contact-item').forEach(item => {
            item.addEventListener('mouseenter', () => item.style.transform = 'translateX(5px)');
            item.addEventListener('mouseleave', () => item.style.transform = 'translateX(0)');
        });
    }
}

/* =========================
   UTILITY FUNCTIONS
========================= */

function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => { timeout = null; if (!immediate) func(...args); };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

const animatedElements = document.querySelectorAll('.skill-card, .contact-form, .footer');

function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return rect.top <= (window.innerHeight || document.documentElement.clientHeight) && rect.bottom >= 0;
}

function animateOnScroll() {
    animatedElements.forEach(el => { if (el && isInViewport(el)) el.classList.add('animated'); });
}

/* =========================
   INITIALIZE EVERYTHING
========================= */

document.addEventListener('DOMContentLoaded', () => {
    new PageLoader().init();
    new PremiumAnimations();

    // Trigger scroll animations on load
    setTimeout(() => animateOnScroll(), 100);

    // Animate nav links entrance
    const nav = document.querySelector(".navLinks");
    setTimeout(() => { if (nav) nav.classList.add("show"); }, 100);
});

// Handle page visibility
document.addEventListener('visibilitychange', () => {
    document.body.style.animationPlayState = document.hidden ? 'paused' : 'running';
});

// Preload critical animations
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.body.style.transform = 'translateY(0)';
    animateOnScroll();
});

// Scroll events
window.addEventListener('scroll', throttle(animateOnScroll, 100));
