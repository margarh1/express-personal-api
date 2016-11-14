// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

// var new_campsite = {description: "Sharp rocks. Middle of nowhere."}

// db.Campsite.create(new_campsite, function(err, campsite){
//   if (err){
//     return console.log("Error:", err);
//   }

//   console.log("Created new campsite", campsite._id)
//   process.exit(); // we're all done! Exit the program.
// })

var vacation_list = [
  {
    year: 2002,
    location: ['Jakarta, Indoensia', 'Singapore, Singapore', 'China'],
    hasPhotos: false
  },
  {
    year: 2005,
    location: ['Fort Lauderdale, Florida'],
    hasPhotos: true
  },
  {
    year: 2006,
    location: ['San Diego, California', 'Grand Canyon, Arizona', 'Bryce Canyon, Utah', 'Las Vegas, Nevada'],
    hasPhotos: true
  },
  {
    year: 2007,
    location: ['Guangzhou, China', 'Beijing, China'],
    hasPhotos: true
  },
  {
    year: 2015,
    location: ['Jakarta, Indonesia'],
    hasPhotos: true
  }
];

db.Vacation.remove({}, function(err, vacations) {
  console.log('removed all vacations');
  vacation_list.forEach(function(vacationData) {
    var vacation = new db.Vacation({
      year: vacationData.year,
      location: vacationData.location,
      hasPhotos: vacationData.hasPhotos
    });
    vacation.save(function(err, savedVacation) {
      if (err) { return console.log(err); }
      console.log('saved ' + savedVacation.year + ' vacation');
    });
  });
});