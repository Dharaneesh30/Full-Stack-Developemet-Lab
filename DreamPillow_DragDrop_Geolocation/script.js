// Get the main page elements that the script will control.
const pillowImage = document.getElementById("pillowImage");
const dropZone = document.getElementById("dropZone");
const dropLabel = document.getElementById("dropLabel");
const dropMessage = document.getElementById("dropMessage");
const locationButton = document.getElementById("locationButton");
const latitudeValue = document.getElementById("latitudeValue");
const longitudeValue = document.getElementById("longitudeValue");
const geoMessage = document.getElementById("geoMessage");
const mapForm = document.getElementById("mapForm");
const mapLatitude = document.getElementById("mapLatitude");
const mapLongitude = document.getElementById("mapLongitude");
const mapMessage = document.getElementById("mapMessage");

// Start the drag operation and store the dragged element ID.
function handleDragStart(event) {
    event.dataTransfer.setData("text/plain", event.target.id);
}

// Allow dropping by preventing the browser's default behavior.
function handleDragOver(event) {
    event.preventDefault();
    dropZone.classList.add("active");
}

// Remove the highlighted state when the dragged item leaves the drop area.
function handleDragLeave() {
    dropZone.classList.remove("active");
}

// Move the image into the drop zone and show a success message.
function handleDrop(event) {
    event.preventDefault();
    dropZone.classList.remove("active");

    const draggedElementId = event.dataTransfer.getData("text/plain");
    const draggedElement = document.getElementById(draggedElementId);

    if (!draggedElement) {
        dropMessage.textContent = "Unable to complete the drop action.";
        return;
    }

    dropZone.innerHTML = "";
    dropZone.appendChild(draggedElement);
    dropZone.classList.add("has-image");
    dropMessage.textContent = "DreamPillow successfully dropped in the delivery area.";
}

// Request the user's current geographic position.
function getCurrentLocation() {
    if (!navigator.geolocation) {
        geoMessage.textContent = "Browser not supported.";
        return;
    }

    geoMessage.textContent = "Fetching current location...";

    navigator.geolocation.getCurrentPosition(showPosition, handleGeolocationError);
}

// Display the user's latitude and longitude after a successful lookup.
function showPosition(position) {
    const { latitude, longitude } = position.coords;

    latitudeValue.textContent = latitude.toFixed(6);
    longitudeValue.textContent = longitude.toFixed(6);
    geoMessage.textContent = "Current location fetched successfully.";

    // Fill the map form automatically for convenience.
    mapLatitude.value = latitude.toFixed(6);
    mapLongitude.value = longitude.toFixed(6);
}

// Show a user-friendly error message for each common geolocation problem.
function handleGeolocationError(error) {
    let message = "Unable to get location.";

    switch (error.code) {
        case error.PERMISSION_DENIED:
            message = "Permission denied.";
            break;
        case error.POSITION_UNAVAILABLE:
            message = "Location unavailable.";
            break;
        case error.TIMEOUT:
            message = "Location request timed out.";
            break;
        default:
            message = "An unknown error occurred.";
    }

    geoMessage.textContent = message;
}

// Check whether the entered value is a valid number.
function isValidCoordinate(value) {
    return value.trim() !== "" && !Number.isNaN(Number(value));
}

// Validate the inputs and open the selected coordinates in Google Maps.
function showLocationOnMap(event) {
    event.preventDefault();

    const latitude = mapLatitude.value;
    const longitude = mapLongitude.value;

    if (!isValidCoordinate(latitude) || !isValidCoordinate(longitude)) {
        mapMessage.textContent = "Please enter valid numeric latitude and longitude values.";
        return;
    }

    mapMessage.textContent = "Opening Google Maps for the selected coordinates.";
    const mapsUrl = `https://www.google.com/maps?q=${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}`;
    window.open(mapsUrl, "_blank");
}

// Attach all event listeners after the elements are available.
pillowImage.addEventListener("dragstart", handleDragStart);
dropZone.addEventListener("dragover", handleDragOver);
dropZone.addEventListener("dragleave", handleDragLeave);
dropZone.addEventListener("drop", handleDrop);
locationButton.addEventListener("click", getCurrentLocation);
mapForm.addEventListener("submit", showLocationOnMap);
