// Request library
const request = require("request");

// Geocode function
const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoidWx0cmFzb2Z0IiwiYSI6ImNrbnM1cHkzeTAzODgycXMxemdpN3h6YzYifQ.k87LpRwQe8htBBBoDtCcOA";

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (response.body.features.length === 0) {
      callback("Unable to find the location on Geocoding", undefined);
    } else {
      console.log(response.body);
      callback(undefined, {
        forecast: response.body,
        latitude: response.body.features[0].center[1],
        longitude: response.body.features[0].center[0],
        location: response.body.features[0].place_name,
      });
    }
  });
};

// Export the geocode function to be use into another file
module.exports = geocode;
