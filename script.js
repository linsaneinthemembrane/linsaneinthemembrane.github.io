document.addEventListener('DOMContentLoaded', function() {
    // Select all sections and navigation links
    const sections = document.querySelectorAll('.right-pane section');
    const navLinks = document.querySelectorAll('.section-nav a');
    const rightPane = document.querySelector('.right-pane');
    const isMobile = window.innerWidth <= 768;
    const headerTitle = document.querySelector('.left-pane h1');

    // Handle cursor movement for gradient
    document.addEventListener('mousemove', function(event) {
        const x = event.clientX;
        const y = event.clientY;
        document.documentElement.style.setProperty('--x', x + 'px');
        document.documentElement.style.setProperty('--y', y + 'px');
    });

    // Function to update active navigation link
    function updateActiveNavLink(sectionId) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
                link.classList.add('active');
            }
        });
    }

    // Add click handler for header title
    headerTitle.addEventListener('click', () => {
        const aboutSection = document.querySelector('#about');
        if (isMobile) {
            const headerOffset = document.querySelector('.left-pane').offsetHeight;
            const elementPosition = aboutSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        } else {
            rightPane.scrollTo({
                top: aboutSection.offsetTop,
                behavior: 'smooth'
            });
        }
    });

    // Add click handlers for section headers
    sections.forEach(section => {
        const header = section.querySelector('h2');
        if (header) {
            header.style.cursor = 'pointer';
            header.addEventListener('click', () => {
                const sectionId = section.getAttribute('id');
                updateActiveNavLink(sectionId);
                
                if (isMobile) {
                    const headerOffset = document.querySelector('.left-pane').offsetHeight;
                    const elementPosition = section.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.scrollY - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                } else {
                    rightPane.scrollTo({
                        top: section.offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        }
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
                updateActiveNavLink(id);
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

    // View More Projects functionality
    const viewMoreButton = document.getElementById('view-more-projects');
    const hiddenProjects = document.getElementById('hidden-projects');

    if (viewMoreButton && hiddenProjects) {
        viewMoreButton.addEventListener('click', function() {
            if (hiddenProjects.style.display === 'none') {
                hiddenProjects.style.display = 'block';
                viewMoreButton.textContent = 'View Less';
            } else {
                hiddenProjects.style.display = 'none';
                viewMoreButton.textContent = 'View More Projects';
                // Scroll to the projects section
                const projectsSection = document.getElementById('projects');
                if (projectsSection) {
                    if (isMobile) {
                        const headerOffset = document.querySelector('.left-pane').offsetHeight;
                        const elementPosition = projectsSection.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.scrollY - headerOffset;

                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    } else {
                        rightPane.scrollTo({
                            top: projectsSection.offsetTop,
                            behavior: 'smooth'
                        });
                    }
                }
            }
        });
    }
});


// Back to Top button functionality
const backToTopButton = document.getElementById('back-to-top');
const rightPane = document.querySelector('.right-pane');
const isMobile = window.innerWidth <= 768;

// Show button when user scrolls down
function toggleBackToTopButton() {
    if (isMobile) {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    } else {
        if (rightPane.scrollTop > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    }
}

// Scroll to top when button is clicked
backToTopButton.addEventListener('click', function() {
    if (isMobile) {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    } else {
        rightPane.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
});

// Add scroll event listeners
if (isMobile) {
    window.addEventListener('scroll', toggleBackToTopButton);
} else {
    rightPane.addEventListener('scroll', toggleBackToTopButton);
}

// Initialize button visibility on page load
toggleBackToTopButton();

// Re-check on window resize
window.addEventListener('resize', function() {
    const newIsMobile = window.innerWidth <= 768;
    if (newIsMobile !== isMobile) {
        // Update isMobile value
        isMobile = newIsMobile;
        
        // Remove previous event listeners
        window.removeEventListener('scroll', toggleBackToTopButton);
        rightPane.removeEventListener('scroll', toggleBackToTopButton);
        
        // Add appropriate event listener
        if (isMobile) {
            window.addEventListener('scroll', toggleBackToTopButton);
        } else {
            rightPane.addEventListener('scroll', toggleBackToTopButton);
        }
    }
});
