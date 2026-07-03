/* ============================================
   PORTFOLIO — Interactive JavaScript v2
   Cyberpunk Animation System
   ============================================ */

// ── Lightbox ──────────────────────────────
function openLightbox(src) {
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    img.src = src;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function openCertLightbox(src, title, desc, grade, date) {
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    const detail = document.getElementById('lightbox-detail');
    img.src = src;
    detail.innerHTML = `
        <span class="lightbox-cert-date">${date}</span>
        <h3 class="lightbox-cert-title">${title}</h3>
        <p class="lightbox-cert-desc">${desc}</p>
        <span class="lightbox-cert-grade">${grade}</span>
    `;
    detail.style.display = 'block';
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    const detail = document.getElementById('lightbox-detail');
    if (detail) detail.style.display = 'none';
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
});

// ── DOM Ready ──────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initMobileNav();
    initTypingEffect();
    initScrollReveal();
    initActiveNav();
    initNeonFlash();
    initParallaxOrbs();
    initTiltCards();
    initMagneticButtons();
    spawnParticles();
});

/* ── Navbar Scroll Effect ─────────────────── */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

/* ── Mobile Navigation ────────────────────── */
function initMobileNav() {
    const toggle = document.getElementById('nav-toggle');
    const links = document.getElementById('nav-links');
    if (!toggle || !links) return;

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        links.classList.toggle('active');
        document.body.style.overflow = links.classList.contains('active') ? 'hidden' : '';
    });

    links.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            links.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

/* ── Typing Effect ────────────────────────── */
function initTypingEffect() {
    const element = document.getElementById('typed-text');
    if (!element) return;

    const roles = [
        'Student Developer',
        'Minecraft Enthusiast',
        'Mod Creator',
        'Problem Solver',
        'Open Source Lover'
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80;

    function type() {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            element.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 40;
        } else {
            element.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 80;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500;
        }

        setTimeout(type, typingSpeed);
    }

    setTimeout(type, 1000);
}

/* ── Enhanced Scroll Reveal ────────────────── */
function initScrollReveal() {
    // All reveal variants
    const reveals = document.querySelectorAll(
        '.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-blur, .reveal-clip, .reveal-wipe, .reveal-flip, .reveal-flip-right, .reveal-bounce, .reveal-glow, .contact-card, .section-divider, .split-text'
    );

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // Trigger the reveal
                    entry.target.classList.add('visible');

                    // If it's a split-text element, animate chars
                    if (entry.target.classList.contains('split-text')) {
                        animateSplitText(entry.target);
                    }

                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px'
        }
    );

    reveals.forEach(el => observer.observe(el));

    // Init scroll progress bar
}

/* ── Parallax Orbs on Mouse Move ────────────── */
function initParallaxOrbs() {
    const orbs = document.querySelectorAll('.gradient-orb');
    if (!orbs.length) return;

    const hero = document.querySelector('.hero');
    if (!hero) return;

    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        orbs.forEach((orb, i) => {
            const depth = (i + 1) * 15;
            const moveX = x * depth;
            const moveY = y * depth;
            orb.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });

    hero.addEventListener('mouseleave', () => {
        orbs.forEach(orb => {
            orb.style.transform = 'translate(0, 0)';
        });
    });
}

/* ── Card Tilt on Hover ─────────────────── */
function initTiltCards() {
    const cards = document.querySelectorAll('.tilt-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -4;
            const rotateY = ((x - centerX) / centerX) * 4;

            card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale(1)';
        });
    });
}

/* ── Magnetic Button Effect ─────────────────── */
function initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn-magnetic');
    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px) scale(1.02)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0) scale(1)';
        });
    });
}

/* ── Spawn Floating Particles ─────────────── */
function spawnParticles() {
    const hero = document.querySelector('.hero-bg');
    if (!hero) return;

    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = (60 + Math.random() * 40) + '%';
        particle.style.setProperty('--duration', (6 + Math.random() * 10) + 's');
        particle.style.setProperty('--p-delay', (Math.random() * 8) + 's');
        particle.style.setProperty('--drift', (Math.random() * 40 - 20) + 'px');
        particle.style.width = (1 + Math.random() * 2) + 'px';
        particle.style.height = particle.style.width;

        // Randomly pick accent color
        const colors = ['var(--accent)', 'var(--accent-2)', 'var(--accent-3)'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];

        hero.appendChild(particle);
    }
}

/* ── Text Split Animation ─────────────── */
function animateSplitText(element) {
    // Preserve the title-number span if present
    const titleNumber = element.querySelector('.title-number');

    // Extract only the text after the title number
    let text = '';
    if (titleNumber) {
        // Get text nodes only (skip the span)
        element.childNodes.forEach(node => {
            if (node.nodeType === Node.TEXT_NODE) {
                text += node.textContent;
            }
        });
    } else {
        text = element.textContent;
    }

    text = text.trim();
    if (!text) return;

    // Create a wrapper for the split chars
    const wrapper = document.createElement('span');
    wrapper.classList.add('split-chars');

    const words = text.split(' ');
    words.forEach((word, wIdx) => {
        word.split('').forEach((char, cIdx) => {
            const span = document.createElement('span');
            span.classList.add('char');
            let totalIndex = 0;
            for (let i = 0; i < wIdx; i++) totalIndex += words[i].length + 1;
            totalIndex += cIdx;
            span.style.setProperty('--char-delay', (totalIndex * 0.025) + 's');
            span.textContent = char;
            wrapper.appendChild(span);
        });
        if (wIdx < words.length - 1) {
            const space = document.createElement('span');
            space.innerHTML = '&nbsp;';
            space.classList.add('char');
            let totalIndex = 0;
            for (let i = 0; i <= wIdx; i++) totalIndex += words[i].length;
            space.style.setProperty('--char-delay', (totalIndex * 0.025) + 's');
            wrapper.appendChild(space);
        }
    });

    // Remove only text nodes, keep the title-number span
    if (titleNumber) {
        element.childNodes.forEach(node => {
            if (node.nodeType === Node.TEXT_NODE) {
                node.remove();
            }
        });
        element.appendChild(wrapper);
    } else {
        element.innerHTML = '';
        element.appendChild(wrapper);
    }

    requestAnimationFrame(() => {
        element.classList.add('visible');
    });
}

/* ── Section Number Neon Flash ────────── */
function initNeonFlash() {
    const sectionNums = document.querySelectorAll('.title-number');

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'neonFlicker 0.8s ease forwards';
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.5 }
    );

    sectionNums.forEach(el => observer.observe(el));
}

/* ── Active Nav Link ──────────────────────── */
function initActiveNav() {
    const sections = document.querySelectorAll('.section, .hero');
    const navLinks = document.querySelectorAll('.nav-link');

    // Build a set of IDs that have matching nav links
    const navIds = new Set();
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) navIds.add(href.slice(1));
    });

    // Map to track all currently visible sections (key: id, value: bounding rect)
    const visibleSections = new Map();

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                const id = entry.target.getAttribute('id');
                if (entry.isIntersecting) {
                    visibleSections.set(id, entry.boundingClientRect);
                } else {
                    visibleSections.delete(id);
                }
            });

            // Find the visible section closest to the top (lowest top offset)
            let closestId = null;
            let closestTop = Infinity;

            visibleSections.forEach((rect, id) => {
                if (navIds.has(id) && rect.top < closestTop) {
                    closestTop = rect.top;
                    closestId = id;
                }
            });

            // Highlight the nav link for the closest section
            if (closestId) {
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${closestId}`);
                });
            }
        },
        {
            threshold: [0, 0.1, 0.2, 0.3, 0.5],
            rootMargin: '-80px 0px -30% 0px'
        }
    );

    sections.forEach(section => observer.observe(section));
}

/* ── Smooth Scroll ─────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
