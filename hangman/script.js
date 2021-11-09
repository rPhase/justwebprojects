const wordEl = document.getElementById("word");
const wrongLettersEl = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-again");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");
const figureParts = document.querySelectorAll(".figure-part");

// let words = ["application", "programming", "interface", "test"];

// Keep track of game state
let running = true;

// Arrays to store entered letters
const correctLetters = [];
const wrongLetters = [];

// Randomly pick a word from the words list
// let selectedWord = words[Math.floor(Math.random() * words.length)];

// Fetch random words from API
const randomWords = (async () => {
  const res = await fetch(
    "https://random-word-form.herokuapp.com/random/noun?count=15"
  );
  const data = await res.json();
  return data;
})();

// Randomly pick a word from the words list
async function pickWord() {
  const words = await randomWords;
  const word = words[Math.floor(Math.random() * words.length)];
  console.log(word);
  return word;
}

let wordPromise = pickWord();

// Take the selected word, split the letters, create a span for each letter
// checking if each letter has been guessed
async function displayWord() {
  const selectedWord = (await wordPromise).toLowerCase();
  wordEl.innerHTML = `
    ${selectedWord
      .split("")
      .map(
        (letter) =>
          `<span class="letter">
          ${correctLetters.includes(letter) ? letter : ""}
          </span>
        `
      )
      .join("")}
  `;
  // Remove newline character
  const innerWord = wordEl.innerText.replace(/\n/g, "");
  // const cleanWord = selectedWord.replace(/[\-\s]/g), "");
  // Check to see if the word matches the selected word to finish the game
  // Remove special characters from the selected word
  const symbols = /[\s`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/g;
  if (innerWord === selectedWord.replace(symbols, "")) {
    running = false;
    finalMessage.innerText = "Congratulations! You win!";
    popup.style.display = "flex";
  }
}

// Update the wrong letters
async function updateWrongLetters() {
  const selectedWord = await wordPromise;
  // Display wrong letters
  wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? "<p>Wrong</p>" : ""}
    ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
  `;
  // Display each part
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;
    if (index < errors) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });
  // Check if lost
  if (wrongLetters.length == figureParts.length) {
    running = false;
    finalMessage.innerText = `You Lost. The correct word was ${selectedWord}`;
    popup.style.display = "flex";
  }
}

// Show notification
function showNotification() {
  notification.classList.add("show");
  setTimeout(() => {
    notification.classList.remove("show");
  }, 2500);
}

// Event Listeners

// Keydown letter press
// KeyCode is deprecated in favor of key or code
window.addEventListener("keydown", async (e) => {
  if (e.key.match(/^[a-z]{1}/) && running) {
    const selectedWord = (await wordPromise).toLowerCase();
    const letter = e.key;
    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);
        updateWrongLetters();
      } else {
        showNotification();
      }
    }
  }
});

// Restart game and play again
playAgainBtn.addEventListener("click", () => {
  // Empty arrays
  correctLetters.splice(0);
  wrongLetters.splice(0);
  // Chose a new random word from the words list
  wordPromise = pickWord();
  // selectedWord = words[Math.floor(Math.random() * words.length)];
  // Update the display
  displayWord();
  updateWrongLetters();
  // Remove the popup
  popup.style.display = "none";
  // Restart the game state
  running = true;
});

displayWord();
