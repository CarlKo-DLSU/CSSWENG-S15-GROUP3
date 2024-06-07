document.addEventListener("DOMContentLoaded", function() {
    // Utility function to open the popup
    function openPastEventPopup(details, imageSrc) {
        var popup = document.getElementById("past-event-popup");
        var detailsElement = document.getElementById("past-event-details");
        var imageElement = document.getElementById("past-event-image");

        if (popup && detailsElement && imageElement) {
            detailsElement.textContent = details;
            imageElement.src = imageSrc;
            popup.style.display = "flex";
        } else {
            console.error("Popup elements not found.");
        }
    }

    // Utility function to close the popup
    function closePastEventPopup() {
        var popup = document.getElementById("past-event-popup");
        if (popup) {
            popup.style.display = "none";
        } else {
            console.error("Popup element not found.");
        }
    }

    var imageAlt;
    // Event listener for pastEvent clicks
    document.querySelectorAll(".pastEvent").forEach(function(pastEvent) {
        pastEvent.addEventListener("click", function() {
            var details = pastEvent.querySelector(".pastEvent-details").textContent;
            imageAlt = pastEvent.querySelector(".pastEvent-image").alt;
            var imageSrc = `../images/2-events/${imageAlt}1.jpg`;
            if (details && imageSrc) {
                openPastEventPopup(details, imageSrc);
            } else {
                console.error("Details or image source not found.");
            }
        });
    });

    // Close popup when clicking outside the content
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

    
    let currentImageIndex = 0;
    var imgCount = 5;

    const pastEventImage = document.getElementById('past-event-image');
    const leftArrow = document.querySelector('.arrowPopup.left');
    const rightArrow = document.querySelector('.arrowPopup.right');


    function updateEventPopup() {
        const eventImage = `../images/2-events/${imageAlt}${currentImageIndex+1}.jpg`;

        pastEventImage.src = eventImage;
    }

    leftArrow.addEventListener('click', function () {
        currentImageIndex = (currentImageIndex === 0) ? imgCount - 1 : currentImageIndex - 1;
        updateEventPopup();
    });

    rightArrow.addEventListener('click', function () {
        currentImageIndex = (currentImageIndex === imgCount - 1) ? 0 : currentImageIndex + 1;
        updateEventPopup();
    });

    // Initialize the popup with the first event
    updateEventPopup();
});
