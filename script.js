document.addEventListener("DOMContentLoaded", () => {
  // Ensure the images are different by using query parameters like `?random=1`, `?random=2`, etc.
  const images = [
    "https://picsum.photos/200/300?random=1",
    "https://picsum.photos/200/300?random=2",
    "https://picsum.photos/200/300?random=3",
    "https://picsum.photos/200/300?random=4",
    "https://picsum.photos/200/300?random=5"
  ];

  let selectedImages = [];
  let isReset = false;

  const resetButton = document.getElementById("reset");
  const verifyButton = document.getElementById("verify");
  const message = document.getElementById("h");
  const para = document.getElementById("para");
  const imageContainer = document.getElementById("image-container");

  // Randomize the images
  function shuffleImages() {
    const randomImages = [...images];
    const duplicateImage = randomImages[Math.floor(Math.random() * randomImages.length)];
    randomImages.push(duplicateImage); // Add a duplicate
    randomImages.sort(() => Math.random() - 0.5); // Shuffle images

    // Create image elements
    imageContainer.innerHTML = '';
    randomImages.forEach((image, index) => {
      const imgElement = document.createElement("img");
      imgElement.src = image;
      imgElement.classList.add("img");
      imgElement.dataset.id = index; // store index as dataset for identification
      imgElement.addEventListener("click", imageClickHandler);
      imageContainer.appendChild(imgElement);
    });
  }

  // Handle image click
  function imageClickHandler(e) {
    if (selectedImages.length < 2) {
      e.target.classList.add("selected");
      selectedImages.push(e.target);
    }

    if (selectedImages.length === 1) {
      resetButton.style.display = "inline-block";
    } else if (selectedImages.length === 2) {
      verifyButton.style.display = "inline-block";
    }
  }

  // Handle reset button click
  resetButton.addEventListener("click", () => {
    selectedImages.forEach(image => image.classList.remove("selected"));
    selectedImages = [];
    resetButton.style.display = "none";
    verifyButton.style.display = "none";
    para.textContent = "";
    shuffleImages();
  });

  // Handle verify button click
  verifyButton.addEventListener("click", () => {
    const [firstImage, secondImage] = selectedImages;
    if (firstImage.src === secondImage.src) {
      para.textContent = "You are a human. Congratulations!";
    } else {
      para.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
    }
    verifyButton.style.display = "none";
  });

  // Initialize the game
  shuffleImages();
});
