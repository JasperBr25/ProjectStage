// self invoking function
(function () {
  'use strict';

  // hier plaatsen we de opgehaalde queries
  var data = [];

  // waarde van een query string halen
  var getQueryString = function ( field, url ) {
    var href = url ? url : window.location.href;
    var reg = new RegExp( '[?&]' + field + '=([^&#]*)', 'i' );
    var string = reg.exec(href);
    return string ? string[1] : null;
  };

// data ophalen
  var sendrequestFunction = function () {

    // nieuw XMLHttpRequest object aanmaken
    var request = new XMLHttpRequest();

    // url zal ooit veranderen
    request.open('GET', '../src/data/queries.json', true);

    // wat gebeurt er als er een antwoord komt op de request
    request.onload = function () {

      // was de request succesvol?
      if (request.status >= 200 && request.status < 400) {

        var response = JSON.parse(request.response);
        data = response.data;

      }
      // mislukt ... doe iets
      else {
        // todo iets nuttigs doen
        console.warn(request.response);
      }

    };

    // request effectief versturen
    request.send();
  };

  // kijken of de queryID niet gelijk is aan 0
  var getQuery = function() {
    var queryID = getQueryString('query');
    if (queryID !== null)
    {
      sendrequestFunction();
    }
    else
    {
      console.log("Your queryID must be not null");
    }

  };

  getQuery();

})
();