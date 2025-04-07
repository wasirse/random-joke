// Importing required npm modules.

import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

// Creating express app and set the port number.

const app = express();
const port =  3000;
const API_URL = "https://v2.jokeapi.dev/joke/any";

// Setting public folder for static files.

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Getting random joke by GET route

app.get("/", async (req, res) => {
  try {
    const response =  await axios.get(API_URL);
    const result = response.data;

    let setup = "";
    let delivery = "";

    if (result.type === "twopart") {
      setup = result.setup;
      delivery = result.delivery;
    } else {
      setup = result.joke;
      delivery = "";
    }

    res.render("index.ejs", { setup, delivery });
  } catch (error) {
    console.log(error.response.data);
    res.status(500);
  }
});

// Listening on predefined port and start the server

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});