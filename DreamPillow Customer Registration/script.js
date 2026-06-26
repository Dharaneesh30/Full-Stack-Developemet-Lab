const form = document.getElementById("registrationForm");
const reportContainer = document.getElementById("reportContainer");

function clearErrors() {
  const errorMessages = document.querySelectorAll(".error-message");
  errorMessages.forEach(function (message) {
    message.textContent = "";
  });
}

function showError(id, message) {
  document.getElementById(id).textContent = message;
}

function getSelectedGender() {
  const genderInput = document.querySelector('input[name="gender"]:checked');
  return genderInput ? genderInput.value : "";
}

function getSelectedFeatures() {
  const featureInputs = document.querySelectorAll('input[name="features"]:checked');
  const selectedFeatures = [];

  featureInputs.forEach(function (feature) {
    selectedFeatures.push(feature.value);
  });

  return selectedFeatures;
}

// Validate form fields and build the report after successful submission.
form.addEventListener("submit", function (event) {
  event.preventDefault();
  clearErrors();

  const name = document.getElementById("customerName").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const gender = getSelectedGender();
  const city = document.getElementById("city").value;
  const features = getSelectedFeatures();
  const address = document.getElementById("address").value.trim();

  let isValid = true;
  const namePattern = /^[A-Za-z ]+$/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (name === "") {
    showError("nameError", "Name cannot be empty.");
    isValid = false;
  } else if (!namePattern.test(name)) {
    showError("nameError", "Name should contain only alphabets.");
    isValid = false;
  }

  if (email === "") {
    showError("emailError", "Email cannot be empty.");
    isValid = false;
  } else if (!emailPattern.test(email)) {
    showError("emailError", "Enter a valid email address.");
    isValid = false;
  }

  if (password.length < 6) {
    showError("passwordError", "Password should contain at least 6 characters.");
    isValid = false;
  }

  if (dob === "") {
    showError("dobError", "Date must be selected.");
    isValid = false;
  }

  if (gender === "") {
    showError("genderError", "Gender must be selected.");
    isValid = false;
  }

  if (city === "") {
    showError("cityError", "City must be selected.");
    isValid = false;
  }

  if (features.length === 0) {
    showError("featuresError", "Select at least one feature.");
    isValid = false;
  }

  if (address === "") {
    showError("addressError", "Address cannot be empty.");
    isValid = false;
  }

  if (!isValid) {
    return;
  }

  reportContainer.innerHTML = `
    <h2>Customer Registration Report</h2>
    <table>
      <thead>
        <tr>
          <th>Field</th>
          <th>Entered Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Name</td>
          <td>${name}</td>
        </tr>
        <tr>
          <td>Email</td>
          <td>${email}</td>
        </tr>
        <tr>
          <td>Date of Birth</td>
          <td>${dob}</td>
        </tr>
        <tr>
          <td>Gender</td>
          <td>${gender}</td>
        </tr>
        <tr>
          <td>City</td>
          <td>${city}</td>
        </tr>
        <tr>
          <td>Selected Features</td>
          <td>${features.join(", ")}</td>
        </tr>
        <tr>
          <td>Address</td>
          <td>${address}</td>
        </tr>
      </tbody>
    </table>
  `;
});

form.addEventListener("reset", function () {
  clearErrors();
  reportContainer.innerHTML = `
    <h2>Customer Registration Report</h2>
    <p class="intro-text">The submitted customer details will appear here after successful validation.</p>
  `;
});
