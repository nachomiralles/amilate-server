"use strict";

var session = require('express-session')

const sesionManager = {

    hasSession: function(req){
        var sessionUser = req.session.user;
        if( !sessionUser ) { // El usuario no se ha logeado
            return false;
        }
        if( Date.now() > sessionUser.expirationDate ) {
            this.destroySession(req);
            return false;
        }
        return true;
    },

    createSession: function(req){

        const SECONDS = 60;
        req.session.user = {
            username: req.body.username,
            expirationDate: Date.now() + 1000 * SECONDS
        };
    },

    destroySession: function(req){
        req.session.destroy();
    }
};

module.exports = sesionManager;
