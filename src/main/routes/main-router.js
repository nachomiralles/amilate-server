"use strict";
var express = require('express');
var router = express.Router();
var SessionManager = require('../utils/session-manager');


module.exports = function(){

    router.get('/', function(req, res){
       res.send("Am I Late Server UP!");
    });

    var login = require('./login')();
    router.use("/login", login);

    var register = require('./register')();
    router.use("/register", register);

    router.use(function(req, res, next){

        if(SessionManager.hasSession(req)){
            next();
        }
        else {
            res.jsonp({"err": "You are not currently logged."});
        }
    });

    var users = require('./users')();
    router.use("/users", users);

    var groups = require('./groups')();
    router.use("/groups", groups);

    return router;

};