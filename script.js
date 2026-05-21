document.addEventListener('DOMContentLoaded', () => {
console.log('%cPezz Web Studios — Ready for the trail.', 'color: #2C4A38; font-family: monospace; font-size: 14px;');

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
