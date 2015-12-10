"use strict";
var express = require('express');
var router = express.Router();
var GroupsController = require('../controllers/group-controller')

module.exports = function(){

    router.get('/', GroupsController.getAllGroups);

    router.get('/group/:groupname', GroupsController.getGroup);

    router.post('/group', GroupsController.createGroup);

    router.put('/group', GroupsController.updateGroup);

    router.delete('/group', GroupsController.deleteGroup);

    router.get('/user/:username', GroupsController.getGroupsByUser);

    router.post('/new-user', GroupsController.addUserToGroup);

    return router;

}
