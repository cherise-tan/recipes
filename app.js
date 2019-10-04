const express = require("express");
const ejs = require("ejs");
const request = require("request");

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/categories", (req, res) => {

    request("https://www.themealdb.com/api/json/v1/1/categories.php", {
        json: true
    }, (error, response, body) => {
        if (error) {
            return console.log(error);
        }

        categories = body.categories;

        res.render("categories", categories);
    })
})

app.get("/categories/:category", (req, res) => {

    var url = "https://www.themealdb.com/api/json/v1/1/filter.php?c=" + req.params.category;

    request(url, {
        json: true
    }, (error, response, body) => {
        if (error) {
            return console.log(error);
        }

        var categoryRecipes = body.meals;
   
        res.render("category-recipes", {recipes: categoryRecipes});
    })
})

app.get("/recipe/:id", (req, res) => {

    var url = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + req.params.id;
   
    request(url, {
        json: true
    }, (error, response, body) => {
        if (error) {
            return console.log(error);
        }
 
        var selectedRecipe = getRecipe(body.meals[0]);

        res.render("recipe", selectedRecipe);
    })
})

app.get("/random", (req, res) => {
    request("https://www.themealdb.com/api/json/v1/1/random.php", {
        json: true
    }, (error, response, body) => {
        if (error) {
            return console.log(error);
        }

        var randomRecipe = getRecipe(body.meals[0]);

        res.render("recipe", randomRecipe);
    })
})

function getRecipe(recipe) {

    var finalRecipe = {
        id: recipe.idMeal,
        title: recipe.strMeal,
        category: recipe.strCategory,
        area: recipe.strArea,
        image: recipe.strMealThumb,
        source: recipe.strSource
    }

    finalRecipe["instructions"] = recipe.strInstructions.split(/[\r\n]+/gm);

    finalRecipe["ingredientArray"] = [];

    for (let i = 1; i < 21; i++) {
        let ingredient = "strIngredient" + i;
        if (recipe[ingredient] === "") {} else {
            finalRecipe.ingredientArray.push(recipe[ingredient]);
        }
    }

    finalRecipe["measureArray"] = [];

    for (let i = 1; i < 21; i++) {
        let measure = "strMeasure" + i;
        if (recipe[measure] === "") {
            break;
        } else {
            finalRecipe.measureArray.push(recipe[measure]);
        }
    }

    return finalRecipe;
}

app.listen(3000, (req, res) => {
    console.log("Listening on port 3000");
});