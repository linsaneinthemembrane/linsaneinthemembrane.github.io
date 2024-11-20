// Select the cursor element
const cursor = document.querySelector('.cursor');

// Listen for the mousemove event to track the mouse position
document.addEventListener('mousemove', (e) => {
  // Update the cursor's position based on mouse movement
  cursor.style.left = `${e.pageX}px`;
  cursor.style.top = `${e.pageY}px`;
});
