const Event = function(title, cover, images) {
    this.title = title;
    this.cover = cover;
    this.images = images;
}

let events = [];

let imagesList1 = ["bocchi1.jpg", "bocchi2.jpg", "bocchi3.jpg", "bocchi4.jpg", "bocchi5.jpg"];
let imagesList2 = ["kita1.jpg", "kita2.jpg", "kita3.jpg", "kita4.jpg", "kita5.jpg"];
let imagesList3 = ["nijika1.jpg", "nijika2.jpg", "nijika3.jpg", "nijika4.jpg", "nijika5.jpg"];
let imagesList4 = ["ryo1.jpg", "ryo2.jpg", "ryo3.jpg", "ryo4.jpg", "ryo5.jpg"];

// Create events and push them into the events array
events.push(new Event("Hitori Gotoh - Lead Guitarist", "bocchi-event.jpg", imagesList1));
events.push(new Event("Ikuyo Kita - Vocalist/Guitarist", "kita-event.jpg", imagesList2));
events.push(new Event("Nijika Ijichi - Drummer", "nijika-event.jpg", imagesList3));
events.push(new Event("Ryo Yamada - Bassist", "ryo-event.webp", imagesList4));


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

    addExistingEvents();
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
});