console.log("Sanity Check: JS is working!");

$(document).ready(function(){

  $.ajax({
    method: 'GET',
    url: '/api/vacations',
    success: onSuccess,
    error: onError,
    compelte: console.log('Finished')
  });

  function onSuccess(json) {
    Handlebars.registerHelper('allLocation', function(places) {
      var allPlaces = "";
      for (place in places) {
        allPlaces = place + ' ';
      };
      return allPlaces;
    });

    var vacationsSource = $('#vacations-template').html();
    var vacationsTemplate = Handlebars.compile(vacationsSource);
    var vacationsHtml = vacationsTemplate({ vacations: json });
    $('.vacations').append(vacationsHtml);
  };

  function onError(xhr, status, errorThrown) {
    alert('Sorry, there was a problem!');
    console.log('Error: ' + errorThrown);
    console.log('Status: ' + status);
    console.dir(xhr);
  }

});
