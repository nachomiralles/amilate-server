"use strict";
var express = require('express');
var router = express.Router();

module.exports = function(){

    router.get('/', function(req, res){
       res.send("Am I Late Server UP!");
    });

    var users = require('./users')();
    router.use("/users", users);

    var groups = require('./groups')();
    router.use("/groups", groups);

    return router;

}