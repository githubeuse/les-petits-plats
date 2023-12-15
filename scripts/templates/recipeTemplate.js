import { Recipe } from "../factories/RecipeFactory.js";

import { appendChild } from "../utils/appendChild.js";

export function recipeTemplate(recipes) {
    const singleRecipe = new Recipe(recipes);

    const picture = `assets/images/${singleRecipe.image}`;

    function getRecipeCardDom() {
        const article = document.createElement('article');
        article.setAttribute("class", ".recipeCard");

        const link = document.createElement('a');
        article.appendChild(link);

        const img = document.createElement('img');
        img.setAttribute("src", picture);
        img.setAttribute("class", "recipePicture");
        link.appendChild(img);

        const recipeTextContainer = document.createElement('div');
        recipeTextContainer.setAttribute("class", "recipeTextContainer");
        link.appendChild(recipeTextContainer);

        const recipeTitle = document.createElement('h2');
        recipeTitle.setAttribute("class", "recipeTitle");
        recipeTitle.textContent = singleRecipe.name;
        recipeTextContainer.appendChild(recipeTitle);

        const motRecette = document.createElement('h3');
        motRecette.textContent = "Recette";
        motRecette.setAttribute("class", "motRecette");
        recipeTextContainer.appendChild(motRecette);

        const recette = document.createElement('span');
        recette.setAttribute("class", "recette");
        recette.textContent = singleRecipe.description;
        recipeTextContainer.appendChild(recette);

        const motIngredients = document.createElement('h3');
        motIngredients.setAttribute("class", "motIngredients");
        motIngredients.textContent = "Ingrédients";
        recipeTextContainer.appendChild(motIngredients);

        const divIngredientsDetails = document.createElement('div');
        divIngredientsDetails.setAttribute("class", "divIngredientsDetails");

        const IngredientsDetailsBulk  = singleRecipe.ingredients;
        IngredientsDetailsBulk.forEach(ingredientInfo => {
            const ingredientCard = document.createElement("div");
            const ingredientName = document.createElement("span");
            ingredientName.setAttribute("class", "ingredientName");
            ingredientName.textContent = `${ingredientInfo.ingredient}`;
            ingredientCard.appendChild(ingredientName);

            const ingredientQuantityUnitLine = document.createElement("div");
            ingredientQuantityUnitLine.setAttribute("class", "d-flex ingredientQuantityUnitLine");

            const ingredientQuantity = document.createElement("span");
            ingredientQuantity.setAttribute("class", "ingredientQuantity");
            ingredientQuantity.textContent = `${ingredientInfo.quantity}`;
            ingredientQuantityUnitLine.appendChild(ingredientQuantity);

            const ingredientUnit = document.createElement("span");
            ingredientUnit.setAttribute("class", "ingredientUnit")
            ingredientUnit.textContent = ` ${ingredientInfo.unit}`;
            ingredientQuantityUnitLine.appendChild(ingredientUnit);

            ingredientCard.appendChild(ingredientQuantityUnitLine);

            divIngredientsDetails.appendChild(ingredientCard);

        });
        recipeTextContainer.appendChild(divIngredientsDetails);

 
        return (article);
    }
    return { getRecipeCardDom };
}