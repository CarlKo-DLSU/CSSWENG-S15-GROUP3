document.addEventListener("DOMContentLoaded", () => {
    const hiddenElem = document.getElementsByClassName("initHide");
    for (let i = 0; i < hiddenElem.length; i++) {
        hiddenElem[i].style.visibility = "hidden";
    }

    // initialization of elements
    const editMission = document.getElementById('edit-mission');
    const missionText = document.getElementById('mission-details');
    const editMissionText = document.getElementById('mission-field');
    const editService = document.getElementById('edit-service');
    const serviceButtons = document.getElementById('serviceButtons');
    const deleteService = document.getElementById('delete-service');
    const addService = document.getElementById('add-service');
    const servicePictureEdit = document.getElementById('servicePictureEdit');
    const serviceDescription = document.getElementById('serviceDescription');
    const editServiceDescription = document.getElementById('editServiceDescription');
    const editVisit = document.getElementById('edit-visit');
    const visitHeaderText = document.getElementById('aboutUs-visitTextHeader');
    const editVisitHeader = document.getElementById('aboutUs-editVisitHeader');
    const visitDescription = document.getElementById('aboutUs-visitDescription');
    const editVisitDescription = document.getElementById('aboutUs-editVisitDescription');
    const editVisitPicture = document.getElementById('edit-visitPicture');

    missionText.innerHTML = editMissionText.value
    visitHeaderText.innerHTML = editVisitHeader.value;
    visitDescription.innerHTML = editVisitDescription.value.replace(/\n/g, '<br>');
    serviceDescription.innerHTML = editServiceDescription.value;

    const updateAboutUsData = async (data) => {
        try {
            const response = await fetch('updateAboutUs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Failed to update About Us data');
            }

            alert('About Us data updated successfully.');
        } catch (error) {
            console.error(error);
            alert('Error updating About Us data.');
        }
    };

    // displays the edit mission elements
    document.querySelector("#edit-mission-button").addEventListener("click", function(e) {
        if (editMission.style.visibility === 'hidden') {
            editMission.style.visibility = 'visible';
            editMissionText.style.visibility = 'visible';
            missionText.style.visibility = 'hidden';
        }
    });

    // hides the edit mission elements
    document.querySelector("#edit-mission-cross").addEventListener("click", function(e) {
        editMission.style.visibility = 'hidden';
        editMissionText.style.visibility = 'hidden';
        missionText.style.visibility = 'visible';
        editMissionText.value = missionText.innerHTML;
    });

    document.querySelector("#edit-mission-text").addEventListener("click", function(e) {
        if (e.target.classList.contains("edit-mission-discard")) {
            editMission.style.visibility = 'hidden';
            editMissionText.style.visibility = 'hidden';
            missionText.style.visibility = 'visible';
            editMissionText.value = missionText.innerHTML;
        }
    });

    // saves the changes made to the mission
    document.querySelector("#edit-mission-check").addEventListener("click", function(e) {
        editMission.style.visibility = 'hidden';
        editMissionText.style.visibility = 'hidden';
        missionText.style.visibility = 'visible';
        missionText.innerHTML = editMissionText.value;

        updateAboutUsData({
            mission: editMissionText.value,
            serviceDesc: editServiceDescription.value,
            visitTitle: editVisitHeader.value,
            visitDesc: editVisitDescription.value,
            visitImage: document.getElementById('aboutUs-visitPicture').src.split('/').pop()
        });
    });

    document.querySelector("#edit-mission-text").addEventListener("click", function(e) {
        if (e.target.classList.contains("edit-mission-save")) {
            editMission.style.visibility = 'hidden';
            editMissionText.style.visibility = 'hidden';
            missionText.style.visibility = 'visible';
            missionText.innerHTML = editMissionText.value;
            
            updateAboutUsData({
                mission: editMissionText.value,
                serviceDesc: editServiceDescription.value,
                visitTitle: editVisitHeader.value,
                visitDesc: editVisitDescription.value,
                visitImage: document.getElementById('aboutUs-visitPicture').src.split('/').pop()
            });
        }
    });

    // displays the edit service elements, while hiding the service buttons
    document.querySelector("#serviceEdit").addEventListener("click", function(e) {
        editService.style.visibility = 'visible';
        servicePictureEdit.style.visibility = 'visible';
        serviceButtons.style.visibility = 'hidden';
        serviceDescription.style.visibility = 'hidden';
        editServiceDescription.style.visibility = 'visible';
    });
    
    // discards all edit changes, and hides the edit service elements, displaying the service buttons
    document.querySelector(".edit-service-discard").addEventListener("click", function(e) {
        editService.style.visibility = 'hidden';
        servicePictureEdit.style.visibility = 'hidden';
        serviceButtons.style.visibility = 'visible';
        serviceDescription.style.visibility = 'visible';
        editServiceDescription.style.visibility = 'hidden';
        editServiceDescription.value = serviceDescription.innerHTML.replace(/&amp;/g, '&');
    });

    document.querySelector("#edit-service-text").addEventListener("click", function(e) {
        if (e.target.classList.contains("edit-service-discard")) {
            editService.style.visibility = 'hidden';
            servicePictureEdit.style.visibility = 'hidden';
            serviceButtons.style.visibility = 'visible';
            serviceDescription.style.visibility = 'visible';
            editServiceDescription.style.visibility = 'hidden';
            editServiceDescription.value = serviceDescription.innerHTML.replace(/&amp;/g, '&');
        }
    });

    // saves all edit changes, and hides the edit service elements, while displaying the service buttons
    document.querySelector(".edit-service-save").addEventListener("click", function(e) {
        editService.style.visibility = 'hidden';
        servicePictureEdit.style.visibility = 'hidden';
        serviceButtons.style.visibility = 'visible';
        serviceDescription.style.visibility = 'visible';
        editServiceDescription.style.visibility = 'hidden';
        serviceDescription.innerHTML = editServiceDescription.value;

        updateAboutUsData({
            mission: editMissionText.value,
            serviceDesc: editServiceDescription.value,
            visitTitle: editVisitHeader.value,
            visitDesc: editVisitDescription.value,
            visitImage: document.getElementById('aboutUs-visitPicture').src.split('/').pop()
        });
    });

    document.querySelector("#edit-service-text").addEventListener("click", function(e) {
        if (e.target.classList.contains("edit-service-save")) {
            editService.style.visibility = 'hidden';
            servicePictureEdit.style.visibility = 'hidden';
            serviceButtons.style.visibility = 'visible';
            serviceDescription.style.visibility = 'visible';
            editServiceDescription.style.visibility = 'hidden';
            serviceDescription.innerHTML = editServiceDescription.value;

            updateAboutUsData({
                mission: editMissionText.value,
                serviceDesc: editServiceDescription.value,
                visitTitle: editVisitHeader.value,
                visitDesc: editVisitDescription.value,
                visitImage: document.getElementById('aboutUs-visitPicture').src.split('/').pop()
            });
        }
    });

    // displays the delete service popup
    document.querySelector("#serviceMinus").addEventListener("click", function(e) {
        if (deleteService.style.visibility === 'hidden') {
            deleteService.style.visibility = 'visible';
            deleteService.style.animation = 'fadeInPopup 0.3s ease forwards';
        }
    });

    // hides the delete service popup
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

    // displays the add service elements
    document.querySelector("#servicePlus").addEventListener("click", function(e) {
        if (addService.style.visibility === 'hidden') {
            addService.style.visibility = 'visible';
            serviceButtons.style.visibility = 'hidden';
        }
    });
    
    // hides the add service elements
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

    // displays the edit visit-area elements
    document.querySelector("#edit-visit-button").addEventListener("click", function(e) {
        if (editVisit.style.visibility === 'hidden') {
            editVisit.style.visibility = 'visible';
            editVisitPicture.style.visibility = 'visible';
            editVisitHeader.style.visibility = 'visible';
            visitHeaderText.style.visibility = 'hidden';
            editVisitDescription.style.visibility = 'visible';
            visitDescription.style.visibility = 'hidden';
        }
    });

    // hides the edit visit-area elements
    document.querySelector(".edit-visit-discard").addEventListener("click", function(e) {
        editVisit.style.visibility = 'hidden';
        editVisitPicture.style.visibility = 'hidden';            
        editVisitHeader.style.visibility = 'hidden';
        visitHeaderText.style.visibility = 'visible';
        editVisitDescription.style.visibility = 'hidden';
        visitDescription.style.visibility = 'visible';
        editVisitHeader.value = visitHeaderText.innerHTML;
        editVisitDescription.value = visitDescription.innerHTML.replace(/<br\s*\/?>/gi, '\n');
    });

    document.querySelector("#edit-visit-text").addEventListener("click", function(e) {
        if (e.target.classList.contains("edit-visit-discard")) {
            editVisit.style.visibility = 'hidden';
            editVisitPicture.style.visibility = 'hidden';
            editVisitHeader.style.visibility = 'hidden';
            visitHeaderText.style.visibility = 'visible';
            editVisitDescription.style.visibility = 'hidden';
            visitDescription.style.visibility = 'visible';
            editVisitHeader.value = visitHeaderText.innerHTML;
            editVisitDescription.value = visitDescription.innerHTML.replace(/<br\s*\/?>/gi, '\n');
        }
    });

    document.querySelector(".edit-visit-save").addEventListener("click", function(e) {
        editVisit.style.visibility = 'hidden';
        editVisitPicture.style.visibility = 'hidden';            
        editVisitHeader.style.visibility = 'hidden';
        visitHeaderText.style.visibility = 'visible';
        editVisitDescription.style.visibility = 'hidden';
        visitDescription.style.visibility = 'visible';
        visitHeaderText.innerHTML = editVisitHeader.value;
        visitDescription.innerHTML = editVisitDescription.value.replace(/\n/g, '<br>');

        updateAboutUsData({
            mission: editMissionText.value,
            serviceDesc: editServiceDescription.value,
            visitTitle: editVisitHeader.value,
            visitDesc: editVisitDescription.value,
            visitImage: document.getElementById('aboutUs-visitPicture').src.split('/').pop()
        });
    });

    document.querySelector("#edit-visit-text").addEventListener("click", function(e) {
        if (e.target.classList.contains("edit-visit-save")) {
            editVisit.style.visibility = 'hidden';
            editVisitPicture.style.visibility = 'hidden';
            editVisitHeader.style.visibility = 'hidden';
            visitHeaderText.style.visibility = 'visible';
            editVisitDescription.style.visibility = 'hidden';
            visitDescription.style.visibility = 'visible';
            visitHeaderText.innerHTML = editVisitHeader.value;
            visitDescription.innerHTML = editVisitDescription.value.replace(/\n/g, '<br>');

            updateAboutUsData({
                mission: editMissionText.value,
                serviceDesc: editServiceDescription.value,
                visitTitle: editVisitHeader.value,
                visitDesc: editVisitDescription.value,
                visitImage: document.getElementById('aboutUs-visitPicture').src.split('/').pop()
            });
        }
    });
});