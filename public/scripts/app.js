console.log("Sanity Check: JS is working!");

$(document).ready(function(){
  
  $.ajax({
    method: 'GET',
    url: '/api/vacations',
    success: onSuccess,
    error: onError,
  });

  $('#newVacationForm').on('submit', function(event) {
    event.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/api/vacations',
      data: $(this).serialize(),
      success: addNewVacation,
      error: onError
    })
  });

  $('.vacations').on('click', '.delete-button', function() {
    $.ajax({
      method: 'DELETE',
      url: 'api/vacations/' + $(this).attr('data-id'),
      success: deleteVacationSuccess,
      error: onError
    })
  })

});

function onSuccess(json) {
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
};

function addNewVacation(json) {
  $('#newVacationForm input').val('');
  $('input:checked').prop('checked', false);
};

function deleteVacationSuccess(json) {
  console.log(json);
};

