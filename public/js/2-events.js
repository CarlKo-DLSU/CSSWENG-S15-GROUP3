document.addEventListener('DOMContentLoaded', function() {
    const pastEvents = document.querySelectorAll('.pastEvent');

    // Hide all event galleries initially
    pastEvents.forEach(event => {
        const gallery = event.querySelector('.event-gallery');
        gallery.style.display = 'none';
    });

    // Event listener for each past event image click
    pastEvents.forEach(event => {
        const title = event.querySelector('.pastEvent-details').textContent.trim(); 
        const images = Array.from(event.querySelectorAll('.event-gallery img')).map(img => img.src);
        const image = event.querySelector('.pastEvent-image');

        image.addEventListener('click', function() {
            openPastEventPopup(title, images[0], images);
        });
    });

    // Function to open event popup
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

            // Set up arrow event listeners
            setupArrowEventListeners();
        } else {
            console.error("Popup elements not found.");
        }
    }

    // Function to update the event popup image
    function updateEventPopup() {
        if (currentEventImages.length > 0) {
            const eventImage = currentEventImages[currentImageIndex];
            document.getElementById("past-event-image").src = eventImage;
        }
    }

    // Function to set up arrow event listeners
    function setupArrowEventListeners() {
        const leftArrow = document.querySelector('.arrowPopup.left');
        const rightArrow = document.querySelector('.arrowPopup.right');

        leftArrow.addEventListener('click', function() {
            currentImageIndex = (currentImageIndex === 0) ? currentEventImages.length - 1 : currentImageIndex - 1;
            updateEventPopup();
        });

        rightArrow.addEventListener('click', function() {
            currentImageIndex = (currentImageIndex === currentEventImages.length - 1) ? 0 : currentImageIndex + 1;
            updateEventPopup();
        });

        // Close popup when clicking outside of it
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
    }

    // Function to close the event popup
    function closePastEventPopup() {
        var popup = document.getElementById("past-event-popup");
        if (popup) {
            popup.style.display = "none";
        } else {
            console.error("Popup element not found.");
        }
    }
});


document.addEventListener("DOMContentLoaded", function() {
    const pastEvents = document.querySelectorAll('.pastEvent');

    // Function to display filtered events
    function displayFilteredEvents(filteredEvents) {
        const eventList = document.querySelector('.pastEventList');
        eventList.innerHTML = ''; // Clear current event list

        filteredEvents.forEach(event => {
            eventList.appendChild(event);
        });
    }

    // Initial display of all events
    // No need to display events initially, as they are already in the HTML

    const searchInput = document.getElementById("past-search-input");

    // Event listener for search input
    searchInput.addEventListener("input", function() {
        const query = searchInput.value.trim().toLowerCase();
        const filteredEvents = Array.from(pastEvents).filter(event => {
            const details = event.querySelector('.pastEvent-details').textContent.trim().toLowerCase();
            return details.includes(query);
        });
        displayFilteredEvents(filteredEvents);
    });
});
