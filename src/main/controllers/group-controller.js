'use strict';

var pgUtils = require('../utils/db-utils');

module.exports = {

    getAllGroups: function getAllGroups(req, res) {
        const query = {
            name: 'get-all-groups',
            text: 'SELECT * FROM groups'
        };

        pgUtils.executeQuery({statement: query})
            .then((result) => {
                res.jsonp(result);
            })
            .catch((error) => {
                res.jsonp({"error": error})
            });
    },

    getGroup: function getGroup(req, res) {
        const groupname = req.params.groupname;


        const query = {
            name: 'get-group',
            //text: 'SELECT * FROM groups'
            text: 'SELECT * FROM groups WHERE groupname LIKE $1',
            values:[groupname]
        };

        pgUtils.executeQuery({statement: query})
            .then((result) => {
                res.jsonp(result);
            })
            .catch((error) => {
                res.jsonp({"error": error})
            });

    },

    createGroup: function createGroup(req, res) {

        const group = req.body;

        const query = {
            name: 'create-group',
            text: 'INSERT INTO groups (groupname, creationdate, description) VALUES ($1, $2, $3)',
            values: [group.groupname, group.creationdate, group.description]
        };

        pgUtils.executeQuery({statement: query})
            .then((result) => {
                res.jsonp(result);
            })
            .catch((error) => {
                res.jsonp({"error": error.message})
            });

    },

    updateGroup: function updateGroup(req, res) {

        const group = req.body;

        const query = {
            name: 'update-group',
            text: 'UPDATE groups SET creationdate = $1, description = $2 WHERE groupname LIKE $3',
            values: [group.creationdate, group.description, group.groupname]
        };

        pgUtils.executeQuery({statement: query})
            .then((result) => {
                res.jsonp(result);
            })
            .catch((error) => {
                res.jsonp({"error": error})
            });

    },

    addUserToGroup: function(req, res){
        const userid = req.body.id_user;
        const groupid = req.body.id_group;

        const query = {
            name: 'insert-user-in-group',
            text: 'INSERT INTO user_groups (id_user, id_group) VALUES ($1, $2)',
            values: [userid, groupid]
        };

        pgUtils.executeQuery({statement: query})
            .then((result) => {
                res.jsonp(result);
            })
            .catch((error) => {
                res.jsonp({"error": error.message})
            });
    }

};
