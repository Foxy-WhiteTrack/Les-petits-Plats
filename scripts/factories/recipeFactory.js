export function recipeFactory(data) {
    const {
        id, image, name, serving, ingredients
    } = data;
    const picture = `assets/images/${image}`;

    function getRecipeCardDOM() {
        const article = document.createElement('article');
        article.innerHTML = `<a href="#" aria-label="recipe ${name}" tabindex="0">
      <div><img src="${picture}" alt="Recette: ${name}"></div>
              <h2>${name}</h2>
          </a>
          <div aria-label="Informations concernant la recette">
          </div>`;
        return (article);
    }
    return { getRecipeCardDOM };
}
