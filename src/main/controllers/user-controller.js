"use strict";
var pgUtils = require('../utils/db-utils')
var SessionManager = require('../utils/session-manager');
var Crypter = require('../utils/crypter');

module.exports = {

    getAllUsers: function getAllUsers(req, res) {
        const query = {
            name: 'get-all-users',
            text: 'SELECT username, email, activegroup, lastposition FROM users'
        };

        pgUtils.executeQuery({statement: query})
            .then((result) => {
                res.jsonp(result);
            })
            .catch((error) => {
                res.jsonp({"error": error})
            });
    },

    getUser: function getUser(req, res) {
        const username = req.params.username;
        const query = {
            name: 'get-user',
            //text: 'SELECT * FROM users'
            text: 'SELECT username, email, activegroup, lastposition FROM users WHERE username LIKE $1',
            values:[username]
        };

        pgUtils.executeQuery({statement: query})
            .then((result) => {
                if(result.length==1)
                    res.jsonp(result);
                else
                    res.jsonp({"error": "This user does not exist."});

            })
            .catch((error) => {
                res.jsonp({"error": error})
            });
    },

    loginUser: function loginUser(req, res, next) {
        const username = req.body.username;
        const password = Crypter(req.body.password);

        const query = {
            name: 'get-user',
            text: 'SELECT * FROM users WHERE username LIKE $1 AND PASSWORD LIKE $2',
            values:[username, password]
        };

        pgUtils.executeQuery({statement: query})
            .then((result) => {
                if(result.length==1){
                    SessionManager.createSession(req);
                    res.jsonp({'success': username + ' logged!'});
                }
                else{
                    next(new Error('login-error'));
                }
            })
            .catch((error) => {
                next(new Error('db-error'));
            });
    },

    createUser: function createUser(req, res) {

        const user = req.body;
        const pass = Crypter(user.password);

        const query = {
            name: 'create-user',
            text: 'INSERT INTO users (username, password, email) VALUES ($1, $2, $3)',
            values: [user.username, pass, user.email]
        };

        pgUtils.executeQuery({statement: query})
            .then((result) => {
                SessionManager.createSession(req);
                res.jsonp({'success': 'User ' + user.username + ' created.'});

            })
            .catch((error) => {
                if(error.constraint == "user_different")
                    res.jsonp({"error": "User Repeated"});
                else if(error.constraint == "email_different")
                    res.jsonp({"error": "Email Repeated"});
                else
                    res.jsonp({"error": "Unexpected Error"});
            });

    },

    updateUser: function updateUser(req, res) {

        const user = req.body;

        const query = {
            name: 'update-user',
            text: 'UPDATE users SET email = $1, activegroup = $2, lastposition=$3 WHERE username LIKE $4',
            values: [user.email, user.activegroup, JSON.stringify(user.lastposition), user.username]
        };

        pgUtils.executeQuery({statement: query})
            .then((result) => {
                res.jsonp({'success': 'User ' + user.username + ' updated.'});
                //res.jsonp(result);
            })
            .catch((error) => {
                res.jsonp({"error": error})
            });

    },

    deleteUser: function deleteUser(req, res) {

        const user = req.body;

        const query = {
            name: 'delete-user',
            text: 'DELETE FROM users WHERE username LIKE $1',
            values: [user.username]
        };

        pgUtils.executeQuery({statement: query})
            .then((result) => {
                res.jsonp({'success': 'User ' + user.username + ' deleted.'});
               // res.jsonp(result);
            })
            .catch((error) => {
                res.jsonp({"error": error})
            });

    },

    getUsersByGroup: function getusersByGroup(req, res) {
        const groupname = req.params.groupname;

        const query = {
            name: 'get-users-of-a-group',
            text: 'SELECT username, email FROM users WHERE id_user IN (SELECT id_user FROM user_groups WHERE id_group = (SELECT id_group FROM groups WHERE groupname LIKE $1))',
            values: [groupname]
        };

        pgUtils.executeQuery({statement: query})
            .then((result) => {
                if(result.length>0)
                    res.jsonp(result);
                else
                    res.jsonp({"error": "Cannot find users in this group."})
                //res.jsonp(result);
            })
            .catch((error) => {
                res.jsonp({"error": error})
            });

    },

    updatePassword: function updatePassword(req, res){
        const username = req.body.username;
        const password = Crypter(req.body.password);

        const query = {
            name: 'update-password',
            text: 'UPDATE users SET password = $2 WHERE username LIKE $1',
            values: [username, password]
        };

        pgUtils.executeQuery({statement: query})
            .then((result) => {
                res.jsonp({'success': 'Password updated.'});
                //res.jsonp(result);
            })
            .catch((error) => {
                res.jsonp({"error": error})
            });
    }

};