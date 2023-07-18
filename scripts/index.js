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

    // Mettre à jour l'affichage des recettes filtrées
    View.displayRecipes(filteredRecipes);
    View.clearIngredients();
    View.displayIngredients(filteredRecipes);
    View.clearAppliances();
    View.displayAppliances(filteredRecipes);
    View.clearUstensiles();
    View.displayUstensils(filteredRecipes);
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

// Initialiser l'appli (pas de recherche ni de tag + afficher les recettes)
function init() {
    let recipesSearch = Search.filter(recipesSource, '', []);

    View.displayRecipes(recipesSearch);
    View.displayIngredients(recipesSearch);
    View.displayAppliances(recipesSearch);
    View.displayUstensils(recipesSearch);

}
init();