var express = require('express');
var router = express.Router();
var models = require('../models/');
var Place = models.Place; 
var Hotel = models.Hotel;
var Activity = models.Activity;
var Restaurant = models.Restaurant;

var foundHotels, foundActivities, foundRestaurants;

router.get("/", function(req, res, next) {
	
	Hotel.find({}).exec()
	.then (function (hotels){
		foundHotels = hotels;
		return Activity.find({}).exec();
	})
	.then (function (activities){
		foundActivities = activities;
		return Restaurant.find({}).exec();
	})
	.then (function (restaurants){
		foundRestaurants = restaurants;
	})
	.then (function (){
		console.log(foundRestaurants);
  	res.render('index', {allHotels: foundHotels, allActivities: foundActivities, allRestaurants: foundRestaurants});
	});
	// .catch (function (err){
	// 	console.err(err);
	// });
});

module.exports = router;