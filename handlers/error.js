'use strict';

function handleErrors(err, response) {
  console.log(err);
  response.status(500).send(`Internal Error`);
}

module.exports = handleErrors; 