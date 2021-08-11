// import express from "express";
const path = require("path");
const express = require("express");
const hbs = require("hbs");
const forecast = require("./utils/forecast");
const geolocator = require("./utils/geocode");
const app = express();
const port = process.env.PORT || 3000;

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//setup handlebars engines and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
//setup static directory to serve
app.use(express.static(publicDirectoryPath));
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather Application",
    name: "Oluchi Oraekwe",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    message:
      "This is a portable weather web app that gives brief weather information",
    name: "Oluchi Oraekwe",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help page",
    message: `Get help about the weather application
    about the new coming web app`,
    name: "Oluchi Oraekwe",
  });
});
app.get("/weather", (req, res) => {
  //let address;
  if (!req.query.address) {
    return res.send({
      error: "You must specify your location",
    });
  }

  geolocator(
    req.query.address,
    (error, { longitude, latitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(longitude, latitude, (error, data) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: data,
          location,
          address: req.query.address,
        });
      });
    }
  );
});
app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search querry",
    });
  }
  console.log(req.query);
  res.send({
    products: [],
  });
});
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Error",
    name: "runtime error",
    errorMessage: "Help page not found",
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    title: "Error",
    name: "runtime error",
    errorMessage: "404 Page not found",
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
