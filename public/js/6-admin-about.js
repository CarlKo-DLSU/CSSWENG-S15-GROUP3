document.addEventListener("DOMContentLoaded", () => {

    const editMission = document.getElementById('edit-mission');
    editMission.style.visibility = 'hidden';
    const editService = document.getElementById('edit-service');
    editService.style.visibility = 'hidden';
    const serviceButtons = document.getElementById('serviceButtons');
    const deleteService = document.getElementById('delete-service');
    deleteService.style.visibility = 'hidden';
    const addService = document.getElementById('add-service');
    addService.style.visibility = 'hidden';
    const servicePictureEdit = document.getElementById('servicePictureEdit');
    servicePictureEdit.style.visibility = 'hidden';
    const editVisit = document.getElementById('edit-visit');
    editVisit.style.visibility = 'hidden';
    const editVisitPicture = document.getElementById('edit-visitPicture');
    editVisitPicture.style.visibility = 'hidden';

    document.querySelector("#edit-mission-button").addEventListener("click", function(e) {
        if (editMission.style.visibility === 'hidden') {
            editMission.style.visibility = 'visible';
        }
    });

    document.querySelector(".edit-mission-discard").addEventListener("click", function(e) {
        if (editMission.style.visibility === 'visible') {
            editMission.style.visibility = 'hidden';
        }
    });

    document.querySelector("#edit-mission-text").addEventListener("click", function(e) {
        if (e.target.classList.contains("edit-mission-discard")) {
            if (editMission.style.visibility === 'visible') {
                editMission.style.visibility = 'hidden';
            }
        }
    });

    document.querySelector("#serviceEdit").addEventListener("click", function(e) {
        if (editService.style.visibility === 'hidden') {
            editService.style.visibility = 'visible';
            servicePictureEdit.style.visibility = 'visible';
            serviceButtons.style.visibility = 'hidden';
        }
    });
    
    document.querySelector(".edit-service-discard").addEventListener("click", function(e) {
        if (serviceButtons.style.visibility === 'hidden') {
            editService.style.visibility = 'hidden';
            servicePictureEdit.style.visibility = 'hidden';
            serviceButtons.style.visibility = 'visible';
        }
    });

    document.querySelector("#edit-service-text").addEventListener("click", function(e) {
        if (e.target.classList.contains("edit-service-discard")) {
            if (serviceButtons.style.visibility === 'hidden') {
                editService.style.visibility = 'hidden';
                servicePictureEdit.style.visibility = 'hidden';
                serviceButtons.style.visibility = 'visible';
            }
        }
    });

    document.querySelector("#serviceMinus").addEventListener("click", function(e) {
        if (deleteService.style.visibility === 'hidden') {
            deleteService.style.visibility = 'visible';
            deleteService.style.animation = 'fadeInPopup 0.3s ease forwards';
        }
    });

    document.querySelector("#delete-service-no").addEventListener("click", function(e) {
        if (deleteService.style.visibility === 'visible') {
            deleteService.style.animation = 'fadeOutPopup 0.3s ease forwards';
            setTimeout(function() {
                deleteService.style.visibility = 'hidden';
            }, 300);
        }
    });

    window.addEventListener("click", function(event) {
        if (event.target == deleteService) {
            deleteService.style.animation = 'fadeOutPopup 0.3s ease forwards';
            setTimeout(function() {
                deleteService.style.visibility = 'hidden';
            }, 300);
        }
    });

    document.querySelector("#servicePlus").addEventListener("click", function(e) {
        if (addService.style.visibility === 'hidden') {
            addService.style.visibility = 'visible';
            serviceButtons.style.visibility = 'hidden';
        }
    });
    
    document.querySelector(".add-service-discard").addEventListener("click", function(e) {
        if (serviceButtons.style.visibility === 'hidden') {
            addService.style.visibility = 'hidden';
            serviceButtons.style.visibility = 'visible';
        }
    });

    document.querySelector("#add-service-text").addEventListener("click", function(e) {
        if (e.target.classList.contains("add-service-discard")) {
            if (serviceButtons.style.visibility === 'hidden') {
                addService.style.visibility = 'hidden';
                serviceButtons.style.visibility = 'visible';
            }
        }
    });

    document.querySelector("#edit-visit-button").addEventListener("click", function(e) {
        if (editVisit.style.visibility === 'hidden') {
            editVisit.style.visibility = 'visible';
            editVisitPicture.style.visibility = 'visible';
        }
    });

    document.querySelector(".edit-visit-discard").addEventListener("click", function(e) {
        if (editVisit.style.visibility === 'visible') {
            editVisit.style.visibility = 'hidden';
            editVisitPicture.style.visibility = 'hidden';
        }
    });

    document.querySelector("#edit-visit-text").addEventListener("click", function(e) {
        if (e.target.classList.contains("edit-visit-discard")) {
            if (editVisit.style.visibility === 'visible') {
                editVisit.style.visibility = 'hidden';
                editVisitPicture.style.visibility = 'hidden';
            }
        }
    });
});