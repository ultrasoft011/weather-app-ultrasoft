// To get the path
const path = require("path");
const hbs = require("hbs"); // Require HBS

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

// New express application
const express = require("express");
const { hasSubscribers } = require("diagnostics_channel");
const { time } = require("console");

// Variable to store the application
const app = express();

const port = process.env.PORT || 3000;

// The paths to connect the application with the index.html in the public folder
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");
console.log(path.join(__dirname, "../public")); // I can use as a second paramenter ../ to move up one level in the directory

// To get handlebars set up - hbs library. Define paths for Express config
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialPath);

// app.use() To serve our server, customize the server
app.use(express.static(path.join(__dirname, "../public")));

// Set up a route to the handlebars and view the index.hbs, res.render allows us to render a page, we must delete the previous file from public "index.html"
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Ultra",
  });
});

// About route path with res.render
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me..",
    name: "Ultrasoft",
  });
});

// Help route path with res.render - hbs
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Help me!",
  });
});

// app.com (root rout)
// app.com/help
// app.com/about
//
// .get method: 1st argument is the rute (partial url), 2nd argument a function that describes what's going to happen when an user visit the partial url
app.get("", (req, res) => {
  res.send("<h1>Hello Express!</h1>");
});
//
// app.get("/help", (req, res) => {
//   res.send({
//     name: "Ultra",
//     age: 30,
//   });
// });
//
// Challange: set an about route and render a page title
// app.get("/about", (req, res) => {
//   res.send("<h2>This is the about page</h2>");
// });
//
// Challenge: set a weather route and render a page title
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please confirm the address",
    });
  }
  geocode(req.query.address, (error, {longitude, latitude, location}) => {
    if (error) {
      return res.send({error})
    }

    forecast(longitude, latitude, (error, forecastData) => {
      if(error) {
        return res.send({error})
      }

      res.send({
        forecast: forecastData.forecast,
        latitude: forecastData.lat,
        longitude: forecastData.lon,
        location,
        address: req.query.address,
      })
    })
  })
});

  // Important: set the destructuring equal to an empty object to avoid issues when the user doesn't provide any city information, other way the app will chash
  
  
app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  console.log(req.query);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404 Help",
    name: "Andres Felipe",
    errorMessage: "Help article not found",
  });
});

// * express wild card caracter, match everything that hasn't been matched
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Andres Felipe",
    errorMessage: "Page not found.",
  });
});

// To starts up the server with listen method
app.listen(port, () => {
  console.log("Server is ON " + port);
});
