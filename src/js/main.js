// self invoking function
(function () {
  'use strict';

  var redirect = function () {
    console.log(window.location.href = 'index2.html');
  };

  var changeEventHandler = function (event) {
    var value = event.target.selectedOptions[0].value;
    var text = '';

    switch (value) {
      case 'Query1':
        text = 'Dit is de uitleg van query 1';
        break;

      case 'Query2':
        text = 'Dit is de uitleg van query 2';
        break;

      case 'Query3':
        text = 'Dit is de uitleg van query 3';
        break;

      case 'Query4':
        text = 'Dit is de uitleg van query 4';
        break;

      case 'Query5':
        text = 'Dit is de uitleg van query 5';
        break;
    }
    document.getElementById("tekst").innerHTML = text;

    var link = document.getElementById("linkhtml2");// .href = "index2.html"

    // link.setAttribute('onclick', window.location.href = 'index2.html');
    //get element: link
    link.href += '?Query=' + value;
    //link.href(?) += '?query=' + value;

  };

  var addEvents = function () {

    // knop -> link
    // on change event op select
    // -> pas url van link aan: ...../index2.html?query=[de waarde van uw
    // selected option] ipv var btn => var select redirect -> change url in
    // change url veranderd het href attribute


    var select = document.getElementById('queryselect_id');
    if (select) {
      select.addEventListener('change', changeEventHandler);
    }
  };

  addEvents();
})();
