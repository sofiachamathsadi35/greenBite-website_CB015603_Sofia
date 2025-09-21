const workouts = {
  arms: {
    none: ["Push-ups", "Arm Circles", "Tricep Dips"],
    dumbbells: ["Bicep Curls", "Overhead Press", "Hammer Curls"],
    "resistance band": ["Band Curls", "Band Overhead Tricep Extension", "Band Front Raise"]
  },
  legs: {
    none: ["Squats", "Lunges", "Wall Sit"],
    dumbbells: ["Goblet Squat", "Deadlifts", "Step-ups"],
    "resistance band": ["Band Squats", "Band Leg Press", "Glute Bridges with Band"]
  },
  core: {
    none: ["Plank", "Leg Raises", "Crunches"],
    dumbbells: ["Russian Twists", "Dumbbell Side Bend", "Dumbbell Crunches"],
    "resistance band": ["Band Crunches", "Band Pallof Press", "Band Wood Chops"]
  },
  full: {
    none: ["Burpees", "Mountain Climbers", "Plank"],
    dumbbells: ["Thrusters", "Renegade Rows", "Deadlifts"],
    "resistance band": ["Band Push-ups", "Band Squats", "Band Rows"]
  }
};

const exerciseImages = {
  "Push-ups": "./images/Pushups.jpeg",
  "Arm Circles": "./images/Arm circles.jpeg",
  "Tricep Dips": "./images/Tricep Dips.jpeg",
  "Bicep Curls": "./images/Bicep curls.jpeg",
  "Overhead Press": "./images/Overhead Press.jpeg",
  "Hammer Curls": "./images/Crossbody hammer curl.jpeg",
  "Band Curls": "./images/Band Curls.jpeg",
  "Band Overhead Tricep Extension": "./images/Resistance Band Tricep Overhead Extensions.jpeg",
  "Band Front Raise": "./images/Band Front Raise.jpeg",
  "Squats": "./images/Squats.jpeg",
  "Lunges": "./images/ Lunges .jpeg",
  "Wall Sit": "./images/Wall Sit.jpeg",
  "Goblet Squat": "./images/Goblet Squat.jpeg",
  "Deadlifts": "./images/ Deadlift .jpeg",
  "Step-ups": "./images/Step ups.jpeg",
  "Band Squats": "./images/Band squats.jpeg",
  "Band Leg Press": "./images/Band Leg Press.jpeg",
  "Glute Bridges with Band": "./images/Glute Bridges with band .jpeg",
  "Plank": "./images/Plank.jpeg",
  "Leg Raises": "./images/Leg Raises.jpeg",
  "Crunches": "./images/Crunches.jpeg",
  "Russian Twists": "images/ Russian Twist.jpeg",
  "Dumbbell Side Bend": "./images/Dumbell Side Bend.jpeg",
  "Dumbbell Crunches": "./images/Dumbell Crunches.jpeg",
  "Band Crunches": "./images/Band Crunches.jpeg",
  "Band Pallof Press": "./images/Band Pallof Press.jpeg",
  "Band Wood Chops": "./images/Band Wood Chops.jpeg",
  "Burpees": "./images/Burpees.jpeg",
  "Mountain Climbers": "./images/Mountain Climbers.jpeg",
  "Plank": "./images/Plank.jpeg",
  "Thrusters": "./images/Thrusters.jpeg",
  "Renegade Rows": "./images/Renegade Row.jpeg",
  "Deadlifts": "./images/ Deadlift .jpeg",
  "Band Push-ups": "./images/Band PushUps.jpeg",
  "Band Squats": "./images/Band squats.jpeg",
  "Band Rows": "./images/Band Row.jpeg",
  "Workout Completed!": "./images/Fitness .jpeg"
};

let selectedExercises = [];
let currentIndex = 0;
let countdown;
let timeLeft = 30;

function updateExerciseDisplay() {
  const currentExercise = selectedExercises[currentIndex];
  document.getElementById("currentExercise").textContent = currentExercise;
  
  const exerciseImageElement = document.getElementById("exercise-image");
  if (exerciseImages[currentExercise]) {
    exerciseImageElement.src = exerciseImages[currentExercise];
    exerciseImageElement.style.display = "block";
  } else {
    exerciseImageElement.style.display = "none";
  }
}

function generateWorkout() {
  const bodyPart = document.getElementById("bodyPart").value;
  const equipment = document.getElementById("equipment").value;
  
  if (!bodyPart || !equipment) {
    alert("Please select both a body part and equipment.");
    return;
  }

  const allExercises = workouts[bodyPart][equipment];
  selectedExercises = allExercises.sort(() => 0.5 - Math.random()).slice(0, 3);

  let output = "<h3>Your Workout Plan:</h3>";
  selectedExercises.forEach((ex, i) => {
    output += `<div class="exercise">${i + 1}. ${ex}</div>`;
  });

  document.getElementById("workout").innerHTML = output;
  document.getElementById("timerBox").style.display = "block";
  currentIndex = 0;
  updateExerciseDisplay();
  resetTimer();
}

function startTimer() {
  clearInterval(countdown);
  countdown = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(countdown);
      currentIndex++;
      if (currentIndex < selectedExercises.length) {
        updateExerciseDisplay();
        resetTimer();
        startTimer();
      } else {
        document.getElementById("currentExercise").textContent = "Workout Completed!";
        document.getElementById("exercise-image").src = exerciseImages["Workout Completed!"];
      }
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(countdown);
}

function resetTimer() {
  clearInterval(countdown);
  timeLeft = 30;
  document.getElementById("timer").textContent = timeLeft;
}

document.getElementById("generateBtn").addEventListener("click", generateWorkout);

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