var express = require("express");
var swig = require('swig');
var bodyParser = require('body-parser');
var app = express();
var sass = require('node-sass-middleware');
var routes = require('./routes');
var morgan = require('morgan');
var path = require('path');

//Rendering Stuff
app.engine('html', swig.renderFile);
app.set("view engine", "html");
app.set("views", process.cwd() + "/views");
swig.setDefaults({cache: false});



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(
 sass({
   src: __dirname + '/assets', //where the sass files are 
   dest: __dirname + '/public', //where css should go
   debug: true
 })
);

app.use(express.static(path.join(__dirname, '/public'))); //__dirname is the folder this file is in.
app.use('/bower_components', express.static(path.join(__dirname, '/bower_components')));

app.use('/', routes);

// Error Middleware Catch Error and Continue
app.use(function(err, req, res, next) {
   var error = new Error('Not found');
   err.status = 404;
   next(err);
});

// Error Middleware End of the Line
app.use(function(err, req, res, next) {
   console.error({error: err});
   res.status(err.status || 500);
   res.render("error", {status: err.status, message: err.message});
});

var server = app.listen(3000, function() {
   console.log("Estamose oyendo en el puerto tres mil");
});