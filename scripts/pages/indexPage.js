import recipes from "../../data/recipes.js";

import recipeTemplate from "../templates/recipeTemplate.js";

//formulaire de recherche principal
let formSearch = document.querySelector("#formSearch");

//tableau avec toutes les recettes, ingredients, ustensiles

let dataRecord = [];

let ingredientsRecord = [];
let ustensilsRecord = [];
let appliancesRecord = [];

const recipesSection = document.querySelector(".recipes-section");
const ingrContents = document.querySelector("#ingrContents");

//créé le tableau initial avec toutes les recettes
function init() {
    for (let recipe of recipes) {
        dataRecord.push({
            "label": recipe.name,
            "id": recipe.id
        });
        dataRecord.push({
            "label": recipe.description,
            "id": recipe.id
        });
        recipe.ingredients.map(ingr => {
            dataRecord.push({
                "label": ingr.ingredient,
                "id": recipe.id
            });
        });
        recipe.ustensils.forEach(ustensil => {
            if (!ustensilsRecord.includes(ustensil)) {
                ustensilsRecord.push(ustensil);
            }
        })

        if (!appliancesRecord.includes(recipe.appliance)) {
            appliancesRecord.push(recipe.appliance);
        }
    }
    console.table(ingredientsRecord);
    setIngrRecord(recipes);
}
init();

//Ecoute ce qui est entré dans le champs input principal
formSearch.addEventListener("input", function () {
    search();
});

//filtre le tableau
function search() {
    let filterResults = [];
    let filterRecord = [];
    if (formSearch.value.length > 2) {
        recipesSection.innerHTML = "";

        for (let singleDataRecord of dataRecord) {
            if (singleDataRecord.label.toLowerCase().includes(formSearch.value.toLowerCase())) {
                filterResults.push(singleDataRecord);
            }
        }
        for (let singleFilterResult of filterResults) {
            for (let singleRecipe of recipes) {
                if (singleRecipe.id === singleFilterResult.id) {
                    if (!filterRecord.includes(singleRecipe)) {
                        filterRecord.push(singleRecipe);
                    }
                }
            }
        }
        displayRecipes(filterRecord);
        ingredientsRecord = [];
        setIngrRecord(filterRecord);
        ingrContents.innerHTML = "";
        displayIngr(ingredientsRecord);
    }
}
//        recipe.ingredients.map(ingr => {

function setIngrRecord(recipes) {
    for (let recipe of recipes) {
        for (let ingr of recipe.ingredients) {
            if (!ingredientsRecord.includes(ingr.ingredient.toLowerCase())) {
                ingredientsRecord.push(ingr.ingredient.toLowerCase());
            }
        }
    };
    console.log(ingredientsRecord);
}

async function displayRecipes(recipes) {
    const recipesSection = document.querySelector(".recipes-section");
    recipes.forEach((recipe) => {
        const recipeModel = recipeTemplate(recipe, null);
        const recipeCardDOM = recipeModel.getRecipeCardDom();
        recipesSection.appendChild(recipeCardDOM);
    });
}

function displayIngr(ingredients) {
    ingredients.forEach((ingredient) => {
        const recipeModel = recipeTemplate(null, ingredient);
        recipeModel.createFilterIngredients();
    })
}

async function displayNumberTotalOfRecipes(recipes) {
    const numberTotalRecipes = document.querySelector(".numberTotalRecipes");
    numberTotalRecipes.textContent = recipes.length;
}


displayRecipes(recipes);
displayNumberTotalOfRecipes(recipes);
displayIngr(ingredientsRecord);