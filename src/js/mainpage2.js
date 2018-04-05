// self invoking function
(function () {
    'use strict';
    var datasets = [];
    var format = [];
    var resources = [];
    var aantal = [];

    var qry;

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
    var sendRequestQueryFunction = function (qryId) {

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

                // daarna: andere functie oproepen om data te verwerken
                // de geselecteerde query opzoeken in data
                qry = filterQuery(response.data, qryId);

                document.getElementById("selectdataset-id").disabled = true;
                document.getElementById("select-resource").disabled = true;

                // dan: iets met qry doen
                showingQueryTextaraeFunction(qry);

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
    var sendRequestDatasetsFunction = function () {

        // nieuw XMLHttpRequest object aanmaken
        var request = new XMLHttpRequest();

        // url zal ooit veranderen
        request.open('GET', '../src/data/datasets.json', true);

        // wat gebeurt er als er een antwoord komt op de request
        request.onload = function () {

            // bekijken wat er in de status zit van het request
            // was de request succesvol?
            if (request.status >= 200 && request.status < 400) {

                //de variabele response gelijk stellen aan het antwoord van het request
                var response = JSON.parse(request.response);

                //de variabele array gelijk stellen aan
                datasets = response.dataset;

                // verwerk opgehaalde data
                workingDataFunction(datasets);

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
    var workingDataFunction = function (dataset) {
        var datasetselect = document.getElementById('selectdataset-id');

        for (var i = 0; i < dataset.length; i++) {
            // html element gemaakt
            var option = document.createElement('option');

            // waarden ingevuld
            option.innerText = dataset[i].title;

            option.value = dataset[i].id;
            // option toegevoegd aan de select
            datasetselect.appendChild(option);
        }
    };

    // resources ophalen
    var sendRequestRecoursesFunction = function () {

        // nieuw XMLHttpRequest object aanmaken
        var request = new XMLHttpRequest();

        // url zal ooit veranderen
        request.open('GET', '../src/data/resource.json', true);

        // wat gebeurt er als er een antwoord komt op de request
        request.onload = function () {

            // was de request succesvol?
            if (request.status >= 200 && request.status < 400) {

                //de variabele response gelijk stellen aan het antwoord van het request
                var response = JSON.parse(request.response);

                //de variabele array gelijk stellen aan de waarde in json file
                resources = response;

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
    var workingResourceFunction = function (datasetId) {

        var filteredResources = [];
        var resourceselect = document.getElementById('select-resource');

        resourceselect.options.length = 0;

        for (var j = 0; j < resources.length; j++) {
            // resource tijdelijk bewaren
            var resource = resources[j];
            if (resource.datasetid + "" === datasetId) {
                filteredResources.push(resource);
            }
        }

        var selecteerveld = document.createElement('option');

        // <option value="Resource" disabled selected>-- selecteer --</option>
        // value toevoegen
        selecteerveld.value = "Resource";
        // innertext toevoegen
        selecteerveld.innerText = "--selecteer--";
        // disabled op true
        selecteerveld.disabled = true;
        // selected op true
        selecteerveld.selected = true;

        resourceselect.appendChild(selecteerveld);

        for (var i = 0; i < filteredResources.length; i++) {

            // html element gemaakt
            var option = document.createElement('option');

            // waarden invullen
            option.innerText = filteredResources[i].titel;
            option.value = filteredResources[i].gegeven;

            // option toegevoegd aan de select
            resourceselect.appendChild(option);
        }
    };

    // data ophalen format resultaten
    var sendRequestFormatResultFunction = function (format) {

        // nieuw XMLHttpRequest object aanmaken
        var request = new XMLHttpRequest();

        // url zal ooit veranderen
        request.open('GET', '../src/data/format.json', true);

        // wat gebeurt er als er een antwoord komt op de request
        request.onload = function () {

            // was de request succesvol?
            if (request.status >= 200 && request.status < 400) {

                //de variabele response gelijk stellen aan het antwoord van het request
                var response = JSON.parse(request.response);

                //de variabele array gelijk stellen aan
                format = response.format;

                // verwerk opgehaalde data
                workingFormatFunction(format);

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
    var workingFormatFunction = function (format) {
        var formatselect = document.getElementById('select-formaat');

        for (var i = 0; i < format.length; i++) {
            // html element gemaakt
            var option = document.createElement('option');

            // waarden ingevuld
            option.innerText = format[i].format;

            option.value = format[i].format;
            // option toegevoegd aan de select
            formatselect.appendChild(option);
        }
    };

    // data ophalen dataset
    var sendRequestAantalFunction = function (aantal) {

        // nieuw XMLHttpRequest object aanmaken
        var request = new XMLHttpRequest();

        // url zal ooit veranderen
        request.open('GET', '../src/data/aantal.json', true);

        // wat gebeurt er als er een antwoord komt op de request
        request.onload = function () {

            // was de request succesvol?
            if (request.status >= 200 && request.status < 400) {

                //de variabele response gelijk stellen aan het antwoord van het request
                var response = JSON.parse(request.response);
                // console.log(response);

                //de variabele array gelijk stellen aan
                aantal = response.AantalRes;

                // verwerk opgehaalde data
                workingAantalFunction(aantal);

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
    var workingAantalFunction = function (aantal) {
        var aantalselect = document.getElementById('select-aantal');

        for (var i = 0; i < aantal.length; i++) {
            // html element gemaakt
            var option = document.createElement('option');

            // waarden ingevuld
            option.innerText = aantal[i].aantal;

            option.value = aantal[i].aantal;
            // option toegevoegd aan de select
            aantalselect.appendChild(option);
        }
    };

    //tonen code query van json-file in het tekstvak
    var showingQueryTextaraeFunction = function (qry) {

        // dan: iets met qry doen
        if (qry !== null && qry !== '') {
            var mytextbox = document.getElementById('textarea_idP1');
            mytextbox.value = qry.query;
        }
        else {
            console.log("qry must be not null!");
        }
    };

    //waarde plaatsen in textarea, query en dataset
    var placingDatasetInTextarea = function (datasetId) {

        //de value in tekstvak steken
        var textarea = document.getElementById('textarea_idP1');
        //de value van die variabele in andere variabele steken zodat ik die variabele kan gebruiken met de waarde erin ipv altijd document.getElementById te doen
        var text = textarea.value;
        //retourneert de positie van de eerste instantie van een opgegeven waarde in een tekenreeks.
        var where = text.indexOf("WHERE");
        var from = text.indexOf("FROM");

        // hierin plaatsen we de 'from' value van de geselecteerde dataset
        var value;

        //op basis van id: de from opzoeken
        for (var i = 0; i < datasets.length; i++) {
            // dataset tijdelijk bijhouden
            var dataset = datasets[i];

            // controleren: is id gelijk aan geselecteerde datasetId?
            if (dataset.id + "" === datasetId) {
                // from bewaren
                value = dataset.from;
            }
        }

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
    var placingResourcesInTextarea = function (valueResource) {

        //de value van textarea in variabele steken
        var textresource = document.getElementById('textarea_idP1').value;

        //in deze variabele wordt de waarde { gestoken
        var searchTerm = '{';

        //in deze variabele wordt de indexof genomen van de searchTerm = {
        var vierkanthaakje = textresource.indexOf(searchTerm);

        //in deze variabele wordt hetzelfde gedaan als in de andere soort functie alleen de variabele anders en + de searchTerm zijn lengte
        var finalQueryresource = [textresource.slice(0, vierkanthaakje + searchTerm.length), " ", valueResource, textresource.slice(vierkanthaakje + searchTerm.length)].join('');

        //de waarde in finalQueryresource wordt dan geplaatst in het textarea
        document.getElementById('textarea_idP1').value = finalQueryresource;
    };

    //waarde plaatsen in textarea, query en dataset
    var placingAantalInTextarea = function (value) {

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
    var werkenKnopUitvoeren = function () {

        var waardequery = document.getElementById('textarea_idP1');
        var waardeformat = document.getElementById('select-formaat');

        var query = waardequery.value;
        var res = encodeURIComponent(query);
        var url;

        var selectedValue = waardeformat.options[waardeformat.selectedIndex].value;

        if (selectedValue === "format") {
            url = 'https://stad.gent/sparql?default-graph-uri=&query=' + res + '&format=JSON&timeout=0&debug=o';
        }
        else {
            waardeformat = waardeformat.value;
            url = 'https://stad.gent/sparql?default-graph-uri=&query=' + res + '&format=' + waardeformat + '&timeout=0&debug=on';
        }

        if (waardeformat === "HTML") {
            showingResultaatPagina(url);
        }
        else {
            window.location.href = url;
        }
    };

    // kijken of de queryID niet gelijk is aan 0
    var getQuery = function () {
        var queryID = getQueryString('query');
        if (queryID !== null) {
            sendRequestQueryFunction(queryID);
            //console.log(queryID);
        }
        else {
            console.log("Your queryID must be not null");
        }

    };

    var showingResultaatPagina = function (url) {

        // nieuw XMLHttpRequest object aanmaken
        var request = new XMLHttpRequest();

        // url zal ooit veranderen
        request.open('GET', url, true);

        console.log(url);
        // wat gebeurt er als er een antwoord komt op de request
        request.onload = function () {

            // was de request succesvol?
            if (request.status >= 200 && request.status < 400) {
                var response = request.response;

                var resultaat = document.getElementById('resultTable');

                resultaat = request.response;

                document.getElementById("resultTable").innerHTML = request.response;
            }

            // mislukt ... doe iets
            else {
                //  iets nuttigs doen
                console.warn(request.response);
            }
        };
        request.send();
    };

    //verschillende evenenten die gebeuren in mijn tweede pagina
    var addEvents = function () {
        var datasetdropdown = document.getElementById('selectdataset-id');

        //functie waarin de placingdatasetintextarea wordt opgeroepen
        datasetdropdown.addEventListener('change', function (e) {

            var selectedValue = e.target.value;
            //steekt de waarde hierboven in de waarde value in bovensaande functie
            placingDatasetInTextarea(selectedValue);

            workingResourceFunction(selectedValue);

        });

        //functie waarin de knop uitvoeren wordt opgeroepen, aangeduid naar welk id dat hij moet kijken
        document.getElementById('buttonuitvoeren').addEventListener("click", function (ev) {
            werkenKnopUitvoeren();

        });

        //functie waarin de knop uitvoeren wordt opgeroepen, aangeduid naar welk id dat hij moet kijken
        document.getElementById('revert').addEventListener("click", function (ev) {
            showingQueryTextaraeFunction(qry);

            var datasets = document.getElementById('selectdataset-id');
            datasets.value = 'Dataset';

            var resource = document.getElementById('select-resource');
            resource.value = 'Resource';

            var format = document.getElementById('select-formaat');
            format.value = 'format';

            var aantal = document.getElementById('select-aantal');
            aantal.value = 'resultaat';

        });

        //deels zelfde als de eerste functie in addEvents maar met resource select-box
        var resourcedropdown = document.getElementById('select-resource');
        resourcedropdown.addEventListener('change', function (e) {
            var selectedrResourceValue = e.target.value;
            //steekt de waarde hierboven in de waarde value in bovensaande functie
            placingResourcesInTextarea(selectedrResourceValue);

        });

        //deels zelfde als de eerste functie in addEvents maar met de aantal select-box
        var aantaldropdown = document.getElementById('select-aantal');
        aantaldropdown.addEventListener('change', function (e) {
            var selectedResourceValue = e.target.value;
            //steekt de waarde hierboven in de waarde value in bovensaande functie
            placingAantalInTextarea(selectedResourceValue);

        });

    };

    getQuery();
    sendRequestDatasetsFunction(datasets);
    sendRequestFormatResultFunction(format);
    sendRequestAantalFunction(aantal);
    sendRequestRecoursesFunction();
    addEvents();
})
();
