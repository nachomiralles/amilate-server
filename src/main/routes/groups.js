"use strict";
var express = require('express');
var router = express.Router();
var GroupsController = require('../controllers/group-controller')

module.exports = function(){

    router.get('/', GroupsController.getAllGroups);

    router.get('/group/:groupname', GroupsController.getGroup);

    router.put('/group', GroupsController.updateGroup);

    router.post('/group', GroupsController.createGroup);

    router.get('/user/:username', GroupsController.getGroupsByUser);

    router.post('/new-user', GroupsController.addUserToGroup);
    //
    //router.get('/group/:groupname', function(req, res){
    //    GroupsController.getGroup(req, res);
    //});
    //
    //router.put('/group', function(req, res){
    //    GroupsController.updateGroup(req, res);
    //});
    //
    //router.post('/group', function(req, res){
    //    GroupsController.createGroup(req, res);
    //});
    //
    //router.post('/new-user', function(req, res){
    //    GroupsController.addUserToGroup(req, res);
    //});

    return router;

}
