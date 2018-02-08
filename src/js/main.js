// self invoking function
(function () {
  'use strict';

  // hier plaatsen we de opgehaalde queries
  var data = [];

  // voeg events toe aan knoppen etc.
  var addEvents = function () {

    var select = document.getElementById('queryselect_id');
    if (select) {
      select.addEventListener('change', changeEventHandler);
    }

  };

  var selectedoptionfunction = function (value) {
    // dit vullen we later op met de juiste JSON query
    var qry;

    // de geselecteerde query opzoeken in data
    for (var i = 0; i < data.length; i++) {
      if (data[i].id + "" === value) {
        qry = data[i];
      }
    }

    if (qry === undefined) {
      console.warn('query niet gevonden in global array');
      return;
    }

    // query in juiste element steken
    document.getElementById('query_text').innerHTML = qry.query;
    document.getElementById('query_explanation').innerHTML = qry.explanation;
  };

  var adaptlinkFunction = function (value) {
    // link aanpassen: verhuizen naar afzonderlijke functie
    var link = document.getElementById("linkhtml2");
    link.href += '?Query=' + value;
    link.removeAttribute('hidden');
  };

  // wat gebeurt er als je een optie selecteert?
  var changeEventHandler = function (event) {

    // waarde van geselecteerde option
    var value = event.target.selectedOptions[0].value;

    // wat gebeurt er als je een optie selecteert?
    adaptlinkFunction(value);
    selectedoptionfunction(value);
    //copingtosecondpageFunction(data);
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

        // verwerk opgehaalde data
        workingdataFunction(data);
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

  // data verwerken
  var workingdataFunction = function (data) {

    var queryselect = document.getElementById('queryselect_id');

    for (var i = 0; i < data.length; i++) {
      // html element gemaakt
      var option = document.createElement('option');

      // waarden ingevuld
      option.innerText = data[i].title;
      // todo json uitbreiden met ID's, id als value gebruiken

      option.value = data[i].id;
      // option toegevoegd aan de select
      queryselect.appendChild(option);
    }
  };





  // events toevoegen
  addEvents();
  // data ophalen
  sendrequestFunction();



})
();

