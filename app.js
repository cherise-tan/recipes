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
    request("https://www.themealdb.com/api/json/v1/1/random.php", {json: true}, (error, response, body) => {
        if (error) {
            return console.log(error);
        }
        
        var recipe = body.meals[0];

        var randomRecipe =
        {
            id: recipe.idMeal,
            title: recipe.strMeal,
            category: recipe.strCategory,
            area: recipe.strArea,
            instructions: recipe.strInstructions,
            image: recipe.strMealThumb,
            source: recipe.strSource
        }

        for (let i = 1; i < 21; i++) {
            let string = "strIngredient" + i;
            if (recipe[string] === "") {
                break;
            }
            else {
                randomRecipe[string] = recipe[string];
            }            
        }

        for (let i = 1; i < 21; i++) {
            let string = "strMeasure" + i;
            if (recipe[string] === "") {
                break;
            }
            else {
                randomRecipe[string] = recipe[string];
            }            
        }


        console.log(randomRecipe);


        // res.render("random-meal", randomRecipe);
    })
})

app.listen(3000, (req, res) => {
    console.log("Listening on port 3000");
});