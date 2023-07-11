export function recipeFactory(data) {
    const {
        id, image, name, time, description
    } = data;
    const picture = `assets/images/${image}`;

    function getRecipeCardDOM() {
        const article = document.createElement('article');
        article.innerHTML = `                    <a href="#" data-id="${id}">
        <div class="ctn-image">
            <img src="${picture}" alt="Image de la recette ${name}">
            <div class="tmp">${time}</div>
        </div>
        <div class="recipe-infos">
            <div class="ctn-txt">
                <div class="align">
                    <div class="all-size">
                        <h3 class="card-title">${name}</h3>
                    </div>
                    <h4>RECETTE</h4>
                    <div class="all-size">
                        <p class="description">${description}</p>
                    </div>
                    <h4>INGREDIENTS</h4>
                    <div class="all-size">
                        <div class="ingredients">
                            <div>Ingrédient 1</div>
                            <div>Grammage ingrédient 1</div>
                        </div>
                        <div class="ingredients">
                            <p>Ingrédient 2</p>
                            <p>Grammage ingrédient 2</p>
                        </div>
                    </div>

                    <div class="all-size">
                        <div class="ingredients">
                            <p>Ingrédient 4</p>
                            <p>Grammage ingrédient 4</p>
                        </div>
                        <div class="ingredients">
                            <p>Ingrédient 5</p>
                            <p>Grammage ingrédient 5</p>
                        </div>
                    </div>
                    <div class="all-size">
                        <div class="ingredients">
                            <p>Ingrédient 4</p>
                            <p>Grammage ingrédient 4</p>
                        </div>
                        <div class="ingredients">
                            <p>Ingrédient 5</p>
                            <p>Grammage ingrédient 5</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </a>`;
        return (article);
    }
    return { getRecipeCardDOM };
}
