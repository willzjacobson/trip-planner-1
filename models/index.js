var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/tripplans');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'mongodb connection error:'));

var placeSchema = new Schema ({
	address: String,
	city: String,
	state: String,
	phone: String,
	location: [Number]
});

var hotelSchema = new Schema ({
	name: String,
	place: [placeSchema], // place or string?
	num_stars: {type: Number, min: 1, max: 5},
	amenities: String
});

var activitySchema = new Schema ({
	name: String,
	place: [placeSchema], // place or string?
	age_range: String
});

var restaurantSchema = new Schema ({
	name: String,
	place: [placeSchema], // place or string?
	cuisine: String,
	price: {type: Number, min: 1, max: 5} // how many $$$$$
});

var Place = mongoose.model('Place', placeSchema);
var Hotel = mongoose.model('Hotel', hotelSchema);
var Activity = mongoose.model('Activity', activitySchema);
var Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = {
	Place: Place,
	Hotel: Hotel,
	Activity: Activity,
	Restaurant: Restaurant
};