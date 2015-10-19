'use strict';
//var Position = require('./position');

class User {

    constructor(name, email, activeGroup, position) {
        this._id = name + email; // TODO Change when including MongoDB
        this.name = name;
        this.email = email;
        this.activeGroup = activeGroup;
        this.position = position;
        //this.position = new Position(position.time, position.latitude, position.longitude);
    }
}

module.exports = User;