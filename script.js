/**
 * Michalis Paraskevas Campaign Website - Interactive Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
    // Mobile navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            navToggle.setAttribute('aria-expanded', navMenu.classList.contains('active'));
            navToggle.setAttribute('aria-label', 
                navMenu.classList.contains('active') ? 'Κλείσιμο μενού' : 'Άνοιγμα μενού');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking a link (for anchor links)
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active') && 
                !navMenu.contains(e.target) && 
                !navToggle.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
    }

    // Header scroll effect - add shadow on scroll
    const header = document.querySelector('.header');
    if (header) {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                header.style.boxShadow = '0 4px 25px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.06)';
            }
        };
        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check
    }

    // Smooth scroll for anchor links (fallback for older browsers)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Scroll-triggered animations - trigger immediately for elements in viewport
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.01
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        observer.observe(el);
        // Show immediately if already in viewport
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 50) {
            el.classList.add('animate-in');
        }
    });

    // Video carousel
    const carousel = document.querySelector('.video-carousel');
    if (carousel) {
        const track = carousel.querySelector('.carousel-track');
        const slides = carousel.querySelectorAll('.carousel-slide');
        const prevBtn = carousel.querySelector('.carousel-prev');
        const nextBtn = carousel.querySelector('.carousel-next');
        const dotsContainer = carousel.querySelector('.carousel-dots');

        let currentIndex = 0;
        const totalSlides = slides.length;

        // Create dots
        slides.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.setAttribute('role', 'tab');
            dot.setAttribute('aria-label', `Βίντεο ${i + 1}`);
            dot.setAttribute('aria-selected', i === 0);
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        });

        const dots = dotsContainer.querySelectorAll('button');

        function goToSlide(index) {
            currentIndex = Math.max(0, Math.min(index, totalSlides - 1));
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
            dots.forEach((d, i) => {
                d.classList.toggle('active', i === currentIndex);
                d.setAttribute('aria-selected', i === currentIndex);
            });
        }

        prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
        nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));

        // Keyboard navigation
        carousel.setAttribute('tabindex', '0');
        carousel.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') goToSlide(currentIndex - 1);
            if (e.key === 'ArrowRight') goToSlide(currentIndex + 1);
        });
    }
});
