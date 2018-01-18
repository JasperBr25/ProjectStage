// self invoking function
(function () {
  'use strict';

  var data = [];

  var changeEventHandler = function (event) {
    var value = event.target.selectedOptions[0].value;

    // VOORBEELD !!!
    // to delete

    var qry;

    // de geselecteerde query opzoeken in data
    for(var i = 0; i<data.length; i++) {
      if (data[i].title === value) {
        qry = data[i];
      }
    }

    document.getElementById('tekst').innerHTML = qry.query;

    // even om te verhinderen dat de rest wordt uitgevoerd
    return;

    var query = document.createElement('pre');
    var text = document.createElement('p');
    var prefixes = document.createElement('pre');

    switch (value) {
      case 'Query1':
        query.innerText = 'PREFIX schema: < http://schema.org/ >\n' +
          'PREFIX rdfs: < http://www.w3.org/2000/01/rdf-schema# >\n' +
          'PREFIX service: < http://purl.org/ontology/service# >\n' +
          'SELECT DISTINCT ?properties WHERE{\n' +
          '?article a schema:NewsArticle.\n' +
          '  ?article ?properties ?waarde\n' +
          '} limit 50\n';

        text.innerText = 'Deze query zorgt ervoor om de eigenschappen (propteries) van een nieuwsartikel te krijgen.\n' +
          'Het PREFIXtrefwoord koppelt een voorvoegsellabel aan een IRI. Een vooraf gedefinieerde naam is een voorvoegsellabel en een lokaal deel, gescheiden door een dubbele punt " :". Een vooraf gedefinieerde naam wordt toegewezen aan een IRI door de IRI aan het prefix en het lokale gedeelte te koppelen. Het voorvoegsellabel of het lokale gedeelte is mogelijk leeg. Houd er rekening mee dat lokale SPARQL-namen toonaangevende cijfers toestaan, terwijl lokale XML-namen dit niet doen.' +
          'Voorvoegsel\tIRI\n';

        prefixes.innerText = 'rdf:\thttp://www.w3.org/1999/02/22-rdf-syntax-ns#\n' +
          'rdfs:\thttp://www.w3.org/2000/01/rdf-schema#\n' +
          'xsd:\thttp://www.w3.org/2001/XMLSchema#\n' +
          'fn:\thttp://www.w3.org/2005/xpath-functions#';
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
    // document.getElementById("tekst").innerHTML = '<pre>' + text + '</pre>';
    document.getElementById('tekst').appendChild(query);
    document.getElementById('tekst').appendChild(text);
    document.getElementById('tekst').appendChild(prefixes);

    var link = document.getElementById("linkhtml2");
    link.href += '?Query=' + value;


  };

  var addEvents = function () {

    var select = document.getElementById('queryselect_id');
    if (select) {
      select.addEventListener('change', changeEventHandler);
    }

  };

  addEvents();

  // in een nieuwe functie steken
  var request = new XMLHttpRequest();

  // url zal ooit veranderen
  request.open('GET', '../src/data/queries.json', true);

  request.onload = function () {

    // was de request succesvol?
    if (request.status >= 200 && request.status < 400) {

      //verwijderen: is om eens te kijken
      console.log(JSON.parse(request.response));

      var response = JSON.parse(request.response);
      data = response.data;

      // DATAVERWERKING verplaatsen naar een functie
      var queryselect = document.getElementById('queryselect_id');

      for (var i = 0; i < data.length; i++) {
        // html element gemaakt
        var option = document.createElement('option');

        // waarden ingevuld
        option.innerText = data[i].title;
        option.value = data[i].title;

        // option toegevoegd aan de select
        queryselect.appendChild(option);
      }
    }
    else {
      // mislukt
      console.error('request mislukt');
    }
  };

  request.send();
})();


// todo
// queries.json uitbreiden op basis van confluence
// html select: opties verwijderen
// xhttprequest in een nieuwe functie steken
// DATAVERWERKING in een functie steken
// changeEventHandler opkuisen
//     - switch verwijderen
//     - tekstelement opvullen met query uit data array