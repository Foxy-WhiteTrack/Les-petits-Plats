import * as View from "./lib/view.js";
import * as Search from "./lib/search.js";
import { recipes as recipesSource } from "../datas/recipes.js";

const searchInput = document.querySelector('#search-input');
const tagsIngredient = document.querySelector('#tag-ingredients');
const tagsAppliance = document.querySelector('#tag-appliances');
const tagsUstensil = document.querySelector('#tag-ustensils');

export function removeTag(tag, deleteButton, selectedTagContainer, tagElement) {
    deleteButton.addEventListener('click', () => {
        selectedTagContainer.removeChild(tagElement);
        updateFilteredRecipes();
        Search.removeTagFilter(tag);
    });
}

function updateRecipes(recipes, clearIsNeed) {
    if (clearIsNeed) {
        View.clearIngredients();
        View.clearAppliances();
        View.clearUstensiles();
    }
    View.createRecipes(recipes);
    View.displayIngredients(recipes);
    View.displayAppliances(recipes);
    View.displayUstensils(recipes);
}

// écouter les évènement liés à l'input (barre de recherche)
searchInput.addEventListener('input', () => {
    // nettoyer la valeur des espaces vide avant et après
    const searchValue = searchInput.value.trim();

    // filtrer les recettes en fonctoin de la valeur de recherche (input)
    const filteredRecipes = Search.addTagFilter(searchValue);
    // const filteredRecipes = Search.filter(recipesSource, searchValue, []);

    // Vider le conteneur des recettes
    View.clearRecipes();

    if (searchValue === '') {
        const allRecipes = Search.filter(recipesSource, '', []);
        View.clearRecipes();

        updateRecipes(allRecipes, true);
    }

    if (searchValue.length >= 3) {

        if (filteredRecipes.length === 0) {
            View.displayError(searchValue, '');
        } else {
            View.clearDisplayError();

            // Mettre à jour l'affichage des recettes filtrées
            updateRecipes(filteredRecipes, true);
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
        const allRecipes = Search.addTagFilter(searchValue);
        // const allRecipes = Search.filter(recipesSource, '', []);
        View.clearRecipes();
        updateRecipes(allRecipes, true);
    }
});

function eventTag(event) {
    if (event.target.classList.contains('tag')) {
        console.log("clic sur un tag");

        const selectedTag = event.target.textContent;
        // const filteredRecipes = Search.filter(recipesSource, selectedTag, []);

        const filteredRecipes = Search.addTagFilter(selectedTag);

        View.clearRecipes();
        updateRecipes(filteredRecipes, true);
        View.createTagFilter(event);
    }
}

tagsIngredient.addEventListener('click', (event) => {
    console.log("clic sur ingredient");
    eventTag(event);
});
tagsAppliance.addEventListener('click', (event) => {
    console.log("clic sur appareil");
    eventTag(event);
});
tagsUstensil.addEventListener('click', (event) => {
    console.log("clic sur ustensiles");
    eventTag(event);
});

export function updateFilteredRecipes() {
    console.log("updateFilteredRecipes");
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
        View.createRecipes(filteredRecipes);

        const nbrRecipesElement = document.querySelector('#nbr-recipes');
        nbrRecipesElement.textContent = `${filteredRecipes.length} recette${filteredRecipes.length > 1 ? 's' : ''}`;

        updateRecipes(filteredRecipes, true);
    }
}

// Initialiser l'appli (pas de recherche ni de tag + afficher les recettes)
function init() {
    console.log("init");
    let recipesSearch = Search.filter(recipesSource, '', []);

    updateRecipes(recipesSearch, false);
}
init();