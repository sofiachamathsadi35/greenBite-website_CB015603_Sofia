/* Calculator page */
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("calcForm");
    const results = document.getElementById("results");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

    const age = parseInt(document.getElementById("age").value);
    const gender = document.getElementById("gender").value;
    const height = parseFloat(document.getElementById("height").value);
    const weight = parseFloat(document.getElementById("weight").value);
    const activity = parseFloat(document.getElementById("activity").value);

    if (!age || !height || !weight || !activity || !gender) {
        alert("Please fill all fields correctly!");
        return;
    }

// Calculate BMR
    let bmr;
    if (gender === "male") {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

// TDEE
    const tdee = bmr * activity;

// Macros
    const carbs = Math.round((tdee * 0.5) / 4);
    const protein = Math.round((tdee * 0.2) / 4);
    const fat = Math.round((tdee * 0.3) / 9);

// Update UI
    document.getElementById("bmr").textContent = Math.round(bmr);
    document.getElementById("tdee").textContent = Math.round(tdee);
    document.getElementById("carbs").textContent = carbs;
    document.getElementById("protein").textContent = protein;
    document.getElementById("fat").textContent = fat;

    results.classList.remove("hidden");

// Animate progress bars
    animateBar("carbsBar", (carbs * 4) / tdee * 100);
    animateBar("proteinBar", (protein * 4) / tdee * 100);
    animateBar("fatBar", (fat * 9) / tdee * 100);
  });

  function animateBar(id, percent) {
    const bar = document.getElementById(id);
    bar.style.width = "0%";
    setTimeout(() => {
        bar.style.width = percent + "%";
    }, 100);
  }
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