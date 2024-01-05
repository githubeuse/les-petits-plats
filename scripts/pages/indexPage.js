import recipes from "../../data/recipes.js";

import recipeTemplate from "../templates/recipeTemplate.js";

let formSearch = document.querySelector("#formSearch"); //formulaire de recherche principal

let dataRecord = []; //tableau avec toutes les recettes, ingredients, ustensiles

let ingredientsRecord = []; //tableau avec tous les ingredients

let ustensilsRecord = []; //tableau avec tous les ustensiles

let appliancesRecord = []; //tableau avec tous les appareils

const recipesSection = document.querySelector(".recipes-section"); //Section contenant les recettes

const ingrContents = document.querySelector("#ingrContents"); //Filtre contenant les ingrédients


const ustContents = document.querySelector("#ustContents"); //Filtre contenant les ustenstiles


const applContents = document.querySelector("#applContents"); //Filtre contenant les appareils


//TODO: fonction pour créér le tableau
function init() {
    for (let recipe of recipes) {
        dataRecord.push({ // nom de recette
            "label": recipe.name,
            "id": recipe.id
        });
        dataRecord.push({ // description de recette
            "label": recipe.description,
            "id": recipe.id
        });

        recipe.ingredients.map(ingr => { // chaque ingredient
            dataRecord.push({
                "label": ingr.ingredient,
                "id": recipe.id
            });
        });

    }

    setIngrRecord(recipes); // configure les ingredients a partir du tableau recipes 
    setUstRecord(recipes); // configure les ustensiles à partir du tableau recipes
    setApplRecord(recipes); // configure les appareils/appliances à partir du tableau recipes

    //console.table(appliancesRecord);

}
init();//appelle la fonction


formSearch.addEventListener("input", function () { //Ecoute ce qui est entré dans le champs input principal
    search();
});

function search() { //TODO: fonction de recherche

    //tableau temporaire avec toutes les recettes
    let filterRecord = [];

    //tableau avec resultats filtrés
    let filterResults = [];

    //si l'U entre + de 2 caractères
    if (formSearch.value.length > 2) {

        //vide la section des resultats
        recipesSection.innerHTML = "";

        //verifie si l'input correspond à une data du tableau dataRecord
        //si oui l'ajoute à filterResults
        for (let singleDataRecord of dataRecord) {
            if (singleDataRecord.label.toLowerCase().includes(formSearch.value.toLowerCase())) {
                filterResults.push(singleDataRecord);
            }
        }

        // de sorte à constituer un tableau avec uniquement des résultats filtré sans doublon
        for (let singleFilterResult of filterResults) { // pour chaque élément des résultats filtrés dans filterResults
            for (let singleRecipe of recipes) { // et pour chaque recette de recipes
                if (singleRecipe.id === singleFilterResult.id) { // vérifie si les id correspond

                    if (!filterRecord.includes(singleRecipe)) {
                        filterRecord.push(singleRecipe);
                    }
                }
            }
        }
        //affiche les recettes filtrées dans la section recette
        displayRecipes(filterRecord);


        ingredientsRecord = []; //crée un tableau temporaire pour les ingredients
        ustensilsRecord = []; //crée un tableau temporaire pour les ustensiles
        appliancesRecord = []; // crée un tableau temporaire pour les appareils


        setIngrRecord(filterRecord);
        setUstRecord(filterRecord);
        setApplRecord(filterRecord);


        ingrContents.innerHTML = ""; //vide le filtre contenant tous les ingrédients
        displayIngr(ingredientsRecord); //et y affiche les ingredients en fonction de ???

        ustContents.innerHTML = "";
        displayUst(ustensilsRecord);

        applContents.innerHTML = "";
        displayAppl(appliancesRecord);


    }
}

async function displayRecipes(recipes) { //TODO: fonction pour afficher les recettes dans la section recettes
    const recipesSection = document.querySelector(".recipes-section");
    recipes.forEach((recipe) => {
        const recipeModel = recipeTemplate(recipe, null, null, null);
        const recipeCardDOM = recipeModel.getRecipeCardDom();
        recipesSection.appendChild(recipeCardDOM);
    });
}

function setIngrRecord(recipes) { //TODO: fonction pour configurer les ingredients dans ingredientsRecord
    for (let recipe of recipes) { //pour chaque element du tableau recipes
        for (let ingr of recipe.ingredients) { //pour chaque élément temporaire de l'objet tableau inclus dans ingredients de recipes
            if (!ingredientsRecord.includes(ingr.ingredient.toLowerCase())) {// si le tableau ne contient pas l'ingredient
                ingredientsRecord.push(ingr.ingredient.toLowerCase()); //ajoute l'ingredient au tableau ingredientsRecord
            }
        }
    };
}

function setUstRecord(recipes) { //TODO: fonction pour configurer les ustensiles en minuscules        
    for (let recipe of recipes) { // OK
            for (let ust of recipe.ustensils) {
                let ustensilLower = ust.toLowerCase();
                console.log(ustensilLower);
                if (!ustensilsRecord.includes(ustensilLower)) {
                    ustensilsRecord.push(ustensilLower);
                }
            }
    }
    //console.log(ustensilsRecord);
}

function setApplRecord(recipes) {

    for (let recipe of recipes) {
        if (!appliancesRecord.includes(recipe.appliance.toLowerCase())) {
            appliancesRecord.push(recipe.appliance.toLowerCase());
        }
    }
}

function displayIngr(ingredients) { //TODO: fonction pour afficher les ingredients dans le filtre ingredients
    ingredients.forEach((ingredient) => {
        const recipeModel = recipeTemplate(null, ingredient, null, null);
        recipeModel.createFilterIngredients();
    })
}

function displayUst(ustensiles) {
    ustensiles.forEach((ustensile) => {
        //console.log(ustensile);
        const recipeModel = recipeTemplate(null, null, ustensile, null);
        recipeModel.createFilterUstensils();
    })
}

function displayAppl(appliances) {
    appliances.forEach((appliance) => {
        const recipeModel = recipeTemplate(null, null, null, appliance);
        recipeModel.createFilterAppliances();
    })
}

async function displayNumberTotalOfRecipes(recipes) {
    const numberTotalRecipes = document.querySelector(".numberTotalRecipes");
    numberTotalRecipes.textContent = recipes.length;
}

function changeSideChevron(){
    const chevronUp = document.querySelector("#chevron1");
    const ingrBtn = document.querySelector("#ingrBtn");
    ingrBtn.addEventListener("click", () => {
        if (chevronUp.classList.contains("fa-chevron-up")) {
            chevronUp.classList.remove("fa-chevron-up");
            chevronUp.classList.add("fa-chevron-down");
        } else {
            chevronUp.classList.remove("fa-chevron-down");
            chevronUp.classList.add("fa-chevron-up");
        }
    });   
    console.log("coucou");
}


displayRecipes(recipes);
displayNumberTotalOfRecipes(recipes);

displayIngr(ingredientsRecord);
displayUst(ustensilsRecord);
displayAppl(appliancesRecord);
changeSideChevron();