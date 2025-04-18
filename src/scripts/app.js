// Global scale variable
let scale = 1; // Default zoom scale

// Select images
const imageA = document.getElementById('imageA');
const imageB = document.getElementById('imageB');

// Zoom controls
const zoomInButton = document.getElementById('zoomIn');
const zoomOutButton = document.getElementById('zoomOut');

// Handle zoom-in button
zoomInButton.addEventListener('click', () => {
  scale = Math.min(scale + 0.1, 3); // Limit zoom scale to 3x
  [imageA, imageB].forEach((image) => {
    image.style.transform = `scale(${scale})`;
  });
});

// Handle zoom-out button
zoomOutButton.addEventListener('click', () => {
  scale = Math.max(scale - 0.1, 1); // Limit zoom scale to 1x
  [imageA, imageB].forEach((image) => {
    image.style.transform = `scale(${scale})`;
  });
});

// Handle transparency slider
const slider = document.getElementById('transparency');
slider.addEventListener('input', (e) => {
  const value = e.target.value / 100; // Convert to a value between 0 and 1
  imageB.style.opacity = value; // Only modify opacity of Image B
});

// Handle pinch-to-zoom for mobile devices
let initialDistance = 0;

document.addEventListener('touchstart', (e) => {
  if (e.touches.length === 2) {
    e.preventDefault(); // Prevent default behavior
    const dx = e.touches[0].clientX - e.touches[1].clientX;
    const dy = e.touches[0].clientY - e.touches[1].clientY;
    initialDistance = Math.sqrt(dx ** 2 + dy ** 2);
  }
});

document.addEventListener('touchmove', (e) => {
  if (e.touches.length === 2) {
    e.preventDefault(); // Prevent default scrolling behavior
    const dx = e.touches[0].clientX - e.touches[1].clientX;
    const dy = e.touches[0].clientY - e.touches[1].clientY;
    const currentDistance = Math.sqrt(dx ** 2 + dy ** 2);

    scale *= currentDistance / initialDistance;
    scale = Math.min(Math.max(1, scale), 3); // Limit zoom scale between 1x and 3x
    [imageA, imageB].forEach((image) => {
      image.style.transform = `scale(${scale})`;
    });

    initialDistance = currentDistance;
  }
});

// Handle zoom for desktop using the mouse wheel
document.addEventListener('wheel', (e) => {
  e.preventDefault(); // Prevent default scrolling behavior
  scale += e.deltaY * -0.01;
  scale = Math.min(Math.max(1, scale), 3); // Limit zoom scale between 1x and 3x
  [imageA, imageB].forEach((image) => {
    image.style.transform = `scale(${scale})`;
  });
});