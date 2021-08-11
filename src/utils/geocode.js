const request = require("request");

const geolocator = (address, callback) => {
  const encodeLocation = encodeURIComponent(address);
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeLocation}.json?access_token=pk.eyJ1Ijoib2x1Y2hpb3JhZWt3ZSIsImEiOiJja3MxMmg0eXMxcG9hMzJzNzZxYXd3cjFnIn0.IZaTTAWyLf7mHU0PP4rtFg&limit=2`;
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to reach location server", undefined);
    } else if (response.body.features.length === 0) {
      callback("Unable to find location.Try another search", undefined);
    } else {
      callback(undefined, {
        longitude: response.body.features[0].center[0],
        latitude: response.body.features[0].center[1],
        location: response.body.features[0].place_name,
      });
    }
  });
};
module.exports = geolocator;
