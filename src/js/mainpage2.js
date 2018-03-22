// self invoking function
(function () {
    'use strict';
    var dataset = [];
    var format = [];
    var recourse = [];
    var aantal = [];

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

    // resources ophalen
    var sendrequestrecoursesFunction = function (resources, response) {

        // nieuw XMLHttpRequest object aanmaken
        var request = new XMLHttpRequest();
        // url zal ooit veranderen
        request.open('GET', '../src/data/resource.json', true);

        // wat gebeurt er als er een antwoord komt op de request
        request.onload = function () {

            // bekijken wat er in de status zit van het request
            // console.log(request.status);

            // was de request succesvol?
            if (request.status >= 200 && request.status < 400) {

                //de variabele response gelijk stellen aan het antwoord van het request
                var response = JSON.parse(request.response);


                //console.log(response);
                //
                // //de variabele array gelijk stellen aan
                // recourse = response.recourse;
                //
                // console.log(recourse);

                // verwerk opgehaalde data
                workingdresourceFunction(response);
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
    var workingdresourceFunction = function (resources, response) {
        var resourceselect = document.getElementById('select-resource');

        for (var i = 0; i < resources.length; i++) {
            // html element gemaakt
            var option = document.createElement('option');

            console.log(Object.keys(response));


            var key = key [i];

            // waarden ingevuld
            option.innerText = resources[key].titel;
            option.value = resources[key].gegeven;
            // option toegevoegd aan de select
            resourceselect.appendChild(option);
        }
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

    // data ophalen dataset
    var sendrequestaantalFunction = function (aantal) {

        // nieuw XMLHttpRequest object aanmaken
        var request = new XMLHttpRequest();

        // url zal ooit veranderen
        request.open('GET', '../src/data/aantal.json', true);

        // wat gebeurt er als er een antwoord komt op de request
        request.onload = function () {

            // bekijken wat er in de status zit van het request
            // console.log(request.status);

            // was de request succesvol?
            if (request.status >= 200 && request.status < 400) {

                //de variabele response gelijk stellen aan het antwoord van het request
                var response = JSON.parse(request.response);
               // console.log(response);

                //de variabele array gelijk stellen aan
                aantal = response.AantalRes;

                // verwerk opgehaalde data
                workingaantalFunction(aantal);

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

    // data verwerken format resultaten
    var workingaantalFunction = function (aantal) {
        // console.log(format);
        var aantalselect = document.getElementById('select-aantal');

        for (var i = 0; i < aantal.length; i++) {
            // html element gemaakt
            var option = document.createElement('option');

            // waarden ingevuld
            option.innerText = aantal[i].aantal;
            // todo json uitbreiden met ID's, id als value gebruiken

            option.value = aantal[i].aantal;
            // option toegevoegd aan de select
            aantalselect.appendChild(option);
        }
    };

    //tonen code query van json-file in het tekstvak
    var showingquerytextaraeFunction = function (qry) {

        var mytextbox = document.getElementById('textarea_idP1');
        mytextbox.value = qry.query;

    };

    //waarde plaatsen in textarea, query en dataset
    var placingdatasetintextarea = function (value) {

        //de value in tekstvak steken
        var textarea = document.getElementById('textarea_idP1');
        //de value van die variabele in andere variabele steken zodat ik die variabele kan gebruiken met de waarde erin ipv altijd document.getElementById te doen
        var text = textarea.value;
        //retourneert de positie van de eerste instantie van een opgegeven waarde in een tekenreeks.
        var where = text.indexOf("WHERE");
        var from = text.indexOf("FROM");

        //wanneer er een FROM zit de tekst van textarea gaat hij de code uitvoeren
        if (from !== -1) {
            //in die variabele text wordt de waarde aangepast naar alles tot from + alles na de where en dat wordt samen geplakt in textarea
            text = [text.slice(0, from), text.slice(where)].join('');
            where = text.indexOf("WHERE");
        }
        //eerst wordt de waarde van de query getoond van de eerste leter tot het woord WHERE,
        //dan wordt de waarde van hieronder getoond (waarde van de dataset),
        //als laatste wordt de tekst na WHERE getoond erachter
        text = [text.slice(0, where), value, " ", text.slice(where)].join('');
        textarea.value = text;


    };

    //waarde van resources plaatsen in textarea
    var placingresourcesintextarea = function (valueResource) {

        //de value van textarea in variabele steken
        var textresource = document.getElementById('textarea_idP1').value;

        //in deze variabele wordt de waarde { gestoken
        var searchTerm = '{';

        //in deze variabele wordt de indexof genomen van de searchTerm = {
        var vierkanthaakje = textresource.indexOf(searchTerm);

        //in deze variabele wordt hetzelfde gedaan als in de andere soort functie alleen de variabele anders en + de searchTerm zijn lengte
        var finalQueryresource = [textresource.slice(0, vierkanthaakje + searchTerm.length), " ", valueResource, textresource.slice(vierkanthaakje+searchTerm.length)].join('');

        //de waarde in finalQueryresource wordt dan geplaatst in het textarea
        document.getElementById('textarea_idP1').value = finalQueryresource;
    };

    //waarde plaatsen in textarea, query en dataset
    var placingaantalintextarea = function (value) {

        //de value van textarea in variabele steken
        var textresource = document.getElementById('textarea_idP1').value;

        //in deze variabele wordt de waarde { gestoken
        var searchTerm = 'limit';

        //in deze variabele wordt de indexof genomen van de searchTerm = {
        var vierkanthaakje = textresource.indexOf(searchTerm);


        //wanneer er een waarde limit waarde zit de tekst van textarea gaat hij de code uitvoeren
        if (searchTerm !== -1) {
           //in die variabele text wordt de waarde aangepast naar alles tot from + alles na de where en dat wordt samen geplakt in textarea
            textresource = [textresource.slice(0, vierkanthaakje + 5)].join('');
        }

        //in deze variabele wordt hetzelfde gedaan als in de andere soort functie alleen de variabele anders en + de searchTerm zijn lengte
        var finalQueryresource = [textresource.slice(0, vierkanthaakje + searchTerm.length), " ", value, textresource.slice(vierkanthaakje + searchTerm.length)].join('');

        //de waarde in finalQueryresource wordt dan geplaatst in het textarea
        document.getElementById('textarea_idP1').value = finalQueryresource;
    };

    //uitvoeren van query als de gebruiker om de knop duwt
    var werkenknopuitvoeren = function () {

        var waardequery = document.getElementById('textarea_idP1');
        var waardeformat = document.getElementById('select-formaat');

        var query = waardequery.value;
        var res = encodeURIComponent(query);

        var selectedValue = waardeformat.options[waardeformat.selectedIndex].value;
        if (selectedValue == "format") {

            window.location.href = 'https://stad.gent/sparql?default-graph-uri=&query=' + res + '&format=JSON&timeout=0&debug=o';
        }
        else {
            waardeformat = waardeformat.value;

            window.location.href = 'https://stad.gent/sparql?default-graph-uri=&query=' + res + '&format=' + waardeformat + '&timeout=0&debug=on';
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

    //verschillende evenenten die gebeuren in mijn tweede pagina
    var addEvents = function () {
        var datasetdropdown = document.getElementById('selectdataset-id');

        //functie waarin de placingdatasetintextarea wordt opgeroepen
        datasetdropdown.addEventListener('change', function (e) {

            var selectedValue = e.target.value;
            //steekt de waarde hierboven in de waarde value in bovensaande functie
            placingdatasetintextarea(selectedValue);

            // Todo: functie toevoegen om inhoud van select-resources aan te passen
            sendrequestrecoursesFunction(recourse);


        });

        //functie waarin de knop uitvoeren wordt opgeroepen, aangeduid naar welk id dat hij moet kijken
        document.getElementById('buttonuitvoeren').addEventListener("click", function (ev) {
            werkenknopuitvoeren();
        });

        //deels zelfde als de eerste functie in addEvents maar met resource select-box
        var resourcedropdown = document.getElementById('select-resource');
        resourcedropdown.addEventListener('change', function (e) {
            var selectedrResourceValue = e.target.value;
            //steekt de waarde hierboven in de waarde value in bovensaande functie
            placingresourcesintextarea(selectedrResourceValue);

        });

        //deels zelfde als de eerste functie in addEvents maar met de aantal select-box
        var aantaldropdown = document.getElementById('select-aantal');
        aantaldropdown.addEventListener('change', function (e) {
            var selectedResourceValue = e.target.value;
            //steekt de waarde hierboven in de waarde value in bovensaande functie
            placingaantalintextarea(selectedResourceValue);

        });
    };

    getQuery();
    sendrequestdatasetsFunction(dataset);
    sendrequestformatresultFunction(format);
    sendrequestaantalFunction(aantal);
    addEvents();
})
();
