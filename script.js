// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active navigation link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Search button functionality
const searchBtn = document.querySelector('.search-btn');
if (searchBtn) {
    searchBtn.addEventListener('click', () => {
        const searchTerm = prompt('Search for courses or content:');
        if (searchTerm) {
            alert(`Searching for: ${searchTerm}`);
        }
    });
}

// Login button functionality
const loginBtn = document.querySelector('.login-btn');
if (loginBtn) {
    loginBtn.addEventListener('click', () => {
        alert('Login functionality would be implemented here.');
    });
}

// Contact button functionality
const contactBtn = document.querySelector('.contact-btn');
const contactSection = document.querySelector('#contact');
if (contactBtn && contactSection) {
    contactBtn.addEventListener('click', () => {
        contactSection.scrollIntoView({
            behavior: 'smooth'
        });
    });
}

// Read More button functionality
const readMoreBtn = document.querySelector('.read-more-btn');
if (readMoreBtn && readMoreBtn.tagName === 'BUTTON') {
    readMoreBtn.addEventListener('click', () => {
        alert('More information about our academic programs would be displayed here.');
    });
}

// Learn More links functionality
document.querySelectorAll('.learn-more[href="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const cardTitle = link.closest('.feature-card').querySelector('h3').textContent;
        alert(`Learn more about: ${cardTitle}`);
    });
});

// Animate statistics on scroll
const observerOptions = {
    threshold: 0.5
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const finalValue = parseInt(stat.textContent);
                animateValue(stat, 0, finalValue, 2000);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const statisticsSection = document.querySelector('.statistics');
if (statisticsSection) {
    statsObserver.observe(statisticsSection);
}

// Function to animate numbers
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start) + '+';
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Add scroll animation for feature cards
const featureCards = document.querySelectorAll('.feature-card');
const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

featureCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
    cardObserver.observe(card);
});

// Mobile menu toggle
const createMobileMenu = () => {
    const header = document.querySelector('.header-content');
    if (!header || header.querySelector('.mobile-menu-btn')) return;
    const nav = header.querySelector('.nav');
    if (!nav) return;

    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.setAttribute('aria-label', 'Toggle navigation menu');
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';

    header.insertBefore(mobileMenuBtn, nav);

    // Move the "Contact Us" button into the mobile dropdown menu
    const contactBtn = header.querySelector('.header-actions .contact-btn');
    const navList = nav.querySelector('ul');
    if (contactBtn && navList && !navList.querySelector('.nav-contact-item')) {
        const contactItem = document.createElement('li');
        contactItem.className = 'nav-contact-item';
        contactItem.appendChild(contactBtn.cloneNode(true));
        navList.appendChild(contactItem);
    }

    mobileMenuBtn.addEventListener('click', () => {
        nav.classList.toggle('active');
    });

    // Close the menu when a nav link is clicked
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => nav.classList.remove('active'));
    });

    // Close the menu when tapping outside of it
    document.addEventListener('click', (e) => {
        if (nav.classList.contains('active') && !nav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            nav.classList.remove('active');
        }
    });
};

// Add scroll class to header for enhanced glass effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (header) {
        header.classList.toggle('scrolled', window.scrollY > 20);
    }
});

// Reveal animations on scroll
const revealElements = document.querySelectorAll('.reveal, section:not(.hero) > .container > *, .feature-card, .value-card, .choose-card, .classroom-card, .care-card, .why-choose-list article');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

revealElements.forEach(el => {
    if (!el.classList.contains('reveal')) {
        el.classList.add('reveal');
    }
    revealObserver.observe(el);
});

// Initialize mobile menu
createMobileMenu();

// Initialize AOS (scroll animation library) if present on this page.
// Also refresh after full load so offsets account for images loading in,
// and fall back to revealing content if AOS failed to load from its CDN.
if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 800, once: true, offset: 100 });
    window.addEventListener('load', () => AOS.refresh());
} else {
    window.addEventListener('load', () => {
        document.querySelectorAll('[data-aos]').forEach(el => el.classList.add('aos-animate'));
    });
}

// Scroll progress bar
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress-bar';
document.body.appendChild(progressBar);

function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = progress + '%';
}
window.addEventListener('scroll', updateScrollProgress);
updateScrollProgress();

// Back-to-top button
const backToTopBtn = document.createElement('button');
backToTopBtn.className = 'back-to-top';
backToTopBtn.setAttribute('aria-label', 'Back to top');
backToTopBtn.innerHTML = '<i class="fas fa-arrow-up" aria-hidden="true"></i>';
document.body.appendChild(backToTopBtn);

window.addEventListener('scroll', () => {
    backToTopBtn.classList.toggle('visible', window.scrollY > 400);
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Floating WhatsApp quick-contact button
const whatsappBtn = document.createElement('a');
whatsappBtn.className = 'whatsapp-float';
whatsappBtn.href = 'https://wa.me/233204624519';
whatsappBtn.target = '_blank';
whatsappBtn.rel = 'noopener noreferrer';
whatsappBtn.setAttribute('aria-label', 'Chat with us on WhatsApp');
whatsappBtn.innerHTML = '<i class="fab fa-whatsapp" aria-hidden="true"></i>';
document.body.appendChild(whatsappBtn);
