// ----------------------------------------NAV----------------------------------------
const navPanel = document.getElementById("nav-panel");
const hamburger = document.getElementById("nav-hamburger");

// toggle navigation panel visibility on hamburger click
hamburger.addEventListener("click", function () {
    if (navPanel.style.display === "block") {
        navPanel.classList.add("closing");
        setTimeout(() => {
            navPanel.style.display = "none";
            navPanel.classList.remove("closing");
        }, 300); 
    } else {
        navPanel.style.display = "block";
    }    
});

// close navigation panel when clicking outside of it
window.addEventListener("click", function(event) {
    if (event.target !== navPanel && event.target !== hamburger) {
        navPanel.classList.add("closing");
        setTimeout(() => {
            navPanel.style.display = "none";
            navPanel.classList.remove("closing");
        }, 300); 
    }
});



// ----------------------------------------POPUP----------------------------------------

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

document.addEventListener("DOMContentLoaded", function() {
    // Sign In Popup
    const signInLink = document.getElementById("sign-in-link");
    const signInPopup = document.getElementById("sign-in-popup");
    const navPanel = document.getElementById("nav-panel");

    signInLink.addEventListener("click", function(event) {
        event.preventDefault();
        signInPopup.style.display = "flex";
        navPanel.classList.add("closing"); 
        setTimeout(() => {
            navPanel.style.display = "none";
            navPanel.classList.remove("closing");
        }, 300);
    });

    signInPopup.querySelector(".close-btn").addEventListener("click", function() {
        signInPopup.style.display = "none";
    });

    window.addEventListener("click", function(event) {
        if (event.target == signInPopup) {
            signInPopup.style.display = "none";
        }
    });

    // Register Popup
    const registerBtn = document.getElementById("to-register-btn");
    const registerPopup = document.getElementById("register-popup");

    registerBtn.addEventListener("click", function(event) {
        event.preventDefault();
        registerPopup.style.display = "flex";
    });

    registerPopup.querySelector(".close-btn").addEventListener("click", function() {
        registerPopup.style.display = "none";
    });

    window.addEventListener("click", function(event) {
        if (event.target == registerPopup) {
            registerPopup.style.display = "none";
        }
    });

    // Back to Sign In from Register
    const toSignInBtn = document.getElementById("to-sign-in-btn");

    toSignInBtn.addEventListener("click", function(event) {
        event.preventDefault();
        signInPopup.style.display = "flex";
        registerPopup.style.display = "none";
    });

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
});



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