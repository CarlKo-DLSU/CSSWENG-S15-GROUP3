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
