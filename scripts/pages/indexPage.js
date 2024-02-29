import recipes from "../../data/recipes.js";

import recipeTemplate from "../templates/recipeTemplate.js";

let formSearch = document.querySelector("#formSearch"); //formulaire de recherche principal

let dataRecord = []; //tableau avec toutes les recettes, ingredients, ustensiles

let ingredientsRecord = []; //tableau avec tous les ingredients
let ustensilsRecord = []; //tableau avec tous les ustensiles
let appliancesRecord = []; //tableau avec tous les appareils

const recipesSection = document.querySelector(".recipes-section"); //Section contenant les recettes

const ingrContents = document.querySelector("#ingrContents"); //Filtre contenant les tags ingrédients
const ustContents = document.querySelector("#ustContents"); //Filtre contenant les tags ustenstiles
const applContents = document.querySelector("#applContents"); //Filtre contenant les tags appareils

const ingrInput = document.querySelector("#ingrInput"); // Input des ingrédients (rech filtrée
const appInput = document.querySelector("#appInput"); // Input des appareils/appliances
const ustInput = document.querySelector("#ustInput"); // Input des ustensiles

const ingrTags = document.querySelector("#ingrTags"); // Zone de tag pour les ingrédients
const appTags = document.querySelector("#appTags"); // Zone de tag pour les appliances/appareils
const ustTags = document.querySelector("#ustTags"); // Zone de tag pour les ustensiles

const selectedAppTagArray = [];
const selectedUstTagArray = [];
const selectedIngrTagArray = [];


// fonction pour créér le tableau dataRecord
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

//tableau temporaire avec toutes les recettes
let filterRecord = [];

//tableau avec resultats filtrés
let filterResults = [];

function search() { //fonction de recherche
    //vide la section des resultats
    recipesSection.innerHTML = "";
    filterResults = []; //
    filterRecord = []; // 

    //si l'U entre + de 2 caractères
    if (formSearch.value.length > 2) {

        //vide la section des resultats
        recipesSection.innerHTML = "";

        for (let singleDataRecord of dataRecord) { //boucle dans le tableau qui contient toutes les données​⁡
            let result = singleDataRecord.label.toLowerCase().indexOf(formSearch.value.toLowerCase());
            if (result !== -1) { // si singleDataLabelLower commence par searchLower
                filterResults.push(singleDataRecord); // on ajoute l'élément à filterResults
                console.log("j'ajoute la data" + singleDataRecord.label + "au tableau filterResults");
            }

            for (let singleFilterResult of filterResults) { // pour chaque élément des résultats filtrés dans filterResults
                for (let singleRecipe of recipes) { // et pour chaque recette de recipes
                    if (singleRecipe.id === singleFilterResult.id) { // vérifie si les id correspond
                        let doublon = false;
                        for (let i = 0; i < filterRecord.length; i++) {
                            if (filterRecord[i].id === singleRecipe.id) {
                                doublon = true;
                                break;
                            }
                        }
                        if (!doublon) {
                            filterRecord.push(singleRecipe);
                        }
                    }
                }
            }
        }
        if (filterResults.length === 0) {
            recipesSection.innerHTML = "Aucune recette ne contient " + formSearch.value + " vous pouvez chercher « tarte aux pommes », « poisson », etc.";
            recipesSection.style.display = "flex";
        } else {

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

            displayNumberTotalOfRecipes(filterRecord);
            displayRecipes(filterRecord);

            console.table(filterRecord);
            console.table("filterResults ==>", filterResults);

        }
    }
}


async function displayRecipes(recipes) { //fonction pour afficher les recettes dans la section recettes
    recipes.forEach((recipe) => {
        const recipeModel = recipeTemplate(recipe, null, null, null);
        const recipeCardDOM = recipeModel.getRecipeCardDom();
        recipesSection.appendChild(recipeCardDOM);
    });
}

//fonction pour vider la section recettes
function clearRecipesSection() {
    recipesSection.innerHTML = "";
}


//fonction pour configurer les ingredients
function setIngrRecord(recipes) { 
    ingredientsRecord = [];
    for (let recipe of recipes) { //pour chaque element du tableau recipes
        for (let ingr of recipe.ingredients) { //pour chaque élément temporaire de l'objet tableau inclus dans ingredients de recipes
            if (!ingredientsRecord.includes(ingr.ingredient.toLowerCase())) {// si le tableau ne contient pas l'ingredient
                ingredientsRecord.push(ingr.ingredient.toLowerCase()); //ajoute l'ingredient au tableau ingredientsRecord
            }
        }
    }
    displayIngr(ingredientsRecord);
}

//fonction pour configurer les ustensiles
function setUstRecord(recipes) {         
    for (let recipe of recipes) { // OK
        for (let ust of recipe.ustensils) {
            let ustensilLower = ust.toLowerCase();
            //console.log(ustensilLower);
            if (!ustensilsRecord.includes(ustensilLower)) {
                ustensilsRecord.push(ustensilLower);
            }
        }
    }
    //console.log(ustensilsRecord);
    displayUst(ustensilsRecord);
}

//  fonction pour configurer les appareils
function setApplRecord(recipes) { 

    for (let recipe of recipes) {
        if (!appliancesRecord.includes(recipe.appliance.toLowerCase())) {
            appliancesRecord.push(recipe.appliance.toLowerCase());
        }
    }

    displayAppl(appliancesRecord);

}


//  fonction pour afficher les ingredients
function displayIngr(ingredients) { 
    ingrContents.innerHTML = "";
    ingredients.forEach((ingredient) => {
        const recipeModel = recipeTemplate(null, ingredient, null, null);
        recipeModel.createFilterIngredients();
    })
}

//  fonction pour afficher les ustensiles
function displayUst(ustensiles) { 
    ustContents.innerHTML = "";
    ustensiles.forEach((ustensile) => {
        //console.log(ustensile);
        const recipeModel = recipeTemplate(null, null, ustensile, null);
        recipeModel.createFilterUstensils();
    })
}

//  fonction pour afficher les appareils
function displayAppl(appliances) { 
    applContents.innerHTML = "";
    appliances.forEach((appliance) => {
        const recipeModel = recipeTemplate(null, null, null, appliance);
        recipeModel.createFilterAppliances();
    })
}

//  fonction pour afficher le nombre total de recettes
const numberTotalRecipes = document.querySelector(".numberTotalRecipes");
async function displayNumberTotalOfRecipes(recipes) { //fonction pour afficher le nombre total de recettes
    numberTotalRecipes.textContent = recipes.length;
}

//  fonction pour mettre à jour le nombre total de recettes
let updatedTotal;
async function updateNumberTotalOfRecipes(updatedTotal) {
    const numberTotalRecipes = document.querySelector(".numberTotalRecipes");
    numberTotalRecipes.textContent = updatedTotal;
}

//fonction pour changer le sens du chevron lors du clic
function changeSideChevron() { //fonction pour changer le sens du chevron lors du clic
    const chevronUp1 = document.querySelector("#chevron1");
    const ingrBtn = document.querySelector("#ingrBtn");
    ingrBtn.addEventListener("click", () => {
        if (chevronUp1.classList.contains("fa-chevron-up")) {
            chevronUp1.classList.remove("fa-chevron-up");
            chevronUp1.classList.add("fa-chevron-down");
        } else {
            chevronUp1.classList.remove("fa-chevron-down");
            chevronUp1.classList.add("fa-chevron-up");
        }
    });

    const chevronUp2 = document.querySelector("#chevron2");
    const appBtn = document.querySelector("#appBtn");
    appBtn.addEventListener("click", () => {
        if (chevronUp2.classList.contains("fa-chevron-up")) {
            chevronUp2.classList.remove("fa-chevron-up");
            chevronUp2.classList.add("fa-chevron-down");
        } else {
            chevronUp2.classList.remove("fa-chevron-down");
            chevronUp2.classList.add("fa-chevron-up");
        }
    });

    const chevronUp3 = document.querySelector("#chevron3");
    const ustBtn = document.querySelector("#ustBtn");
    ustBtn.addEventListener("click", () => {


        if (chevronUp3.classList.contains("fa-chevron-up")) {
            chevronUp3.classList.remove("fa-chevron-up");
            chevronUp3.classList.add("fa-chevron-down");
        } else {
            chevronUp3.classList.remove("fa-chevron-down");
            chevronUp3.classList.add("fa-chevron-up");
        }
    });
}

//  fonction pour filtrer les recettes
function filterUst() { //  fonction pour filtrer les ustensiles
    ustInput.addEventListener("input", function () {
        const filteredUst = ustensilsRecord.filter(ustensile =>
            ustensile.toLowerCase().includes(ustInput.value.toLowerCase()));
        ustContents.innerHTML = "";

        filteredUst.forEach(ustensile => {
            const recipeModel = recipeTemplate(null, null, ustensile, null);
            recipeModel.createFilterUstensils();
        })
    });
}

//  fonction pour filtrer les recettes
function filterIngr() { //fonction pour filtrer les ingrédients

    ingrInput.addEventListener("input", function () {
        console.log("filterResults avant filterIngr", filterResults);
        console.log("ingredientsRecord avant", ingredientsRecord);
        const filteredIngr = ingredientsRecord.filter(ingredient =>
            ingredient.toLowerCase().includes(ingrInput.value.toLowerCase()));
        ingrContents.innerHTML = "";

        filteredIngr.forEach(ingredient => {
            const recipeModel = recipeTemplate(null, ingredient, null, null);
            recipeModel.createFilterIngredients();
        })
    });
}

//  fonction pour filtrer les recettes
function filterApp() { //fonction pour filtrer les app

    appInput.addEventListener("input", function () {
        const filteredApp = appliancesRecord.filter(appliance =>
            appliance.toLowerCase().includes(appInput.value.toLowerCase()));
        applContents.innerHTML = "";

        filteredApp.forEach(appliance => {
            const recipeModel = recipeTemplate(null, null, null, appliance);
            recipeModel.createFilterAppliances();
        })
    });
}

//Créer le tag ingredient
ingrContents.addEventListener("click", function (event) {
    const clickedIngr = event.target.innerHTML;

    const existingTags = Array.from(ingrTags.getElementsByClassName("tag"));
    const tagExists = existingTags.some(tag => tag.textContent === clickedIngr);

    if (!tagExists) {
        const newTagIngr = document.createElement("button");
        newTagIngr.setAttribute("class", "tag");
        newTagIngr.textContent = clickedIngr;
        ingrDropdown.classList.remove("show");


        selectedIngrTagArray.push(clickedIngr);

        const closeTag = document.createElement("i");
        closeTag.setAttribute("class", "fas fa-times");

        newTagIngr.appendChild(closeTag);
        console.log(filterRecord); //ADD

        closeTag.addEventListener("click", function () { // EVENEMENT : lorsqu'on clique sur le tag close des boutons ingrédients

            newTagIngr.remove(); // on supprime le newTagIngr
            recipesSection.innerHTML = ""; // on vide la section recipesSection
        
            let index = selectedIngrTagArray.indexOf(clickedIngr); // index correspond à la valeur de l'index du tag qui vient d'être sélectionné
            selectedIngrTagArray.splice(index, 1); // je supprime du tableau le tag sélectionné
            console.log(selectedIngrTagArray);

           filterWithTag("", "ingr", false); // Appel de la fonction filterWithTag (tag, type, add) {

        });
        ingrTags.appendChild(newTagIngr);
    }
});

//Créer le tag appareil
applContents.addEventListener("click", function (event) {
    const clickedApp = event.target.innerHTML;

    const existingTags = Array.from(appTags.getElementsByClassName("tag"));
    const tagExists = existingTags.some(tag => tag.textContent === clickedApp);

    if (!tagExists) {
        const newTagApp = document.createElement("button");
        newTagApp.setAttribute("class", "tag");
        newTagApp.textContent = clickedApp;
        appDropdown.classList.remove("show");

        selectedAppTagArray.push(clickedApp);

        const closeTag = document.createElement("i");
        closeTag.setAttribute("class", "fas fa-times");

        newTagApp.appendChild(closeTag);

        closeTag.addEventListener("click", function () {
            newTagApp.remove(); // on supprime le noveau tag appliance 
            recipesSection.innerHTML = ""; // on vide la section recipesSection
            let index = selectedAppTagArray.indexOf(clickedApp); // index correspond à la valeur de l'index du tag qui vient d'être sélectionné
            selectedAppTagArray.splice(index, 1); // je supprime du tableau le tag sélectionné
            console.log(selectedAppTagArray);

            filterWithTag("", "appareil", false); // Appel de la fonction filterWithTag (tag, type, add) {

        });

        appTags.appendChild(newTagApp);
    }
})

//Créer le tag ustensile
ustContents.addEventListener("click", function (event) {
    const clickedUst = event.target.innerHTML;

    const existingTags = Array.from(ustTags.getElementsByClassName("tag"));
    const tagExists = existingTags.some(tag => tag.textContent === clickedUst);

    if (!tagExists) {

        const newTagUst = document.createElement("button");
        newTagUst.setAttribute("class", "tag");
        newTagUst.textContent = clickedUst;
        ustDropdown.classList.remove("show");

        selectedUstTagArray.push(clickedUst);

        const closeTag = document.createElement("i");
        closeTag.setAttribute("class", "fas fa-times");

        newTagUst.appendChild(closeTag);
        closeTag.addEventListener("click", function () {
            newTagUst.remove(); // on supprime le nouveau tag ustensile
            recipesSection.innerHTML = "";// on vide la section recipesSection

            let index = selectedUstTagArray.indexOf(clickedUst); // index correspond à la valeur de l'index du tag qui vient d'être sélectionné
            selectedUstTagArray.splice(index, 1); // je supprime du tableau le tag sélectionné

            filterWithTag("", "ustensil", false); // Appele de la fonction filterWithTag (tag, type, add) {


        });
        ustTags.appendChild(newTagUst);
    }
});

const ustDropdown = document.querySelector("#ustDropdown"); //Zone de dropdown des ustensiles

const ingrDropdown = document.querySelector("#ingrDropdown"); //Zone de dropdown des ingrédients /* ADD */

const appDropdown = document.querySelector("#appDropdown"); //Zone de dropdown des appareils


// Fonction pour filtrer les recettes selon le tag INGREDIENTS
ingrDropdown.addEventListener("click", function (event) { // filtre en fonction du tag ingr
    if (event.target.tagName == "BUTTON") {
        const selectedIngrTag = event.target.textContent.toLowerCase();
        filterWithTag(selectedIngrTag, "ingr", true);
        console.table("1", filterRecord);
    }
});


//  Fonction pour filtrer les recettes selon le tag APPAREILS/APPLIANCES
appDropdown.addEventListener("click", function (event) { // filtre en fonction du tag app
    if (event.target.tagName == "BUTTON") {
        const selectedAppTag = event.target.textContent.toLowerCase();
        filterWithTag(selectedAppTag, "appareil", true)
        console.log("2", filterRecord);
    }
}); 

//Fonction pour filtrer les recettes selon le tag USTENSILES
ustDropdown.addEventListener("click", function (event) { // filtre en fonction du tag ustensile
    if (event.target.tagName == "BUTTON") {
        const selectedUstTag = event.target.textContent.toLowerCase();
        filterWithTag(selectedUstTag, "ustensil", true);
        console.log("3", filterRecord);

    }
});

function filterWithTag(tag, type, add) {

    let data = returnSearch(formSearch.value)
    let result = []

    console.log("TAG ARRAY", selectedIngrTagArray);
    console.log("APPL ARRAY", selectedAppTagArray);
    console.log("UST ARRAY", selectedUstTagArray);
    console.table("DATA", data);

    switch (type) {
        case "ingr":
            data.forEach(item => {
                selectedIngrTagArray.forEach(tagg => {
                    item.ingredients.forEach(element => {
                        if (element.ingredient.toLowerCase() === tagg) {
                            if (!result.includes(item)) {
                                result.push(item)
                            }
                        }
                    })
                })
            })
            if (result.length < 1) {
                result = data;
            }
            setIngrRecord(result);
            updatedTotal = result.length;
            updateNumberTotalOfRecipes(updatedTotal);
            break;
        case "appareil":

        // Pour chacun des éléments de DATA
            data.forEach(item => {
                selectedAppTagArray.forEach(element => {
                    if (element === item.appliance.toLowerCase()) {
                        if (!result.includes(item)) {
                            result.push(item);
                        }
                    }
                })
            })

            if (result.length < 1) {
                result = data;
            }

            setApplRecord(result);
            updatedTotal = result.length;
            updateNumberTotalOfRecipes(updatedTotal);


            // }
            break;

        case "ustensil":
            data.forEach(item => {
                selectedUstTagArray.forEach(selectedUst => {
                    item.ustensils.forEach(ustensil => {
                        if (selectedUst.toLowerCase() === ustensil.toLowerCase()) {
                            if (!result.includes(item)) {
                                result.push(item)
                            }
                        }
                    })
                })
            });

            if (result.length < 1) {
                result = data;
            }
            setUstRecord(result);
            updatedTotal = result.length;
            updateNumberTotalOfRecipes(updatedTotal);

            break;
    }

    recipesSection.innerHTML = "";

    displayRecipes(result)

} 


function updateRecipes(updatedRecipes) { //fonction pour mettre à jour les recettes en fonction des tags
    //console.log('updateRecipes is called with', recipes);

    recipesSection.innerHTML = "";

    updatedRecipes.forEach((recipe) => {
        const recipeModel = recipeTemplate(recipe, null, null, null);
        const recipeCardDom = recipeModel.getRecipeCardDom();
        recipesSection.appendChild(recipeCardDom);
    })

    setIngrRecord(updatedRecipes);
    setApplRecord(updatedRecipes);
    setUstRecord(updatedRecipes);

    //enlève class .show aux dropsdowns
    ingrDropdown.classList.remove("show");
    appDropdown.classList.remove("show");
    ustDropdown.classList.remove("show");
}

displayRecipes(recipes);
displayNumberTotalOfRecipes(recipes);

changeSideChevron();

filterUst();
filterIngr();
filterApp();

function returnSearch(word) {
    let filterRecord = []
    let filterResults = []

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
    return filterRecord

}