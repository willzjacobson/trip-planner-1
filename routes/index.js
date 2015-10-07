var express = require('express');
var router = express.Router();
var models = require('../models/');
var Place = models.Place; 
var Hotel = models.Hotel;
var Activity = models.Activity;
var Restaurant = models.Restaurant;

router.get("/", function(req, res, next) {
	

	var findPromises = [Restaurant.find({}).exec(), Activity.find({}).exec(), Hotel.find({}).exec()];
	Promise.all(findPromises)
	.then (function (values){
		// console.log(values[2]);
		res.render('index', {allRestaurants: values[0], allActivities: values[1], allHotels: values[2]});
	})
	
	//res.render('index');
});


module.exports = router;