var pgUtils = require('../utils/db-utils')

module.exports = {

    getAllUsers: function getAllUsers(req, res) {
        const query = {
            name: 'get-all-users',
            text: 'SELECT * FROM users'
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
            text: 'SELECT * FROM users WHERE username LIKE $1',
            values:[username]
        };

        pgUtils.executeQuery({statement: query})
            .then((result) => {
                res.jsonp(result);
            })
            .catch((error) => {
                res.jsonp({"error": error})
            });

    },

    createUser: function createUser(req, res) {

        const user = req.body;

        const query = {
            name: 'create-user',
            text: 'INSERT INTO users (username, email, activegroup, lastposition) VALUES ($1, $2, $3, $4)',
            values: [user.username, user.email, user.activegroup, JSON.stringify(user.lastposition)]
        };

        pgUtils.executeQuery({statement: query})
            .then((result) => {
                res.jsonp(result);
            })
            .catch((error) => {
                res.jsonp({"error": error.message})
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
                res.jsonp(result);
            })
            .catch((error) => {
                res.jsonp({"error": error})
            });

    }

};