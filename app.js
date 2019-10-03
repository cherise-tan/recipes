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
        console.log(body);
    })
})

app.listen(3000, (req, res) => {
    console.log("Listening on port 3000");
});