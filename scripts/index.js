import * as View from "./lib/view.js";
import * as Search from "./lib/search.js";
import { recipes as recipesSource } from "../datas/recipes.js";

const searchInput = document.querySelector('#search-input');
const tagsIngredient = document.querySelector('#tag-ingredients');
const tagsAppliance = document.querySelector('#tag-appliances');
const tagsUstensil = document.querySelector('#tag-ustensils');

// écouter les évènement liés à l'input (barre de recherche)
searchInput.addEventListener('input', () => {
    // nettoyer la valeur des espaces vide avant et après
    const searchValue = searchInput.value.trim();

    // filtrer les recettes en fonctoin de la valeur de recherche (input)
    const filteredRecipes = Search.filter(recipesSource, searchValue, []);

    // Vider le conteneur des recettes
    View.clearRecipes();

    if (searchValue === '') {
        const allRecipes = Search.filter(recipesSource, '', []);
        View.clearRecipes();
        View.displayRecipes(allRecipes);
        View.clearIngredients();
        View.displayIngredients(allRecipes);
        View.clearAppliances();
        View.displayAppliances(allRecipes);
        View.clearUstensiles();
        View.displayUstensils(allRecipes);
    }

    if (searchValue.length >= 3) {

        if (filteredRecipes.length === 0) {
            View.displayError(searchValue, '');
        } else {
            View.clearDisplayError();

            // Mettre à jour l'affichage des recettes filtrées
            View.displayRecipes(filteredRecipes);
            View.clearIngredients();
            View.displayIngredients(filteredRecipes);
            View.clearAppliances();
            View.displayAppliances(filteredRecipes);
            View.clearUstensiles();
            View.displayUstensils(filteredRecipes);
        }
    } else {
        View.clearDisplayError();
    }
});

//réinitialiser les résultats lorsque la barre de recherche est vidée
searchInput.addEventListener('blur', () => {
    const searchValue = searchInput.value.trim();

    // Si la barre de recherche est vide, afficher toutes les recettes non filtrées
    if (searchValue === '') {
        const allRecipes = Search.filter(recipesSource, '', []);
        View.clearRecipes();
        View.displayRecipes(allRecipes);
        View.clearIngredients();
        View.displayIngredients(allRecipes);
        View.clearAppliances();
        View.displayAppliances(allRecipes);
        View.clearUstensiles();
        View.displayUstensils(allRecipes);
    }
});

function eventTag(event) {
    if (event.target.classList.contains('tag')) {
        View.createTagFilter(event);
        const selectedTag = event.target.textContent;
        const filteredRecipes = Search.filter(recipesSource, selectedTag, []);
        View.clearRecipes();
        View.displayRecipes(filteredRecipes);
        View.clearIngredients();
        View.displayIngredients(filteredRecipes);
        View.clearAppliances();
        View.displayAppliances(filteredRecipes);
        View.clearUstensiles();
        View.displayUstensils(filteredRecipes);
    }
}
tagsIngredient.addEventListener('click', (event) => {
    eventTag(event);
});
tagsAppliance.addEventListener('click', (event) => {
    eventTag(event);
});
tagsUstensil.addEventListener('click', (event) => {
    eventTag(event);
});

export function updateFilteredRecipes() {
    const searchValue = searchInput.value.trim();
    const selectedTags = Array.from(document.querySelectorAll('.selected-tag')).map(tag => tag.textContent);

    const filteredRecipes = Search.filter(recipesSource, searchValue, selectedTags);

    // Vider le conteneur des recettes
    View.clearRecipes();

    if (filteredRecipes.length === 0) {
        const usedTags = selectedTags.join(', ');
        View.displayError(searchValue, usedTags);
    } else {
        View.clearDisplayError();
        // Mettre à jour l'affichage des recettes filtrées
        View.displayRecipes(filteredRecipes);

        const nbrRecipesElement = document.querySelector('#nbr-recipes');
        nbrRecipesElement.textContent = `${filteredRecipes.length} recette${filteredRecipes.length > 1 ? 's' : ''}`;

        View.clearIngredients();
        View.displayIngredients(filteredRecipes);
        View.clearAppliances();
        View.displayAppliances(filteredRecipes);
        View.clearUstensiles();
        View.displayUstensils(filteredRecipes);
    }
}

// Initialiser l'appli (pas de recherche ni de tag + afficher les recettes)
function init() {
    let recipesSearch = Search.filter(recipesSource, '', []);

    View.displayRecipes(recipesSearch);
    View.displayIngredients(recipesSearch);
    View.displayAppliances(recipesSearch);
    View.displayUstensils(recipesSearch);

}
init();