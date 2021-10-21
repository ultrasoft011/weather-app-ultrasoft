// const { response } = require("express");
// Template engine to render dynamic web pages using Express
// Handlebars - create code we can reuse across pages npm (handlebars package) hbs library

// fetch("http://puzzle.mead.io/puzzle").then((response) => {
//   response.json().then((data) => {
//     console.log(data);
//   });
// });

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.getElementById("message-one");
const messageTwo = document.getElementById("message-two");

// messageOne.textContent = "From Javascript";
messageTwo.textContent = "";

weatherForm.addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent the default behavior, refresh the browser.
  const location = search.value;

  // Fetch the data from the url
  fetch("/weather?address=" + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        console.log(data.error);
        messageOne.textContent = data.error;
      } else {
        console.log(data);
        messageOne.textContent = `Location: ${data.location}, the longitude is: ${data.longitude}, latitude: ${data.latitude} and humidity is ${data.humidity}`;
        messageTwo.textContent = `${data.forecast}`;
      }
    });
  });
});
