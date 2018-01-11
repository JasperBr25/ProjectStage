// self invoking function
(function () {
'use strict';

  var addClickevent = function () {

    var select = document;

  };

  addClickevent();
})();


// self invoking function
(function () {
  'use strict';

  var redirect = function(){
    console.log(window.location.href = 'index2.html');
  };

  var AddEvents = function () {

    // knop -> link
    // on change event op select
    // -> pas url van link aan: ...../index2.html?query=[de waarde van uw selected option]
    //ipv var btn => var select
    // redirect -> change url
    // in change url veranderd het href attribute

    var btn = document.getElementById("redirect");
    btn.addEventListener('click', redirect);

    // document.getElementById("button").onclick = function () {
    //   location.href += "index2.html";
    //
    // };
  };

  AddEvents();
})();
