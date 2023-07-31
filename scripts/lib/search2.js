// traitement des données => controleur

// Filtrer les résultats de recette selon la recherche
export function filter(recipesParam, searchValue, tags) {
    console.log("filtrer les résultats");
    const filteredRecipes = [];

    const searchValueLC = searchValue.toLowerCase();

    for (const recipe of recipesParam) {
        const title = recipe.name.toLowerCase();
        const description = recipe.description.toLowerCase();
        const ingredients = recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase());
        const appliance = recipe.appliance.toLowerCase();
        const ustensiles = recipe.ustensils.map(ustensil => ustensil.toLowerCase());

        if (
            title.includes(searchValueLC) ||
            description.includes(searchValueLC) ||
            ingredients.some(ingredient => ingredient.includes(searchValueLC)) ||
            appliance.includes(searchValueLC) ||
            ustensiles.some(ustensile => ustensile.includes(searchValueLC))
        ) {
            filteredRecipes.push(recipe);
        }
    }

    // récupérer la liste des tags 
    // Pour chacun des tags on va vérifier si le tag est inclus dans le contenu des recettes
    // Si une des recettes contient le tag alors on retourne une nouvelle liste de recettes filtrées
    for (const tag of tags) {
        const tagLC = tag.toLowerCase();
        for (const recipe of recipesParam) {
            const ingredients = recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase());
            const appliance = recipe.appliance.toLowerCase();
            const ustensiles = recipe.ustensils.map(ustensil => ustensil.toLowerCase());

            if (
                ingredients.includes(tagLC) ||
                appliance.includes(tagLC) ||
                ustensiles.includes(tagLC)
            ) {
                filteredRecipes.push(recipe);
            }
        }
    }

    return filteredRecipes;
}
