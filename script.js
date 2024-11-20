// Select the cursor element
const cursor = document.querySelector('.cursor');

// Listen for the mousemove event to track the mouse position
document.addEventListener('mousemove', (e) => {
  // Update cursor's position based on mouse movement
  // Offset the position by half of the cursor element's width and height to center it
  const cursorSize = 100; // Since your cursor size is 100px in both width and height
  cursor.style.left = `${e.pageX - cursorSize / 2}px`; // Subtract half of the width to center it
  cursor.style.top = `${e.pageY - cursorSize / 2}px`;   // Subtract half of the height to center it
});
