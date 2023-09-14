const searchForm = document.querySelector("#submit");
const searchInput = document.querySelector("#search");
const resultList = document.querySelector("#results");

searchInput.addEventListener("search", async (e) => {
  await setTimeout(() => {
    resultList.innerHTML = "Loading...";
  }, 500);
  e.preventDefault();

  await searchRecipes();
});
searchForm.addEventListener("click", async (e) => {
  await setTimeout(() => {
    resultList.innerHTML =
      "<p style='text-align: center; font-weight: bold;'>Loading</p>";
  }, 500);
  e.preventDefault();

  await searchRecipes();
});

async function searchRecipes() {
  const searchValue = searchInput.value.trim();
  const response = await fetch(
    `https://api.edamam.com/search?q=${searchValue}&app_id=YOUR-API-ID` //Enter Your API id here.
  );
  const data = await response.json();

  if (data.hits.length === 0) {
    resultList.innerHTML =
      "<p style='text-align: center; font-weight: bold;'>Recipe not found.</p>";
  } else {
    displayRecipes(data.hits);
  }
}

function displayRecipes(recipes) {
  let html = "";
  recipes.forEach((recipe) => {
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
  resultList.innerHTML = html;
}
