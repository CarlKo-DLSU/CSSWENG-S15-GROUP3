document.addEventListener('DOMContentLoaded', () => {
    // Cover image handling
    const imagePlaceholderForCover = document.getElementById('imagePlaceholder-cover');
    const fileInput = document.getElementById('fileInput-cover');

    imagePlaceholderForCover.addEventListener('click', function() {
        fileInput.click();
    });

    fileInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = function() {
            imagePlaceholderForCover.src = reader.result;
        };

        reader.readAsDataURL(file);
    });

    // Gallery handling
    const addImageButton = document.getElementById('addImage');
    const addImageGallery = document.getElementById('addImageGallery');

    function createImagePreview(src, isExisting = false) {
        const imagePreview = document.createElement('div');
        imagePreview.classList.add('hollow-box');
        imagePreview.innerHTML = `
            <img src="${src}" alt="Image Preview" class="hollowbox-picture">
            <img src="../images/2-events/deleteIcon.png" class="hollowbox-deleteIcon">
        `;
        addImageGallery.appendChild(imagePreview);

        // Add hidden input for new images
        if (!isExisting) {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = 'newGallery[]';
            input.value = src;
            imagePreview.appendChild(input);
        }

        // Add event listener for delete icon
        imagePreview.querySelector('.hollowbox-deleteIcon').addEventListener('click', () => {
            addImageGallery.removeChild(imagePreview);
        });
    }

    // Create previews for existing images
    document.querySelectorAll('.existing-image').forEach(image => {
        createImagePreview(image.src, true);
        image.parentElement.remove(); // Remove the hidden image element
    });

    // Handle new image uploads
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
                    createImagePreview(e.target.result);

                    // Remove the input element after use
                    newImageInput.remove();
                }

                reader.readAsDataURL(file);
            } else {
                newImageInput.remove();
            }
        });
    });
});
