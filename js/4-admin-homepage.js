document.addEventListener("DOMContentLoaded", function() {
    // Get the close button and popup elements for adding upcoming event
    var closeButton = document.getElementById("close-popup-btn");
    var addEventPopup = document.getElementById("add-upcoming-event-popup");

    // Add click event listener to the close button
    closeButton.addEventListener("click", function() {
        // Hide the add event popup
        addEventPopup.style.display = "none";
    });

    // Get the button element for adding upcoming event
    var addButton = document.getElementById("add-upcoming-event-btn");

    // Add click event listener to the button
    addButton.addEventListener("click", function() {
        // Show the add event popup
        addEventPopup.style.display = "block";
    });

    // Get the form element for adding upcoming event
    var addEventForm = document.getElementById("add-upcoming-event-form");

    // Add submit event listener to the form
    addEventForm.addEventListener("submit", function(event) {
        // Prevent the default form submission behavior
        event.preventDefault();

        // Get the form data
        var formData = new FormData(addEventForm);

        // Create a new upcoming event slide
        var newSlide = document.createElement("div");
        newSlide.classList.add("upcoming-slide");
        
        // Set data attributes for the new slide
        newSlide.setAttribute("data-title", formData.get("event-title"));
        newSlide.setAttribute("data-date", formData.get("event-date"));
        newSlide.setAttribute("data-location", formData.get("event-venue"));
        // Add more data attributes as needed

        // Create and append image elements for the new slide
        var posterImage = document.createElement("img");
        posterImage.src = formData.get("event-cover-photo");
        posterImage.alt = "Event Poster";
        posterImage.classList.add("upcoming-poster");
        newSlide.appendChild(posterImage);

        var editIcon = document.createElement("img");
        editIcon.src = "../images/1-index/pencil.png";
        editIcon.alt = "Edit Icon";
        editIcon.classList.add("upcoming-edit-icon");
        newSlide.appendChild(editIcon);

        // Create and append event preview elements for the new slide
        var eventPreview = document.createElement("div");
        eventPreview.classList.add("event-preview");

        var previewText = document.createElement("div");
        previewText.classList.add("preview-text");

        var previewDate = document.createElement("p");
        previewDate.classList.add("preview-date");
        previewDate.textContent = formData.get("event-date");
        previewText.appendChild(previewDate);

        var previewTitle = document.createElement("p");
        previewTitle.classList.add("preview-title");
        previewTitle.textContent = formData.get("event-title");
        previewText.appendChild(previewTitle);

        // Add more preview elements as needed

        eventPreview.appendChild(previewText);
        newSlide.appendChild(eventPreview);

        // Append the new slide to the upcoming events slider
        var upcomingEventsSlider = document.getElementById("upcoming-events-slider");
        upcomingEventsSlider.appendChild(newSlide);

        // After handling form submission, hide the popup
        addEventPopup.style.display = "none";

        // Clear form inputs if needed
        addEventForm.reset();
    });
});
