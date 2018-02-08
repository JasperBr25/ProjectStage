// self invoking function
(function () {
  'use strict';

  // hier plaatsen we de opgehaalde queries
  var data = [];


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

  var getQueryString = function ( field, url ) {
    var href = url ? url : window.location.href;
    var reg = new RegExp( '[?&]' + field + '=([^&#]*)', 'i' );
    var string = reg.exec(href);
    return string ? string[1] : null;
  };
  var queryID = getQueryString('query');



  // datset tonen in tekstvak
  var showingdatasetcomboboxintextbox = function () {

    // if(document.getElementsByName('select_name').SelectedIndex > -1) {
    var mytextbox = document.getElementById('textarea_idP1');
    var mydropdown = document.getElementById('select-id');

    mydropdown.onchange = function () {
      mytextbox.value = mytextbox.value + this.value + "\n";
    };

  };
  // else {
  //console.log("Please select an item!");
  //   }
//};
  var showingresourcecomboboxintextbox = function () {
    var mytextbox = document.getElementById('textarea_idP1');
    var mydropdown = document.getElementById('select-resource');


    mydropdown.onchange = function () {
      mytextbox.value = mytextbox.value + this.value;
    };
  };
  var showingcomboboxintextbox = function () {

    showingdatasetcomboboxintextbox();

    showingresourcecomboboxintextbox();
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
 // var boe = function (){
   // var ugly = document.getElementById('textarea_idP1').value;
   // var obj = JSON.parse(ugly);
   // var pretty = JSON.stringify(obj, undefined, 4);
   // document.getElementById('textarea_idP1').value = pretty;
  //};

  showingcomboboxintextbox();
  copingtosecondpageFunction(data);
 // boe();



  sendrequestFunction();
})
();