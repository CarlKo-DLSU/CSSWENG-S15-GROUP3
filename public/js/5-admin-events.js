document.addEventListener("DOMContentLoaded", function() {
    const addPastEventButton = document.getElementById("add-past-event-btn");

    addPastEventButton.addEventListener("click", function() {
        window.location.href = "5-editPastEvents.hbs";
    });
});

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.past-edit-icon').forEach(icon => {
        icon.addEventListener('click', (event) => {
            const eventId = event.target.getAttribute('data-id');
            window.location.href = `5-editPastEvents.hbs?id=${eventId}`;
        });
    });
});