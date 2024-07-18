document.addEventListener('DOMContentLoaded', () => {
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
            input.value = src; // Ensure src is correctly passed here
            imagePreview.appendChild(input);
        } else {
            // For existing images, keep hidden input if not deleted
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = 'existingGallery[]';
            input.value = src;
            imagePreview.appendChild(input);
        }

        // Add event listener for delete icon
        imagePreview.querySelector('.hollowbox-deleteIcon').addEventListener('click', () => {
            imagePreview.remove();
            if (isExisting) {
                const hiddenInput = document.createElement('input');
                hiddenInput.type = 'hidden';
                hiddenInput.name = 'deletedGallery[]';
                hiddenInput.value = src;
                addImageGallery.appendChild(hiddenInput);
            }
        });
    }

    // Create previews for existing images
    document.querySelectorAll('.existing-image').forEach(image => {
        createImagePreview(image.src, true);
        image.parentElement.remove(); // Remove the hidden image element
    });

    // Handle new image uploads
    addImageButton.addEventListener('click', () => {
        console.log("It got a new image 1");
        const newImageInput = document.createElement('input');
        newImageInput.type = 'file';
        newImageInput.name = 'gallery';
        newImageInput.accept = 'image/*';
        newImageInput.style.display = 'none';

        addImageGallery.appendChild(newImageInput);
        newImageInput.click();

        newImageInput.addEventListener('change', () => {
            if (newImageInput.files.length > 0) {
                console.log("It got a new image 2");
                const file = newImageInput.files[0];
                const reader = new FileReader();

                reader.onload = function(e) {
                    createImagePreview(e.target.result); // Pass e.target.result as src

                };

                reader.readAsDataURL(file);
            } else {
                newImageInput.remove();
            }
        });
    });
});
