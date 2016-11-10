var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var VacationSchema = new Schema({
  year: Number,
  location: [String],
  hasPhotos: Boolean
});

var Vacation = mongoose.model('Vacation', VacationSchema);

module.exports = Vacation;