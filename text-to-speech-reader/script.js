const main = document.querySelector("main");
const voiceSelect = document.getElementById("voices");
const textArea = document.getElementById("text");
const readBtn = document.getElementById("read");
const toggleBtn = document.getElementById("toggle");
const closeBtn = document.getElementById("close");

// Init speech synth
const message = new SpeechSynthesisUtterance();

// Store voices
let voices = [];

async function loadData() {
  const res = await fetch("./data.json");
  const data = await res.json();
  data.forEach(createBox);
}

loadData();

// Create Speech Boxes
function createBox(item) {
  const box = document.createElement("div");
  const { image, text } = item;

  box.classList.add("box");
  box.innerHTML = `
    <img src="${image}" alt="${text}" />
    <p class="info">${text}</p>
  `;

  // @Speak event
  box.addEventListener("click", () => {
    setTextMessage(text);
    speakText();
    // Add active effect
    box.classList.add("active");
    setTimeout(() => box.classList.remove("active"), 800);
  });

  main.appendChild(box);
}

// Set text to be read
function setTextMessage(text) {
  message.text = text;
}

// Speak Text
function speakText() {
  speechSynthesis.speak(message);
}

// Set voice
function setVoice(e) {
  message.voice = voices.find((voice) => voice.name === e.target.value);
}

// Read User Textbox
function readTextbox() {
  setTextMessage(textArea.value);
  speakText();
}

// Load available voices
function getVoices() {
  voices = speechSynthesis.getVoices();
  voices.forEach((voice) => {
    const option = document.createElement("option");
    option.value = voice.name;
    option.innerText = `${voice.name} ${voice.lang}`;
    voiceSelect.appendChild(option);
  });

  // Set default voice
  message.voice = voices[0];
}

// Event Listeners

// Voices changed
speechSynthesis.addEventListener("voiceschanged", getVoices);

// Toggle text box
toggleBtn.addEventListener("click", () => {
  document.getElementById("modal").classList.toggle("show");
});

// Close button
closeBtn.addEventListener("click", () => {
  document.getElementById("modal").classList.remove("show");
});

// Hide modal when clicking outside modal container
window.addEventListener("click", (e) =>
  e.target == modal ? modal.classList.remove("show") : false
);

// Change voice
voiceSelect.addEventListener("change", setVoice);

// Read text button
readBtn.addEventListener("click", readTextbox);

getVoices();
