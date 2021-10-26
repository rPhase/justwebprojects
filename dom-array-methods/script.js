const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateBtn = document.getElementById("calculate-wealth");

// Data Array stores all the users
let dataArr = [];

// Fetch random user and add money
async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api/");
  const data = await res.json();
  const user = data.results[0];
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };
  addData(newUser);
}

// Add new object to data array
function addData(obj) {
  dataArr.push(obj);
  updateDom();
}

// Update DOM to show users
function updateDom(providedData = dataArr) {
  // Clear the main div
  main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";
  providedData.forEach((item) => {
    const el = document.createElement("div");
    el.classList.add("person");
    el.innerHTML = `<strong>${item.name}</strong> ${formatter.format(
      item.money
    )}`;
    main.appendChild(el);
  });
}

// Format number as money
// https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
// Create our number formatter.
var formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

// Double the money of all users
function doubleMoney() {
  dataArr = dataArr.map((user) => {
    return { ...user, money: user.money * 2 };
  });
  updateDom();
}

// Sort users by richest
function sortByRichest() {
  dataArr.sort((a,b) => b.money - a.money);
  updateDom();
}

// Filter to show only millionaires
// Remove users with less than $1 Million
function showMillionaires() {
  dataArr = dataArr.filter(user => user.money >= 1000000);
  updateDom();
}

// Calculate the wealth of all users
function calculateWealth() {
  const wealth = dataArr.reduce((acc, user) => (acc + user.money),0);
  const wealthEl = document.createElement('div');
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatter.format(wealth)}</strong></h3>`;
  main.appendChild(wealthEl);
}

// Event Listeners
addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", sortByRichest);
showMillBtn.addEventListener("click", showMillionaires);
calculateBtn.addEventListener("click", calculateWealth);