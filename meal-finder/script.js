const search = document.getElementById("search"),
  submit = document.getElementById("submit"),
  random = document.getElementById("random"),
  mealsEl = document.getElementById("meals"),
  resultHeading = document.getElementById("result-heading"),
  singleMealEl = document.getElementById("single-meal"),
  close = document.getElementById("close"),
  modal = document.getElementById("modal");

// Search and fetch meal from API
function searchMeal(e) {
  // Prevent the default behavior of the submit
  e.preventDefault();

  // Clear the meals
  mealsEl.innerHTML = "";

  // Get the search term
  const term = search.value.trim();

  // Check for empty
  if (!term) {
    resultHeading.innerHTML = `<p>Please enter a search term.</p>`;
  } else {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then((res) => res.json())
      .then((data) => {
        resultHeading.innerHTML = `<h2>Search results for "${term}":</h2>`;

        if (data.meals === null) {
          resultHeading.innerHTML = `<p>There are no search results. Try again.</p>`;
        } else {
          mealsEl.innerHTML = data.meals
            .map(
              (meal) => `
            <div class="meal">
              <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
              <div class="meal-info" data-meal-ID="${meal.idMeal}">
                <h3>${meal.strMeal}</h3>
              </div>
            </div>
          `
            )
            .join("");
        }
      });
  }
}

// Fetch meal by ID from API
function getMealByID(mealID) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];
      addMealToDOM(meal);
    });
}

// Fetch random meal
function getRandomMeal() {
  fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];
      addMealToDOM(meal);
    });
  modal.classList.add("show-modal");
}

// Add the meal to DOM
function addMealToDOM(meal) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        meal[`strMeasure${i}`] + "-" + meal[`strIngredient${i}`]
      );
    } else {
      // Break out of the loop if ingredient is blank
      break;
    }
  }
  singleMealEl.innerHTML = `
    <div class="single-meal">
      <h1>${meal.strMeal}</h1>
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
      <div class="single-meal-info">
        ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ""}
        ${meal.strArea ? `<p>${meal.strArea}</p>` : ""}
      </div>
      <div class="main">
        <h2>Ingredients</h2>
        <ul>
          ${ingredients.map((ing) => `<li>${ing}</li>`).join("")}
        </ul>
        <h2>Instructions</h2>
        <p>${meal.strInstructions}</p>
      </div>
    </div>
  `;
}

// Event listeners
submit.addEventListener("submit", searchMeal);

random.addEventListener("click", getRandomMeal);

mealsEl.addEventListener("click", (e) => {
  // Handle path for Firefox as well
  let path = e.path || (e.composedPath && e.composedPath());
  const mealInfo = path.find((item) => {
    if (item.classList) {
      return item.classList.contains("meal-info");
    } else {
      return false;
    }
  });
  if (mealInfo) {
    const mealID = mealInfo.getAttribute("data-meal-id");
    getMealByID(mealID);
  }
  modal.classList.add("show-modal");
});

// Hide Modal
close.addEventListener("click", () => modal.classList.remove("show-modal"));

// Hide modal when clicking outside modal container
window.addEventListener("click", (e) =>
  e.target == modal ? modal.classList.remove("show-modal") : false
);
