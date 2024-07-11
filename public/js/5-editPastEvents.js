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
    const addImageButton = document.getElementById('addImage');
    const addImageGallery = document.getElementById('addImageGallery');

    addImageButton.addEventListener('click', () => {
        const newImageInput = document.createElement('input');
        newImageInput.type = 'file';
        newImageInput.name = 'gallery';
        newImageInput.accept = 'image/*';
        newImageInput.style.display = 'none';

        addImageGallery.appendChild(newImageInput);
        newImageInput.click();

        newImageInput.addEventListener('change', () => {
            if (newImageInput.files.length > 0) {
                const file = newImageInput.files[0];
                const reader = new FileReader();

                reader.onload = function(e) {
                    const imagePreview = document.createElement('div');
                    imagePreview.classList.add('hollow-box');
                    imagePreview.innerHTML = `
                        <img src="${e.target.result}" alt="Image Preview" class="hollowbox-picture">
                        <img src="../images/2-events/deleteIcon.png" class="hollowbox-deleteIcon">
                    `;

                    addImageGallery.appendChild(imagePreview);

                    imagePreview.querySelector('.hollowbox-deleteIcon').addEventListener('click', () => {
                        addImageGallery.removeChild(imagePreview);
                        addImageGallery.removeChild(newImageInput);
                    });
                }

                reader.readAsDataURL(file);
            } else {
                addImageGallery.removeChild(newImageInput);
            }
        });
    });
});

