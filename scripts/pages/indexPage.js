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

const ingrInput = document.querySelector("#ingrInput"); // Input des ingrédients (rech filtrée)

const appInput = document.querySelector("#appInput"); // Input des appareils/appliances

const ustInput = document.querySelector("#ustInput"); // Input des ustensiles

const ingrTags = document.querySelector("#ingrTags"); // Zone de tag pour les ingrédients

const appTags = document.querySelector("#appTags"); // Zone de tag pour les appliances/appareils

const ustTags = document.querySelector("#ustTags"); // Zone de tag pour les ustensiles

const selectedAppTagArray = [];
const selectedUstTagArray = [];
const selectedIngrTagArray = [];



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

//tableau temporaire avec toutes les recettes
let filterRecord = [];

//tableau avec resultats filtrés
let filterResults = [];

function search() { //TODO: fonction de recherche
    //vide la section des resultats
    recipesSection.innerHTML = "";
    filterResults = [];
    filterRecord = [];

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

        // if (filterResults.length === 0) {
        //     recipesSection.innerHTML = "Aucune recette ne contient " + formSearch.value + " vous pouvez chercher « tarte aux pommes », « poisson », etc.";
        // } else {
        //     //affiche les recettes filtrées dans la section recette
        //     recipesSection.innerHTML = "";
        //     displayRecipes(filterRecord);
        // }

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
        // } else if (filterResults.length === null) {
        //     recipesSection.innerHTML = "Aucune recette ne contient " + formSearch.value + " vous pouvez chercher « tarte aux pommes », « poisson », etc.";
        //     displayNumberTotalOfRecipes(filterRecord);
        // }
    }
}

async function displayRecipes(recipes) { //TODO: fonction pour afficher les recettes dans la section recettes
    recipes.forEach((recipe) => {
        const recipeModel = recipeTemplate(recipe, null, null, null);
        const recipeCardDOM = recipeModel.getRecipeCardDom();
        recipesSection.appendChild(recipeCardDOM);
    });
}

function clearRecipesSection() {
    recipesSection.innerHTML = "";
}

function setIngrRecord(recipes) { //TODO: fonction pour configurer les ingredients dans ingredientsRecord
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

function setUstRecord(recipes) { //TODO: fonction pour configurer les ustensiles en minuscules        
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

function setApplRecord(recipes) { // TODO: fonction poiur configurer les app en minuscules

    for (let recipe of recipes) {
        if (!appliancesRecord.includes(recipe.appliance.toLowerCase())) {
            appliancesRecord.push(recipe.appliance.toLowerCase());
        }
    }

    displayAppl(appliancesRecord);

}

function displayIngr(ingredients) { //TODO: fonction pour afficher les ingredients dans le filtre ingredients
    ingrContents.innerHTML = "";
    ingredients.forEach((ingredient) => {
        const recipeModel = recipeTemplate(null, ingredient, null, null);
        recipeModel.createFilterIngredients();
    })
}

function displayUst(ustensiles) { //TODO: fonction pour afficher les ustensiles dans le filtre ust
    ustContents.innerHTML = "";
    ustensiles.forEach((ustensile) => {
        //console.log(ustensile);
        const recipeModel = recipeTemplate(null, null, ustensile, null);
        recipeModel.createFilterUstensils();
    })
}

function displayAppl(appliances) { //TODO: fonction pour afficher les appareils dans le filtre app
    applContents.innerHTML = "";
    appliances.forEach((appliance) => {
        const recipeModel = recipeTemplate(null, null, null, appliance);
        recipeModel.createFilterAppliances();
    })
}

async function displayNumberTotalOfRecipes(recipes) { //TODO: fonction pour afficher le nombre total de recettes
    const numberTotalRecipes = document.querySelector(".numberTotalRecipes");
    numberTotalRecipes.textContent = recipes.length;
}

function changeSideChevron() { //TODO: fonction pour changer le sens du chevron lors du clic
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




function filterUst() { // TODO: fonction pour filtrer les ustensiles

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

function filterIngr() { //TODO: fonction pour filtrer les ingrédients

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

function filterApp() { //TODO: fonction pour filtrer les app

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

// closeTag.setAttribute("class", "fas fa-times");

// remove debut let selectedIngrTag;
// let clickedIngr;
// let clickedApp;
// remove end let clickedUst;




//Créer le tag ingredient
ingrContents.addEventListener("click", function (event) {
    const clickedIngr = event.target.innerHTML;

    const existingTags = Array.from(ingrTags.getElementsByClassName("tag"));
    const tagExists = existingTags.some(tag => tag.textContent === clickedIngr);

    if (!tagExists) {
        const newTagIngr = document.createElement("button");
        newTagIngr.setAttribute("class", "tag");
        newTagIngr.textContent = clickedIngr;

        selectedIngrTagArray.push(clickedIngr);

        /*ADD*/ const /*ADD*/ closeTag = document.createElement("i");
        closeTag.setAttribute("class", "fas fa-times");

        newTagIngr.appendChild(closeTag);
        console.log(filterRecord); //ADD

        closeTag.addEventListener("click", function () {
            newTagIngr.remove();
            recipesSection.innerHTML = "";
            /* ADD */ // displayRecipes(recipes);
            let index = selectedIngrTagArray.indexOf(clickedIngr);
            selectedIngrTagArray.splice(index, 1);
            console.log(selectedIngrTagArray);

            /* ADD */  filterWithTag("", "ingr", false);



        });
        ingrTags.appendChild(newTagIngr);
    }
});

//Créer le tag appareil
applContents.addEventListener("click", function (event) {
    /*ADD*/ const /*ADD*/ clickedApp = event.target.innerHTML;

    const existingTags = Array.from(appTags.getElementsByClassName("tag"));
    const tagExists = existingTags.some(tag => tag.textContent === clickedApp);

    if (!tagExists) {

        const newTagApp = document.createElement("button");
        newTagApp.setAttribute("class", "tag");
        newTagApp.textContent = clickedApp;

        const closeTag = document.createElement("i");
        closeTag.setAttribute("class", "fas fa-times");

        newTagApp.appendChild(closeTag);

        closeTag.addEventListener("click", function () {
            newTagApp.remove();
            recipesSection.innerHTML = "";
            filterWithTag("", "appareil", false);
        });

        appTags.appendChild(newTagApp);
    }
})

//Créer le tag ustensile
ustContents.addEventListener("click", function (event) {
    /* ADD*/ const /*ADD */ clickedUst = event.target.innerHTML;

    const existingTags = Array.from(ustTags.getElementsByClassName("tag"));
    const tagExists = existingTags.some(tag => tag.textContent === clickedUst);

    if (!tagExists) {

        const newTagUst = document.createElement("button");
        newTagUst.setAttribute("class", "tag");
        newTagUst.textContent = clickedUst;

        const closeTag = document.createElement("i");
        closeTag.setAttribute("class", "fas fa-times");

        newTagUst.appendChild(closeTag);
        closeTag.addEventListener("click", function () {
            newTagUst.remove();
            recipesSection.innerHTML = "";
            filterWithTag("", "ustensil", false);


        });
        ustTags.appendChild(newTagUst);
    }
});

const ustDropdown = document.querySelector("#ustDropdown"); //Zone de dropdown des ustensiles

/*ADD*/ const ingrDropdown = document.querySelector("#ingrDropdown"); //Zone de dropdown des ingrédients /* ADD */

const appDropdown = document.querySelector("#appDropdown"); //Zone de dropdown des appareils

// let selectedIngrTag;

//tableau temporaire avec toutes les recettes
//let filterRecord = [];
//tableau avec resultats filtrés
//let filterResults = [];

// Fonction pour filtrer les recettes selon le tag INGREDIENTS
ingrDropdown.addEventListener("click", function (event) { // filtre en fonction du tag ingr
    //ingrDropdown.classList.remove("show");
    if (event.target.tagName == "BUTTON") {
        const selectedIngrTag = event.target.textContent.toLowerCase();
        //filterRecord = filterRecord.filter(singleFilterRecord => singleFilterRecord.ingredients.some(ingr => ingr.ingredient.toLowerCase() === selectedIngrTag));
        //updateRecipes(filterRecord);
        filterWithTag(selectedIngrTag, "ingr", true)
        console.table("1", filterRecord);
    }
});


// /*ADD*/ Fonction pour filtrer les recettes selon le tag APPAREILS/APPLIANCES
appDropdown.addEventListener("click", function (event) { // filtre en fonction du tag app
    if (event.target.tagName == "BUTTON") {
        const selectedAppTag = event.target.textContent.toLowerCase();
        //filterRecord = filterRecord.filter(singleFilterRecord => singleFilterRecord.appliance.toLowerCase() === selectedAppTag);
        //updateRecipes(filterRecord);
        filterWithTag(selectedAppTag, "appareil", true)
        console.log("2", filterRecord);
    }
}); /*ADD*/

//Fonction pour filtrer les recettes selon le tag USTENSILES
ustDropdown.addEventListener("click", function (event) { // filtre en fonction du tag ustensile
    if (event.target.tagName == "BUTTON") {
        /*ADD*/ const /*ADD*/ selectedUstTag = event.target.textContent.toLowerCase();
        /*ADD*/filterWithTag(selectedUstTag, "ustensil", true);/*ADD*/
        console.log("3", filterRecord);

    }
});

/* ADD */ function filterWithTag(tag, type, add) {

    let data = returnSearch(formSearch.value)
    let result = []
    console.log(selectedIngrTagArray);
    switch (type) {
        case "ingr":
            data.forEach( item => {
                selectedIngrTagArray.forEach(tagg => {
                    item.ingredients.forEach(element => {
                        if (element.ingredient.toLowerCase() === tagg) {
                            if (!result.includes(item)) {
                            result.push(item)
                        }}
                    })
                })

                //displayIngr(result)
            })
            if (result.length < 1) {
                result = data;
            }

            setIngrRecord(result)

            break;

        case "appareil":
            if (add) {
                result = data.filter(item => item.appliance.toLowerCase() === tag.toLowerCase())
                setApplRecord(result)
                //displayAppl(result)
            }
            break;

        case "ustensil":
            if (add) {
                data.forEach(item => {
                    item.ustensils.forEach(element => {
                        if (element.toLowerCase() === tag) {
                            result.push(item)
                        }
                    })
                });
                setUstRecord(result)
                //displayUst(result)
            }
            break;
    }

    recipesSection.innerHTML = "";

    displayRecipes(result)


} /*ADD*/





function updateRecipes(updatedRecipes) { //TODO: fonction pour mettre à jour les recettes en fonction des tags
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

/*ADD DEBUT */ function returnSearch(word) {
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

} /*ADD fin */