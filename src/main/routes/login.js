"use strict";
var express = require('express');
var router = express.Router();
var UsersController = require('../../controllers/user-controller');

module.exports = function(){

    router.post('/', function(req, res){
        UsersController.loginUser(req, res);
    });

    return router;

};
