/**
 * Created by NachoGeotec on 15/10/2015.
 */
var express = require('express');
var app = express();
var UserController = require('./src/main/controllers/user-controller');
var GroupController = require('./src/main/controllers/group-controller');
var bodyParser = require('body-parser')

//USING BODY PARSER TO BE ABLE TO CACTH req.body.whatever
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
    extended: true
}));

//ROUTES TODO BRING THIS TO ROUTER
app.get('/user', UserController.getUsers);
app.get('/user/:id', UserController.getUser);
app.post('/user', UserController.addOrUpdateUser);

app.get('/group', GroupController.getGroups);
app.get('/group/:id', GroupController.getGroup);
app.post('/group', GroupController.addOrUpdateGroup);

var server = null;

var start = function start(port, callback) {
    server = app.listen(port, callback);
};

var stop = function stop(callback) {
    server.close(callback);
};

module.exports = {
    start: start,
    stop: stop
};