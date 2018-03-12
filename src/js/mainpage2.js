// self invoking function
(function () {
    'use strict';
    var dataset = [];
    var format = [];


    // waarde van een query string halen
    var getQueryString = function (field, url) {
        //Die kijkt of die url ingevuld is, en indien niet dan zoekt hij ze zelf wel
        var href = url ? url : window.location.href;
        var reg = new RegExp('[?&]' + field + '=([^&#]*)', 'i');
        var string = reg.exec(href);
        return string ? string[1] : null;
    };

    //Het filteren van de query
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

// data ophalen query
    var sendrequestqueryFunction = function (qryId) {
        //  console.log(qryId);

        // nieuw XMLHttpRequest object aanmaken
        var request = new XMLHttpRequest();

        // url zal ooit veranderen
        request.open('GET', '../src/data/queries.json', true);

        // wat gebeurt er als er een antwoord komt op de request
        request.onload = function () {
            //console.log(request.status);

            // was de request succesvol?
            if (request.status >= 200 && request.status < 400) {
                var response = JSON.parse(request.response);
                //  console.log(response.data);

                // todo: geselecteerde query filteren
                // daarna: andere functie oproepen om data te verwerken
                // de geselecteerde query opzoeken in data
                var qry = filterQuery(response.data, qryId);
              //  console.log(qry.query);

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

    // data ophalen dataset
    var sendrequestdatasetsFunction = function (dataset) {
        // console.log(dataset);

        // nieuw XMLHttpRequest object aanmaken
        var request = new XMLHttpRequest();

        // url zal ooit veranderen
        request.open('GET', '../src/data/datasets.json', true);

        // wat gebeurt er als er een antwoord komt op de request
        request.onload = function () {

            // bekijken wat er in de status zit van het request
            // console.log(request.status);

            // was de request succesvol?
            if (request.status >= 200 && request.status < 400) {

                //de variabele response gelijk stellen aan het antwoord van het request
                var response = JSON.parse(request.response);

                //de variabele array gelijk stellen aan
                dataset = response.dataset;

                // verwerk opgehaalde data
                workingdataFunction(dataset);

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

    // data ophalen format resultaten
    var sendrequestformatresultFunction = function (format) {
        //  console.log(format);

        // nieuw XMLHttpRequest object aanmaken
        var request = new XMLHttpRequest();

        // url zal ooit veranderen
        request.open('GET', '../src/data/format.json', true);

        // wat gebeurt er als er een antwoord komt op de request
        request.onload = function () {

            // bekijken wat er in de status zit van het request
            //  console.log(request.status);

            // was de request succesvol?
            if (request.status >= 200 && request.status < 400) {

                //de variabele response gelijk stellen aan het antwoord van het request
                var response = JSON.parse(request.response);

                //de variabele array gelijk stellen aan
                format = response.format;

                // verwerk opgehaalde data
                workingformatFunction(format);

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

    // data verwerken query
    var workingdataFunction = function (dataset) {
        // console.log(dataset);
        var datasetselect = document.getElementById('selectdataset-id');

        for (var i = 0; i < dataset.length; i++) {
            // html element gemaakt
            var option = document.createElement('option');

            // waarden ingevuld
            option.innerText = dataset[i].title;
            // todo json uitbreiden met ID's, id als value gebruiken

            option.value = dataset[i].from;
            // option toegevoegd aan de select
            datasetselect.appendChild(option);
        }
    };

    // data verwerken format resultaten
    var workingformatFunction = function (format) {
        // console.log(format);
        var formatselect = document.getElementById('select-formaat');

        for (var i = 0; i < format.length; i++) {
            // html element gemaakt
            var option = document.createElement('option');

            // waarden ingevuld
            option.innerText = format[i].format;
            // todo json uitbreiden met ID's, id als value gebruiken

            option.value = format[i].format;
            // option toegevoegd aan de select
            formatselect.appendChild(option);
        }
    };

    //tonen code query van json-file in het tekstvak
    var showingquerytextaraeFunction = function (qry) {

        var mytextbox = document.getElementById('textarea_idP1');
        mytextbox.value = qry.query;

    };

    //waarde plaatsen in textarea, query en dataset
    var placingfromintextarea = function (value) {

        var text = document.getElementById('textarea_idP1').value;

        var where = text.indexOf("WHERE");

        //eerst wordt de waarde van de query getoond van de eerste leter tot het woord WHERE,
        //dan wordt de waarde van hieronder getoond (waarde van de dataset),
        //als laatste wordt de tekst na WHERE getoond erachter
        var finalQuery = [text.slice(0, where), value, " ", text.slice(where)].join('');

        document.getElementById('textarea_idP1').value = finalQuery;

    };

    //uitvoeren van query als de gebruiker om de knop duwt
    var werkenknopuitvoeren = function () {

        var waardequery = document.getElementById('textarea_idP1');
        var waardeformat = document.getElementById('select-formaat');

        var query = waardequery.value;
        var res = encodeURIComponent(query);

        if ((waardeformat.selected = true))
        {
            waardeformat = waardeformat.value;

            window.location.href = 'https://stad.gent/sparql?default-graph-uri=&query=' + res + '&format=' + waardeformat + '&timeout=0&debug=on';
        }
        else
        {

            waardeformat = 'https://stad.gent/sparql?default-graph-uri=&query=' + res + '&format=JSON&timeout=0&debug=o';
        }


    };

    // kijken of de queryID niet gelijk is aan 0
    var getQuery = function () {
        var queryID = getQueryString('query');
        if (queryID !== null) {
            sendrequestqueryFunction(queryID);
            //console.log(queryID);
        }
        else {
            console.log("Your queryID must be not null");
        }

    };

    var addEvents = function () {

        var mydropdown = document.getElementById('selectdataset-id');

        mydropdown.addEventListener('change', function (e) {

            var selectedValue = e.target.value;
            //steekt de waarde hierboven in de waarde value in bovensaande functie
            placingfromintextarea(selectedValue);

        });

        document.getElementById('buttonuitvoeren').addEventListener("click", function (ev) {
            werkenknopuitvoeren();
        });
    };

    getQuery();
    sendrequestdatasetsFunction(dataset);
    sendrequestformatresultFunction(format);
    addEvents();

})
();