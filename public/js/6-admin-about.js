document.addEventListener("DOMContentLoaded", () => {
    const editMission = document.getElementById('edit-mission');
    editMission.style.visibility = 'hidden';

    document.querySelector("#edit-mission-button").addEventListener("click", function(e) {
        const editMission = document.getElementById('edit-mission');
        if (editMission.style.visibility === 'hidden') {
            editMission.style.visibility = 'visible';
        } else {
            editMission.style.visibility = 'hidden';
        }
    });

    document.querySelector("#serviceEdit").addEventListener("click", function(e) {

    });

    document.querySelector("#serviceMinus").addEventListener("click", function(e) {

    });

    document.querySelector("#servicePlus").addEventListener("click", function(e) {

    });

    document.querySelector("#aboutUs-visitEdit").addEventListener("click", function(e) {

    });
});