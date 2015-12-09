
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');

//Using Session to Manage User Auth.
app.use(session({
    secret: 'amilate andana',
    resave: false,
    saveUninitialized: true
}));

//WHAT THIS DOES, SOMETHING WITH LOGS.
const logger = require('morgan');
app.use(logger('dev'));


//USING BODY PARSER TO BE ABLE TO CACTH req.body.whatever
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
    extended: true
}));

var root = require('./src/main/routes/main-router')();
app.use('/', root);

var server = null;

var start = function start(port, callback) {
    console.log("Server started on port " + port + ".");
    server = app.listen(port, callback);
};

var stop = function stop(callback) {
    console.log("Server on port " + port + " closed.");
    server.close(callback);
};

module.exports = {
    start: start,
    stop: stop
};