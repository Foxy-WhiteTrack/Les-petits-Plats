const blockFilters = document.querySelectorAll('.block-filters');
const filterCtn = document.querySelectorAll('.filter-ctn');
const tagCtn = document.querySelectorAll('.tag-ctn');
filterCtn.forEach(element => {
    element.style.display = 'none';
});
tagCtn.forEach(element => {
    element.style.display = 'none';
});


// Factory de recette
export function recipeFactory(data) {
    const {
        id, image, name, time, description, ingredients
    } = data;
    const picture = `assets/images/${image}`;

    // fonction pour créer la card
    function getRecipeCardDOM() {
        const article = document.createElement('article');
        article.innerHTML = `                    <a href="#" data-id="${id}">
        <div class="ctn-image">
            <img src="${picture}" alt="Image de la recette ${name}">
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
                    <div class="ctn-ingredients">
                    ${getIngredientsHTML(ingredients)}
                </div>

                </div>
            </div>
        </div>
    </a>`;
        return (article);
    }

    // fonction pour ajouter les ingrédients à la card
    function getIngredientsHTML(ingredients) {
        let ingredientsHTML = '';

        ingredients.forEach(ingredient => {
            const { ingredient: name, quantity, unit } = ingredient;

            ingredientsHTML += `
          <div class="ingredients">
            <p>${name}</p>
            <p>${quantity ? quantity : ''} ${unit ? unit : ''}</p>
          </div>
        `;
        });
        return ingredientsHTML;
    }
    return { getRecipeCardDOM };
}

// Formater les données des recettes
function createCardRecipe(recipeData) {
    return {
        id: recipeData.id,
        image: recipeData.image,
        name: recipeData.name,
        time: recipeData.time,
        description: recipeData.description,
        ingredients: recipeData.ingredients
    };
}

// Afficher les datas recipes dans card-container
export function displayRecipes(recipes) {
    const recipesSection = document.querySelector('#card-container');

    recipes.forEach(itemData => {
        const item = createCardRecipe(itemData);
        const recipeModel = recipeFactory(item);
        const recipeCardDOM = recipeModel.getRecipeCardDOM();
        recipesSection.appendChild(recipeCardDOM);
    });
}

blockFilters.forEach((blockFilter) => {
    const filterItem = blockFilter.querySelector('.filter-item');
    const filterCtn = blockFilter.querySelector('.filter-ctn');
    const tagCtn = blockFilter.querySelector('.tag-ctn');

    filterItem.addEventListener('click', function () {
        if (filterCtn.style.display === 'none') {
            filterCtn.style.display = 'flex';
            tagCtn.style.display = 'block';
        } else {
            filterCtn.style.display = 'none';
            tagCtn.style.display = 'none';
        }
    });
});
