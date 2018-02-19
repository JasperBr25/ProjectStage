// self invoking function
(function () {
  'use strict';
  
  // waarde van een query string halen
  var getQueryString = function (field, url) {
    //Die kijkt of die url ingevuld is, en indien niet dan zoekt hij ze zelf wel
    var href = url ? url : window.location.href;
    var reg = new RegExp('[?&]' + field + '=([^&#]*)', 'i');
    var string = reg.exec(href);
    return string ? string[1] : null;
  };

  var filterQuery = function (array, id) {

    for (var i = 0; i < array.length; i++) {
      if (array[i].id + "" === id) {
        return array[i];
      }
    }

    // komt pas hier als de query niet gevonden werd
    console.warn('query not found in global array');
    return null;

  };

// data ophalen
  var sendrequestFunction = function (qryId) {
    console.log(qryId);

    // nieuw XMLHttpRequest object aanmaken
    var request = new XMLHttpRequest();

    // url zal ooit veranderen
    request.open('GET', '../src/data/queries.json', true);

    // wat gebeurt er als er een antwoord komt op de request
    request.onload = function () {

      console.log(request.status);

      // was de request succesvol?
      if (request.status >= 200 && request.status < 400) {

        var response = JSON.parse(request.response);
        console.log(response.data);

        // todo: geselecteerde query filteren
        // daarna: andere functie oproepen om data te verwerken
        // de geselecteerde query opzoeken in data
        var qry = filterQuery(response.data, qryId);
        console.log(qry.query);

        // todo !! controle qry !== null
        // dan: iets met qry doen
        if (qry !== null && qry != '') {
          showingquerytextaraeFunction(qry);
        }
        else {
          console.log("qry must be not null!");
        }

      }
      // mislukt ... doe iets
      else {
        //  iets nuttigs doen
        console.warn(request.response);
      }

    };

    // request effectief versturen
    request.send();
  };

  var showingquerytextaraeFunction = function(qry){

    var mytextbox=document.getElementById('textarea_idP1');
    mytextbox.value = qry.query;

  };


  // kijken of de queryID niet gelijk is aan 0
  var getQuery = function () {
    var queryID = getQueryString('query');
    if (queryID !== null) {
      sendrequestFunction(queryID);
      console.log(queryID);
    }
    else {
      console.log("Your queryID must be not null");
    }

  };

  getQuery();

})
();