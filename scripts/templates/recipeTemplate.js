import { Recipe } from "../factories/RecipeFactory.js";

import { appendChild } from "../utils/appendChild.js";

export default function recipeTemplate(recipes, ingredient, ustensil, appliance) {
    const singleRecipe = recipes != null ? new Recipe(recipes) : null;

    let picture;
    if (singleRecipe != null) {
        picture = `assets/images/${singleRecipe.image}`;
    }
    function getRecipeCardDom() {
        const article = document.createElement('article');
        article.setAttribute("class", ".recipeCard");

        const link = document.createElement('a');
        article.appendChild(link);

        const divImage = document.createElement("div");
        divImage.setAttribute("class", "divImage");
        link.appendChild(divImage);

        const divPrice = document.createElement("div");
        divPrice.setAttribute("class", "divPrice");
        divPrice.textContent = singleRecipe.time + "min";
        divImage.appendChild(divPrice);

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

        const IngredientsDetailsBulk = singleRecipe.ingredients;
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

    function createFilterIngredients() {
        const ingrContents = document.querySelector("#ingrContents");
        const singleIngrContent = document.createElement("button");
        singleIngrContent.innerText = ingredient;
        ingrContents.appendChild(singleIngrContent);
    }

    function createFilterUstensils() {
        const ustContents = document.querySelector("#ustContents");
        const singleUstContent = document.createElement("button");
        singleUstContent.innerText = ustensil;
        //console.log(ustensil);
        ustContents.appendChild(singleUstContent);
    }
    
    function createFilterAppliances(){
        const applContents = document.querySelector("#applContents");
        const singleApplContent = document.createElement("button");
        singleApplContent.innerText = appliance;
        applContents.appendChild(singleApplContent);
    }

    return { getRecipeCardDom, createFilterIngredients, createFilterUstensils, createFilterAppliances};
}