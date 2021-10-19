const currency_one = document.getElementById('currency-one');
const currency_two = document.getElementById("currency-two");
const amount_one = document.getElementById("amount-one");
const amount_two = document.getElementById("amount-two");
const rate = document.getElementById('rate');
const swap = document.getElementById('swap');

// Initial fetch of exchange rates API to reduce calls
// New data will be fetched only when the page reloads
const dataPromise = fetch("https://open.exchangerate-api.com/v6/latest")
  .then((res) => res.json());

// Update the DOM with fetched data
// Need async function with await otherwise data would be undefined
// when trying to call the function
async function calculate() {
  var data = await dataPromise;
  var c1 = currency_one.value;
  var c2 = currency_two.value;
  var r = data.rates[c2] / data.rates[c1];
  rate.innerText = `1 ${c1} = ${r.toFixed(5)} ${c2}`;
  // Determine where to update based on which amount element fired the event
  if (this.id === 'amount-two') {
    // If second amount value was changed, update first amount value
    amount_one.value = (amount_two.value / r).toFixed(2);
  } else {
    // For all other cases including undefined, update the second amount value
    amount_two.value = (amount_one.value * (r)).toFixed(2);
  }
}

// Event listeners
currency_one.addEventListener('change', calculate);
amount_one.addEventListener("input", calculate);
currency_two.addEventListener("change", calculate);
amount_two.addEventListener("input", calculate);


swap.addEventListener('click', () => {
  var temp = currency_one.value;
  currency_one.value = currency_two.value;
  currency_two.value = temp;
  calculate();
});

calculate();