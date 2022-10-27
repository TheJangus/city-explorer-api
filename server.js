'use strict';

console.log('weeeeee!')

//****REQUIRES****//
const express = require('express');
require('dotenv').config();


//**once express is in we need to use it - per express docs//

const app = express();

//middleware to share
const cors = require('cors');
app.use(cors());

const weatherbitIoData = require('./handlers/weather');
const movieInformation = require('./handlers/movies');

// define my port //
const PORT = process.env.PORT || 3002;
// 3002 - if my server is up on 3002, then i know there is something wrong with my .env file or i dont bring in dotenv library

//*****ENDPOINTS*********//

//base endpoint

app.get('/weather', weatherbitIoData);
app.get('/movies', movieInformation);

app.get('/', (request, response) => {
    console.log('This is showing up in my terminal');
    response.status(200).send('Welcome to my server');
});

app.get('/hello', (request, response) => {
    console.log(request.query);
    let firstName = request.query.firstName;
    let lastName = request.query.lastName;
    response.status(200).send('Well hello you ${firstName} ${lastName}! Welcome to my server');
});



app.get('/weather', (request, response, next)=> {
    console.log(request);
    let cityName = request.query.cityName;
    let lat = request.query.lat;
    let lon = request.query.lon;
    try {
        let city = data.find(city => city.city_name === cityName);
        let gtoomedData = cityData.data.map(day => new Forecast(day));
        response.status(200).send(groomedData);
    } catch (error) {
        next(error);
    }
})


class Forecast {
    constructor(dayObj){
        this.date = dayObj.datetime;
        this.description = dayObj.weather.description;
    }
}

//catch all and should live at the bottom
app.get('*', (request, response) => {
    response.status(404).send('This route does not exist');
});

//*****ERROR HANDLING*****//
// errors
//handle any errors
app.use((error, requet, response, next) => {
    response.status(500).send(error.message);
});


//****SERVER START*****//
app.listen(PORT, () => console.log('We are up and running on port ${PORT}'));