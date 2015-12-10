"use strict";
var express = require('express');
var router = express.Router();
var UsersController = require('../controllers/user-controller');

module.exports = function(){

    router.get('/',  UsersController.getAllUsers);

    router.get('/user/:username',  UsersController.getUser);

    router.put('/user',  UsersController.updateUser);

    router.post('/user',  UsersController.createUser);

    router.delete('/user',  UsersController.deleteUser);

    router.get('/group/:groupname', UsersController.getUsersByGroup);

    router.post('/user/password', UsersController.updatePassword);


    return router;

}

