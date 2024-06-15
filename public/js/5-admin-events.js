document.addEventListener("DOMContentLoaded", function() {
    const addPastEventButton = document.getElementById("add-past-event-btn");

    addPastEventButton.addEventListener("click", function() {
        window.location.href = "5-editPastEvents.hbs";
    });
});
