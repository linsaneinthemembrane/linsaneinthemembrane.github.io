document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.right-pane section');
    const navLinks = document.querySelectorAll('.section-nav a');
    const rightPane = document.querySelector('.right-pane');
    
    // Handle cursor movement for gradient
    document.addEventListener('mousemove', function(event) {
        const x = event.clientX;
        const y = event.clientY;
        document.documentElement.style.setProperty('--x', x + 'px');
        document.documentElement.style.setProperty('--y', y + 'px');
    });

    // Enable global scrolling
    document.addEventListener('wheel', function(event) {
        if (!event.target.closest('.right-pane')) {
            event.preventDefault();
            rightPane.scrollTop += event.deltaY;
        }
    }, { passive: false });

    // Intersection Observer for section visibility
    const observerOptions = {
        root: rightPane,
        threshold: 0.2,
        rootMargin: '-20% 0px -20% 0px'
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
        root: rightPane,
        threshold: 0.1 
    });

    document.querySelectorAll('.skill-category, .project-card, .experience-item').forEach((el) => animationObserver.observe(el));

    // Keep existing smooth scrolling code
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            const isMobile = window.innerWidth <= 768;
            
            if (isMobile) {
                const headerOffset = document.querySelector('.left-pane').offsetHeight;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
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
