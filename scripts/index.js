import * as View from "./lib/view.js";
import * as Search from "./lib/search.js";
import { recipes as recipesSource } from "../datas/recipes.js";

function init() {
    let recipesSearch = Search.filter(recipesSource, '', []);
    View.displayRecipes(recipesSearch);
    View.displayIngredients(recipesSearch);
}
init();