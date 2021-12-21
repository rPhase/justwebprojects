const days = document.getElementById("days");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const countdown = document.getElementById("countdown");
const year = document.getElementById("year");
const loading = document.getElementById("loading");
const message = document.getElementById("message");

// Get the current date and next year
const currentYear = new Date().getFullYear();
const newYearTime = new Date(`January 01 ${currentYear + 1} 00:00:00`);

let interval;
let addDays = 0;

// Set background year
year.innerText = currentYear + 1;

// Update the countdown DOM elements
function updateCountdown() {
  const currentTime = new Date();

  // For testing purposes add to date
  currentTime.setDate(currentTime.getDate() + addDays);

  // Stop the interval if countdown is reached
  if (currentTime.getTime() >= newYearTime.getTime()) {
    message.style.display = "block";
    countdown.classList.add("fade");
    year.classList.add("fade");
    return clearInterval(interval);
  }

  const diff = newYearTime - currentTime;
  const d = Math.floor(diff / 1000 / 60 / 60 / 24);
  const h = Math.floor(diff / 1000 / 60 / 60) % 24;
  const m = Math.floor(diff / 1000 / 60) % 60;
  const s = Math.floor(diff / 1000) % 60;
  days.innerHTML = d;
  hours.innerHTML = ("0" + h).slice(-2); //Leading zeros for time
  minutes.innerHTML = ("0" + m).slice(-2);
  seconds.innerHTML = ("0" + s).slice(-2);
}

// // Show loading spinner before countdown
setTimeout(() => {
  loading.style.display = "none";
  // countdown.style.opacity = "1";
  countdown.classList.remove("hidden");
}, 1000);

// Run update every second
interval = setInterval(updateCountdown, 1000);

// Event listeners
window.addEventListener("keydown", async (e) => {
  if (e.key.match(/^[t]{1}/)) {
    const letter = e.key;
    addDays++;
    updateCountdown();
  }
});
