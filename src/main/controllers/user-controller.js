var pgUtils = require('../utils/db-utils')

module.exports = {

    getUser: function getUser(req, res) {
        res.send(req.params.id);
    },

    getUsers: function getUsers(req, res) {
        res.send('AllUsers');
    },

    addOrUpdateUser: function addOrUpdateUser(req, res) {

        const user = req.body;

        const query = {
            name: 'add-user',
            text: 'INSERT INTO users (name, email, activegroup, lastposition) VALUES ($1, $2, $3, $4)',
            values: [user.name, user.email, user.activegroup, JSON.stringify(user.lastposition)]
        };

        pgUtils.executeQuery({statement: query})
            .then((result) => {
                res.jsonp(result);
            })
            .catch((error) => {
                res.jsonp({"error": error})
            });

    },

    countUser: function(req, res){
        console.log();
        pgUtils.executeQuery({statement: "SELECT * FROM users"})
            .then((result) => {
                res.jsonp(result);
            })
            .catch((error) => {
                res.jsonp({"error": error})
            });

    }

};