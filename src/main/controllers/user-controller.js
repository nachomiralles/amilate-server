

module.exports = {

    getUser: function getUser(req, res) {
        res.send(req.params.id);
    },

    getUsers: function getUsers(req, res) {
        res.send('AllUsers');
    },

    addOrUpdateUser: function addOrUpdateUser(req, res) {
        res.send(req.body.name);
    }

};