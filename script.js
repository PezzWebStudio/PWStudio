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

// Initialize Formspree
window.formspree = window.formspree || function () { (formspree.q = formspree.q || []).push(arguments); };
formspree('initForm', { formElement: '#contact-form', formId: 'mlgvbolw' });

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
