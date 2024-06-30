// JavaScript to replace placeholder image with uploaded image for imagePlaceholder-cover
const imagePlaceholderForCover = document.getElementById('imagePlaceholder-cover');
const fileInput = document.getElementById('fileInput-cover');

// When the placeholder image is clicked, trigger the file input click event
imagePlaceholderForCover.addEventListener('click', function() {
    fileInput.click();
});

// When a file is selected, update the placeholder image to display the selected image
fileInput.addEventListener('change', function(event) {
    const file = event.target.files[0]; // Get the selected file
    const reader = new FileReader(); // Create a FileReader object

    reader.onload = function() {
        // Set the src attribute of the placeholder image to the selected image URL
        imagePlaceholderForCover.src = reader.result;
    };

    reader.readAsDataURL(file); // Read the selected file as a data URL
});

///////////////////////////// GALLERY JAVASCRIPT
document.addEventListener('DOMContentLoaded', () => {
    // Get the "Add Image" button element
    const addImageButton = document.getElementById('addImage');
    // Get the container where images will be displayed
    const imageContainer = document.getElementById('imageContainer');
    const addImageGallery = document.getElementById('addImageGallery');

    // Add event listener for the "Add Image" button
    addImageButton.addEventListener('click', () => {
        // Create a new input element for file selection
        const newImageInput = document.createElement('input');
        newImageInput.type = 'file'; // Set the input type to 'file'
        newImageInput.name = 'gallery'; // Set the name attribute
        newImageInput.accept = 'image/*'; // Accept only image files
        newImageInput.style.display = 'none';  // Hide the input field

        // Append the hidden file input to the addImageGallery
        addImageGallery.appendChild(newImageInput);

        // Programmatically trigger the file selection dialog
        newImageInput.click();

        // Add an event listener to handle file selection
        newImageInput.addEventListener('change', () => {
            // Check if any file is selected
            if (newImageInput.files.length > 0) {
                const file = newImageInput.files[0]; // Get the selected file
                const reader = new FileReader();

                // Define the load event for the FileReader
                reader.onload = function(e) {
                    // Create a div to hold the image preview and remove button
                    const imagePreview = document.createElement('div');
                    imagePreview.classList.add('hollow-box');
                    // Set the inner HTML to include the image and remove button
                    imagePreview.innerHTML = `
                        <img src="${e.target.result}" alt="Image Preview" class="hollowbox-picture">
                        <img src="../images/2-events/deleteIcon.png" class="hollowbox-deleteIcon">
                    `;

                    // Append the preview div to the end of the addImageGallery
                    addImageGallery.appendChild(imagePreview);

                    // Add an event listener to the remove button to delete the image
                    imagePreview.querySelector('.hollowbox-deleteIcon').addEventListener('click', () => {
                        addImageGallery.removeChild(imagePreview); // Remove the preview
                        addImageGallery.removeChild(newImageInput); // Remove the input field
                    });
                }

                // Read the selected file as a Data URL
                reader.readAsDataURL(file);
            } else {
                // If no file is selected, remove the input field
                addImageGallery.removeChild(newImageInput);
            }
        });
    });
});


//////////////////////// POPUP FUNCTIONS

// // Function to open event popup
// function openPastEventPopup(details, imageSrc, images) {
//     var popup = document.getElementById("past-event-popup");
//     var detailsElement = document.getElementById("past-event-details");
//     var imageElement = document.getElementById("past-event-image");

//     if (popup && detailsElement && imageElement) {
//         detailsElement.textContent = details;
//         imageElement.src = imageSrc;
//         popup.style.display = "flex";

//         // Initialize the image list and index for the current event
//         currentEventImages = images;
//         currentImageIndex = 0;
//         updateEventPopup();

//         // Set up arrow event listeners
//         setupArrowEventListeners();
//     } else {
//         console.error("Popup elements not found.");
//     }
// }

// // Function to update the event popup image
// function updateEventPopup() {
//     if (currentEventImages.length > 0) {
//         const eventImage = `../images/2-events/${currentEventImages[currentImageIndex]}`;
//         document.getElementById("past-event-image").src = eventImage;
//     }
// }

// // Function to set up arrow event listeners
// function setupArrowEventListeners() {
//     const leftArrow = document.querySelector('.arrowPopup.left');
//     const rightArrow = document.querySelector('.arrowPopup.right');

//     leftArrow.addEventListener('click', function() {
//         currentImageIndex = (currentImageIndex === 0) ? currentEventImages.length - 1 : currentImageIndex - 1;
//         updateEventPopup();
//     });

//     rightArrow.addEventListener('click', function() {
//         currentImageIndex = (currentImageIndex === currentEventImages.length - 1) ? 0 : currentImageIndex + 1;
//         updateEventPopup();
//     });

//     // Close popup when clicking outside of it
//     var pastEventPopup = document.getElementById("past-event-popup");

//     if (pastEventPopup) {
//         window.addEventListener("click", function(event) {
//             if (event.target === pastEventPopup) {
//                 closePastEventPopup();
//                 currentImageIndex = 0;
//             }
//         });
//     } else {
//         console.error("Past event popup element not found.");
//     }
// }

// // Function to close the event popup
// function closePastEventPopup() {
//     var popup = document.getElementById("past-event-popup");
//     if (popup) {
//         popup.style.display = "none";
//     } else {
//         console.error("Popup element not found.");
//     }
// }