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

    deleteGroup: function deleteGroup(req, res) {

        const group = req.body;

        const query = {
            name: 'delete-group',
            text: 'DELETE FROM groups WHERE groupname LIKE $1',
            values: [group.groupname]
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
        const username = req.body.username;
        const groupname = req.body.groupname;

        const query = {
            name: 'insert-user-in-group',
            text: 'INSERT INTO user_groups (id_user, id_group) VALUES ((SELECT id_user FROM users WHERE username LIKE $1), (SELECT id_group FROM groups WHERE groupname LIKE $2))',
            values: [username, groupname]
        };

        pgUtils.executeQuery({statement: query})
            .then((result) => {
                res.jsonp(result);
            })
            .catch((error) => {
                res.jsonp({"error": error.message})
            });
    },

    getGroupsByUser: function getGroupsByUser(req, res){
        const username = req.params.username;

        const query = {
            name: 'get-groups-by-user',
            text: 'SELECT groupname, creationdate, description FROM groups WHERE id_group IN (SELECT id_group FROM user_groups WHERE id_user = (SELECT id_user FROM users WHERE username LIKE $1));',
            values: [username]
        };

        pgUtils.executeQuery({statement: query})
            .then((result) => {
                if(result.length>1)
                    res.jsonp(result);
                else
                    res.jsonp({"error": "This user does not exists o does not belong to any group."});
            })
            .catch((error) => {
                res.jsonp({"error": error.message})
            });

    }

};
