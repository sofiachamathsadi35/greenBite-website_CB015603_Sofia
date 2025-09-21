// A single object to hold all active timers to avoid conflicts
const activeTimers = {};

// Event delegation to handle all button clicks within the sessions container
document.addEventListener('click', (event) => {
    const target = event.target;
    const card = target.closest('.session-card');
    
    // Exit if the click is not inside a session card
    if (!card) {
        return;
    }

    const sessionId = card.dataset.sessionId;

    if (target.classList.contains('start-session-btn')) {
        const durationInMinutes = parseInt(card.dataset.sessionDuration);
        const timerBox = card.querySelector('.timer-box');
        
        // Hide the content and show the timer
        card.querySelector('.card-content').style.display = 'none';
        timerBox.style.display = 'flex';

        target.textContent = 'Pause';
        target.classList.remove('start-session-btn');
        target.classList.add('pause-session-btn');

        // Start the timer
        startTimer(card, durationInMinutes);
    } else if (target.classList.contains('pause-session-btn')) {
        // Check if the timer exists before trying to access its properties
        if (activeTimers[sessionId] && activeTimers[sessionId].isRunning) {
            pauseTimer(card);
            target.textContent = 'Resume';
        } else {
            resumeTimer(card);
            target.textContent = 'Pause';
        }
    } else if (target.classList.contains('stop-timer')) {
        // Only call stopTimer if a session has been started on this card
        if (sessionId) {
            stopTimer(card);
        }
    } else if (target.classList.contains('reset-timer')) {
        // Only call resetTimer if a session has been started on this card
        if (sessionId) {
            resetTimer(card);
        }
    }
});

function startTimer(card, durationInMinutes) {
    const timerDisplay = card.querySelector('.timer');
    const sessionId = `timer-${durationInMinutes}-${Date.now()}`; // Use unique ID
    card.dataset.sessionId = sessionId;
    
    // Clear any existing timer for this card
    if (activeTimers[sessionId]) {
        clearInterval(activeTimers[sessionId].countdown);
    }

    let timeLeft = durationInMinutes * 60;
    activeTimers[sessionId] = {
        timeLeft: timeLeft,
        countdown: null,
        isRunning: true,
        initialTime: durationInMinutes * 60
    };

    const countdown = setInterval(() => {
        timeLeft--;
        activeTimers[sessionId].timeLeft = timeLeft; // Update timeLeft in the object
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

        if (timeLeft <= 0) {
            clearInterval(countdown);
            alert("Session complete!");
            resetTimer(card);
        }
    }, 1000);

    activeTimers[sessionId].countdown = countdown;
}

function pauseTimer(card) {
    const sessionId = card.dataset.sessionId;
    if (activeTimers[sessionId] && activeTimers[sessionId].isRunning) {
        clearInterval(activeTimers[sessionId].countdown);
        activeTimers[sessionId].isRunning = false;
    }
}

function resumeTimer(card) {
    const sessionId = card.dataset.sessionId;
    if (activeTimers[sessionId] && !activeTimers[sessionId].isRunning) {
        let timeLeft = activeTimers[sessionId].timeLeft;
        activeTimers[sessionId].isRunning = true;
        
        const countdown = setInterval(() => {
            timeLeft--;
            activeTimers[sessionId].timeLeft = timeLeft;
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            card.querySelector('.timer').textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

            if (timeLeft <= 0) {
                clearInterval(countdown);
                alert("Session complete!");
                resetTimer(card);
            }
        }, 1000);
        
        activeTimers[sessionId].countdown = countdown;
    }
}

function stopTimer(card) {
    const sessionId = card.dataset.sessionId;
    if (activeTimers[sessionId]) {
        clearInterval(activeTimers[sessionId].countdown);
        delete activeTimers[sessionId];
    }
    
    // The corrected call, passing the 'card' element
    resetCard(card);
}

function resetTimer(card) {
    const sessionId = card.dataset.sessionId;
    
    if (activeTimers[sessionId]) {
        clearInterval(activeTimers[sessionId].countdown);
        const initialMinutes = Math.floor(activeTimers[sessionId].initialTime / 60);
        card.querySelector('.timer').textContent = `${initialMinutes < 10 ? '0' : ''}${initialMinutes}:00`;
        delete activeTimers[sessionId];
    }
    
    const startBtn = card.querySelector('.pause-session-btn');
    if (startBtn) {
        startBtn.textContent = 'Start';
        startBtn.classList.remove('pause-session-btn');
        startBtn.classList.add('start-session-btn');
    }
    
    // Hide the timer and show content again
    card.querySelector('.timer-box').style.display = 'none';
    card.querySelector('.card-content').style.display = 'block';
}

function resetCard(card) {
    const timerBox = card.querySelector('.timer-box');
    const cardContent = card.querySelector('.card-content');
    const startBtn = card.querySelector('.pause-session-btn'); // Find the current button state

    if (startBtn) {
        startBtn.textContent = 'Start';
        startBtn.classList.remove('pause-session-btn');
        startBtn.classList.add('start-session-btn');
    }

    cardContent.style.display = 'block';
    timerBox.style.display = 'none';
}

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