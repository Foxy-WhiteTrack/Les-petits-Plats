export function recipeFactory(data) {
    const {
        id, image, name, time, description, ingredients
    } = data;
    const picture = `assets/images/${image}`;

    function getRecipeCardDOM() {
        const article = document.createElement('article');
        article.innerHTML = `
        <a href="#" data-id="${id}">
          <div class="ctn-image">
            <img src="assets/images/${picture}" alt="Image de la recette ${name}">
            <div class="tmp">${time}</div>
          </div>
          <div class="recipe-infos">
            <div class="ctn-txt">
              <div class="align">
                <div class="all-size">
                  <h3 class="card-title">${name}</h3>
                </div>
                <h4>RECETTE</h4>
                <div class="all-size">
                  <p class="description">${description}</p>
                </div>
                <h4>INGREDIENTS</h4>
                <div class="all-size">
                  ${getIngredientsHTML(ingredients)}
                </div>
              </div>
            </div>
          </div>
        </a>
      `;
        return article;
    }

    function getIngredientsHTML(ingredients) {
        let ingredientsHTML = '';

        ingredients.forEach(ingredient => {
            const { ingredient: name, quantity, unit } = ingredient;

            ingredientsHTML += `
          <div class="ingredients">
            <p>${name}</p>
            <p>${quantity} ${unit || ''}</p>
          </div>
        `;
        });

        return ingredientsHTML;
    }

    return { getRecipeCardDOM };
}
