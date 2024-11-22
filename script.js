document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.right-pane section');
    const navLinks = document.querySelectorAll('.section-nav a');
    
    // Handle cursor movement for gradient
    document.addEventListener('mousemove', function(event) {
        const x = event.clientX;
        const y = event.clientY;
        
        document.documentElement.style.setProperty('--x', x + 'px');
        document.documentElement.style.setProperty('--y', y + 'px');
    });

    // Intersection Observer for section visibility
    const observerOptions = {
        root: document.querySelector('.right-pane'),
        threshold: 0.2,
        rootMargin: '-10% 0px -70% 0px'
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

    // Smooth scrolling with offset
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            const offset = 40; // Adjust this value based on your layout
            const targetPosition = targetSection.offsetTop - offset;
            
            document.querySelector('.right-pane').scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
});