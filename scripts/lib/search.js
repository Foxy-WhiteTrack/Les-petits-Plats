// import recipes from "../../datas/recipes.js";

// prog fonctionnelle => utiliser les fonctions des tableaux

// Filtrer les résutats de recette selon la recherche
export function filter(recipesParam, searchValue, tags) {
    // vérifier si la recherche fait 3 caractère min
    if (searchValue.length < 3) {
        return recipesParam;
    }

    // filtrer les recettes
    const filteredRecipes = recipesParam.filter(recipe => {
        // Convertir le titre, la description et les ingrédients en minuscules
        const title = recipe.name.toLowerCase();
        const description = recipe.description.toLowerCase();
        const ingredients = recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase());

        return (
            // Vérifier si la valeur de recherche est présente dans le titre, la description ou les ingrédients
            title.includes(searchValue.toLowerCase()) ||
            description.includes(searchValue.toLowerCase()) ||
            ingredients.some(ingredient => ingredient.includes(searchValue.toLowerCase()))
        );
    });

    return filteredRecipes;
}
