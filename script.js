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

    // Intersection Observer for section visibility
    const observerOptions = {
        root: null,
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

    // Animation Observer for skill categories
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.skill-category, .project-card, .experience-item').forEach((el) => animationObserver.observe(el));

    // Smooth scrolling with proper offset calculation
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            const isMobile = window.innerWidth <= 768;
            
            // Calculate offset based on viewport
            const headerOffset = isMobile ? document.querySelector('.left-pane').offsetHeight : 0;
            const elementPosition = targetSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            if (isMobile) {
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
