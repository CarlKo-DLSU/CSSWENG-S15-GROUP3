const navPanel = document.getElementById("nav-panel");
const hamburger = document.getElementById("nav-hamburger");

// toggle navigation panel visibility on hamburger click
hamburger.addEventListener("click", function () {
    navPanel.style.display = navPanel.style.display === "block" ? "none" : "block";
});

// close navigation panel when clicking outside of it
window.addEventListener("click", function(event) {
    if (event.target !== navPanel && event.target !== hamburger) {
        navPanel.style.display = "none";
    }
});
