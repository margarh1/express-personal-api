console.log("Sanity Check: JS is working!");

$(document).ready(function(){
  
  $.ajax({
    method: 'GET',
    url: '/api/vacations',
    success: onSuccess,
    error: onError,
    compelte: console.log('Finished')
  });

  $('#newVacationForm').on('submit', function(event) {
    event.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/api/vacations',
      data: $(this).serialize(),
      success: addNewVacation,
      error: onError,
      complete: console.log('New Vacation')
    })
  });

  $('.delete-button').on('click', function() {
    console.log('this');
    // $.ajax({
    //   method: 'DELETE',
    //   url: 'api/vacations/' + $(this).attr('data-id'),
    //   success: deleteVacationSuccess,
    //   error: onError,
    //   complete: console.log('Deleted Vacation')
    // })
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
  console.log(json.location);
};

function deleteVacationSucces(json) {
  console.log(json);
};

