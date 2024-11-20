// Select the custom cursor element
const cursor = document.getElementById('cursor');

// Listen for mousemove events on the document
document.addEventListener('mousemove', (e) => {
    // Get mouse position relative to viewport
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    // Update the position of the custom cursor
    // Adjusting for half of the cursor's width and height to center it correctly
    cursor.style.transform = `translate(${mouseX - cursor.offsetWidth / 2}px, ${mouseY - cursor.offsetHeight / 2}px)`;
});