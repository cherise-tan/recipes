const express = require("express");
const ejs = require("ejs");
const request = require("request");

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index");
});

app.listen(3000, (req, res) => {
    console.log("Listening on port 3000");
});