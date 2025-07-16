// Theme Management
class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'orange';
        this.init();
    }

    init() {
        this.setTheme(this.currentTheme);
        this.bindEvents();
    }

    setTheme(theme) {
        document.body.setAttribute('data-theme', theme);
        this.currentTheme = theme;
        localStorage.setItem('theme', theme);
        
        // Update active state for theme circles
        const themeCircles = document.querySelectorAll('.theme-circle');
        themeCircles.forEach(circle => {
            circle.classList.remove('active');
            if (circle.getAttribute('data-theme') === theme) {
                circle.classList.add('active');
            }
        });
    }

    bindEvents() {
        const themeCircles = document.querySelectorAll('.theme-circle');
        themeCircles.forEach(circle => {
            circle.addEventListener('click', (e) => {
                e.preventDefault();
                const theme = circle.getAttribute('data-theme');
                this.setTheme(theme);
            });
        });
    }
}

// Custom Cursor
class CustomCursor {
    constructor() {
        this.cursor = document.querySelector('.custom-cursor');
        this.cursorInner = document.querySelector('.cursor-inner');
        this.cursorOuter = document.querySelector('.cursor-outer');
        this.init();
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        // Mouse move event
        document.addEventListener('mousemove', (e) => {
            this.cursorInner.style.left = e.clientX + 'px';
            this.cursorInner.style.top = e.clientY + 'px';
            this.cursorOuter.style.left = e.clientX + 'px';
            this.cursorOuter.style.top = e.clientY + 'px';
        });

        // Hover effects
        const hoverElements = document.querySelectorAll('a, button, .btn, .nav-link, .project-card, .skill-category');
        
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                document.body.classList.add('cursor-hover');
            });
            
            element.addEventListener('mouseleave', () => {
                document.body.classList.remove('cursor-hover');
            });
        });
    }
}

// Preloader
class Preloader {
    constructor() {
        this.preloader = document.getElementById('preloader');
        this.init();
    }

    init() {
        window.addEventListener('load', () => {
            setTimeout(() => {
                this.hidePreloader();
            }, 2000);
        });
    }

    hidePreloader() {
        this.preloader.style.opacity = '0';
        setTimeout(() => {
            this.preloader.style.display = 'none';
        }, 500);
    }
}

// Scroll Animations
class ScrollAnimations {
    constructor() {
        this.elements = document.querySelectorAll('.fade-in, .stat-item, .skill-category, .project-card');
        this.init();
    }

    init() {
        this.bindEvents();
        this.checkElements();
    }

    bindEvents() {
        window.addEventListener('scroll', () => {
            this.checkElements();
        });
    }

    checkElements() {
        this.elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('visible');
            }
        });
    }
}

// Smooth Scrolling for Navigation
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Project Filter
class ProjectFilter {
    constructor() {
        this.filterButtons = document.querySelectorAll('.project-filter .btn');
        this.projects = document.querySelectorAll('[data-category]');
        this.init();
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        this.filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const filter = button.getAttribute('data-filter');
                this.filterProjects(filter);
                this.updateActiveButton(button);
            });
        });
    }

    filterProjects(filter) {
        this.projects.forEach(project => {
            if (filter === 'all' || project.getAttribute('data-category').includes(filter)) {
                project.style.display = 'block';
                project.style.opacity = '1';
                project.style.transform = 'scale(1)';
            } else {
                project.style.opacity = '0';
                project.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    project.style.display = 'none';
                }, 300);
            }
        });
    }

    updateActiveButton(activeButton) {
        this.filterButtons.forEach(button => {
            button.classList.remove('active');
        });
        activeButton.classList.add('active');
    }
}

// Skill Progress Animation
class SkillProgress {
    constructor() {
        this.progressBars = document.querySelectorAll('.progress-bar');
        this.init();
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        window.addEventListener('scroll', () => {
            this.animateProgress();
        });
    }

    animateProgress() {
        this.progressBars.forEach(bar => {
            const barTop = bar.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (barTop < windowHeight - 100 && !bar.classList.contains('animated')) {
                const width = bar.style.width;
                bar.style.width = '0%';
                bar.classList.add('animated');
                
                setTimeout(() => {
                    bar.style.width = width;
                }, 200);
            }
        });
    }
}

// Typing Effect
class TypingEffect {
    constructor() {
        this.element = document.querySelector('.hero-content h2');
        this.texts = [
            "I'm a Full Stack Developer",
            "I'm a Web Designer",
            "I'm a Problem Solver",
            "I'm a Creative Thinker"
        ];
        this.textIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.init();
    }

    init() {
        if (this.element) {
            this.type();
        }
    }

    type() {
        const current = this.texts[this.textIndex];
        
        if (this.isDeleting) {
            this.element.textContent = current.substring(0, this.charIndex - 1);
            this.charIndex--;
        } else {
            this.element.textContent = current.substring(0, this.charIndex + 1);
            this.charIndex++;
        }

        let typeSpeed = this.isDeleting ? 50 : 100;

        if (!this.isDeleting && this.charIndex === current.length) {
            typeSpeed = 2000;
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.textIndex = (this.textIndex + 1) % this.texts.length;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Navbar Scroll Effect
class NavbarScroll {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.init();
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
        });
    }
}

// Particle Background (Optional Enhancement)
class ParticleBackground {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.init();
    }

    init() {
        this.setupCanvas();
        this.createParticles();
        this.animate();
        this.bindEvents();
    }

    setupCanvas() {
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '-1';
        this.canvas.style.opacity = '0.5';
        
        document.body.appendChild(this.canvas);
        this.resizeCanvas();
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        const particleCount = 50;
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
            
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
            this.ctx.fill();
        });
        
        requestAnimationFrame(() => this.animate());
    }

    bindEvents() {
        window.addEventListener('resize', () => {
            this.resizeCanvas();
        });
    }
}

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Preloader();
    new ThemeManager();
    new CustomCursor();
    new ScrollAnimations();
    new SmoothScroll();
    new ProjectFilter();
    new SkillProgress();
    new TypingEffect();
    new NavbarScroll();
    // new ParticleBackground(); // Uncomment for particle effect
});

// Additional utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Intersection Observer for better performance
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const elementsToObserve = document.querySelectorAll('.fade-in, .stat-item, .skill-category, .project-card');
    elementsToObserve.forEach(element => {
        observer.observe(element);
    });
});