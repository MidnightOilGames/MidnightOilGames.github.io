/* ============================
   THEME TOGGLE
============================ */

const body = document.body;
const toggleBtn = document.getElementById('themeToggle');
const toggleIcon = toggleBtn ? toggleBtn.querySelector('.toggle-icon') : null;
const toggleLabel = toggleBtn ? toggleBtn.querySelector('.toggle-label') : null;

function applyTheme(theme) {
    if (theme === 'light') {
        body.classList.remove('theme-dark');
        body.classList.add('theme-light');
        if (toggleIcon) toggleIcon.textContent = '☀️';
        if (toggleLabel) toggleLabel.textContent = 'Light';
    } else {
        body.classList.remove('theme-light');
        body.classList.add('theme-dark');
        if (toggleIcon) toggleIcon.textContent = '🌙';
        if (toggleLabel) toggleLabel.textContent = 'Dark';
    }
    localStorage.setItem('goingonce-theme', theme);
}

// Load saved theme on page load
const savedTheme = localStorage.getItem('goingonce-theme');
applyTheme(savedTheme === 'light' ? 'light' : 'dark');

// Toggle on click
if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
        const newTheme = body.classList.contains('theme-dark') ? 'light' : 'dark';
        applyTheme(newTheme);
    });
}


/* ============================
   SCROLL REVEAL
============================ */

const revealElements = document.querySelectorAll('.fade-in, .slide-left, .slide-right, .slide-up');

function revealOnScroll() {
    const windowHeight = window.innerHeight;
    const elementVisible = 150;

    revealElements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight - elementVisible) {
            el.classList.add('active');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // trigger on load


/* ============================
   NAVBAR SHADOW ON SCROLL
============================ */

const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (!navbar) return;
    if (window.scrollY > 10) {
        navbar.style.boxShadow = "0 10px 30px rgba(0,0,0,0.5)";
    } else {
        navbar.style.boxShadow = "none";
    }
});


/* ============================
   BUTTON MICRO HOVER
============================ */

const buttons = document.querySelectorAll('.btn, .btn-outline');

buttons.forEach(btn => {
    btn.addEventListener('mouseover', () => {
        btn.style.transform = "scale(1.02)";
    });

    btn.addEventListener('mouseout', () => {
        btn.style.transform = "scale(1)";
    });
});

/* Hide scroll arrow when user scrolls */
window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
        document.body.classList.add("scrolled");
    } else {
        document.body.classList.remove("scrolled");
    }
});
