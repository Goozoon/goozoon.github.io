// Select all images
const images = document.querySelectorAll('.image');

images.forEach((image) => {
  let scale = 1; // Initial zoom scale
  let startX = 0;
  let startY = 0;

  // Handle pinch-to-zoom for mobile devices
  image.addEventListener('touchstart', (e) => {
    if (e.touches.length === 2) {
      // Calculate the initial distance between two fingers
      startX = e.touches[0].clientX - e.touches[1].clientX;
      startY = e.touches[0].clientY - e.touches[1].clientY;
    }
  });

  image.addEventListener('touchmove', (e) => {
    if (e.touches.length === 2) {
      e.preventDefault(); // Prevent default scrolling behavior

      // Calculate the current distance between two fingers
      const currentX = e.touches[0].clientX - e.touches[1].clientX;
      const currentY = e.touches[0].clientY - e.touches[1].clientY;
      const distance = Math.sqrt(currentX ** 2 + currentY ** 2);
      const startDistance = Math.sqrt(startX ** 2 + startY ** 2);

      // Adjust the scale based on the change in distance
      scale *= distance / startDistance;
      scale = Math.min(Math.max(1, scale), 3); // Limit zoom scale between 1x and 3x
      image.style.transform = `scale(${scale})`;

      // Update the starting points for the next move
      startX = currentX;
      startY = currentY;
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