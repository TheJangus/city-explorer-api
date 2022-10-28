'use strict';

const handleErrors = require('./errors');

const superagent = require('superagent');

function movieInformation(request, response) {
  console.log(request.query);
  superagent.get('https://api.themoviedb.org/3/search/movie')
    .query({
      query: request.query.location,
      api_key: process.env.MOVIE_API_KEY
    })
    .then(movieInformation => {
      console.log('in the movies request: ', movieInformation.body.results);
      response.send(movieInformation.body.results.map(movie => new Movie(movie)))
    })
    .catch(error => {
      handleErrors(error.message);
    })
}
function Movie(movie) {
  this.title = movie.title;
  this.overview = movie.overview;
  this.average_votes = movie.vote_average;
  this.total_votes = movie.vote_count;
  this.image_url = `https://image.tmdb.org/t/p/w300/${movie.poster_path}`;
  this.popularity = movie.popularity;
  this.released_date = movie.release_date;
}

module.exports = movieInformation;