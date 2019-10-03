const express = require("express");
const ejs = require("ejs");
const request = require("request");

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index");
});

app.post("/random", (req, res) => {
    request("https://www.themealdb.com/api/json/v1/1/random.php", {
        json: true
    }, (error, response, body) => {
        if (error) {
            return console.log(error);
        }

        var recipe = body.meals[0];

        var randomRecipe = {
            id: recipe.idMeal,
            title: recipe.strMeal,
            category: recipe.strCategory,
            area: recipe.strArea,
            image: recipe.strMealThumb,
            source: recipe.strSource
        }

        randomRecipe["instructions"] = recipe.strInstructions.split(/[\r\n]+/gm);

        randomRecipe["ingredientArray"] = [];

        for (let i = 1; i < 21; i++) {
            let ingredient = "strIngredient" + i;
            if (recipe[ingredient] === "") {} else {
                randomRecipe.ingredientArray.push(recipe[ingredient]);
            }
        }

        randomRecipe["measureArray"] = [];

        for (let i = 1; i < 21; i++) {
            let measure = "strMeasure" + i;
            if (recipe[measure] === "") {
                break;
            } else {
                randomRecipe.measureArray.push(recipe[measure]);
            }
        }

        res.render("random-recipe", randomRecipe);
    })
})

app.listen(3000, (req, res) => {
    console.log("Listening on port 3000");
});