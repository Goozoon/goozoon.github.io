// Select all images
const images = document.querySelectorAll('.image');

// Handle transparency slider
const slider = document.getElementById('transparency');
slider.addEventListener('input', (e) => {
  const value = e.target.value / 100; // Convert to a value between 0 and 1
  images.forEach((image) => {
    image.style.opacity = value; // Only modify opacity
  });
});

images.forEach((image) => {
  let scale = 1; // Initial zoom scale
  let initialDistance = 0;

  // Handle pinch-to-zoom for mobile devices
  image.addEventListener('touchstart', (e) => {
    if (e.touches.length === 2) {
      e.preventDefault(); // Prevent default behavior
      // Calculate the initial distance between two fingers
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      initialDistance = Math.sqrt(dx ** 2 + dy ** 2);
    }
  });

  image.addEventListener('touchmove', (e) => {
    if (e.touches.length === 2) {
      e.preventDefault(); // Prevent default scrolling behavior

      // Calculate the current distance between two fingers
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const currentDistance = Math.sqrt(dx ** 2 + dy ** 2);

      // Adjust the scale based on the change in distance
      scale *= currentDistance / initialDistance;
      scale = Math.min(Math.max(1, scale), 3); // Limit zoom scale between 1x and 3x
      image.style.transform = `scale(${scale})`;

      // Update the initial distance for the next move
      initialDistance = currentDistance;
    }
  });

  // Handle zoom for desktop using the mouse wheel
  image.addEventListener('wheel', (e) => {
    e.preventDefault(); // Prevent default scrolling behavior

    // Adjust the scale based on the wheel delta
    scale += e.deltaY * -0.01;
    scale = Math.min(Math.max(1, scale), 3); // Limit zoom scale between 1x and 3x
    image.style.transform = `scale(${scale})`;
  });
});