document.addEventListener("DOMContentLoaded", function() {
    var closeButton = document.getElementById("close-popup-btn");
    var addEventPopup = document.getElementById("add-upcoming-event-popup");

    closeButton.addEventListener("click", function() {
        addEventPopup.style.display = "none";
    });

    var addButton = document.getElementById("add-upcoming-event-btn");

    addButton.addEventListener("click", function() {
        addEventPopup.style.display = "block";
    });

    var addEventForm = document.getElementById("add-upcoming-event-form");

    addEventForm.addEventListener("submit", function(event) {
        event.preventDefault();
        var formData = new FormData(addEventForm);

        var newSlide = document.createElement("div");
        newSlide.classList.add("upcoming-slide");
        newSlide.setAttribute("data-title", formData.get("add-upcoming-title"));
        newSlide.setAttribute("data-date", formData.get("add-upcoming-date"));
        newSlide.setAttribute("data-location", formData.get("add-upcoming-venue"));

        var posterImage = document.createElement("img");
        posterImage.src = URL.createObjectURL(formData.get("add-upcoming-cover-photo"));
        posterImage.alt = "Event Poster";
        posterImage.classList.add("upcoming-poster");
        newSlide.appendChild(posterImage);

        var editIcon = document.createElement("img");
        editIcon.src = "../images/1-index/pencil.png";
        editIcon.alt = "Edit Icon";
        editIcon.classList.add("upcoming-edit-icon");
        newSlide.appendChild(editIcon);

        var eventPreview = document.createElement("div");
        eventPreview.classList.add("event-preview");

        var previewText = document.createElement("div");
        previewText.classList.add("preview-text");

        var eventDate = new Date(formData.get("add-upcoming-date"));
        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        var previewDate = document.createElement("p");
        previewDate.classList.add("preview-date");
        previewDate.textContent = eventDate.toLocaleDateString("en-US", options).toUpperCase();
        previewText.appendChild(previewDate);

        var previewTitle = document.createElement("p");
        previewTitle.classList.add("preview-title");
        previewTitle.textContent = formData.get("add-upcoming-title");
        previewText.appendChild(previewTitle);

        eventPreview.appendChild(previewText);
        newSlide.appendChild(eventPreview);

        var upcomingEventsSlider = document.getElementById("upcoming-events-slider");
        upcomingEventsSlider.appendChild(newSlide);

        addEventPopup.style.display = "none";
        addEventForm.reset();

        // Create a unique popup for the new slide
        var slideNumber = upcomingEventsSlider.children.length;
        createPopup(slideNumber, formData);

        // Attach event listener to the new slide for opening the popup
        newSlide.addEventListener("click", function() {
            openPopup(slideNumber); // Use the slide number
        });
    });

    document.getElementById("add-upcoming-preview-popup-btn").addEventListener("click", function() {
        var formData = new FormData(addEventForm);
        var slideNumber = document.querySelectorAll(".event-popup").length + 1;
        createPopup(slideNumber, formData);

        var popup = document.getElementById("upcoming-event-popup-" + slideNumber);
        popup.style.display = "flex";

        window.addEventListener("click", function(event) {
            if (event.target == popup) {
                popup.style.display = "none";
            }
        });
    });

    function createPopup(slideNumber, formData) {
        var popupId = "upcoming-event-popup-" + slideNumber;
        var popup = document.createElement("div");
        popup.id = popupId;
        popup.classList.add("event-popup");

        var popupContent = document.createElement("div");
        popupContent.classList.add("event-popup-content");

        var popupDetails = document.createElement("div");
        popupDetails.classList.add("popup-content-details");

        var posterImage = document.createElement("img");
        posterImage.src = URL.createObjectURL(formData.get("add-upcoming-cover-photo"));
        posterImage.alt = "Event Poster";
        posterImage.classList.add("upcoming-popup-poster");
        popupDetails.appendChild(posterImage);

        var eventDetails = document.createElement("div");
        eventDetails.classList.add("upcoming-event-details");

        var eventTitle = document.createElement("p");
        eventTitle.classList.add("event-title");
        eventTitle.textContent = formData.get("add-upcoming-title");
        eventDetails.appendChild(eventTitle);

        var eventDescription = document.createElement("p");
        eventDescription.classList.add("event-description");
        eventDescription.textContent = formData.get("add-upcoming-description");
        eventDetails.appendChild(eventDescription);

        var merchButton = document.createElement("button");
        merchButton.classList.add("merch-presale-btn");
        merchButton.textContent = "Merch Presale";
        merchButton.onclick = function() {
            window.open(formData.get("add-upcoming-merch-link"));
        };
        eventDetails.appendChild(merchButton);

        popupDetails.appendChild(eventDetails);
        popupContent.appendChild(popupDetails);
        popup.appendChild(popupContent);

        document.body.appendChild(popup);
    }

    // Function to open the popup when a slide is clicked
    function openPopup(slideNumber) {
        var popupId = "upcoming-event-popup-" + slideNumber;
        var popup = document.getElementById(popupId);
        popup.style.display = "flex";
    }

    // Function to close the popup
    function closePopup(slideNumber) {
        var popupId = "upcoming-event-popup-" + slideNumber;
        var popup = document.getElementById(popupId);
        popup.style.display = "none";
    }

    // event listeners on existing slides to open the respective popup
    var slides = document.querySelectorAll(".upcoming-slide");
    slides.forEach(function(slide, index) {
        slide.addEventListener("click", function() {
            openPopup(index + 1); // Slide numbers start from 1
        });
    });

    // Close popups when clicking outside the content
    window.addEventListener("click", function(event) {
        var popups = document.querySelectorAll(".event-popup");
        popups.forEach(function(popup, index) {
            if (event.target == popup) {
                closePopup(index + 1); // Slide numbers start from 1
            }
        });
    });
});
