document.addEventListener("DOMContentLoaded", function() {
    var closeButton = document.getElementById("close-add-popup-btn");
    var addEventPopup = document.getElementById("add-upcoming-event-popup");

    closeButton.addEventListener("click", function() {
        addEventPopup.style.display = "none";
        resetAddEventForm();
    });

    var addButton = document.getElementById("add-upcoming-event-btn");

    addButton.addEventListener("click", function() {
        addEventPopup.style.display = "block";
        resetAddEventForm();
    });

    var addEventForm = document.getElementById("add-upcoming-event-form");

    document.getElementById('add-upcoming-cover-photo-img').addEventListener('click', function() {
        document.getElementById('add-upcoming-cover-photo').click();
    });

    document.getElementById('add-upcoming-cover-photo').addEventListener('change', function() {
        var file = this.files[0];
        var reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('add-upcoming-cover-photo-img').style.backgroundImage = 'url(' + e.target.result + ')';
        };
        reader.readAsDataURL(file);
    });    

    document.getElementById('edit-upcoming-cover-photo-preview').addEventListener('click', function() {
        document.getElementById('edit-upcoming-cover-photo').click();
    });   

    addEventForm.addEventListener("submit", function(event) {
        event.preventDefault();
        var formData = new FormData(addEventForm);

        var newSlide = document.createElement("div");
        newSlide.classList.add("upcoming-slide");
        newSlide.setAttribute("data-title", formData.get("add-upcoming-title").replace(/\n/g, '<br>'));
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
        previewTitle.innerHTML = formData.get("add-upcoming-title").replace(/\n/g, '<br>');
        previewText.appendChild(previewTitle);

        eventPreview.appendChild(previewText);
        newSlide.appendChild(eventPreview);

        var upcomingEventsSlider = document.getElementById("upcoming-events-slider");
        upcomingEventsSlider.appendChild(newSlide);

        addEventPopup.style.display = "none";
        addEventForm.reset();
        resetAddEventForm();

        var slideNumber = upcomingEventsSlider.children.length;
        createPopup(slideNumber, formData);

        newSlide.addEventListener("click", function() {
            openPopup(slideNumber);
        });

        editIcon.addEventListener("click", function(event) {
            event.stopPropagation();
            openEditPopup(newSlide, slideNumber);
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

    function resetAddEventForm() {
        document.getElementById('add-upcoming-cover-photo-img').style.backgroundImage = 'url(' + '../images/1-index/home-upload.png' + ')';
        document.getElementById('add-upcoming-cover-photo').value = '';
    }

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
        eventTitle.textContent = formData.get("add-upcoming-title").split('\n')[0];
        eventDetails.appendChild(eventTitle);

        var eventDescription = document.createElement("p");
        eventDescription.classList.add("event-description");
        eventDescription.innerHTML = formData.get("add-upcoming-description").replace(/\n/g, '<br>');
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

    function openPopup(slideNumber) {
        var popupId = "upcoming-event-popup-" + slideNumber;
        var popup = document.getElementById(popupId);
        popup.style.display = "flex";
    }

    function closePopup(slideNumber) {
        var popupId = "upcoming-event-popup-" + slideNumber;
        var popup = document.getElementById(popupId);
        popup.style.display = "none";
    }

    function openEditPopup(slide, slideNumber) {
        var editPopup = document.getElementById("edit-upcoming-event-popup");
        editPopup.style.display = "block";

        var editForm = document.getElementById("edit-upcoming-event-form");

        var title = slide.querySelector(".preview-title").innerHTML.replace(/<br\s*\/?>/mg, "\n");
        var date = slide.getAttribute("data-date");
        var location = slide.getAttribute("data-location");
        var popup = document.getElementById("upcoming-event-popup-" + slideNumber);
        var description = popup.querySelector(".event-description").innerHTML.replace(/<br\s*\/?>/mg, "\n");
        var merchLink = popup.querySelector(".merch-presale-btn").getAttribute("onclick").match(/window\.open\(['"](.+?)['"]/);

        editForm["edit-upcoming-title"].value = title.replace(/<br\s*\/?>/gi, "\n");
        editForm["edit-upcoming-description"].value = description;
        editForm["edit-upcoming-date"].value = date;
        editForm["edit-upcoming-venue"].value = location;
        editForm["edit-upcoming-merch-link"].value = merchLink ? merchLink[1] : '';

        var posterImage = slide.querySelector(".upcoming-poster").src;
        var posterPreview = document.getElementById("edit-upcoming-cover-photo-preview");
        posterPreview.src = posterImage;

        var coverPhotoInput = editForm["edit-upcoming-cover-photo"];
        coverPhotoInput.onchange = function() {
            if (coverPhotoInput.files && coverPhotoInput.files[0]) {
                posterPreview.src = URL.createObjectURL(coverPhotoInput.files[0]);
            }
        };

        editForm.onsubmit = function(event) {
            event.preventDefault();

            var formData = new FormData(editForm);
            var firstLineTitle = formData.get("edit-upcoming-title").split('\n')[0]; // Extract first line
            slide.setAttribute("data-title", formData.get("edit-upcoming-title").replace(/\n/g, '<br>'));
            slide.setAttribute("data-date", formData.get("edit-upcoming-date"));
            slide.setAttribute("data-location", formData.get("edit-upcoming-venue"));

            var eventDate = new Date(formData.get("edit-upcoming-date"));
            var options = { year: 'numeric', month: 'long', day: 'numeric' };
            slide.querySelector(".preview-date").textContent = eventDate.toLocaleDateString("en-US", options).toUpperCase();
            slide.querySelector(".preview-title").innerHTML = formData.get("edit-upcoming-title").replace(/\n/g, '<br>'); // Convert line breaks to <br>

            // Check if a new poster image is provided
            var newPosterFile = formData.get("edit-upcoming-cover-photo");
            if (newPosterFile && newPosterFile.size > 0) {
                var newPosterImage = URL.createObjectURL(newPosterFile);
                slide.querySelector(".upcoming-poster").src = newPosterImage;
                popup.querySelector(".upcoming-popup-poster").src = newPosterImage;
            }

            popup.querySelector(".event-title").innerHTML = firstLineTitle
            popup.querySelector(".event-description").innerHTML = formData.get("edit-upcoming-description").replace(/\n/g, '<br>');

            var merchButton = popup.querySelector(".merch-presale-btn");
            merchButton.onclick = function() {
                window.open(formData.get("edit-upcoming-merch-link"));
            };

            editPopup.style.display = "none";
        };

        var editCloseButton = document.getElementById("close-edit-popup-btn");
        editCloseButton.addEventListener("click", function() {
            editPopup.style.display = "none";
        });
    }
    
    var slides = document.querySelectorAll(".upcoming-slide");
    slides.forEach(function(slide, index) {
        slide.addEventListener("click", function() {
            openPopup(index + 1);
        });
    
        var editIcon = slide.querySelector(".upcoming-edit-icon");
        editIcon.addEventListener("click", function(event) {
            event.stopPropagation();
            openEditPopup(slide, index + 1);
        });
    });
    
    window.addEventListener("click", function(event) {
        var popups = document.querySelectorAll(".event-popup");
        popups.forEach(function(popup, index) {
            if (event.target == popup) {
                closePopup(index + 1);
            }
        });
    });
    
    function createEditPopup(slideNumber, formData) {
        var popupId = "upcoming-event-popup-" + slideNumber;
        var popup = document.createElement("div");
        popup.id = popupId;
        popup.classList.add("event-popup");
    
        var popupContent = document.createElement("div");
        popupContent.classList.add("event-popup-content");
    
        var popupDetails = document.createElement("div");
        popupDetails.classList.add("popup-content-details");
    
        var posterImage = document.createElement("img");
        posterImage.src = document.getElementById("edit-upcoming-cover-photo-preview").src;
        posterImage.alt = "Event Poster";
        posterImage.classList.add("upcoming-popup-poster");
        popupDetails.appendChild(posterImage);
    
        var eventDetails = document.createElement("div");
        eventDetails.classList.add("upcoming-event-details");
    
        var eventTitle = document.createElement("p");
        eventTitle.classList.add("event-title", "preserve-whitespace");
        eventTitle.textContent = formData.get("edit-upcoming-title");
        eventDetails.appendChild(eventTitle);
    
        var eventDescription = document.createElement("p");
        eventDescription.classList.add("event-description");
        eventDescription.innerHTML = formData.get("edit-upcoming-description").replace(/\n/g, '<br>');
        eventDetails.appendChild(eventDescription);
    
        var merchButton = document.createElement("button");
        merchButton.classList.add("merch-presale-btn");
        merchButton.textContent = "Merch Presale";
        merchButton.onclick = function() {
            window.open(formData.get("edit-upcoming-merch-link"));
        };
        eventDetails.appendChild(merchButton);
    
        popupDetails.appendChild(eventDetails);
        popupContent.appendChild(popupDetails);
        popup.appendChild(popupContent);
    
        document.body.appendChild(popup);
    }
    
    document.getElementById("edit-upcoming-preview-popup-btn").addEventListener("click", function() {
        var editForm = document.getElementById("edit-upcoming-event-form");
        var formData = new FormData(editForm);
        var slideNumber = document.querySelectorAll(".event-popup").length + 1;
        createEditPopup(slideNumber, formData);

        var popup = document.getElementById("upcoming-event-popup-" + slideNumber);
        popup.style.display = "flex";

        window.addEventListener("click", function(event) {
            if (event.target == popup) {
                popup.style.display = "none";
            }
        });
    });
});