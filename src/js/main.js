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

  var showingdatacomboboxintextbox = function () {
    var mytextbox = document.getElementById('textarea_idP1');
    var mydropdown = document.getElementById('select-id');

    mydropdown.onchange = function () {
      mytextbox.value = mytextbox.value + this.value;
    };
  };


   var copingtosecondpageFunction = function (data) {

     // 2 opvangen uit de url
     // Opgevange var opzoeken in de array
     // Daarvan de query nemen en in het veld plakken, zie hieronder
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

     document.getElementById('textarea_idP1').innerHTML = document.getElementById('query_text').innerHTML = qry.id;

   };
   var boe = function (){
     var ugly = document.getElementById('textarea_idP1').value;
     var obj = JSON.parse(ugly);
     var pretty = JSON.stringify(obj, undefined, 4);
     document.getElementById('textarea_idP1').value = pretty;
  };



  // events toevoegen
  addEvents();
  // data ophalen
  sendrequestFunction();

  showingdatacomboboxintextbox();

  copingtosecondpageFunction(data);
  boe();


})
();

