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


const imagePlaceholderForGallery = document.getElementById('imagePlaceholder-gallery');
const fileInput2 = document.getElementById('fileInput-gallery');
const addImageGallery = document.getElementById('addImageGallery');

// Array to store references to all added images
const imageArray = [];

imagePlaceholderForGallery.addEventListener('click', function() {
    fileInput2.click();
});

fileInput2.addEventListener('change', function(event) {
    const file = event.target.files[0]; // Get the selected file
    const reader = new FileReader(); // Create a FileReader object

    reader.onload = function() {
        // Create a new hollow box for the uploaded image
        const newHollowBox = document.createElement('div');
        newHollowBox.classList.add('hollow-box');

        // Create a new image element and set its source to the uploaded image
        const newImage = document.createElement('img');
        newImage.src = reader.result;
        newImage.alt = 'Uploaded Image';
        newImage.classList.add('hollowbox-picture');
        

        // Create a new image element for the delete button
        const deleteButton = document.createElement('img');
        deleteButton.src = '../images/2-events/deleteIcon.png'; // Change 'deleteIcon.png' to the correct path
        deleteButton.classList.add('hollowbox-deleteIcon');

        // Append the image and the delete button to the hollow box
        newHollowBox.appendChild(newImage);
        newHollowBox.appendChild(deleteButton);

        // Append the new hollow box to the gallery
        addImageGallery.appendChild(newHollowBox);

        // Add event listener to the delete button
        deleteButton.addEventListener('click', function() {
            // Traverse up the DOM to find the parent hollow box and remove it
            newHollowBox.parentNode.removeChild(newHollowBox);

            // Remove the reference to the deleted image from the array
            const index = imageArray.indexOf(newHollowBox);
            if (index !== -1) {
                imageArray.splice(index, 1);
            }
        });

        // Add the new hollow box to the imageArray
        imageArray.push(newHollowBox);
    };

    reader.readAsDataURL(file); // Read the selected file as a data URL
});


document.addEventListener("DOMContentLoaded", function() {

    let currentImageIndex = 0;
    let currentEventImages = [];

    const pastEventImage = document.getElementById('past-event-image');
    const leftArrow = document.querySelector('.arrowPopup.left');
    const rightArrow = document.querySelector('.arrowPopup.right');

    function openPastEventPopup(details, imageSrc, images) {
        var popup = document.getElementById("past-event-popup");
        var detailsElement = "here is a title for now"//get the title from the input text box
        var imageElement = document.getElementById("past-event-image");

        if (popup && detailsElement && imageElement) {
            detailsElement.textContent = details;
            imageElement.src = imageSrc;
            popup.style.display = "flex";

            // Initialize the image list and index for the current event
            currentEventImages = images;
            currentImageIndex = 0;
            updateEventPopup();
        } else {
            console.error("Popup elements not found.");
        }
    }

    function closePastEventPopup() {
        var popup = document.getElementById("past-event-popup");
        if (popup) {
            popup.style.display = "none";
        } else {
            console.error("Popup element not found.");
        }
    }

    function updateEventPopup() {
        if (currentEventImages.length > 0) {
            const eventImage = imageArray[currentImageIndex];
            pastEventImage.src = eventImage;
        }
    }

    // Event listener for left arrow
    leftArrow.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex === 0) ? currentEventImages.length - 1 : currentImageIndex - 1;
        updateEventPopup();
    });

    // Event listener for right arrow
    rightArrow.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex === currentEventImages.length - 1) ? 0 : currentImageIndex + 1;
        updateEventPopup();
    });

    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('hollowbox-picture')) {
            console.log("hello");
            var details = pastEvent.querySelector(".pastEvent-details").textContent;
            var imageSrc = `../images/2-events/${events[index].images[0]}`;
            if (details && imageSrc) {
                openPastEventPopup(details, imageSrc, events[index].images);
            } else {
                console.error("Details or image source not found.");
            }
        }
    });

    var pastEventPopup = document.getElementById("past-event-popup");

    if (pastEventPopup) {
        window.addEventListener("click", function(event) {
            if (event.target === pastEventPopup) {
                closePastEventPopup();
                currentImageIndex = 0;
            }
        });
    } else {
        console.error("Past event popup element not found.");
    }
});