/**
 * Michalis Paraskevas Campaign Website - Interactive Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
    // Fade-in on scroll (.animate-on-scroll → .is-in-view)
    const animated = document.querySelectorAll('.animate-on-scroll');
    if (animated.length) {
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduceMotion) {
            animated.forEach((el) => el.classList.add('is-in-view'));
        } else {
            const revealObserver = new IntersectionObserver(
                (entries, obs) => {
                    entries.forEach((entry) => {
                        if (!entry.isIntersecting) return;
                        entry.target.classList.add('is-in-view');
                        obs.unobserve(entry.target);
                    });
                },
                {
                    root: null,
                    rootMargin: '0px 0px -6% 0px',
                    threshold: [0, 0.1, 0.2]
                }
            );
            animated.forEach((el) => revealObserver.observe(el));
        }
    }

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
        let ticking = false;
        let isScrolled = false;

        const updateHeaderShadow = () => {
            const nextIsScrolled = window.scrollY > 50;
            if (nextIsScrolled !== isScrolled) {
                isScrolled = nextIsScrolled;
                header.style.boxShadow = isScrolled
                    ? '0 4px 25px rgba(0, 0, 0, 0.1)'
                    : '0 2px 20px rgba(0, 0, 0, 0.06)';
            }
            ticking = false;
        };

        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(updateHeaderShadow);
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        updateHeaderShadow(); // Initial check
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

    // Carousels (βίντεο: 1 ανά φορά · δράσεις: 3 ανά φορά)
    document.querySelectorAll('.video-carousel, .actions-carousel').forEach((carousel) => {
        const wrap = carousel.querySelector('.carousel-track-wrap');
        const track = carousel.querySelector('.carousel-track');
        const slides = carousel.querySelectorAll('.carousel-slide');
        const prevBtn = carousel.querySelector('.carousel-prev');
        const nextBtn = carousel.querySelector('.carousel-next');
        const dotsContainer = carousel.querySelector('.carousel-dots');
        if (!wrap || !track || !slides.length || !prevBtn || !nextBtn || !dotsContainer) return;

        const isActions = carousel.classList.contains('actions-carousel');
        const totalSlides = slides.length;

        function getActionsSlidesPerView() {
            if (!isActions) return 1;
            return window.matchMedia('(max-width: 768px)').matches ? 1 : 3;
        }

        let currentIndex = 0;
        let currentPage = 0;

        function buildDots() {
            dotsContainer.innerHTML = '';
            const spv = getActionsSlidesPerView();
            const nDots = isActions ? Math.ceil(totalSlides / spv) : totalSlides;
            for (let i = 0; i < nDots; i++) {
                const dot = document.createElement('button');
                dot.setAttribute('type', 'button');
                dot.setAttribute('role', 'tab');
                const label = isActions
                    ? (spv === 1 ? `Δράση ${i + 1}` : `Ομάδα ${i + 1}`)
                    : `Βίντεο ${i + 1}`;
                dot.setAttribute('aria-label', label);
                dot.setAttribute('aria-selected', i === 0);
                if (i === 0) dot.classList.add('active');
                dot.addEventListener('click', () => {
                    if (isActions) goToPage(i);
                    else goToSlide(i);
                });
                dotsContainer.appendChild(dot);
            }
        }

        buildDots();

        function getDots() {
            return dotsContainer.querySelectorAll('button');
        }

        function setActionsSlideWidths() {
            if (!isActions) return;
            const w = wrap.offsetWidth;
            const gap = 12;
            const spv = getActionsSlidesPerView();
            if (spv === 1) {
                slides.forEach((slide, idx) => {
                    slide.style.flex = `0 0 ${w}px`;
                    slide.style.width = `${w}px`;
                    slide.style.marginRight = idx < slides.length - 1 ? `${gap}px` : '0';
                });
            } else {
                const col = (w - gap * 2) / 3;
                slides.forEach((slide, idx) => {
                    slide.style.flex = `0 0 ${col}px`;
                    slide.style.width = `${col}px`;
                    slide.style.marginRight = idx < slides.length - 1 ? `${gap}px` : '0';
                });
            }
        }

        function updateDots() {
            const d = getDots();
            const active = isActions ? currentPage : currentIndex;
            d.forEach((btn, i) => {
                btn.classList.toggle('active', i === active);
                btn.setAttribute('aria-selected', i === active);
            });
        }

        function goToPage(page) {
            if (!isActions) return;
            const spv = getActionsSlidesPerView();
            const pageCount = Math.ceil(totalSlides / spv);
            currentPage = Math.max(0, Math.min(page, pageCount - 1));
            setActionsSlideWidths();
            const w = wrap.offsetWidth;
            const gap = 12;
            let shift;
            if (spv === 1) {
                shift = currentPage * (w + gap);
            } else {
                shift = currentPage * w;
            }
            track.style.transform = `translateX(-${shift}px)`;
            updateDots();
        }

        function goToSlide(index) {
            if (isActions) return;
            carousel.querySelectorAll('video').forEach((v) => v.pause());
            currentIndex = Math.max(0, Math.min(index, totalSlides - 1));
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
            updateDots();
        }

        function goNext() {
            if (isActions) goToPage(currentPage + 1);
            else goToSlide(currentIndex + 1);
        }

        function goPrev() {
            if (isActions) goToPage(currentPage - 1);
            else goToSlide(currentIndex - 1);
        }

        let lastActionsSpv = isActions ? getActionsSlidesPerView() : 0;

        if (isActions) {
            setActionsSlideWidths();
            goToPage(0);
            window.addEventListener('resize', () => {
                const spv = getActionsSlidesPerView();
                if (spv !== lastActionsSpv) {
                    const firstSlide = currentPage * lastActionsSpv;
                    currentPage = Math.floor(firstSlide / spv);
                    const maxPage = Math.ceil(totalSlides / spv) - 1;
                    currentPage = Math.max(0, Math.min(currentPage, maxPage));
                    buildDots();
                    lastActionsSpv = spv;
                }
                setActionsSlideWidths();
                goToPage(currentPage);
            });
        } else {
            goToSlide(0);
        }

        prevBtn.addEventListener('click', goPrev);
        nextBtn.addEventListener('click', goNext);

        carousel.setAttribute('tabindex', '0');
        carousel.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') goPrev();
            if (e.key === 'ArrowRight') goNext();
        });
    });

    // Τίτλος καρτέλας ανά ενότητα στο index.html (#arxiki, #theseis, …)
    const titleBase = 'Μιχάλης Παρασκευάς – Υποψήφιος Βουλευτής Λεμεσού με το ALMA';
    const sectionTitleById = {
        arxiki: 'Αρχική',
        theseis: 'Θέσεις',
        draseis: 'Δράσεις',
        biografiko: 'Βιογραφικό',
        enimerosi: 'Ενημέρωση'
    };
    const sectionIds = Object.keys(sectionTitleById);

    function setDocumentTitleForSection(sectionId) {
        const label = sectionTitleById[sectionId];
        if (!label) return;
        document.title = `${label} | ${titleBase}`;
    }

    function getCurrentSectionIdFromScroll() {
        const header = document.querySelector('.header');
        const offset = header ? header.offsetHeight + 24 : 96;
        const y = window.scrollY + offset;
        let current = 'arxiki';
        for (const id of sectionIds) {
            const el = document.getElementById(id);
            if (!el) continue;
            if (el.offsetTop <= y) current = id;
        }
        return current;
    }

    function updateIndexPageTitle() {
        if (!document.getElementById('arxiki')) return;
        setDocumentTitleForSection(getCurrentSectionIdFromScroll());
    }

    if (document.getElementById('arxiki')) {
        let titleTicking = false;
        const onScrollOrResizeForTitle = () => {
            if (titleTicking) return;
            titleTicking = true;
            requestAnimationFrame(() => {
                titleTicking = false;
                updateIndexPageTitle();
            });
        };

        window.addEventListener('scroll', onScrollOrResizeForTitle, { passive: true });
        window.addEventListener('resize', onScrollOrResizeForTitle, { passive: true });
        window.addEventListener('hashchange', onScrollOrResizeForTitle);
        window.addEventListener('load', updateIndexPageTitle);
        updateIndexPageTitle();
        requestAnimationFrame(() => {
            requestAnimationFrame(updateIndexPageTitle);
        });
    }
});
