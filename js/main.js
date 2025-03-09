// Main JavaScript for Exelita - EB-1 AI Accelerator
document.addEventListener('DOMContentLoaded', () => {
    // Initialize animations and interactions
    initNavbar();
    initAnimations();
    initCounters();
    initScrollReveal();
    
    // Add accessibility features
    enhanceAccessibility();
});

// Navbar interactions
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    
    // Make logo clickable to return to top
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.style.cursor = 'pointer';
        logo.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Mobile menu toggle - MOVED OUTSIDE THE NESTED EVENT LISTENER
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        const body = document.body;
    
        // Toggle menu
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent click from bubbling to document
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            body.classList.toggle('menu-open');
        });
    
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (navLinks.classList.contains('active') && 
                !navLinks.contains(e.target) && 
                !hamburger.contains(e.target)) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                body.classList.remove('menu-open');
            }
        });
    
        // Close menu when pressing escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                body.classList.remove('menu-open');
            }
        });
    
    // Close mobile menu when clicking on a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            body.classList.remove('menu-open');
        });
    });
    
    // Add scrolled class to navbar on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Remove the nested DOMContentLoaded event listener
}

// Smooth animations for elements
function initAnimations() {
    // Floating cards animation
    const cards = document.querySelectorAll('.floating-cards .card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 2}s`;
    });
    
    // Button hover effects
    const buttons = document.querySelectorAll('.primary-button, .cta-button, .pricing-cta');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', createRippleEffect);
    });
    
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            hero.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
        });
    }
}

// Create ripple effect on buttons
function createRippleEffect(e) {
    const button = e.currentTarget;
    
    // Remove any existing ripple
    const ripple = button.querySelector('.ripple');
    if (ripple) {
        ripple.remove();
    }
    
    // Create new ripple element
    const circle = document.createElement('span');
    circle.classList.add('ripple');
    button.appendChild(circle);
    
    // Position the ripple
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    circle.style.width = circle.style.height = `${diameter}px`;
    
    const rect = button.getBoundingClientRect();
    circle.style.left = `${e.clientX - rect.left - diameter / 2}px`;
    circle.style.top = `${e.clientY - rect.top - diameter / 2}px`;
    
    // Remove ripple after animation completes
    setTimeout(() => {
        circle.remove();
    }, 600);
}

// Animate counters in stats section
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000; // ms
                const step = Math.ceil(target / (duration / 16)); // 60fps
                
                let current = 0;
                const timer = setInterval(() => {
                    current += step;
                    counter.textContent = current;
                    
                    if (current >= target) {
                        counter.textContent = target;
                        clearInterval(timer);
                    }
                }, 16);
                
                observer.unobserve(counter);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Reveal elements on scroll
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.feature-card, .pricing-card, .section-title');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    revealElements.forEach((element, index) => {
        // Add initial state class
        element.classList.add('reveal-animation');
        // Add staggered delay
        element.style.transitionDelay = `${index * 0.1}s`;
        // Observe element
        observer.observe(element);
    });
}

// Enhance accessibility
function enhanceAccessibility() {
    // Add appropriate ARIA roles and labels
    const hamburger = document.querySelector('.hamburger');
    if (hamburger) {
        hamburger.setAttribute('aria-label', 'Toggle navigation menu');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('role', 'button');
        hamburger.setAttribute('tabindex', '0');
        
        // Allow keyboard activation
        hamburger.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                hamburger.click();
            }
        });
    }
    
    // Make focus states visible for keyboard navigation
    const focusableElements = document.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
    focusableElements.forEach(element => {
        element.addEventListener('focus', () => {
            element.classList.add('focus-visible');
        });
        element.addEventListener('blur', () => {
            element.classList.remove('focus-visible');
        });
    });
    
    // Add skip to content link for screen readers
    const skipLink = document.createElement('a');
    skipLink.setAttribute('href', '#main-content');
    skipLink.classList.add('skip-link');
    skipLink.textContent = 'Skip to main content';
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Respect reduced motion preferences
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.classList.add('reduced-motion');
    }
}