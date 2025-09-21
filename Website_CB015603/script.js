document.addEventListener("DOMContentLoaded", () => {
  const tips = [
    " 'Drink at least 8 glasses of water daily 💧' ",
    " 'Take a 10-minute walk after meals 🚶‍♀️' ",
    " 'Eat more green vegetables for energy 🥦' ",
    " 'Get 7–8 hours of quality sleep 😴' ",
    " 'Practice deep breathing for relaxation 🌿' ",
    " 'Avoid sugary drinks, choose fruit instead 🍎' ",
    " 'Stretch for 5 minutes every morning 🙆‍♂️' "
  ];

  const tipElement = document.getElementById("healthTip");

  const today = new Date();
  const dayIndex = today.getDay(); 

  const tipOfTheDay = tips[dayIndex % tips.length];
  tipElement.textContent = tipOfTheDay;
});

/*Newsletter subscribing*/
// Getting a reference to the email input and the subscribe button
const emailInput = document.querySelector('.subscribe-input');
const subscribeBtn = document.querySelector('.subscribe-button');

// Adding a click event listener to the button
subscribeBtn.addEventListener('click', () => {
  // Getting the email address from the input field
  const email = emailInput.value.trim();

  // Validating the email address 
  if (email === "") {
    alert("Please enter a valid email address.");
    return;
  }

  // Saving the email to local storage
  localStorage.setItem('subscribedEmail', email);

  // Clearing the input field and provide feedback to the user
  emailInput.value = "";
  alert("Thank you for subscribing! Your email has been saved.");

  // Checking the local storage in your browser's Developer Tools 
  console.log("Email saved to local storage:", localStorage.getItem('subscribedEmail'));
});