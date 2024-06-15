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



// ------------------------------------ACCOUNT-POPUP------------------------------------
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
});