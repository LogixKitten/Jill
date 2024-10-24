document.addEventListener('DOMContentLoaded', function() {
  
// Validate email on blur
const emailInput = document.getElementById('email');
emailInput.addEventListener('blur', function() {
  const email = emailInput.value.trim(); // Trim to remove extra spaces

  if (email) { // Only send request if the email is not empty
    // Send AJAX request to validate the email
    fetch('/validate_email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        'email': email
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.isValid) {
        emailInput.classList.remove('is-invalid');
        emailInput.classList.add('is-valid');
      } else {
        emailInput.classList.remove('is-valid');
        emailInput.classList.add('is-invalid');
      }
    })
    .catch(error => console.error('Error:', error));
  }
});

// Validate username on blur
const userNameInput = document.getElementById('userName');
userNameInput.addEventListener('blur', function() {
  const userName = userNameInput.value.trim(); // Trim to remove extra spaces

  if (userName) { // Only send request if the username is not empty
    // Send AJAX request to validate the username
    fetch('/validate_username', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        'userName': userName
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.isValid) {
        userNameInput.classList.remove('is-invalid');
        userNameInput.classList.add('is-valid');
      } else {
        userNameInput.classList.remove('is-valid');
        userNameInput.classList.add('is-invalid');
      }
    })
    .catch(error => console.error('Error:', error));
  }
});
  
    // Submit form data and create account
    document.getElementById('submitFormButton').addEventListener('click', function() {
        // Collect form data
        const email = document.querySelector('input[name="email"]').value;
        const userName = document.querySelector('input[name="userName"]').value;
        const password = document.querySelector('input[name="password"]').value;
        const firstName = document.querySelector('input[name="firstName"]').value;
        const lastName = document.querySelector('input[name="lastName"]').value;
        const dateOfBirth = document.querySelector('input[name="dateOfBirth"]').value;
        const gender = document.querySelector('input[name="gender"]:checked').value;
        const zipCode = document.querySelector('input[name="zipCode"]').value;
  
      // Create data object to send to the Flask route
      const formData = {
        email: email,
        userName: userName,
        password: password,
        firstName: firstName,
        lastName: lastName,
        dateOfBirth: dateOfBirth,
        gender: gender,
        zipCode: zipCode
      };
  
      // Send the data to the Flask route via POST request
      fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
            if (data.first_login) {
                sessionStorage.setItem('showFirstLoginModal', 'true');
            }
            
            // Redirect to the dashboard
            window.location.href = '/dashboard';
        } else {
          // Handle errors (if any)
          console.error('Error creating account:', data.message);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });

    });
  
  });  