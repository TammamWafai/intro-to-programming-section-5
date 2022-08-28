const guessInput = document.getElementById('guess');
const submitButton = document.getElementById('submit');
const resetButton = document.getElementById('reset');
const messages = document.getElementsByClassName('message');
const tooHighMessage = document.getElementById('too-high');
const tooLowMessage = document.getElementById('too-low');
const maxGuessesMessage = document.getElementById('max-guesses');
const numberOfGuessesMessage = document.getElementById('number-of-guesses');
const correctMessage = document.getElementById('correct');
const smallerNum = document.getElementById('smallerNum');
const biggerNum = document.getElementById('biggerNum');

let targetNumber;
let attempts = 0;
const maxNumberOfAttempts = 5;

// Returns a random number from min (inclusive) to max (exclusive)
// Usage:
// > getRandomNumber(1, 50)
// <- 32
// > getRandomNumber(1, 50)
// <- 11
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function checkGuess() {
  // Get value from guess input element
  const guess = parseInt(guessInput.value, 10);
  if (guess < 1) {
    hideAllMessages();
    smallerNum.style.display = '';
    biggerNum.style.display = 'none';
    return;
  } else if (guess > 99) {
    hideAllMessages();
    biggerNum.style.display = '';
    smallerNum.style.display = 'none';
    return;
  } else {
    biggerNum.style.display = 'none';
    smallerNum.style.display = 'none';
    attempts = attempts + 1;

    hideAllMessages();

    if (guess === targetNumber) {
      numberOfGuessesMessage.style.display = '';
      numberOfGuessesMessage.innerHTML = `You made ${attempts} guesses`;

      correctMessage.style.display = '';

      submitButton.disabled = true;
      guessInput.disabled = true;
    }

    if (guess !== targetNumber) {
      if (guess < targetNumber) {
        tooLowMessage.style.display = '';
      } else {
        tooHighMessage.style.display = '';
      }

      const remainingAttempts = maxNumberOfAttempts - attempts;

      numberOfGuessesMessage.style.display = '';
      let guessOrGuesses = 'guesses';
      if (remainingAttempts < 2) { guessOrGuesses = 'guess'; }
      numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} ${guessOrGuesses} remaining`;
    }

    if (attempts === maxNumberOfAttempts) {

      submitButton.disabled = true;
      guessInput.disabled = true;
      console.log("buttons disabled");
    }

    guessInput.value = '';

    resetButton.style.display = '';

  }

}

function hideAllMessages() {
  for (let elementIndex = 0; elementIndex < messages.length; elementIndex++) {
    messages[elementIndex].style.display = 'none';
  }
}

function setup() {
  // Get random number
  targetNumber = getRandomNumber(1, 100);
  console.log(`target number: ${targetNumber}`);

  // Reset number of attempts
  attempts = 0;

  // Enable the input and submit button
  submitButton.disabled = false;
  guessInput.disabled = false;

  hideAllMessages();
  resetButton.style.display = 'none';
}

submitButton.addEventListener('click', checkGuess);
resetButton.addEventListener('click', setup);

setup();
