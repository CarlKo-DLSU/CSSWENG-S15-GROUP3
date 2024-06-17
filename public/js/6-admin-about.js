document.addEventListener("DOMContentLoaded", () => {

    const editMission = document.getElementById('edit-mission');
    editMission.style.visibility = 'hidden';
    const editService = document.getElementById('edit-service');
    editService.style.visibility = 'hidden';
    const servicePictureEdit = document.getElementById('servicePictureEdit');
    servicePictureEdit.style.visibility = 'hidden';
    const editVisit = document.getElementById('edit-visit');
    editVisit.style.visibility = 'hidden';
    const editVisitPicture = document.getElementById('edit-visitPicture');
    editVisitPicture.style.visibility = 'hidden';

    document.querySelector("#edit-mission-button").addEventListener("click", function(e) {
        const editMission = document.getElementById('edit-mission');
        if (editMission.style.visibility === 'hidden') {
            editMission.style.visibility = 'visible';
        }
    });

    document.querySelector(".edit-mission-discard").addEventListener("click", function(e) {
        const editMission = document.getElementById('edit-mission');
        if (editMission.style.visibility === 'visible') {
            editMission.style.visibility = 'hidden';
        }
    });

    document.querySelector("#edit-mission-text").addEventListener("click", function(e) {
        if (e.target.classList.contains("edit-mission-discard")) {
            const editMission = document.getElementById('edit-mission');
            if (editMission.style.visibility === 'visible') {
                editMission.style.visibility = 'hidden';
            }
        }
    });

    document.querySelector("#serviceEdit").addEventListener("click", function(e) {
        const editService = document.getElementById('edit-service');
        if (editService.style.visibility === 'hidden') {
            editService.style.visibility = 'visible';
            servicePictureEdit.style.visibility = 'visible';
            serviceButtons.style.visibility = 'hidden';
        }
    });
    
    document.querySelector(".edit-service-discard").addEventListener("click", function(e) {
        const serviceButtons = document.getElementById('serviceButtons');
        if (serviceButtons.style.visibility === 'hidden') {
            editService.style.visibility = 'hidden';
            servicePictureEdit.style.visibility = 'hidden';
            serviceButtons.style.visibility = 'visible';
        }
    });

    document.querySelector("#edit-service-text").addEventListener("click", function(e) {
        if (e.target.classList.contains("edit-service-discard")) {
            const serviceButtons = document.getElementById('serviceButtons');
            if (serviceButtons.style.visibility === 'hidden') {
                editService.style.visibility = 'hidden';
                servicePictureEdit.style.visibility = 'hidden';
                serviceButtons.style.visibility = 'visible';
            }
        }
    });

    document.querySelector("#edit-visit-button").addEventListener("click", function(e) {
        const editVisit = document.getElementById('edit-visit');
        if (editVisit.style.visibility === 'hidden') {
            editVisit.style.visibility = 'visible';
            editVisitPicture.style.visibility = 'visible';
        }
    });

    document.querySelector(".edit-visit-discard").addEventListener("click", function(e) {
        const editVisit = document.getElementById('edit-visit');
        if (editVisit.style.visibility === 'visible') {
            editVisit.style.visibility = 'hidden';
            editVisitPicture.style.visibility = 'hidden';
        }
    });

    document.querySelector("#edit-visit-text").addEventListener("click", function(e) {
        if (e.target.classList.contains("edit-visit-discard")) {
            const editVisit = document.getElementById('edit-visit');
            if (editVisit.style.visibility === 'visible') {
                editVisit.style.visibility = 'hidden';
                editVisitPicture.style.visibility = 'hidden';
            }
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