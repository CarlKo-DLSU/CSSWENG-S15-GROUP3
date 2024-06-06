const Service = function(image, description) {
    this.image = image;
    this.description = description;
}

let services = [];

services.push(new Service("image1", "Event Management & Live Staging"));
services.push(new Service("image2", "Creative Conceptualization"));
services.push(new Service("image3", "Audio Visual Presentation"));


document.addEventListener("DOMContentLoaded", () => {
    let currentServiceIndex = 0;
    updateServiceDetails(currentServiceIndex);

    document.querySelector(".arrow.left").addEventListener("click", function(e) {
        if (currentServiceIndex == 0) {
            currentServiceIndex = services.length - 1;
            updateServiceDetails(currentServiceIndex);
        } else {
            currentServiceIndex = (currentServiceIndex - 1) % services.length;
            updateServiceDetails(currentServiceIndex);
        }
    });

    document.querySelector(".arrow.right").addEventListener("click", function(e) {
        currentServiceIndex = (currentServiceIndex + 1 + services.length) % services.length;
        updateServiceDetails(currentServiceIndex);
    });

    function updateServiceDetails(index) {
        let currentService = services[index];

        // Update service picture
        let servicePicture = document.querySelector(".servicePicture");
        servicePicture.src = `../images/3-aboutUs/service${index + 1}.png`;

        // Update service description
        let serviceDescription = document.querySelector(".serviceDescription");
        serviceDescription.textContent = currentService.description;

        // Update dot brightness
        let dots = document.querySelectorAll(".dot");
        dots.forEach((dot, i) => {
            if (i === index) {
                dot.style.filter = "brightness(0)";
            } else {
                dot.style.filter = "brightness(1)";
            }
        });
    }
});
