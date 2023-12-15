import recipes from "../../data/recipes.js";
console.log(recipes);

import { recipeTemplate } from "../templates/recipeTemplate.js";


async function displayRecipes(recipes) {
    const recipesSection = document.querySelector(".recipes-section");
    recipes.forEach((recipe) => {
        const recipeModel = recipeTemplate(recipe);
        const recipeCardDOM = recipeModel.getRecipeCardDom();
        recipesSection.appendChild(recipeCardDOM);
    });
}

async function displayNumberTotalOfRecipes(recipes){
    const numberTotalRecipes = document.querySelector(".numberTotalRecipes");
    numberTotalRecipes.textContent = recipes.length;
}


displayRecipes(recipes);
displayNumberTotalOfRecipes(recipes);