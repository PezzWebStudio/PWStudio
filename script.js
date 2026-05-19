/**
 * Pezz Web Studios - Main Script
 * Handles navigation, mobile menu, form functionality, and dynamic effects
 */

// DOM Elements
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
const navBar = document.querySelector('.nav');
const desktopNavLinks = document.querySelectorAll('.nav-links a');

/**
 * Initialize the application
 */
function init() {
    console.log('%cPezz Web Studios — Ready for the trail.', 'color: #2C4A38; font-family: monospace;');
    
    setupMobileMenu();
    setupSmoothScroll();
    setupContactForm();
    setupNavbarEffects();
    setupActiveNavLink();
}

/**
 * Navbar Scroll Effects
 * Add dynamic shadow and padding on scroll
 */
function setupNavbarEffects() {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navBar.classList.add('scrolled');
        } else {
            navBar.classList.remove('scrolled');
        }
        updateActiveNavLink();
    });
}

/**
 * Active Navigation Link Detection
 * Highlights the current section in navigation
 */
function setupActiveNavLink() {
    updateActiveNavLink();
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    // Update desktop nav links
    desktopNavLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });

    // Update mobile nav links
    mobileNavLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

/**
 * Mobile Menu Setup
 */
function setupMobileMenu() {
    if (!hamburger || !mobileMenu) return;

    // Toggle menu on hamburger click
    hamburger.addEventListener('click', toggleMobileMenu);

    // Close menu when a nav link is clicked
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
            closeMobileMenu();
        }
    });

    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
}

/**
 * Toggle mobile menu visibility
 */
function toggleMobileMenu() {
    const isActive = mobileMenu.classList.contains('active');
    
    if (isActive) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
}

/**
 * Open mobile menu
 */
function openMobileMenu() {
    hamburger.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    mobileMenu.classList.add('active');
    document.body.style.overflow = 'hidden';
}

/**
 * Close mobile menu
 */
function closeMobileMenu() {
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
}

/**
 * Smooth Scroll Setup
 * Handles all anchor link navigation with offset for fixed navbar
 */
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', handleSmoothScroll);
    });
}

/**
 * Handle smooth scroll event with navbar offset
 */
function handleSmoothScroll(e) {
    const href = this.getAttribute('href');

    // Skip empty hashes
    if (href === '#') return;

    e.preventDefault();
    const target = document.querySelector(href);
    
    if (target) {
        const navHeight = navBar.offsetHeight;
        const elementPosition = target.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - navHeight - 20;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });

        // Close mobile menu if open
        if (mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    }
}

/**
 * Contact Form Setup and Submission
 */
function setupContactForm() {
    if (!contactForm) return;

    contactForm.addEventListener('submit', handleFormSubmit);
}

/**
 * Handle contact form submission
 */
async function handleFormSubmit(e) {
    e.preventDefault();

    // Validate form
    if (!contactForm.checkValidity()) {
        showFormStatus('Please fill in all required fields.', 'error');
        return;
    }

    // Clear previous status
    clearFormStatus();

    // Get form data
    const formData = new FormData(contactForm);

    try {
        // Submit form (update action URL in HTML first)
        const response = await fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            showFormStatus('Message received! I\'ll get back to you within 24 hours (unless I\'m off-grid 🌲).', 'success');
            contactForm.reset();
        } else {
            showFormStatus('Something went wrong. Please try again or email directly.', 'error');
        }
    } catch (error) {
        console.error('Form submission error:', error);
        showFormStatus('Network error. Please try again later.', 'error');
    }
}

/**
 * Display form status message
 */
function showFormStatus(message, type = 'success') {
    if (!formStatus) return;

    formStatus.textContent = message;
    formStatus.className = `form-status ${type}`;
}

/**
 * Clear form status message
 */
function clearFormStatus() {
    if (!formStatus) return;
    
    formStatus.textContent = '';
    formStatus.className = 'form-status';
}

/**
 * Start initialization when DOM is ready
 */
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
