import * as View from "./lib/view.js";
import * as Search from "./lib/search.js";
import { recipes } from "../datas/recipes.js";

function init() {
    let recipesSearch = Search.filter(recipes, '', []);
    View.displayRecipes(recipesSearch);
}
init();