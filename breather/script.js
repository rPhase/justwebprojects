const container = document.getElementById("container");
const text = document.getElementById("text");

// Time it takes for breathing cycle in ms
const totalTime = 7500;
const breatheTime = (totalTime / 5) * 2;
const holdTime = totalTime / 5;

function breathAnimation() {
  text.innerText = "Breathe In";
  container.classList = "container grow";
  setTimeout(() => {
    text.innerText = "Hold";
    setTimeout(() => {
      text.innerText = "Breathe Out";
      container.classList = "container shrink";
    }, holdTime);
  }, breatheTime);
}
// Initial run
breathAnimation();
// Repeat the animation
setInterval(breathAnimation, totalTime);
