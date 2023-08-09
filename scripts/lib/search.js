// prog boucles natives => utiliser les boucles natives (while, for...)

// traitement des données => controleur

// Filtrer les résultats de recette selon la recherche
export function filter(recipesParam, searchValue, tags) {
    console.log("filtrer les résultats");
    let filteredRecipes = recipesParam;

    // Créer une fonction pour filtrer les recettes en fonction de la valeur de recherche
    function filterOnValue(recipe) {
        const searchValueLC = searchValue.toLowerCase();
        const title = recipe.name.toLowerCase();
        const description = recipe.description.toLowerCase();

        // Utiliser une boucle pour créer un nouveau tableau des ingrédients en minuscules
        const ingredients = [];
        for (const ingredientObj of recipe.ingredients) {
            ingredients.push(ingredientObj.ingredient.toLowerCase());
        }

        const appliance = recipe.appliance.toLowerCase();

        // Utiliser une boucle pour créer un nouveau tableau des ustensiles en minuscules
        const ustensils = [];
        for (const ustensil of recipe.ustensils) {
            ustensils.push(ustensil.toLowerCase());
        }

        // Utiliser une boucle pour vérifier si l'un des ingrédients inclut la valeur de recherche
        let isIngredientIncluded = false;
        for (const ingredient of ingredients) {
            if (ingredient.includes(searchValueLC)) {
                isIngredientIncluded = true;
                break;
            }
        }

        return (
            title.includes(searchValueLC) ||
            description.includes(searchValueLC) ||
            isIngredientIncluded ||
            appliance.includes(searchValueLC) ||
            ustensils.includes(searchValueLC)
        );
    }

    if (searchValue.length >= 3) {
        const newFilteredRecipes = [];

        for (const recipe of filteredRecipes) {
            if (filterOnValue(recipe)) {
                newFilteredRecipes.push(recipe);
            }
        }

        filteredRecipes = newFilteredRecipes;
    }


    // Filtrer en fonction des tags
    for (const tag of tags) {
        const tagLC = tag.toLowerCase();

        // Filtrer les recettes en fonction de chaque tag
        filteredRecipes = filteredRecipes.filter(recipe => {
            // Utiliser une boucle pour créer un nouveau tableau des ingrédients en minuscules
            const ingredients = [];
            for (const ingredientObj of recipe.ingredients) {
                ingredients.push(ingredientObj.ingredient.toLowerCase());
            }

            const appliance = recipe.appliance.toLowerCase();

            // Utiliser une boucle pour créer un nouveau tableau des ustensiles en minuscules
            const ustensils = [];
            for (const ustensil of recipe.ustensils) {
                ustensils.push(ustensil.toLowerCase());
            }

            // Utiliser une boucle pour vérifier si l'un des ingrédients inclut la valeur de recherche
            let isIngredientIncluded = false;
            for (const ingredient of ingredients) {
                if (ingredient.includes(tagLC)) {
                    isIngredientIncluded = true;
                    break;
                }
            }

            return (
                isIngredientIncluded ||
                appliance.includes(tagLC) ||
                ustensils.includes(tagLC)
            );
        });
    }

    return filteredRecipes;
}
