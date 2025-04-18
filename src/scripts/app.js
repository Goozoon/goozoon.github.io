const imageB = document.getElementById('imageB');
const transparencySlider = document.getElementById('transparency');
const sliderContainer = document.querySelector('.slider-container');

// Update the transparency of image B
transparencySlider.addEventListener('input', (event) => {
  const value = event.target.value;
  imageB.style.opacity = value / 100;
});

// Prevent panning when interacting with the slider
sliderContainer.addEventListener('mousedown', (event) => {
  event.stopPropagation();
});

// Add zoom and pan functionality
const container = document.querySelector('.container');
let scale = 1;
let originX = 0;
let originY = 0;

container.addEventListener('wheel', (event) => {
  event.preventDefault();
  const delta = event.deltaY > 0 ? -0.1 : 0.1;
  scale = Math.min(Math.max(0.5, scale + delta), 3);
  container.style.transform = `scale(${scale})`;
});

let isPanning = false;
let startX, startY;

container.addEventListener('mousedown', (event) => {
  isPanning = true;
  startX = event.clientX - originX;
  startY = event.clientY - originY;
});

container.addEventListener('mousemove', (event) => {
  if (!isPanning) return;
  originX = event.clientX - startX;
  originY = event.clientY - startY;
  container.style.transform = `translate(${originX}px, ${originY}px) scale(${scale})`;
});

container.addEventListener('mouseup', () => {
  isPanning = false;
});

container.addEventListener('mouseleave', () => {
  isPanning = false;
});