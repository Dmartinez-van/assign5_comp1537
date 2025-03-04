// Array of background images
const backgroundImages = [
  "url('../img/backgroundCliff-1.jpg')",
  "url('../img/backgroundGrass-2.png')",
  "url('../img/backgroundGrass-1.png')",
  "url('../img/backgroundPath-1.png')",
];

let currentIndex = 0;

// Function to change the background image
function changeBackgroundImage() {
  const heroElement = document.getElementById("hero");
  heroElement.style.backgroundImage = backgroundImages[currentIndex];
  currentIndex = (currentIndex + 1) % backgroundImages.length;
}

// Change the background image every 5 seconds
setInterval(changeBackgroundImage, 5000);

// Initial background image
changeBackgroundImage();
