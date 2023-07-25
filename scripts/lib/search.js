// prog fonctionnelle => utiliser les fonctions des tableaux

// Filtrer les résutats de recette selon la recherche
export function filter(recipesParam, searchValue, tags) {
    console.log("filtrer les résultats");
    let filteredRecipes = recipesParam;

    const filterOnValue = function (recipe) {
        const title = recipe.name.toLowerCase();
        const description = recipe.description.toLowerCase();
        const ingredients = recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase());

        return (
            title.includes(searchValue.toLowerCase()) ||
            description.includes(searchValue.toLowerCase()) ||
            ingredients.some(ingredient => ingredient.includes(searchValue.toLowerCase()))
        );
    }

    if (searchValue.length >= 3) {
        filteredRecipes = filteredRecipes.filter(filterOnValue);
    }

    // récupèrer la liste des tags 
    // Pour chacun des tags on va vérifier si le tag est inclut dans le contenus des recettes
    // Si une des recette contient le tag alors on retourne une nouvelle liste de recette filtrée
    tags.forEach(tag => {
        searchValue = tag;
        filteredRecipes = filteredRecipes.filter(filterOnValue);
    });


    return filteredRecipes;
}
