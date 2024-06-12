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

// JavaScript to replace placeholder image with uploaded image and add new hollow box for imagePlaceholder-gallery
const imagePlaceholderForGallery = document.getElementById('imagePlaceholder-gallery');
const fileInput2 = document.getElementById('fileInput-gallery');
const addImageGallery = document.getElementById('addImageGallery');

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
        });
    };

    reader.readAsDataURL(file); // Read the selected file as a data URL
});