// --- Form Validation and Submission ---
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const contactEmailInput = document.getElementById('contactEmail'); // Corrected ID
const messageInput = document.getElementById('message');
const confirmationMessage = document.getElementById('confirmation-message');

contactForm.addEventListener('submit', function(event) {
    event.preventDefault();

    let isValid = true;

    // Validate Name
    if (nameInput.value === '') {
        showError('name', 'Name is required.');
        isValid = false;
    } else {
        hideError('name');
    }

    // Validate Email
    const atIndex = contactEmailInput.value.indexOf('@');
    const dotIndex = contactEmailInput.value.lastIndexOf('.');
    if (atIndex <= 0 || dotIndex <= atIndex || dotIndex === contactEmailInput.value.length - 1) {
        showError('email', 'Please enter a valid email address.'); // Corrected 'emails' to 'email'
        isValid = false;
    } else {
        hideError('email'); // Corrected 'emails' to 'email'
    }

    // Validate Message
    if (messageInput.value === '') {
        showError('message', 'Message is required.');
        isValid = false;
    } else {
        hideError('message');
    }

    // --- Add the essential code block here ---
    if (isValid) {
        const feedback = {
            name: nameInput.value,
            email: contactEmailInput.value,
            message: messageInput.value,
            date: new Date().toISOString()
        };

        let storedFeedback = JSON.parse(localStorage.getItem('contactFeedback')) || [];
        storedFeedback.push(feedback);
        localStorage.setItem('contactFeedback', JSON.stringify(storedFeedback));

        confirmationMessage.classList.remove('hidden');
        contactForm.reset();

        setTimeout(() => {
            confirmationMessage.classList.add('hidden');
        }, 5000);
    }
});

function showError(field, message) {
    const errorElement = document.getElementById(`${field}-error`);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

function hideError(field) {
    const errorElement = document.getElementById(`${field}-error`);
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }
}

// --- FAQ Accordion Section ---
const accordionButtons = document.querySelectorAll('.accordion-button');

accordionButtons.forEach(button => {
    button.addEventListener('click', () => {
        const accordionContent = button.nextElementSibling;
        button.classList.toggle('active');
        accordionContent.classList.toggle('show');
    });
});


/*Newsletter subscribing*/
// Getting a reference to the email input and the subscribe button
const newsletterEmailInput = document.querySelector('.subscribe-input'); // Changed variable name to be unique
const subscribeBtn = document.querySelector('.subscribe-button');

// Adding a click event listener to the button
subscribeBtn.addEventListener('click', () => {
  // Getting the email address from the input field
  const email = newsletterEmailInput.value.trim(); // Use the correct variable name

  // Validating the email address 
  if (email === "") {
    alert("Please enter a valid email address.");
    return;
  }

  // Saving the email to local storage
  localStorage.setItem('subscribedEmail', email);

  // Clearing the input field and provide feedback to the user
  newsletterEmailInput.value = "";
  alert("Thank you for subscribing! Your email has been saved.");

  // Checking the local storage in your browser's Developer Tools 
  console.log("Email saved to local storage:", localStorage.getItem('subscribedEmail'));
});