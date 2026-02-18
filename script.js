/* ============================
   SCROLL PROGRESS BAR
============================ */

const progressBar = document.querySelector('.scroll-progress');

function updateProgress() {
    if (!progressBar) return;
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = scrollPercent + '%';
}

window.addEventListener('scroll', updateProgress);
updateProgress();


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
        if (toggleIcon) toggleIcon.textContent = '\u2600\uFE0F';
        if (toggleLabel) toggleLabel.textContent = 'Light';
    } else {
        body.classList.remove('theme-light');
        body.classList.add('theme-dark');
        if (toggleIcon) toggleIcon.textContent = '\uD83C\uDF19';
        if (toggleLabel) toggleLabel.textContent = 'Dark';
    }
    localStorage.setItem('goingonce-theme', theme);
}

const savedTheme = localStorage.getItem('goingonce-theme');
applyTheme(savedTheme === 'light' ? 'light' : 'dark');

if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
        const newTheme = body.classList.contains('theme-dark') ? 'light' : 'dark';
        applyTheme(newTheme);
    });
}


/* ============================
   SCROLL REVEAL (with stagger)
============================ */

const revealElements = document.querySelectorAll('.fade-in, .slide-left, .slide-right, .slide-up');

function revealOnScroll() {
    const windowHeight = window.innerHeight;
    const elementVisible = 120;

    revealElements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight - elementVisible) {
            el.classList.add('active');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

// Add stagger classes to grids
document.querySelectorAll('.feature-grid, .team-grid').forEach(grid => {
    const cards = grid.children;
    for (let i = 0; i < cards.length; i++) {
        cards[i].classList.add('stagger-' + (i + 1));
    }
});


/* ============================
   NAVBAR SHADOW ON SCROLL
============================ */

const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (!navbar) return;
    if (window.scrollY > 10) {
        navbar.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});


/* ============================
   HAMBURGER MENU
============================ */

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('nav');
const navOverlay = document.querySelector('.nav-overlay');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('open');
        if (navOverlay) navOverlay.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('open');
            if (navOverlay) navOverlay.classList.remove('active');
        });
    });

    // Close menu when overlay is clicked
    if (navOverlay) {
        navOverlay.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('open');
            navOverlay.classList.remove('active');
        });
    }
}


/* ============================
   FAQ ACCORDION
============================ */

document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const item = question.parentElement;
        const isOpen = item.classList.contains('open');

        // Close all other items
        document.querySelectorAll('.faq-item.open').forEach(openItem => {
            openItem.classList.remove('open');
        });

        // Toggle clicked item
        if (!isOpen) {
            item.classList.add('open');
        }
    });
});


/* ============================
   SCROLL ARROW HIDE
============================ */

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        document.body.classList.add('scrolled');
    } else {
        document.body.classList.remove('scrolled');
    }
});


/* ============================
   DEVLOG SORT TOGGLE
============================ */

const sortToggle = document.getElementById('sortToggle');
const timelineContainer = document.querySelector('.timeline');

if (sortToggle && timelineContainer) {
    let newestFirst = true;

    sortToggle.addEventListener('click', () => {
        const entries = Array.from(timelineContainer.querySelectorAll('.timeline-entry'));
        const comingSoon = entries[entries.length - 1];
        const logEntries = entries.slice(0, -1);

        logEntries.reverse().forEach(entry => {
            timelineContainer.insertBefore(entry, comingSoon);
        });

        newestFirst = !newestFirst;
        sortToggle.textContent = newestFirst ? 'Newest First ↓' : 'Oldest First ↑';
    });
}


/* ============================
   PARALLAX-LITE ON HERO
============================ */

const heroSection = document.querySelector('.hero');

if (heroSection) {
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const heroHeight = heroSection.offsetHeight;
        if (scrolled < heroHeight) {
            const content = heroSection.querySelector('.hero-content');
            if (content) {
                content.style.transform = 'translateY(' + (scrolled * 0.15) + 'px)';
                content.style.opacity = 1 - (scrolled / heroHeight) * 0.4;
            }
        }
    });
}
