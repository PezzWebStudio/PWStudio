document.addEventListener('DOMContentLoaded', () => {
console.log('%cPezz Web Studios — Ready for the trail.', 'color: #D6491D; font-family: monospace; font-size: 14px; font-weight: bold;');

const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

// Mobile Menu
hamburger.addEventListener('click', () => {
hamburger.classList.toggle('active');
mobileMenu.classList.toggle('active');

if (mobileMenu.classList.contains('active')) {
document.body.style.overflow = 'hidden';
} else {
document.body.style.overflow = '';
}
});

// Close mobile menu
window.closeMobileMenu = function() {
hamburger.classList.remove('active');
mobileMenu.classList.remove('active');
document.body.style.overflow = '';
};

// Contact Form
const form = document.getElementById('contact-form');
if (form) {
form.addEventListener('submit', (e) => {
e.preventDefault();
alert("🌲 Message received! I'll get back to you within 24 hours (unless I'm off-grid).");
form.reset();
});
}

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
anchor.addEventListener('click', function(e) {
const href = this.getAttribute('href');
if (href !== '#') {
e.preventDefault();
const target = document.querySelector(href);
if (target) {
target.scrollIntoView({
behavior: 'smooth',
block: 'start'
});
}
}
});
});

// Scroll-reveal animations
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && revealEls.length) {
const revealObserver = new IntersectionObserver((entries) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
entry.target.classList.add('is-visible');
revealObserver.unobserve(entry.target);
}
});
}, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

revealEls.forEach(el => revealObserver.observe(el));
} else {
revealEls.forEach(el => el.classList.add('is-visible'));
}

// Tilt interaction on project cards
const tiltCards = document.querySelectorAll('.project-card');
tiltCards.forEach(card => {
card.addEventListener('mousemove', (e) => {
const rect = card.getBoundingClientRect();
const x = e.clientX - rect.left;
const y = e.clientY - rect.top;
const centerX = rect.width / 2;
const centerY = rect.height / 2;
const rotateX = ((y - centerY) / centerY) * -4;
const rotateY = ((x - centerX) / centerX) * 4;
card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
});

card.addEventListener('mouseleave', () => {
card.style.transform = '';
});
});
});

// Helper
function navigateTo(section) {
const el = document.getElementById(section);
if (el) el.scrollIntoView({ behavior: 'smooth' });
}

function handleSubmit(e) {
    e.preventDefault();
    const btn = e.target.querySelector('.form-submit');
    btn.textContent = 'Sent! I\'ll be in touch soon.';
    btn.style.background = 'var(--moss)';
    btn.disabled = true;
}
