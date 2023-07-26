import * as View from "./lib/view.js";
import * as Search from "./lib/search.js";
import { recipes as recipesSource } from "../datas/recipes.js";

const searchInput = document.querySelector('#search-input');
const tagsIngredient = document.querySelector('#tag-ingredients');
const tagsAppliance = document.querySelector('#tag-appliances');
const tagsUstensil = document.querySelector('#tag-ustensils');

let filterTagList = {};
let valueOfSearch = '';

export function isTagSelected(tagToCheck) {
    return filterTagList[tagToCheck] ? true : false;
    // return !!filterTagList[tagToCheck]; // la même chose que la ligne du dessus, utilisant les notNot
}

// ajouter un tag à la liste des tags
export function addTagFilter(addedTag) {

    // ajouter le tag à la liste
    filterTagList[addedTag] = true;

    // retourner la liste filtrée
    return getFilteredRecipes();
}

export function getFilteredRecipes() {
    return Search.filter(recipesSource, getSearchValue(), getfilterTags());
}

function getSearchValue() {
    return valueOfSearch;
}
function getfilterTags() {
    return Object.keys(filterTagList);
}

// supprimer le tag de la liste des tags
export function removeTagFilter(tagToRemove) {
    // supprimer le tag de la liste des critères
    delete filterTagList[tagToRemove];
    // retourner la liste filtrée
    return getFilteredRecipes();
}

function clearSearch() {
    // récupérer la chaine de caractère (input)
    // vider la chaine de caractère
    valueOfSearch = '';
    // récupérer la liste des tags
    // vider la liste des tags
    filterTagList = {};
    // refaire une recherche après avoir retiré les filtres
    // retourner la liste des recettes non filtrée
    return getFilteredRecipes();
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
    const filteredRecipes = addTagFilter(searchValue);
    // const filteredRecipes = Search.filter(recipesSource, searchValue, []);

    // Vider le conteneur des recettes
    View.clearRecipes();

    if (searchValue === '') {
        const allRecipes = clearSearch();
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
        let recipesSearch = clearSearch();
        updateRecipes(recipesSearch, false);
        View.clearDisplayError();
    }
});

function eventTag(event) {
    if (event.target.classList.contains('tag')) {
        console.log("clic sur un tag");

        const selectedTag = event.target.textContent;
        // const filteredRecipes = Search.filter(recipesSource, selectedTag, []);

        const filteredRecipes = addTagFilter(selectedTag);

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
    const searchValue = getSearchValue();
    const selectedTags = getfilterTags();
    const filteredRecipes = getFilteredRecipes();

    // Vider le conteneur des recettes
    View.clearRecipes();

    if (filteredRecipes.length === 0) {
        const usedTags = selectedTags.join(', ');
        View.displayError(searchValue, usedTags);
    } else {
        View.clearDisplayError();

        const nbrRecipesElement = document.querySelector('#nbr-recipes');
        nbrRecipesElement.textContent = `${filteredRecipes.length} recette${filteredRecipes.length > 1 ? 's' : ''}`;
        // Mettre à jour l'affichage des recettes filtrées
        updateRecipes(filteredRecipes, true);
    }
}

// Initialiser l'appli (pas de recherche ni de tag + afficher les recettes)
function init() {
    console.log("init");
    let recipesSearch = clearSearch();
    updateRecipes(recipesSearch, false);
}
init();