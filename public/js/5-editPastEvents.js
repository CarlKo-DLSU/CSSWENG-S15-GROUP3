// JavaScript to replace placeholder image with uploaded image for imagePlaceholder-cover
const imagePlaceholderForCover = document.getElementById('imagePlaceholder-cover');
const fileInput = document.getElementById('fileInput-cover');

imagePlaceholderForCover.addEventListener('click', function() {
    fileInput.click();
});

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

const imagePlaceholderForGallery = document.getElementById('imagePlaceholder-gallery');
const fileInput2 = document.getElementById('fileInput-gallery');
const addImageGallery = document.getElementById('addImageGallery');
let imageArray = []; // Array to store file paths

imagePlaceholderForGallery.addEventListener('click', function() {
    fileInput2.click();
});

fileInput2.addEventListener('change', function(event) {
    const files = event.target.files; // Get all selected files

    // Loop through each selected file
    for (let i = 0; i < files.length; i++) {
        const file = files[i];

        // Construct a unique filename or identifier for each file
        const filename = Date.now() + '-' + file.name; // Example: 1719346610310.png
        const filePath = '/uploads/' + filename; // Example: /uploads/1719346610310.png

        // Push the filePath to the imageArray
        imageArray.push(filePath);

        // Create elements to display the uploaded image
        const newHollowBox = document.createElement('div');
        newHollowBox.classList.add('hollow-box');

        const newImage = document.createElement('img');
        newImage.src = filePath; // Use filePath directly
        newImage.alt = 'Uploaded Image';
        newImage.classList.add('hollowbox-picture');

        const deleteButton = document.createElement('img');
        deleteButton.src = '../images/2-events/deleteIcon.png'; // Adjust path as necessary
        deleteButton.classList.add('hollowbox-deleteIcon');
        deleteButton.addEventListener('click', function() {
            newHollowBox.remove();
            // Find the index of the deleted filePath and remove it from imageArray
            const index = imageArray.indexOf(filePath);
            if (index !== -1) {
                imageArray.splice(index, 1);
            }
        });

        newHollowBox.appendChild(newImage);
        newHollowBox.appendChild(deleteButton);
        addImageGallery.appendChild(newHollowBox);

        console.log(imageArray); // Check imageArray contents after each upload
    }
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