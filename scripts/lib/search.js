// import recipes from "../../datas/recipes.js";

// prog fonctionnelle => utiliser les fonctions des tableaux

// Filtrer les résutats de recette selon la recherche
export function filter(recipesParam, searchValue, tags) {
    let filteredRecipes = recipesParam;

    if (searchValue.length >= 3) {
        filteredRecipes = filteredRecipes.filter(recipe => {
            const title = recipe.name.toLowerCase();
            const description = recipe.description.toLowerCase();
            const ingredients = recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase());

            return (
                title.includes(searchValue.toLowerCase()) ||
                description.includes(searchValue.toLowerCase()) ||
                ingredients.some(ingredient => ingredient.includes(searchValue.toLowerCase()))
            );
        });
    }

    tags.forEach(tag => {
        filteredRecipes = filteredRecipes.filter(recipe => {
            // Votre logique de filtrage basée sur les tags
            // Par exemple, vérifier si le tag est présent dans les ingrédients, appareils, ustensiles, etc.
        });
    });

    return filteredRecipes;
}

