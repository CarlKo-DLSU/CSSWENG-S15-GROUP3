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

    // Event listener for pastEvent clicks
    document.querySelectorAll(".pastEvent").forEach(function(pastEvent) {
        pastEvent.addEventListener("click", function() {
            var details = pastEvent.querySelector(".pastEvent-details").textContent;
            var imageSrc = pastEvent.querySelector(".pastEvent-image").src;
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
            }
        });
    } else {
        console.error("Past event popup element not found.");
    }
});
