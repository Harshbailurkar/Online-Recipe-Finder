const searchForm = document.querySelector("#submit");
const searchInput = document.querySelector("#search");
const resultList = document.querySelector("#results");

searchForm.addEventListener("click", (e) => {
  e.preventDefault();
  searchRecipes();
});

async function searchRecipes() {
  const searchValue = searchInput.value.trim();
  const response =
    await fetch(`https://api.edamam.com/search?q=${searchValue}&app_id=a4b30d0a&app_key=
72497efbe39eef20de55b10033cbdfd3&from=0&to=10`);
  const data = await response.json();
  displayRecipes(data.hits);
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
