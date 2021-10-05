const SEATS_IN_ROW = 10;
const NUMBER_OF_ROWS = 6;
const container = document.querySelector(".container");
const count = document.getElementById("count");
const total = document.getElementById("total");
const timeSelect = document.getElementById("time");
const listSeats = document.getElementById("list-seats");
let ticketPrice = +timeSelect.value;

buildSeats();
populateSeats();
loadFromStorage();

// Create new seats and rows
function buildSeats() {
  var seatsContainer = document.querySelector(".seats-container");
  var row = seatsContainer.querySelector(".row");

  // Create seats in a row
  for (i = 0; i < SEATS_IN_ROW; i++) {
    var seatDiv = document.createElement("div");
    seatDiv.className = "seat";
    seatDiv.setAttribute("data-seat-num", i + 1);
    row.appendChild(seatDiv);
  }
  // Duplicate the rows
  for (j = 0; j < NUMBER_OF_ROWS - 1; j++) {
    var rowClone = row.cloneNode(true);
    rowClone.setAttribute(
      "data-row-num",
      String.fromCharCode("A".charCodeAt(0) + j + 1)
    );
    seatsContainer.appendChild(rowClone);
  }
  row.setAttribute("data-row-num", "A");
}

function clearSeats() {
  var seats = document.querySelectorAll(".row .seat");
  seats.forEach(function (item) {
    item.classList.remove("occupied");
    item.classList.remove("selected");
  });
}

function populateSeats() {
  var seats = document.querySelectorAll(".row .seat");
  var i = 0;
  for (j = 0; j < ticketPrice; j++) {
    i = Math.abs(Math.floor((ticketPrice - j - 2) * j * 3));
    if (i >= seats.length) {
      i -= seats.length;
    }
    if (seats[i].classList.contains("occupied")) {
      i++;
    }
    seats[i].classList.add("occupied");
  }
}

function updateSelectedCount() {
  var seats = document.querySelectorAll(".row .seat");
  var selectedSeats = document.querySelectorAll(".row .seat.selected");

  var seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
  localStorage.setItem(
    "seatsIndex_" + timeSelect.selectedIndex,
    JSON.stringify(seatsIndex)
  );

  var selectedSeatsNumber = selectedSeats.length;
  count.innerText = selectedSeatsNumber;
  total.innerText = ticketPrice * selectedSeatsNumber;
  listSeats.innerText = getSeatNumbers(selectedSeats);
}

function getSeatNumbers(selectedSeats) {
  if (selectedSeats.length === 0) {
    return "No seats selected.";
  }
  var seatNumber = "";
  var str = "";
  for (i = 0; i < selectedSeats.length; i++) {
    seatNumber = selectedSeats[i].parentNode.getAttribute("data-row-num");
    seatNumber += selectedSeats[i].getAttribute("data-seat-num");
    str += seatNumber + " ";
  }
  return str;
}

// Load saved settings from local storage
function loadFromStorage() {
  var seats = document.querySelectorAll(".row .seat");
  var selectedTimeIndex = localStorage.getItem("selectedTimeIndex");
  var seatsIndex = JSON.parse(
    localStorage.getItem("seatsIndex_" + selectedTimeIndex)
  );
  timeSelect.selectedIndex = +selectedTimeIndex;
  if (seatsIndex !== null && seatsIndex.length > 0) {
    seatsIndex.forEach(function (item) {
      seats[item].classList.add("selected");
    });
  }
  updateSelectedCount();
}

container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    // console.log(e.target);
    e.target.classList.toggle("selected");
    updateSelectedCount();
  }
});

timeSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  localStorage.setItem("selectedTimeIndex", e.target.selectedIndex);
  clearSeats();
  populateSeats();
  loadFromStorage();
  // updateSelectedCount();
});
