const toggle = document.getElementById("toggle");
const close = document.getElementById("close");
const open = document.getElementById("open");
const modal = document.getElementById("modal");

function closeNavbar() {
  if (document.body.classList.contains("show-nav")) {
    document.body.classList.toggle("show-nav");
  }
}

// Toggle nav
toggle.addEventListener("click", () =>
  document.body.classList.toggle("show-nav")
);

// Show Modal
open.addEventListener("click", () => {
  modal.classList.add("show-modal");
  closeNavbar();
});

// Hide Modal
close.addEventListener("click", () => modal.classList.remove("show-modal"));

// Hide modal when clicking outside modal container
window.addEventListener("click", (e) =>
  e.target == modal ? modal.classList.remove("show-modal") : false
);
