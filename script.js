document.addEventListener('DOMContentLoaded', function() {
    // Select all sections and navigation links
    const sections = document.querySelectorAll('.right-pane section');
    const navLinks = document.querySelectorAll('.section-nav a');
    const rightPane = document.querySelector('.right-pane');
    const isMobile = window.innerWidth <= 768;

    // Handle cursor movement for gradient
    document.addEventListener('mousemove', function(event) {
        const x = event.clientX;
        const y = event.clientY;
        document.documentElement.style.setProperty('--x', x + 'px');
        document.documentElement.style.setProperty('--y', y + 'px');
    });

    // Add global scroll handling
    document.addEventListener('wheel', function(event) {
        if (!event.target.closest('.right-pane')) {
            event.preventDefault();
            const scrollSpeed = 1.0;
            rightPane.scrollTop += event.deltaY * scrollSpeed;
        }
    }, { passive: false });

    // Intersection Observer for section visibility
    const observerOptions = {
        root: isMobile ? null : rightPane,
        threshold: 0.1,
        rootMargin: isMobile ? '-20% 0px -20% 0px' : '-10% 0px -10% 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Animation Observer for cards
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { 
        root: isMobile ? null : rightPane,
        threshold: 0.1 
    });

    document.querySelectorAll('.skill-category, .project-card, .experience-item').forEach((el) => animationObserver.observe(el));

    // smooth-scrolling
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (isMobile) {
                const headerOffset = document.querySelector('.left-pane').offsetHeight;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            } else {
                rightPane.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});
