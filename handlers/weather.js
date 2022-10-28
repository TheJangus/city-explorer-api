'use strict';

const handleErrors = require('./errors');

const superagent = require('superagent');

function weatherbitIoData(request, response) {
  console.log(request.query);
  superagent.get('https://api.weatherbit.io/v2.0/forecast/daily')
    .query({
      key: process.env.WEATHERBIT_API_KEY,
      days: '12',
      units: 'I',
      lat: request.query.lat,
      lon: request.query.lon
    })
    .then(weatherbitIoData => {
      console.log('in the weather request: ', weatherbitIoData.body.data);
      response.send(weatherbitIoData.body.data.map(day => new DailyWeather(day)))
    })
    .catch(error => {
      handleErrors(error.message);
    })
  function DailyWeather(day) {
    this.date = day.valid_date;
    this.description = day.weather.description;
    this.lowTemp = day.low_temp;
    this.hiTemp = day.max_temp;
  }
}

module.exports = weatherbitIoData;