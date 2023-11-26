// Selecting elements from the HTML
const searchForm = document.querySelector("#submit"); // Selects the submit button
const searchInput = document.querySelector("#search"); // Selects the search input field
const resultList = document.querySelector("#results"); // Selects the results section

// Event listener for the 'search' event on the search input
searchInput.addEventListener("search", async (e) => {
  // Display loading message for half a second
  await setTimeout(() => {
    resultList.innerHTML = "Loading...";
  }, 500);
  e.preventDefault(); // Prevents default form submission behavior

  await searchRecipes(); // Initiates recipe search
});

// Event listener for a click on the submit button
searchForm.addEventListener("click", async (e) => {
  // Display loading message for half a second
  await setTimeout(() => {
    resultList.innerHTML =
      "<p style='text-align: center; font-weight: bold;'>Loading</p>";
  }, 500);
  e.preventDefault(); // Prevents default form submission behavior

  await searchRecipes(); // Initiates recipe search
});

// Function to search for recipes based on user input
async function searchRecipes() {
  const searchValue = searchInput.value.trim(); // Gets the trimmed search input
  const response = await fetch(
    `https://api.edamam.com/search?q=${searchValue}&app_id=YOUR_AIP_ID&app_key=Your_API_Key&from=0&to=10` // API endpoint (replace with your API key and ID)
  );
  const data = await response.json(); // Converts API response to JSON format

  // Handling search results
  if (data.hits.length === 0) {
    // If no recipes found, display a message
    resultList.innerHTML =
      "<p style='text-align: center; font-weight: bold;'>Recipe not found.</p>";
  } else {
    // If recipes found, display them
    displayRecipes(data.hits);
  }
}

// Function to display fetched recipes
function displayRecipes(recipes) {
  let html = "";
  recipes.forEach((recipe) => {
    // Generating HTML for each recipe
    html += `
        <div>
            <img src="${recipe.recipe.image}" alt="${recipe.recipe.label}">
            <h3>${recipe.recipe.label}</h3>
            <ul>
                ${recipe.recipe.ingredientLines
                  .map((ingredient) => `<li>${ingredient}</li>`)
                  .join("")}
            </ul>
            <a id="view-btn" href="${
              recipe.recipe.url
            }" target="_blank">View Recipe</a>
        </div> 
        `;
  });
  resultList.innerHTML = html; // Updating the results section with recipe HTML
}
