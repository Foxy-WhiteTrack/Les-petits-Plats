import { recipeFactory } from './recipeFactory.js';
import recipes from '../datas/recipes.js';

function createCardRecipe(recipeData) {
    return {
        id: recipeData.id,
        image: recipeData.image,
        name: recipeData.name,
        time: recipeData.time,
        description: recipeData.description
    };
}

function createItems() {
    const items = [];

    recipes.forEach(itemData => {
        const item = createCardRecipe(itemData);
        items.push(item);
    });

    return items;
}

function displayData() {
    const recipesSection = document.querySelector('#card-container');

    const items = createItems();

    items.forEach(item => {
        const recipeModel = recipeFactory(item);
        const recipeCardDOM = recipeModel.getRecipeCardDOM();
        recipesSection.appendChild(recipeCardDOM);
    });
}

displayData();
