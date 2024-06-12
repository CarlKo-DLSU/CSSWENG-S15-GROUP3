// Event constructor function
const Event = function(title, cover, images) {
    this.title = title;
    this.cover = cover;
    this.images = images;
}

// Sample events array
let events = [
    new Event("Hitori Gotoh - Lead Guitarist", "bocchi-event.jpg", ["bocchi1.jpg", "bocchi2.jpg", "bocchi3.jpg", "bocchi4.jpg", "bocchi5.jpg"]),
    new Event("Ikuyo Kita - Vocalist/Guitarist", "kita-event.jpg", ["kita1.jpg", "kita2.jpg", "kita3.jpg", "kita4.jpg", "kita5.jpg"]),
    new Event("Nijika Ijichi - Drummer", "nijika-event.jpg", ["nijika1.jpg", "nijika2.jpg", "nijika3.jpg", "nijika4.jpg", "nijika5.jpg"]),
    new Event("Ryo Yamada - Bassist", "ryo-event.webp", ["ryo1.jpg", "ryo2.jpg", "ryo3.jpg", "ryo4.jpg", "ryo5.jpg"])
];

// Function to display events
function displayEvents(events) {
    const eventList = document.querySelector(".pastEventList");
    eventList.innerHTML = ""; // Clear current events

    events.forEach((event, index) => {
        let newEvent = document.createElement("div");
        newEvent.classList.add("pastEvent");

        newEvent.innerHTML = `
            <img class="pastEvent-image" src="../images/2-events/${event.cover}" alt="${event.title}">
            <div class="pastEvent-detailBox">
                <span class="pastEvent-details">${event.title}</span>
            </div>
        `;
        eventList.appendChild(newEvent);

        // Add event listener to open popup
        newEvent.addEventListener("click", function() {
            openPastEventPopup(event.title, `../images/2-events/${event.images[0]}`, event.images);
        });
    });
}

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
        const eventImage = `../images/2-events/${currentEventImages[currentImageIndex]}`;
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

// Initial display of all events
document.addEventListener("DOMContentLoaded", function() {
    displayEvents(events);

    const searchInput = document.getElementById("past-search-input");

    // Event listener for search input
    searchInput.addEventListener("input", function() {
        const query = searchInput.value.toLowerCase();
        const filteredEvents = events.filter(event => event.title.toLowerCase().includes(query));
        displayEvents(filteredEvents);
    });
});
