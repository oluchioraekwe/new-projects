const request = require("request");
const chalk = require("chalk");
const forecast = (longitude, latitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=96287754075c5203002df23b387b1018&query=${latitude},${longitude}`;
  //const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,daily&appid=d0c3f082b4271958863b2239f6d058a0&units=metric`;
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to reach weather api server", undefined);
    } else if (response.body.error) {
      callback("Unable to get weather information", undefined);
    } else {
      const info = response.body;

      callback(
        undefined,
        `The weather condition in ${info.location.region}  ${info.location.country} as at ${info.location.localtime} is ${info.current.weather_descriptions[0]} with average temperature of ${info.current.temperature} degrees celsius , humidity of ${info.current.humidity} and visibility of ${info.current.visibility}. There is ${info.current.precip}% of precipitation`
      );
    }
  });
};

module.exports = forecast;
