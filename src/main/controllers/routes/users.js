"use strict";
var express = require('express');
var router = express.Router();
var UsersController = require('../../controllers/user-controller');

module.exports = function(){

    router.get('/', function(req, res){
        UsersController.getAllUsers(req, res);
    });

    router.get('/user/:username', function(req, res){
        UsersController.getUser(req, res);
    });

    router.put('/user', function(req, res){
        UsersController.updateUser(req, res);
    });

    router.post('/user', function(req, res){
       UsersController.createUser(req, res);
    });

    return router;

}

