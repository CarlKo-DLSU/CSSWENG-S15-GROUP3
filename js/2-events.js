const Event = function(title, cover, images) {
    this.title = title;
    this.cover = cover;
    this.images = images;
}

let events = [];
let imagesList = [];
let editEventImages = [];

let imagesList1 = ["bocchi1.jpg", "bocchi2.jpg", "bocchi3.jpg", "bocchi4.jpg", "bocchi5.jpg"];
imagesList.push(imagesList1);
let imagesList2 = ["kita1.jpg", "kita2.jpg", "kita3.jpg", "kita4.jpg", "kita5.jpg"];
imagesList.push(imagesList2);
let imagesList3 = ["nijika1.jpg", "nijika2.jpg", "nijika3.jpg", "nijika4.jpg", "nijika5.jpg"];
imagesList.push(imagesList3);
let imagesList4 = ["ryo1.jpg", "ryo2.jpg", "ryo3.jpg", "ryo4.jpg", "ryo5.jpg"];
imagesList.push(imagesList4);

// Create events and push them into the events array
events.push(new Event("Hitori Gotoh - Lead Guitarist", "bocchi-event.jpg", imagesList[0]));
events.push(new Event("Ikuyo Kita - Vocalist/Guitarist", "kita-event.jpg", imagesList[1]));
events.push(new Event("Nijika Ijichi - Drummer", "nijika-event.jpg", imagesList[2]));
events.push(new Event("Ryo Yamada - Bassist", "ryo-event.webp", imagesList[3]));


function addExistingEvents() {
    let eventList = document.querySelector(".pastEventList");

    for (let i = 0; i < events.length; i++) {
        let newEvent = document.createElement("div");
        newEvent.classList.add("pastEvent");

        newEvent.innerHTML = `
            <img class="pastEvent-image" src="../images/2-events/${events[i].cover}" alt="${events[i].title}">
            <div class="pastEvent-detailBox">
                <span class="pastEvent-details">${events[i].title}</span>
            </div>
        `;
        eventList.appendChild(newEvent);
    }
}

document.addEventListener("DOMContentLoaded", function() {

    if (document.querySelector(".pastEventList")) {
        addExistingEvents();
    }

    let currentImageIndex = 0;
    let currentEventImages = [];

    const pastEventImage = document.getElementById('past-event-image');
    const leftArrow = document.querySelector('.arrowPopup.left');
    const rightArrow = document.querySelector('.arrowPopup.right');

    function openPastEventPopup(details, imageSrc, images) {
        var popup = document.getElementById("past-event-popup");
        var detailsElement = document.getElementById("past-event-details");
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
            const eventImage = `../images/2-events/${currentEventImages[currentImageIndex]}`;
            pastEventImage.src = eventImage;
        }
    }

    document.querySelectorAll(".pastEvent").forEach(function(pastEvent, index) {
        pastEvent.addEventListener("click", function() {
            var details = pastEvent.querySelector(".pastEvent-details").textContent;
            var imageSrc = `../images/2-events/${events[index].images[0]}`;
            if (details && imageSrc) {
                openPastEventPopup(details, imageSrc, events[index].images);
            } else {
                console.error("Details or image source not found.");
            }
        });
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

    leftArrow.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex === 0) ? currentEventImages.length - 1 : currentImageIndex - 1;
        updateEventPopup();
    });

    rightArrow.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex === currentEventImages.length - 1) ? 0 : currentImageIndex + 1;
        updateEventPopup();
    });
});



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


// edit past events script

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
