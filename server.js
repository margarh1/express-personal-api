// require express and other modules
var express = require('express'),
    app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// allow cross origin requests (optional)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/************
 * DATABASE *
 ************/

var db = require('./models');

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/profile', function profilePage(req, res) {
  res.json({
    name: 'Margaret Ha',
    githubLink: 'https://github.com/margarh1',
    githubProfileImage: '',
    personalSiteLink: 'margarh1.github.io',
    currentCity: 'Fremont, CA'
  });
});

app.get('/api/vacations', function vacationsPage(req, res) {
  db.Vacation.find(function(err, vacations) {
    if (err) { return console.log('index error: ' + err); }
    res.json(vacations);
  })
});

app.get('/api/vacations/:id', function showVacation(req, res) {
  db.Vacation.findById(req.params.id, function(err, vacation) {
    if (err) { return console.log("show error: " + err); }
    res.json(vacation);
  });
});

app.post('/api/vacations', function addVacation(req, res) {
  var newVacation = new db.Vacation({
    year: req.body.year,
    location: req.body.location,
    hasPhotos: req.body.hasPhotos
  });

  newVacation.save(function(err, vacation) {
    if (err) { return console.log('create error: ' + err); }
    console.log('created ', vacation.year);
    res.json(vacation);
  });
});

app.put('/api/vacations/:id', function updateVacation(req, res) {
  db.Vacation.findById({ _id: vacationId }, function(err, vacation) {
    if (err) { return console.log(err) };
    vacation.year = req.body.year,
    vacation.location = req.body.location,
    vacation.hasPhotos = req.body.hasPhotos
    res.json(vacation);
  })
});

app.delete('/api/vacations/:id', function deleteVacation(req, res) {
  var vacationId = req.params.id;

  db.Vacation.findOneAndRemove({ _id: vacationId }, function(err, deletedVacation) {
    if (err) { return console.log(err) };
    res.json(deletedVacation);
  });
});


/*
 * JSON API Endpoints
 */

app.get('/api', function api_index(req, res) {
  // TODO: Document all your api endpoints below
  res.json({
    woopsIForgotToDocumentAllMyEndpoints: false,
    message: "Welcome to my personal api! Here's what you need to know!",
    documentationUrl: "https://github.com/margarh1/express_personal_api/README.md",
    baseUrl: "http://aqueous-basin-25416.herokuapp.com",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "Information about me"},
      {method: "GET", path: "/api/vacations", description: "A collection of vacations I've had"},
      {method: "GET", path: "/api/vacations/:id", description: "Get more information on one vacation"},
      {method: "POST", path: "/api/vacations", description: "Add a vacation to the vacations collection"},
      {method: "PUT", path: "/api/vacations/:id", description: "Update/change a vacation's details"},
      {method: "DELETE", path: "/api/vacations/:id", description: "Remove a vacation from the collection"}
    ]
  })
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
