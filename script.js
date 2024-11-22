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

    const observerOptions = {
        root: null, // Use viewport as root for both mobile and desktop
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
                        // Update the line width for the active section
                        const line = link.querySelector('::before');
                        if (line) {
                            line.style.width = '80px';
                        }
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Updated smooth scrolling
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            // Get the height of the sticky header in mobile view
            const headerHeight = window.innerWidth <= 768 ? 
                document.querySelector('.left-pane').offsetHeight : 0;
                
            const targetPosition = targetSection.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
});