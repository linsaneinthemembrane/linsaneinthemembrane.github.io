document.addEventListener('DOMContentLoaded', function() {
    
    const sections = document.querySelectorAll('.right-pane section');
    const navLinks = document.querySelectorAll('.section-nav a');
 
    function activateSection() {
        let index = sections.length;
 
        while (--index && window.scrollY + window.innerHeight / sections.length * index > sections[index].offsetTop) {}
 
        navLinks.forEach(link => link.classList.remove('active'));
        navLinks[index].classList.add('active');
    }
 
    activateSection();
 
    window.addEventListener('scroll', activateSection);
 
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
 
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });
        });
    });
 
    document.addEventListener('mousemove', function(event) {
        const x = event.clientX / window.innerWidth * 100;
        const y = event.clientY / window.innerHeight * 100;
 
        document.documentElement.style.setProperty('--x', `${x}%`);
        document.documentElement.style.setProperty('--y', `${y}%`);
    });
 });