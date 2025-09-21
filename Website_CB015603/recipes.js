/* Recipes page */

// Open modal
function openModal(id) {
  document.getElementById(id).style.display = "flex";
}

// Close modal
function closeModal(id) {
  document.getElementById(id).style.display = "none";
}

// Close modal if clicked outside content
window.onclick = function(event) {
  if (event.target.classList.contains("modal")) {
    event.target.style.display = "none";
  }
};

/*Searching and filters*/
// Getting all the relevant HTML elements from the DOM
const searchBar = document.querySelector('.search-bar'); 
const categoryButtons = document.querySelectorAll('.category-btn');
const recipeCards = document.querySelectorAll('.recipe-card');

// Keeping track of the currently selected category, defaulting to 'all'
let activeCategory = 'all';

// The main function that handles all filtering logic
function filterRecipes() {
    if (!searchBar) {
        console.error("Search bar element not found.");
        return;
    }

    const searchQuery = searchBar.value.toLowerCase();

    
    recipeCards.forEach(card => {
        const cardName = card.dataset.name.toLowerCase();
        const cardCategory = card.dataset.category.toLowerCase();
        
        const categoryMatch = activeCategory === 'all' || cardCategory === activeCategory;
        const searchMatch = cardName.includes(searchQuery);

        
        if (categoryMatch && searchMatch) {
            card.style.display = 'block'; 
        } else {
            card.style.display = 'none';  
        }
    });
}

if (searchBar) {
    searchBar.addEventListener('input', filterRecipes);
}

categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        activeCategory = button.dataset.category || 'all';
        
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        filterRecipes();
    });
});

// Running the filter function 
filterRecipes();

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