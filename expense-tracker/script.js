const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const memo = document.getElementById("memo");
const amount = document.getElementById("amount");

// const dummyTxn = [
//   { id: 1, text: "Flower", amount: -20 },
//   { id: 2, text: "Salary", amount: 300 },
//   { id: 3, text: "Book", amount: -10 },
//   { id: 4, text: "Camera", amount: 150 },
// ];

const localStorageTxns = JSON.parse(localStorage.getItem("transactions"));

let transactions = localStorageTxns || [];

// Add new transaction
function addTransaction(e) {
  //prevent default behavior
  e.preventDefault();

  if (memo.value.trim() === "" || amount.value.trim() === "") {
    alert("Please enter a memo and amount");
  } else {
    const txn = {
      id: generateID(),
      memo: memo.value,
      amount: +amount.value,
    };
    transactions.push(txn);
    addTransactionDOM(txn);
    updateValues();
    updateLocalStorage();
    // Clear the inputs
    memo.value = "";
    amount.value = "";
  }
}

// Remove transaction
function removeTransaction(id) {
  transactions = transactions.filter((txn) => txn.id !== id);
  updateLocalStorage();
  init();
}

// Generate random ID
function generateID() {
  return Math.floor(Math.random() * 10000000);
}

// Add transactions to DOM list
function addTransactionDOM(txn) {
  // Get sign
  const sign = txn.amount < 0 ? "-" : "+";
  const item = document.createElement("li");
  // Add class based on value
  item.classList.add(txn.amount < 0 ? "minus" : "plus");

  item.innerHTML = `
    ${txn.memo} <span>${sign}${Math.abs(txn.amount)}
    </span> 
    <button class="delete-btn" onclick="removeTransaction(${txn.id})">x</button>
  `;
  list.appendChild(item);
}

// Update the balance, income, and expense
function updateValues() {
  const amounts = transactions.map((txn) => txn.amount);
  const total = amounts.reduce((acc, num) => acc + num, 0).toFixed(2);
  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, num) => acc + num, 0)
    .toFixed(2);
  const expense = (
    amounts.filter((item) => item < 0).reduce((acc, num) => acc + num, 0) * -1
  ).toFixed(2);
  balance.innerText = `$${total}`;
  balance.className = total < 0 ? "minus" : "plus";
  money_plus.innerText = `$${income}`;
  money_minus.innerText = `$${expense}`;
}

// Update local storage transactions
function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Init app
function init() {
  list.innerHTML = "";

  transactions.forEach(addTransactionDOM);
  updateValues();
}

init();

// Event Listeners
form.addEventListener("submit", addTransaction);
