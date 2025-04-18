// Global variables
let scale = 1; // Default zoom scale
let offsetX = 0; // Pan offset X
let offsetY = 0; // Pan offset Y
let isPanning = false;
let startX = 0;
let startY = 0;

// Select images
const imageA = document.getElementById('imageA');
const imageB = document.getElementById('imageB');

// Select sliders
const transparencySlider = document.getElementById('transparency');
const zoomSlider = document.getElementById('zoom');

// Handle transparency slider
transparencySlider.addEventListener('input', (e) => {
  const value = e.target.value / 100; // Convert to a value between 0 and 1
  imageB.style.opacity = value; // Only modify opacity of Image B
});

// Handle zoom slider
zoomSlider.addEventListener('input', (e) => {
  scale = parseFloat(e.target.value); // Get zoom scale from slider
  updateTransform();
});

// Update transform for both images
function updateTransform() {
  const transform = `scale(${scale}) translate(${offsetX}px, ${offsetY}px)`;
  [imageA, imageB].forEach((image) => {
    image.style.transform = transform;
  });
}

// Handle panning
const container = document.querySelector('.container');

container.addEventListener('mousedown', (e) => {
  isPanning = true;
  startX = e.clientX;
  startY = e.clientY;
  container.style.cursor = 'grabbing';
});

container.addEventListener('mousemove', (e) => {
  if (!isPanning) return;
  const dx = e.clientX - startX;
  const dy = e.clientY - startY;
  offsetX += dx / scale; // Adjust for zoom scale
  offsetY += dy / scale; // Adjust for zoom scale
  startX = e.clientX;
  startY = e.clientY;
  updateTransform();
});

container.addEventListener('mouseup', () => {
  isPanning = false;
  container.style.cursor = 'grab';
});

container.addEventListener('mouseleave', () => {
  isPanning = false;
  container.style.cursor = 'grab';
});

// Handle pinch-to-zoom for mobile devices
let initialDistance = 0;

container.addEventListener('touchstart', (e) => {
  if (e.touches.length === 2) {
    e.preventDefault(); // Prevent default behavior
    const dx = e.touches[0].clientX - e.touches[1].clientX;
    const dy = e.touches[0].clientY - e.touches[1].clientY;
    initialDistance = Math.sqrt(dx ** 2 + dy ** 2);
  }
});

container.addEventListener('touchmove', (e) => {
  if (e.touches.length === 2) {
    e.preventDefault(); // Prevent default scrolling behavior
    const dx = e.touches[0].clientX - e.touches[1].clientX;
    const dy = e.touches[0].clientY - e.touches[1].clientY;
    const currentDistance = Math.sqrt(dx ** 2 + dy ** 2);

    scale *= currentDistance / initialDistance;
    scale = Math.min(Math.max(1, scale), 3); // Limit zoom scale between 1x and 3x
    zoomSlider.value = scale; // Sync zoom slider with pinch-to-zoom
    updateTransform();

    initialDistance = currentDistance;
  }
});