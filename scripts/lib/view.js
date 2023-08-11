import * as Index from "../index.js";

// Vue - affichage

// Selecteurs
const blockFilters = document.querySelectorAll('.block-filters');
const filterCtn = document.querySelectorAll('.filter-ctn');
const tagCtn = document.querySelectorAll('.tag-ctn');

// masquer les listes tags filtres au lancement
filterCtn.forEach(element => {
    element.style.display = 'none';
});
tagCtn.forEach(element => {
    element.style.display = 'none';
});

export function displayError(searchValue, usedTags) {
    console.log("displayError");
    const errorDiv = document.querySelector('#error-container');
    if (!errorDiv) {
        const errorDiv = document.createElement('div');
        errorDiv.innerHTML = `<p id="error-container">Aucune recette ne correspond à la recherche "${searchValue} " ${usedTags} vous pouvez chercher «
        tarte aux pommes », « poisson », etc</p>`;
        document.body.appendChild(errorDiv);
    } else {
        errorDiv.innerHTML = `<p>Aucune recette ne correspond à la recherche "${searchValue} " ${usedTags} vous pouvez chercher «
        tarte aux pommes », « poisson », etc</p>`;
        document.body.appendChild(errorDiv);
    }
}

export function clearDisplayError() {
    console.log("clearDisplayError");
    const errorDiv = document.querySelector('#error-container');
    if (errorDiv) {
        errorDiv.innerHTML = '';
        errorDiv.style.border = 'none';
    }
}

function sortTags(tags) {
    console.log("Tri alphabétique");
    return tags.sort(Intl.Collator().compare);
}

export function getSelectedTags() {
    console.log("getSelectedTags");
    const selectedTags = Array.from(document.querySelectorAll('.selected-tag')).map(tag => tag.textContent);
    return selectedTags;
}

// Factory de recette
export function recipeFactory(data) {
    const {
        id, image, name, time, description, ingredients
    } = data;
    const picture = `assets/images/${image}`;

    // fonction pour créer la structure HTML de la card (recette)
    // ** ToDo => A optimiser pour que l'execution soit plus rapide  **
    function makeRecipeCardDOM() {

        const article = document.createElement('article');
        article.innerHTML = `                    <a href="#" data-id="${id}">
        <div class="ctn-image">
            <img src="${picture}" alt="Image de la recette ${name}">
            <div class="tmp">${time} min</div>
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
                    ${makeIngredientsDOM(ingredients)}
                </div>

                </div>
            </div>
        </div>
    </a>`;
        return (article);
    }

    // fonction pour ajouter les ingrédients à la card
    function makeIngredientsDOM(ingredients) {

        let ingredientsHTML = '';

        ingredients.forEach(ingredient => {
            const { ingredient: name, quantity, unit } = ingredient;
            const formattedName = name.charAt(0).toUpperCase() + name.substring(1).toLowerCase();


            ingredientsHTML += `
          <div class="ingredients">
            <p>${formattedName}</p>
            <p>${quantity ? quantity : ''} ${unit ? unit : ''}</p>
          </div>
        `;
        });
        return ingredientsHTML;
    }
    return { makeRecipeCardDOM: makeRecipeCardDOM };
}

//

// Formater (normalizer) les données des recettes
function formatCardRecipe(recipeData) {
    return {
        id: recipeData.id,
        image: recipeData.image,
        name: recipeData.name,
        time: recipeData.time,
        description: recipeData.description,
        ingredients: recipeData.ingredients,
        appliance: recipeData.appliance,
        ustensils: recipeData.ustensils
    };
}

// Récupérer les datas à mettre dans les card
export function createRecipes(recipesParam) {
    console.log("création des card");
    const recipesSection = document.querySelector('#card-container');

    // pour chaques recette, afficher la recette correspondante dans le DOM
    recipesParam.forEach(itemData => {
        const item = formatCardRecipe(itemData);
        const recipeModel = recipeFactory(item);
        const recipeCardDOM = recipeModel.makeRecipeCardDOM();
        recipesSection.appendChild(recipeCardDOM);
    });
}

// Afficher les ingredients dans la selectBox
export function displayIngredients(recipesParam) {
    console.log("création de la liste des ingrédients pour selectBox");
    const ingredientSection = document.querySelector('#tag-ingredients');
    const ingredientsNamesArr = {};

    // Parcourir les recettes
    recipesParam.forEach(recipeItemData => {
        const recipeItem = formatCardRecipe(recipeItemData);
        const simpleArrIngredientsForOneRecipe = recipeItem.ingredients;

        // parcourir les ingrédients de chaque recette
        simpleArrIngredientsForOneRecipe.forEach(ingredientObj => {
            const nameOfIngredient = ingredientObj.ingredient;
            if (!Index.isTagSelected(nameOfIngredient)) {
                ingredientsNamesArr[nameOfIngredient] = true;
            }
        })
    })

    const nbrRecipesElement = document.querySelector('#nbr-recipes');
    nbrRecipesElement.textContent = `${recipesParam.length} recette${recipesParam.length > 1 ? 's' : ''}`;

    // récupérer les clés contenus dans le tableau ingredientsNamesArr
    const simpleArrIngredientsForAllRecipes = sortTags(Object.keys(ingredientsNamesArr));

    // créer l'HTML pour les ingredients tag
    function makeIngredientHTML(ingredients) {
        console.log("affichage ingrédients dans selectBox");
        let ingredientsHTML = '';
        const addedIngredients = [];

        // Parcourir les ingrédients et les ajouter à l'HTML
        ingredients.forEach(ingredient => {
            const formattedName = ingredient.charAt(0).toUpperCase() + ingredient.substring(1).toLowerCase();

            const selectedTagContainer = document.querySelector('#selected-tags');
            const selectedTags = Array.from(selectedTagContainer.querySelectorAll('.selected-tag'));
            const tagAlreadySelected = selectedTags.some(tag => tag.textContent === formattedName);
            const isDuplicate = addedIngredients.includes(formattedName);

            if (!tagAlreadySelected && !isDuplicate) {
                ingredientsHTML += `<li class="tag">${formattedName}</li>`;
                addedIngredients.push(formattedName);
            }
        });

        // Vérifier si des ingrédients ont été ajoutés et retourner l'HTML approprié
        return ingredientsHTML ? '<ul>' + ingredientsHTML + '</ul>' : '<span>Aucun tag correspondant</span>';
    }
    // Ajouter l'HTML des ingrédients dans la section appropriée du DOM
    ingredientSection.innerHTML += makeIngredientHTML(simpleArrIngredientsForAllRecipes);

    updateDisplayedTags('ingredients', '');
}

// Afficher les appareils dans la selectBox
export function displayAppliances(recipesParam) {
    console.log("création de la liste des appareils pour selectBox");
    const applianceSection = document.querySelector('#tag-appliances');
    const appliancesNamesArr = {};

    // Parcourir les recettes
    recipesParam.forEach(recipeItemData => {
        const recipeItem = formatCardRecipe(recipeItemData);
        const appliance = recipeItem.appliance;

        if (!Index.isTagSelected(appliance)) {
            appliancesNamesArr[appliance] = true;
        }
    });

    const nbrRecipesElement = document.querySelector('#nbr-recipes');
    nbrRecipesElement.textContent = `${recipesParam.length} recette${recipesParam.length > 1 ? 's' : ''}`;


    // Convertir le tableau des noms d'appareils en un tableau trié
    const sortedAppliances = sortTags(Object.keys(appliancesNamesArr));

    // Créer l'HTML pour les tags d'appareils
    function makeApplianceHTML(appliances) {
        console.log("affichage appareils dans selectBox");
        let appliancesHTML = '';
        const addedAppliances = [];

        // Parcourir les appareils et les ajouter à l'HTML
        appliances.forEach(appliance => {
            const formattedName = appliance.charAt(0).toUpperCase() + appliance.substring(1).toLowerCase();

            const isDuplicate = addedAppliances.includes(formattedName);

            if (!Index.isTagSelected(formattedName) && !isDuplicate) {
                appliancesHTML += `<li class="tag">${formattedName}</li>`;
                addedAppliances.push(formattedName);
            }

        });

        // Vérifier si des appareils ont été ajoutés et retourner l'HTML approprié
        return appliancesHTML ? '<ul>' + appliancesHTML + '</ul>' : '<span>Aucun tag correspondant</span>';
    }

    // Ajouter l'HTML des appareils dans la section appropriée du DOM
    applianceSection.innerHTML += makeApplianceHTML(sortedAppliances);

    updateDisplayedTags('appliances', '');

    updateDisplayedTags('ustensils', '');
}

// Afficher les ustensiles dans la selectBox
export function displayUstensils(recipesParam) {
    console.log("création de la liste des ustensiles pour selectBox");
    const ustensilsSection = document.querySelector('#tag-ustensils');
    const ustensilsNamesArr = {};

    // Parcourir les recettes
    recipesParam.forEach(recipeItemData => {
        const recipeItem = formatCardRecipe(recipeItemData);
        const ustensils = recipeItem.ustensils;

        // Parcourir les ustensiles de chaque recette
        ustensils.forEach(ustensil => {
            if (!Index.isTagSelected(ustensil)) {
                ustensilsNamesArr[ustensil] = true;
            }
        });
    });

    const nbrRecipesElement = document.querySelector('#nbr-recipes');
    nbrRecipesElement.textContent = `${recipesParam.length} recette${recipesParam.length > 1 ? 's' : ''}`;


    // Convertir le tableau des noms d'ustensiles en un tableau trié
    const sortedUstensils = sortTags(Object.keys(ustensilsNamesArr));

    // Créer l'HTML pour les tags d'ustensiles
    function makeUstensilsHTML(ustensils) {
        console.log("affichage ustensiles dans selectBox");
        let ustensilsHTML = '';
        const addedUstensils = [];

        // Parcourir les ustensiles et les ajouter à l'HTML
        ustensils.forEach(ustensil => {
            const formattedName = ustensil.charAt(0).toUpperCase() + ustensil.substring(1).toLowerCase();

            const isDuplicate = addedUstensils.includes(formattedName);

            if (!Index.isTagSelected(formattedName) && !isDuplicate) {
                ustensilsHTML += `<li class="tag">${formattedName}</li>`;
                addedUstensils.push(formattedName);
            }


        });

        // Vérifier si des ustensiles ont été ajoutés et retourner l'HTML approprié
        return ustensilsHTML ? '<ul>' + ustensilsHTML + '</ul>' : '<span>Aucun tag correspondant</span>';
    }

    // Ajouter l'HTML des ustensiles dans la section appropriée du DOM
    ustensilsSection.innerHTML += makeUstensilsHTML(sortedUstensils);
}

// Ajouter un écouteur d'événement à la barre de recherche des ingrédients
const ingredientsSearchInput = document.querySelector('#tag-ingredients-search');
ingredientsSearchInput.addEventListener('input', () => {
    // Récupérer la valeur de recherche pour les ingrédients
    const searchValue = ingredientsSearchInput.value.trim().toLowerCase();
    // Mettre à jour les ingrédients affichés
    updateDisplayedTags('ingredients', searchValue);
});

// Ajouter un écouteur d'événement à la barre de recherche des appareils
const appliancesSearchInput = document.querySelector('#tag-appliances-search');
appliancesSearchInput.addEventListener('input', () => {
    // Récupérer la valeur de recherche pour les appareils
    const searchValue = appliancesSearchInput.value.trim().toLowerCase();
    // Mettre à jour les appareils affichés
    updateDisplayedTags('appliances', searchValue);
});

// Ajouter un écouteur d'événement à la barre de recherche des ustensiles
const ustensilsSearchInput = document.querySelector('#tag-ustensils-search');
ustensilsSearchInput.addEventListener('input', () => {
    // Récupérer la valeur de recherche pour les ustensiles
    const searchValue = ustensilsSearchInput.value.trim().toLowerCase();
    // Mettre à jour les ustensiles affichés
    updateDisplayedTags('ustensils', searchValue);
});

// filtrer et afficher les tags correspondants 
function updateDisplayedTags(tagType, searchValue) {
    // récupérer les tags correspondant au type de tags voulu
    const tagSection = document.querySelector(`#tag-${tagType}`);
    const allTags = tagSection.querySelectorAll('.tag');

    // parcourir tous les tags du type voulu
    allTags.forEach(tag => {
        const tagName = tag.textContent.toLowerCase();
        // vérifier le ce que l'on tape est inclu dans le nom du tag
        // si oui on l'affiche
        // sinon on ne l'affiche pas
        if (tagName.includes(searchValue)) {
            tag.style.display = 'block';
        } else {
            tag.style.display = 'none';
        }
    });
}

// Vider le conteneur des recettes
export function clearRecipes() {
    console.log("clearRecipes");
    const recipesSection = document.querySelector('#card-container');
    recipesSection.innerHTML = '';
}

// Vider le conteneur des tags ingrédients
export function clearIngredients() {
    console.log("clearIngredients");
    const ingredientSection = document.querySelector('#tag-ingredients');
    ingredientSection.innerHTML = '';
}
// Vider le conteneur des tags appareils
export function clearAppliances() {
    console.log("clearAppliances");
    const applianceSection = document.querySelector('#tag-appliances');
    applianceSection.innerHTML = '';
}
// Vider le conteneur des tags ustensiles
export function clearUstensiles() {
    console.log("clearUstensiles");
    const ustensileSection = document.querySelector('#tag-ustensils');
    ustensileSection.innerHTML = '';
}

export function removeSelectedTag(tag) {
    console.log("removeSelectedTag");
    const selectedTagContainer = document.querySelector('#selected-tags');
    const selectedTags = Array.from(selectedTagContainer.querySelectorAll('.selected-tag'));

    // Supprimer le tag de la liste des tags sélectionnés
    const filteredTags = selectedTags.filter(selectedTag => selectedTag.textContent !== tag);
    selectedTagContainer.innerHTML = '';
    filteredTags.forEach(selectedTag => {
        selectedTagContainer.appendChild(selectedTag);
    });

    // Mettre à jour les recettes filtrées
    Index.updateFilteredRecipes();
}

// récupérer le nom du tag
export function createTagFilter(event) {
    const selectedTag = event.target.textContent;
    console.log('Tag sélectionné :', selectedTag);
    displaySelectedTag(selectedTag);

    updateDisplayedTags('ingredients', '');
    updateDisplayedTags('appliances', '');
    updateDisplayedTags('ustensils', '');
}

// créer la vignette des tags sélectionnés
export function displaySelectedTag(tag) {
    const selectedTagContainer = document.querySelector('#selected-tags');

    // Créer un élément HTML pour la vignette du tag
    const tagElement = document.createElement('div');
    tagElement.classList.add('selected-tag');
    tagElement.textContent = tag;

    // Ajouter un bouton de suppression à la vignette
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-tag');
    deleteButton.innerHTML = '&#10005;';
    deleteButton.addEventListener('click', () => {
        selectedTagContainer.removeChild(tagElement);
        Index.removeTagFilter(tag);
        Index.updateFilteredRecipes();
    });

    // Ajouter la vignette du tag à la zone de la vignette sélectionnée
    selectedTagContainer.appendChild(tagElement);
    tagElement.appendChild(deleteButton);
}

// mettre un écouteur d'évènement aux filtres tag pour les afficher ou non selon l'intéraction
// pour chaques filtres tag
blockFilters.forEach((blockFilter) => {
    const filterItem = blockFilter.querySelector('.filter-item');
    const filterCtn = blockFilter.querySelector('.filter-ctn');
    const tagCtn = blockFilter.querySelector('.tag-ctn');

    // afficher les listes selon le click de l'utilisater
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
