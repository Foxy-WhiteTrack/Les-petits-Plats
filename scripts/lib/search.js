// prog fonctionnelle => utiliser les fonctions des tableaux

// traitement des données => controleur

// Filtrer les résutats de recette selon la recherche
export function filter(recipesParam, searchValue, tags) {
    console.log("filtrer les résultats");
    let filteredRecipes = recipesParam;

    const filterOnValue = function (recipe) {
        let searchValueLC = searchValue.toLowerCase();
        const title = recipe.name.toLowerCase();
        const description = recipe.description.toLowerCase();
        const ingredients = recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase());
        const appliance = recipe.appliance.toLowerCase();
        const ustensiles = recipe.ustensils.map(ustensil => ustensil.toLowerCase());
        return (
            title.includes(searchValueLC) ||
            description.includes(searchValueLC) ||
            ingredients.some(ingredient => ingredient.includes(searchValueLC)) ||
            appliance.includes(searchValueLC) ||
            ustensiles.some(ustensile => ustensile.includes(searchValueLC))
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
