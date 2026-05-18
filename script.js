// script.js
document.addEventListener('DOMContentLoaded', () => {
    console.log('%cPezz Web Studios — Ready for the trail.', 'color: #2C4A38; font-family: monospace;');
    
    // Simple form handling
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert("Message received! I'll get back to you within 24 hours (unless I'm off-grid).");
            form.reset();
        });
    }
    
    // Smooth scrolling for nav
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
});

// Simple navigation helper for SPA feel
function navigateTo(section) {
    const el = document.getElementById(section);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
}