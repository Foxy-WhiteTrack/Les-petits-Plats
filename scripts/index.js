import * as View from "./lib/view.js";
import * as Search from "./lib/search.js";
import { recipes as recipesSource } from "../datas/recipes.js";

const searchInput = document.querySelector('#search-input');
const tagsIngredient = document.querySelector('#tag-ingredients');
const tagsAppliance = document.querySelector('#tag-appliances');
const tagsUstensil = document.querySelector('#tag-ustensils');

let filterTagList = {};
let valueOfSearch = '';

// model - datastore => api (getters et setters) 

// savoir si le tag est deja sélectionné
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
// Obtenir les recettes filtrées selon la recherche et les tags
export function getFilteredRecipes() {
    return Search.filter(recipesSource, getSearchValue(), getfilterTags());
}
function setSearchValue(searchValue) {
    valueOfSearch = searchValue;

    return getFilteredRecipes();
}
// récupérer la recherche active
function getSearchValue() {
    return valueOfSearch;
}
// récupérer les Tags actifs
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
    // vider l'affichage des tags dans l'interface utilisateur
    View.clearIngredients();
    View.clearAppliances();
    View.clearUstensiles();
    // refaire une recherche après avoir retiré les filtres
    // retourner la liste des recettes non filtrée
    return getFilteredRecipes();
}

// réafficher les recettes, ingrédients, appareils et ustensiles
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

    // Vider le conteneur des recettes
    View.clearRecipes();

    if (searchValue.length < 3) {
        // retirer les erreur
        View.clearDisplayError();
        // résultats non filtrés
        let recipesSearch = setSearchValue('');
        updateRecipes(recipesSearch, true);
    } else {
        // déterminer si y'a des résultats
        let recipesSearch = setSearchValue(searchValue);
        // soit y'a des résultats
        if (recipesSearch.length > 0) {
            // supprimer l'erreur
            View.clearDisplayError();
            // affiche les résultats filtrés
            updateRecipes(recipesSearch, true);
            //soit y'en a pas
        } else {
            // afficher l'erreur
            View.displayError(searchValue, getfilterTags().join(', '));
        }

    }
});

// gérer les evenements par tag
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

// écouteur d'event sur ingrédient
tagsIngredient.addEventListener('click', (event) => {
    console.log("clic sur ingredient");
    eventTag(event);
});
// écouteur d'event sur appareil
tagsAppliance.addEventListener('click', (event) => {
    console.log("clic sur appareil");
    eventTag(event);
})
// écouteur d'event sur ustensil
tagsUstensil.addEventListener('click', (event) => {
    console.log("clic sur ustensiles");
    eventTag(event);
});

// mettre à jour les recettes filtrées
export function updateFilteredRecipes() {
    console.log("updateFilteredRecipes");
    const searchValue = getSearchValue();
    const selectedTags = getfilterTags();
    const filteredRecipes = getFilteredRecipes();

    // Vider le conteneur des recettes
    View.clearRecipes();

    if (filteredRecipes.length === 0) {
        const usedTags = selectedTags.join(', ');
        console.log('error_2');
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