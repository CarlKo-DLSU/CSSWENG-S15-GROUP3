// ----------------------------------------SLIDESHOW----------------------------------------

let slideIndex = 0;
showSlides();

function showSlides() {
    const slides = document.getElementsByClassName("slides");
    const dots = document.getElementsByClassName("dot");

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }

    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
    
    setTimeout(showSlides, 3000);
}



// ----------------------------------------HOMEPAGE SEARCH----------------------------------------
document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.getElementById("upcoming-search-input");
    const slides = document.querySelectorAll(".upcoming-slide");

    searchInput.addEventListener("input", function() {
        const query = searchInput.value.toLowerCase();

        slides.forEach(function(slide) {
            const title = slide.getAttribute("data-title").toLowerCase();
            const date = slide.getAttribute("data-date").toLowerCase();
            const location = slide.getAttribute("data-location").toLowerCase();
            const type = slide.getAttribute("data-type").toLowerCase();

            if (title.includes(query) || date.includes(query) || location.includes(query) || type.includes(query)) {
                slide.style.display = "block";
            } else {
                slide.style.display = "none";
            }
        });
    });
});



// -------------------------------------EVENT-POPUP-------------------------------------

// Function to open the popup when a slide is clicked
function openPopup(slideNumber) {
    var popupId = "upcoming-event-popup-" + slideNumber;
    var popup = document.getElementById(popupId);
    if (popup){
        popup.style.display = "flex";
    } else {
        console.error('Popup with ID ' + popupId + ' not found.');
    }
}

// Function to close the popup
function closePopup(slideNumber) {
    var popupId = "upcoming-event-popup-" + slideNumber;
    var popup = document.getElementById(popupId);
    popup.style.display = "none";
}

// event listeners on slides to open the respective popup
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



// ----------------------------------------FILTER----------------------------------------
document.addEventListener('DOMContentLoaded', function() {
    // Get the popup elements
    const filterPopup = document.getElementById('upcoming-filter-popup');
    const filterBtn = document.getElementById('upcoming-filter-icon');
    const closeBtns = document.querySelectorAll('.close-btn');

    // Show filter popup on filter button click
    filterBtn.addEventListener('click', function() {
        filterPopup.style.display = 'block';
    });

    // Hide popups on close button click
    closeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterPopup.style.display = 'none';
        });
    });

    // Hide popups when clicking outside of the popup content
    window.addEventListener('click', function(event) {
        if (event.target === filterPopup) {
            filterPopup.style.display = 'none';
        }
    });

    // Add event listener for form submission
    document.getElementById('upcoming-filter-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const eventType = Array.from(document.querySelectorAll('#event-type-checkboxes input[type="checkbox"]:checked'))
            .map(checkbox => checkbox.value.toLowerCase());
        const location = document.getElementById('location').value.toLowerCase();
        const startDateInput = document.getElementById('start-date').value;
        const endDateInput = document.getElementById('end-date').value;

        let startDate, endDate;

        if (startDateInput) {
            startDate = new Date(startDateInput);
        }

        if (endDateInput) {
            endDate = new Date(endDateInput);
        }

        // Filter the events
        filterEvents(eventType, location, startDate, endDate);

        // Close the filter popup after applying filters
        filterPopup.style.display = 'none';
    });

    function filterEvents(eventTypes, location, startDate, endDate) {
        // Get all the event slides
        const slides = document.querySelectorAll('.upcoming-slide');
    
        slides.forEach(slide => {
            // Get event details from data attributes
            const slideEventTypes = slide.getAttribute('data-type').toLowerCase().split(' ');
            const slideLocation = slide.getAttribute('data-location').toLowerCase();
            const slideDate = new Date(slide.getAttribute('data-date'));

            // Check if the event matches the filter criteria
            const matchesTypes = eventTypes.length === 0 || eventTypes.some(type => slideEventTypes.includes(type));
            const matchesLocation = location === '' || slideLocation.includes(location);
            let matchesDate = true;

            // Check if the slide date is within the selected date range
            if (startDate && endDate) {
                matchesDate = slideDate >= startDate && slideDate <= endDate;
            }
    
            // Show or hide the slide based on filter match
            if (matchesTypes && matchesLocation && matchesDate) {
                slide.style.display = 'block';
            } else {
                slide.style.display = 'none';
            }
        });
    }
});